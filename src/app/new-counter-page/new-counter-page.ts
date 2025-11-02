import { CommonModule } from "@angular/common";
import { Component, model } from "@angular/core";
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from "@angular/forms";

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
    });

    onSubmit() {}
}
