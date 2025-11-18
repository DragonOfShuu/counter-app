import { Component, computed, inject, signal } from "@angular/core";
import { Counter } from "../../shared/components/counter/counter";
import { FooterBar } from "../../shared/components/footer-bar/footer-bar";
import { CounterInterfaceService } from "../../shared/services/counter-interface-service/counter-interface-service";
import {
    connectable,
    forkJoin,
    map,
    merge,
    Observable,
    switchMap,
    tap,
} from "rxjs";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "app-counter-viewer-page",
    imports: [Counter, FooterBar],
    templateUrl: "./counter-viewer-page.html",
    styleUrl: "./counter-viewer-page.css",
})
export class CounterViewerPage {
    counterInterfaceService = inject(CounterInterfaceService);
    loading = signal(true);
    allCounterIds$ = connectable(
        merge(
            this.counterInterfaceService.counterChangeSubject.pipe(
                switchMap(() => {
                    this.loading.set(true);
                    return this.counterInterfaceService.getCounterIds();
                })
            ),
            this.counterInterfaceService.getCounterIds()
        ).pipe(tap(() => this.loading.set(false)))
    );
    counterIds = toSignal(this.allCounterIds$, { initialValue: [] });
    allCounters$: Observable<{ [id: string]: CounterType }> =
        this.allCounterIds$.pipe(
            switchMap((ids) =>
                forkJoin(
                    ids.reduce((acc, id) => {
                        acc[id] = this.counterInterfaceService.getCounter(id);
                        return acc;
                    }, {} as { [id: string]: Observable<CounterType> })
                )
            )
        );
    allCounters = toSignal(this.allCounters$);

    constructor() {
        this.allCounterIds$.connect();
    }
}
