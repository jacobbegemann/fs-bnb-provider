import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  constructor(private navctrl: NavController) { }

  ngOnInit() {
  }

  publish() {
    this.navctrl.navigateForward('tabs/tab1');
  }

}
