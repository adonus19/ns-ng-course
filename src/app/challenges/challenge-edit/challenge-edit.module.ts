import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ChallengeEditComponent } from "./challenge-edit.component";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SharedModule } from "~/app/shared/ui/shared.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";

@NgModule({
  declarations: [ChallengeEditComponent],
  imports: [NativeScriptCommonModule, SharedModule,
    //  NativeScriptRouterModule   <--- must be imported if I want to use nsRouterLink, yes double import. Watch video #105
    NativeScriptRouterModule.forChild([{ path: '', component: ChallengeEditComponent }])],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ChallengeEditModule { }