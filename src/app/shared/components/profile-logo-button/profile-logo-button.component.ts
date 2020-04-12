import { UserData } from 'src/app/shared/models/auth.model';
import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';

@Component({
  selector: 'app-profile-logo-button',
  templateUrl: './profile-logo-button.component.html',
  styleUrls: ['./profile-logo-button.component.scss'],
})
export class ProfileLogoButtonComponent implements OnInit {

  @Input() slot: string;
  @Input() user: UserData;
  currentPopover: any;

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() {}

  async handleButtonClick(clickEvent: any) {
    this.currentPopover = await this.popoverController.create({
      component: ProfileMenuComponent,
      componentProps: {
        displayName: this.user.displayName,
        email: this.user.email,
        reference: this
      },
      event: clickEvent,
      translucent: true
    });
    return await this.currentPopover.present();
  }

  async dismissPopover() {
    if (this.currentPopover) {
      await this.currentPopover.dismiss();
      this.currentPopover = null;
    }
  }
}
