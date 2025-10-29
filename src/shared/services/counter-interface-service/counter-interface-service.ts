import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { CounterManagerService } from "../counter-manager-service/counter-manager-service";

/**
 * When we introduce the Rust implementation,
 * we can just switch this class and
 * inject a different service that implements the same interface.
 */

@Injectable({
    providedIn: "root",
})
export class CounterInterfaceService {
    counterManagerService = inject(CounterManagerService);

    newCounter(counter: CounterType): Observable<string> {
        return this.counterManagerService
            .newCounterObservable(counter)
            .pipe(take(1));
    }

    incrementCounter(id: string, step: number): Observable<void> {
        return this.counterManagerService
            .incrementCounterObservable(id, step)
            .pipe(take(1));
    }

    decrementCounter(id: string, step: number): Observable<void> {
        return this.counterManagerService
            .decrementCounterObservable(id, step)
            .pipe(take(1));
    }

    updateCounter(
        id: string,
        dataConsumer: (counter: CounterType) => Partial<CounterTypeModifiable>
    ): Observable<void> {
        return this.counterManagerService
            .updateCounterObservable(id, dataConsumer)
            .pipe(take(1));
    }

    getCounterValue(id: string): Observable<number> {
        return this.counterManagerService
            .getCounterValueObservable(id)
            .pipe(take(1));
    }

    getCounter(id: string): Observable<CounterType> {
        return this.counterManagerService
            .getCounterObservable(id)
            .pipe(take(1));
    }

    getCounterIds(): Observable<string[]> {
        return this.counterManagerService
            .getCounterIdsObservable()
            .pipe(take(1));
    }

    deleteCounter(id: string): Observable<boolean> {
        return this.counterManagerService
            .deleteCounterObservable(id)
            .pipe(take(1));
    }

    resetCounter(id: string): Observable<void> {
        return this.counterManagerService
            .resetCounterObservable(id)
            .pipe(take(1));
    }
}
