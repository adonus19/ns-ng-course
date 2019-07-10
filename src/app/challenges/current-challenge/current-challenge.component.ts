import { Component, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { DayModalComponent } from "../day-modal/day-modal.component";
import { UIService } from "~/app/shared/ui.service";

@Component({
  selector: 'ns-current-challenge',
  templateUrl: './current-challenge.component.html',
  styleUrls: ['./current-challenge.component.css'],
  moduleId: module.id
})
export class CurrentChallengeComponent {

  constructor(private router: RouterExtensions, private modalDialog: ModalDialogService,
    private vcRef: ViewContainerRef, private uiService: UIService) { }

  onAddChallenge() {
    // this.router.navigate(['/challenges/edit'], { transition: { name: 'slideLeft' } });
  }

  onChangeStatus() {
    this.modalDialog.showModal(DayModalComponent, {
      fullscreen: true, viewContainerRef: this.uiService.getRootVCRef() ? this.uiService.getRootVCRef() : this.vcRef,
      context: { date: new Date() }
    }).then((action: string) => {
      console.log(action);
    });
  }


}