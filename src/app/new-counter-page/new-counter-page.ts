import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { hexToHsv } from "../../shared/functions/colors.function";
import { RouterLink } from "@angular/router";
import { DynamicColorsService } from "../../shared/services/dynamic-colors-service/dynamic-colors-service";

@Component({
    selector: "app-new-counter-page",
    imports: [ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: "./new-counter-page.html",
    styleUrl: "./new-counter-page.css",
})
export class NewCounterPage {
    dynamicColorService = inject(DynamicColorsService);
    newCounterForm = new FormGroup({
        name: new FormControl(""),
        color: new FormControl(this.dynamicColorService.getCurrentColor()),
        initialValue: new FormControl(0),
        defaultStep: new FormControl(1),
    });

    constructor() {
        this.newCounterForm.get("color")?.valueChanges.subscribe((color) => {
            if (!color) return;
            this.dynamicColorService.changeGlobalColors(color);
        });
    }

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
