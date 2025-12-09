import { Component, computed, inject, signal } from "@angular/core";
import { Counter } from "../../shared/components/counter/counter";
import { FooterBar } from "../../shared/components/footer-bar/footer-bar";
import { CounterInterfaceService } from "../../shared/services/counter-interface-service/counter-interface-service";
import { connectable, forkJoin, merge, Observable, switchMap, tap } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { ThreeDots } from "../../shared/components/three-dots/three-dots";

@Component({
    selector: "app-counter-viewer-page",
    imports: [Counter, FooterBar, ThreeDots],
    templateUrl: "./counter-viewer-page.html",
    styleUrl: "./counter-viewer-page.css",
})
export class CounterViewerPage {
    counterInterfaceService = inject(CounterInterfaceService);
    loading = signal(true);
    expandDropdown = signal(false);
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

    deleteCounter(counterId: string) {
        this.counterInterfaceService.deleteCounter(counterId).subscribe(() => {
            // Counter deleted, any additional logic can be added here if needed
        });
    }
}
