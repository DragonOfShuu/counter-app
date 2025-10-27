import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { CounterViewerPage } from "./counter-viewer-page/counter-viewer-page/counter-viewer-page";

export const routes: Routes = [
    {
        path: "",
        component: CounterViewerPage,
    },
];
