import { CommonModule } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { hexToHsv } from "../../shared/functions/colors.function";
import { Router, RouterLink } from "@angular/router";
import { DynamicColorsService } from "../../shared/services/dynamic-colors-service/dynamic-colors-service";
import { CounterInterfaceService } from "../../shared/services/counter-interface-service/counter-interface-service";

@Component({
    selector: "app-new-counter-page",
    imports: [ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: "./new-counter-page.html",
    styleUrl: "./new-counter-page.css",
})
export class NewCounterPage {
    dynamicColorService = inject(DynamicColorsService);
    counterInterfaceService = inject(CounterInterfaceService);
    router = inject(Router);
    color = signal(this.dynamicColorService.getCurrentColor() || "#467979");
    textColor = computed(() => {
        const hsv = this.hexToHsv(this.color());
        return hsv.v > 65 ? "#000" : "#fff";
    });
    newCounterForm = new FormGroup({
        name: new FormControl("", {
            validators: [Validators.maxLength(30), Validators.required],
        }),
        color: new FormControl(this.color()),
        defaultCount: new FormControl(0),
        defaultStep: new FormControl(1),
    });

    constructor() {
        this.newCounterForm.get("color")?.valueChanges.subscribe((color) => {
            if (!color) return;
            this.color.set(color);
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

    onSubmit() {
        console.log("Form submitted:", this.newCounterForm.value);
        const newCounterObservable = this.counterInterfaceService.newCounter({
            name: this.newCounterForm.get("name")?.value || "Unnamed Counter",
            color: this.newCounterForm.get("color")?.value || "#467979",
            defaultCount: this.newCounterForm.get("defaultCount")?.value || 0,
            defaultStep: this.newCounterForm.get("defaultStep")?.value || 1,
        });
        newCounterObservable.subscribe({
            next: (id) => {
                console.log("New counter created with ID:", id);
                this.router.navigate(["/"]);
            },
            error: (err) => {
                console.error("Error creating new counter:", err);
            },
        });
    }
}
