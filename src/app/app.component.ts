import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
// import { invoke } from "@tauri-apps/api/core";
import { TitleBar } from "../shared/components/title-bar/title-bar";
import { FooterBar } from "../shared/components/footer-bar/footer-bar";

@Component({
    selector: "app-root",
    imports: [RouterOutlet, TitleBar],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
})
export class AppComponent {}
