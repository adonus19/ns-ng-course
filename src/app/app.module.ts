import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";

import { AppComponent } from "./app.component";

// Uncomment and add to NgModule imports if you need to use two-way binding
import { AppRoutingModule } from "./app-routing.module";
import { DayModalComponent } from './challenges/day-modal/day-modal.component';
import { ChallengeActionsModule } from "./challenges/challenge-actions/challenge-actions.module";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule, AppRoutingModule,
        NativeScriptUISideDrawerModule, ChallengeActionsModule,
        NativeScriptHttpClientModule
    ],
    declarations: [
        AppComponent,
        DayModalComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [DayModalComponent]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
