import { Component, computed, inject, input } from "@angular/core";
import { CounterInterfaceService } from "../../services/counter-interface-service/counter-interface-service";
import { catchError, Observable, of } from "rxjs";

@Component({
    selector: "app-counter",
    imports: [],
    templateUrl: "./counter.html",
    styleUrl: "./counter.css",
})
export class Counter {
    counterInterface = inject(CounterInterfaceService);
    counterId = input<string>();

    // counterData = this.counterInterface.getCounter(this.counterId).pipe();

    counterData = computed(() => {
        const id = this.counterId();
        if (!id) {
            return of(null);
        }
        return this.counterInterface.getCounter(id).pipe(
            catchError((e) => {
                console.error("Issue occurred when fetching counter data:", e);
                return of(null);
            })
        );
    });

    // counterValue = computed(() => {
    //     const data = this.counterData();
    //     return data ? data.count : 0;
    // });
}
