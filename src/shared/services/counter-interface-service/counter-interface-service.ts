import { inject, Injectable } from "@angular/core";
import { CounterManagerService } from "../counter-manager-service/counter-manager-service";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class CounterInterfaceService {
    counterManagerService = inject(CounterManagerService);

    newCounter(id: string, initialValue: number): Promise<void> {
        return firstValueFrom(
            this.counterManagerService.newCounterObservable(id, initialValue)
        );
    }

    incrementCounter(id: string, step: number): Promise<void> {
        return firstValueFrom(
            this.counterManagerService.incrementCounterObservable(id, step)
        );
    }

    decrementCounter(id: string, step: number): Promise<void> {
        return firstValueFrom(
            this.counterManagerService.decrementCounterObservable(id, step)
        );
    }

    getCounterValue(id: string): Promise<number> {
        return firstValueFrom(
            this.counterManagerService.getCounterValueObservable(id)
        );
    }

    getCounter(id: string): Promise<CounterType> {
        return firstValueFrom(
            this.counterManagerService.getCounterObservable(id)
        );
    }

    getCounterIds(): Promise<string[]> {
        return firstValueFrom(
            this.counterManagerService.getCounterIdsObservable()
        );
    }

    deleteCounter(id: string): Promise<boolean> {
        return firstValueFrom(
            this.counterManagerService.deleteCounterObservable(id)
        );
    }

    resetCounter(id: string): Promise<void> {
        return firstValueFrom(
            this.counterManagerService.resetCounterObservable(id)
        );
    }
}
