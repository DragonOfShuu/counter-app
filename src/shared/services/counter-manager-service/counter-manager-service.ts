import { Injectable } from "@angular/core";
import { load } from "@tauri-apps/plugin-store";
import { defer, merge, Observable, shareReplay, Subject, switchMap } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class CounterManagerService {
    #counterData = new Subject<CounterCollectionType>();

    store = defer(() => load("counters.json", { defaults: {}, autoSave: true })).pipe(
        shareReplay({ bufferSize: 1, refCount: false })
    );
    counterData = merge(
        this.#counterData,
        this.store.pipe(
            switchMap((store) => store.get<CounterCollectionType>("counters")),
        )
    ).pipe(
        shareReplay({ bufferSize: 1, refCount: false })
    );

    #setCounterData(data: CounterCollectionType) {
        const newSub = this.store.pipe(
            switchMap((store) => store.set("counters", data))
        ).subscribe(() => {
            this.#counterData.next(data);
        });
    }

    // coolFunction() {
    //     this.store.pipe(switchMap((store)=> store.set("counters", { something: "something" }))).subscribe({
    //         next: () => {
    //             console.log("Set successfully");
    //         },
    //         error: (err) => {
    //             console.error("Error setting value:", err);
    //         },

    //     });
    // }

    newCounter(name: string, initialValue: number): Observable<void> {
        return this.store.pipe(
            switchMap((store) =>
                store.set("counters", {
                    ...store.get("counters"),
                    [name]: initialValue,
                })
            )
        );
    }
}
