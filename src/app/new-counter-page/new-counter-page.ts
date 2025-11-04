import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { hexToHsv } from "../../shared/functions/colors.function";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-new-counter-page",
    imports: [ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: "./new-counter-page.html",
    styleUrl: "./new-counter-page.css",
})
export class NewCounterPage {
    newCounterForm = new FormGroup({
        name: new FormControl(""),
        color: new FormControl("#467979"),
        initialValue: new FormControl(0),
        defaultStep: new FormControl(1),
    });

    hexToHsv(hex: string | null | undefined): {
        h: number;
        s: number;
        v: number;
    } {
        if (!hex) {
            return { h: 0, s: 100, v: 100 };
        }
        this.newCounterForm.get("color");
        return hexToHsv(hex);
    }

    onSubmit() {}
}
