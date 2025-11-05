import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class DynamicColorsService {
    #currentColor: string = "#467979";

    constructor() {
        document.documentElement.classList.add("color-dynamic");
        document.documentElement.style.setProperty(
            "--color-dynamic",
            this.#currentColor
        );
    }

    changeGlobalColors(color: string): void {
        this.#currentColor = color;
        document.documentElement.style.setProperty(
            "--color-dynamic",
            this.#currentColor
        );
    }

    getCurrentColor(): string {
        return this.#currentColor;
    }
}
