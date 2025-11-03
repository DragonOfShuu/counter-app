import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, computed, model } from "@angular/core";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValueChangeEvent,
} from "@angular/forms";
import { hexToHsv } from "../../shared/functions/colors.function";
import { filter, Observable, switchMap } from "rxjs";

@Component({
    selector: "app-new-counter-page",
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: "./new-counter-page.html",
    styleUrl: "./new-counter-page.css",
})
export class NewCounterPage {
    newCounterForm = new FormGroup({
        name: new FormControl(""),
        color: new FormControl("#ff0000"),
        initialValue: new FormControl(0),
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
