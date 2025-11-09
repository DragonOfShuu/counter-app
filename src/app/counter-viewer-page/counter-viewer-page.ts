import { Component, inject, signal } from "@angular/core";
import { Counter } from "../../shared/components/counter/counter";
import { FooterBar } from "../../shared/components/footer-bar/footer-bar";
import { CounterInterfaceService } from "../../shared/services/counter-interface-service/counter-interface-service";
import { merge, switchMap, tap } from "rxjs";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: "app-counter-viewer-page",
    imports: [Counter, FooterBar],
    templateUrl: "./counter-viewer-page.html",
    styleUrl: "./counter-viewer-page.css",
})
export class CounterViewerPage {
    counterInterfaceService = inject(CounterInterfaceService);
    loading = signal(true);
    counterIds = signal<string[]>([]);
    allCounters$ = merge(
        this.counterInterfaceService.counterChangeSubject.pipe(
            switchMap(() => {
                this.loading.set(true);
                return this.counterInterfaceService.getCounterIds();
            })
        ),
        this.counterInterfaceService.getCounterIds()
    ).pipe(tap(() => this.loading.set(false)));

    constructor() {
        this.allCounters$.subscribe((ids) => {
            this.counterIds.set(ids);
        });
    }
}
