import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { CounterViewerPage } from "./counter-viewer-page/counter-viewer-page";
import { NewCounterPage } from "./new-counter-page/new-counter-page";

export const routes: Routes = [
    {
        path: "",
        component: CounterViewerPage,
    },
    {
        path: "newCounter",
        component: NewCounterPage,
    },
];
