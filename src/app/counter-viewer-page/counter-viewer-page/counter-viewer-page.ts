import { Component } from "@angular/core";
import { Counter } from "../../../shared/components/counter/counter";
import { FooterBar } from "../../../shared/components/footer-bar/footer-bar";

@Component({
    selector: "app-counter-viewer-page",
    imports: [Counter, FooterBar],
    templateUrl: "./counter-viewer-page.html",
    styleUrl: "./counter-viewer-page.css",
})
export class CounterViewerPage {}
