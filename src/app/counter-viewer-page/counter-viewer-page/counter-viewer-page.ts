import { Component } from "@angular/core";
import { Counter } from "../../../shared/components/counter/counter";

@Component({
    selector: "app-counter-viewer-page",
    imports: [Counter],
    templateUrl: "./counter-viewer-page.html",
    styleUrl: "./counter-viewer-page.css",
})
export class CounterViewerPage {}
