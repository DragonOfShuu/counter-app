import { Component, computed, inject, input } from "@angular/core";
import { CounterInterfaceService } from "../../services/counter-interface-service/counter-interface-service";
import {
    catchError,
    filter,
    iif,
    merge,
    mergeMap,
    Observable,
    of,
    switchMap,
} from "rxjs";
import { toObservable } from "@angular/core/rxjs-interop";

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
        filter((id) => !!id),
        switchMap((id) => this.counterInterface.getCounter(id!)),
        catchError((e) => {
            console.error("Issue occurred when fetching counter data:", e);
            return of(null);
        })
    );
}
