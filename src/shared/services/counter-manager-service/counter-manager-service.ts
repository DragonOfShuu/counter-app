import { Injectable } from "@angular/core";
import { load } from "@tauri-apps/plugin-store";
import { defer, from, map, Observable, of, shareReplay, switchMap } from "rxjs";
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
                        name: "Unnamed Counter",
                        count: 0,
                        color: "#467979",
                        defaultCount: 0,
                        defaultStep: 1,
                        ...counter, // Override defaults with provided values
                        dateCreated: new Date().getTime(),
                        dateModified: new Date().getTime(),
                    },
                } as CounterCompleteType);
                return of(id);
            })
        );
    }

    getCounterObservable(id: string): Observable<CounterType> {
        return this.store.pipe(
            switchMap((store) => store.get<CounterCompleteType>(id)),
            map((counter) => {
                if (!counter) {
                    throw new Error("Counter not found");
                }
                return counter.data;
            })
        );
    }

    getCounterIdsObservable(): Observable<string[]> {
        return this.store.pipe(switchMap((store) => store.keys()));
    }

    updateCounterObservable(
        id: string,
        dataConsumer: (counter: CounterType) => CounterTypeModifiable
    ): Observable<void> {
        return this.getCounterObservable(id).pipe(
            switchMap((counter) => {
                if (!counter) {
                    throw new Error("Counter not found");
                }
                return this.store.pipe(
                    switchMap((store) =>
                        store.set(id, {
                            id,
                            data: { ...counter, ...dataConsumer(counter) },
                        } as CounterCompleteType)
                    )
                );
            })
        );
    }

    deleteCounterObservable(id: string): Observable<boolean> {
        return this.store.pipe(switchMap((store) => store.delete(id)));
    }

    incrementCounterObservable(id: string, step?: number): Observable<void> {
        return this.updateCounterObservable(id, (counter) => ({
            count: counter.count + (step ?? counter.defaultStep),
        }));
    }

    decrementCounterObservable(id: string, step?: number): Observable<void> {
        return this.updateCounterObservable(id, (counter) => ({
            count: counter.count - (step ?? counter.defaultStep),
        }));
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
