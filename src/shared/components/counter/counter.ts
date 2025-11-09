import { Component, computed, inject, input } from "@angular/core";
import { CounterInterfaceService } from "../../services/counter-interface-service/counter-interface-service";
import {
    catchError,
    filter,
    map,
    merge,
    Observable,
    of,
    switchMap,
    tap,
} from "rxjs";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "app-counter",
    imports: [],
    templateUrl: "./counter.html",
    styleUrl: "./counter.css",
})
export class Counter {
    counterInterface = inject(CounterInterfaceService);
    counterId = input<string>();
    counterId$ = toObservable(this.counterId);

    counterData$: Observable<CounterType | null> = merge(
        this.counterInterface.counterChangeSubject.pipe(
            filter((id) => id === this.counterId())
        ),
        this.counterId$
    ).pipe(
        filter((id) => {
            console.log("Attempting to filter, id is: ", id);
            return !!id;
        }),
        switchMap((id) => this.counterInterface.getCounter(id!)),
        tap((data) => console.log("Fetched counter data: ", data)),
        catchError((e) => {
            console.error("Issue occurred when fetching counter data:", e);
            return of(null);
        })
    );

    counterData = toSignal<CounterType | null>(this.counterData$, {
        initialValue: null,
    });

    increment() {
        const id = this.counterId();
        if (!id) return;
        this.counterInterface.incrementCounter(id).subscribe();
    }

    decrement() {
        const id = this.counterId();
        if (!id) return;
        this.counterInterface.decrementCounter(id).subscribe();
    }
}
