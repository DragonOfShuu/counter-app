import { Injectable } from "@angular/core";
import { load } from "@tauri-apps/plugin-store";
import {
    catchError,
    defer,
    from,
    merge,
    Observable,
    of,
    shareReplay,
    Subject,
    switchMap,
} from "rxjs";
import { uuid } from "../../functions/uuid.function";

@Injectable({
    providedIn: "root",
})
export class CounterManagerService {
    store = defer(() =>
        load("counters.json", { defaults: {}, autoSave: true })
    ).pipe(shareReplay({ bufferSize: 1, refCount: false }));

    newCounterObservable(name: string, initialValue: number): Observable<void> {
        return this.store.pipe(
            switchMap((store) =>
                store.set(uuid(), {
                    name,
                    count: initialValue,
                })
            )
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

    setCounterObservable(id: string, data: CounterType): Observable<void> {
        return this.store.pipe(switchMap((store) => store.set(id, data)));
    }

    deleteCounterObservable(id: string): Observable<boolean> {
        return this.store.pipe(switchMap((store) => store.delete(id)));
    }

    incrementCounterObservable(id: string, step: number): Observable<void> {
        return this.getCounterObservable(id).pipe(
            switchMap((counter) => {
                if (!counter) {
                    throw new Error("Counter not found");
                }
                return this.setCounterObservable(id, {
                    ...counter,
                    count: counter.count + step,
                });
            })
        );
    }

    decrementCounterObservable(id: string, step: number): Observable<void> {
        return this.getCounterObservable(id).pipe(
            switchMap((counter) => {
                if (!counter) {
                    throw new Error("Counter not found");
                }
                return this.setCounterObservable(id, {
                    ...counter,
                    count: counter.count - step,
                });
            })
        );
    }

    resetCounterObservable(id: string): Observable<void> {
        return this.getCounterObservable(id).pipe(
            switchMap((counter) => {
                if (!counter) {
                    throw new Error("Counter not found");
                }
                return this.setCounterObservable(id, {
                    ...counter,
                    count: 0,
                });
            })
        );
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
