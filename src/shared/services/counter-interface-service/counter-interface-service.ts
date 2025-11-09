import { inject, Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { switchMap, take, tap } from "rxjs/operators";
import { CounterManagerService } from "../counter-manager-service/counter-manager-service";

/**
 * When we introduce the Rust implementation,
 * we can just switch this class and
 * inject a different service.
 */

@Injectable({
    providedIn: "root",
})
export class CounterInterfaceService {
    counterManagerService = inject(CounterManagerService);

    counterChangeSubject = new Subject<string>();

    newCounter(counter: CounterTypeModifiable): Observable<string> {
        return this.counterManagerService.newCounterObservable(counter).pipe(
            take(1),
            tap((id) => {
                this.counterChangeSubject.next(id);
            })
        );
    }

    incrementCounter(id: string, step: number): Observable<void> {
        return this.counterManagerService
            .incrementCounterObservable(id, step)
            .pipe(
                take(1),
                tap(() => {
                    this.counterChangeSubject.next(id);
                })
            );
    }

    decrementCounter(id: string, step: number): Observable<void> {
        return this.counterManagerService
            .decrementCounterObservable(id, step)
            .pipe(
                take(1),
                tap(() => {
                    this.counterChangeSubject.next(id);
                })
            );
    }

    updateCounter(
        id: string,
        dataConsumer: (counter: CounterType) => Partial<CounterTypeModifiable>
    ): Observable<void> {
        return this.counterManagerService
            .updateCounterObservable(id, dataConsumer)
            .pipe(
                take(1),
                tap(() => {
                    this.counterChangeSubject.next(id);
                })
            );
    }

    getCounterValue(id: string): Observable<number> {
        return this.counterManagerService.getCounterValueObservable(id).pipe(
            take(1),
            tap(() => {
                this.counterChangeSubject.next(id);
            })
        );
    }

    getCounter(id: string): Observable<CounterType> {
        return this.counterManagerService.getCounterObservable(id).pipe(
            take(1),
            tap(() => {
                this.counterChangeSubject.next(id);
            })
        );
    }

    getCounterIds(): Observable<string[]> {
        return this.counterManagerService.getCounterIdsObservable().pipe(
            take(1),
            tap(() => {
                // no specific id to emit here — tap kept for consistency
            })
        );
    }

    deleteCounter(id: string): Observable<boolean> {
        return this.counterManagerService.deleteCounterObservable(id).pipe(
            take(1),
            tap(() => {
                this.counterChangeSubject.next(id);
            })
        );
    }

    resetCounter(id: string): Observable<void> {
        return this.counterManagerService.resetCounterObservable(id).pipe(
            take(1),
            tap(() => {
                this.counterChangeSubject.next(id);
            })
        );
    }
}
