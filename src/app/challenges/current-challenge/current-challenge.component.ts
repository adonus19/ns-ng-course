import { Component, ViewContainerRef, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { DayModalComponent } from "../day-modal/day-modal.component";
import { UIService } from "~/app/shared/ui.service";
import { ChallengeService } from "../challenge.service";
import { Challenge } from "../challenge.model";

@Component({
  selector: 'ns-current-challenge',
  templateUrl: './current-challenge.component.html',
  styleUrls: ['./_current-challenge.component.scss'],
  moduleId: module.id
})
export class CurrentChallengeComponent implements OnInit, OnDestroy {
  weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  currentChallenge: Challenge;
  private curChallengeSub: Subscription;

  constructor(private router: RouterExtensions, private modalDialog: ModalDialogService,
    private vcRef: ViewContainerRef, private uiService: UIService, private challengeService: ChallengeService) { }

  ngOnInit() {
    this.curChallengeSub = this.challengeService.currentChallenge.subscribe((challenge: Challenge) => {
      this.currentChallenge = challenge;
    });
  }

  ngOnDestroy() {
    if (this.curChallengeSub) {
      this.curChallengeSub.unsubscribe();
    }
  }

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

  getRow(index: number, day: { dayInMonth: number, dayInWeek: number }) {
    const startRow = 1;
    const weekRow = Math.floor(index / 7);
    const firstWeekdayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
    const irregularRow = day.dayInWeek < firstWeekdayOfMonth ? 1 : 0;
    return startRow + weekRow + irregularRow;
  }


}