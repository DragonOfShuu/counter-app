import { Component, computed, inject, input, signal } from "@angular/core";
import { CounterInterfaceService } from "../../services/counter-interface-service/counter-interface-service";
import {
    catchError,
    delay,
    filter,
    finalize,
    map,
    merge,
    Observable,
    of,
    Subscription,
    switchMap,
    tap,
} from "rxjs";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import {
    vibrate,
    impactFeedback,
    notificationFeedback,
    selectionFeedback,
} from "@tauri-apps/plugin-haptics";

@Component({
    selector: "app-counter",
    imports: [],
    templateUrl: "./counter.html",
    styleUrl: "./counter.css",
})
export class Counter {
    counterInterface = inject(CounterInterfaceService);
    counterId = input<string>();
    stepModifier = input<number | undefined>();
    counterId$ = toObservable(this.counterId);

    counterData$: Observable<CounterType | null> = merge(
        this.counterInterface.counterChangeSubject.pipe(
            filter((id) => id === this.counterId())
        ),
        this.counterId$
    ).pipe(
        filter((id) => !!id),
        switchMap((id) => this.counterInterface.getCounter(id!)),
        // tap((data) => console.log("Fetched counter data: ", data)),
        catchError((e) => {
            // console.error("Issue occurred when fetching counter data:", e);
            return of(null);
        })
    );

    counterData = toSignal<CounterType | null>(this.counterData$, {
        initialValue: null,
    });

    counterValueDepth = signal<CounterIncrementDepth>(null);

    counterIncrement$ = new Observable<CounterIncrementDepth>((subscriber) => {
        this.counterValueDepth.set("increment");
        vibrate(1);
        subscriber.next("increment");
    }).pipe(
        delay(500),
        tap(() => {
            this.counterValueDepth.set("decrement");
            impactFeedback("medium");
        }),
        delay(1000),
        tap(() => {
            this.counterValueDepth.set("reset");
            vibrate(3);
        }),
        delay(500),
        tap(() => {
            this.counterValueDepth.set(null);
            impactFeedback("rigid");
        }),
        finalize(() => {
            if (this.counterValueDepth() === "reset") {
                this.reset();
            } else if (this.counterValueDepth() === "decrement") {
                this.decrement();
            } else if (this.counterValueDepth() === "increment") {
                this.increment();
            }
            this.counterValueDepth.set(null);
        })
    );

    counterIncrementSubscription: null | Subscription = null;

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

    reset() {
        const id = this.counterId();
        if (!id) return;
        this.counterInterface.resetCounter(id).subscribe();
    }

    onPress() {
        if (this.counterIncrementSubscription) return;
        this.counterIncrementSubscription = this.counterIncrement$.subscribe();
    }

    onRelease() {
        this.counterIncrementSubscription?.unsubscribe();
        this.counterIncrementSubscription = null;
    }
}
