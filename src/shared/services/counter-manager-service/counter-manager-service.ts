import { computed, Injectable, resource, signal } from '@angular/core';
import { load } from '@tauri-apps/plugin-store';

@Injectable({
  providedIn: 'root'
})
export class CounterManagerService {
    // store = await load("counters.json", { autoSave: true });
    
    storeResource = resource({
        loader: async () => {
            const store = await load("counters.json", { defaults: {}, autoSave: true });
            const counterData = await store.get<CounterCollectionType>("counters");
            return {store, counterData};
        }
    })

    // counterValueResource = resource({
    //     params: () => ({store: this.storeResource}),
    //     loader: async ({params}) => {
    //         let { store: newStoreResource } = params;
    //         if (!newStoreResource.hasValue()) return {};

    //         const store = newStoreResource.value();
    //         return store.get<CounterCollectionType>("counters") || {};
    //     }
    // })

    // counterValue = computed<CounterCollectionType>(() => {
    //     if (!this.storeResource.hasValue()) return {};

    //     const store = this.storeResource.value();
    //     return store.g
    // });
    
}
