import { Injectable } from "@angular/core";
import { load } from "@tauri-apps/plugin-store";
import { defer, from, Observable, of, shareReplay, switchMap } from "rxjs";
import { uuid } from "../../functions/uuid.function";

@Injectable({
    providedIn: "root",
})
export class CounterManagerService {
    store = defer(() =>
        load("counters.json", { defaults: {}, autoSave: true })
    ).pipe(shareReplay({ bufferSize: 1, refCount: false }));

    newCounterObservable(counter: CounterTypeModifiable): Observable<string> {
        return this.store.pipe(
            switchMap((store) => {
                const id = uuid();
                store.set(id, {
                    id: id,
                    data: {
                        ...counter,
                        dateCreated: new Date().getTime(),
                        dateModified: new Date().getTime(),
                    },
                } as Counter);
                return of(id);
            })
        );
    }

    getCounterObservable(id: string): Observable<CounterType> {
        return this.store.pipe(
            switchMap((store) => store.get<CounterType>(id)),
            switchMap((counter) => {
                if (!counter) {
                    throw new Error("Counter not found");
                }
                return of(counter);
            })
        );
    }

    getCounterIdsObservable(): Observable<string[]> {
        return this.store.pipe(switchMap((store) => store.keys()));
    }

    updateCounterObservable(
        id: string,
        dataConsumer: (counter: CounterType) => Partial<CounterTypeModifiable>
    ): Observable<void> {
        return this.getCounterObservable(id).pipe(
            switchMap((counter) => {
                if (!counter) {
                    throw new Error("Counter not found");
                }
                return this.store.pipe(
                    switchMap((store) =>
                        store.set(id, { ...counter, ...dataConsumer(counter) })
                    )
                );
            })
        );
    }

    deleteCounterObservable(id: string): Observable<boolean> {
        return this.store.pipe(switchMap((store) => store.delete(id)));
    }

    incrementCounterObservable(id: string, step: number): Observable<void> {
        return this.updateCounterObservable(id, () => ({ count: step }));
    }

    decrementCounterObservable(id: string, step: number): Observable<void> {
        return this.updateCounterObservable(id, () => ({ count: -step }));
    }

    resetCounterObservable(id: string): Observable<void> {
        return this.updateCounterObservable(id, (counter) => ({
            count: counter.defaultCount,
        }));
    }

    getCounterValueObservable(id: string): Observable<number> {
        return this.getCounterObservable(id).pipe(
            switchMap((counter) => {
                if (!counter) {
                    throw new Error("Counter not found");
                }
                return from([counter.count]);
            })
        );
    }
}
