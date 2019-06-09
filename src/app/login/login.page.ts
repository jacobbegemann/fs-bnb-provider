import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private navctrl: NavController, 
    private dataService: DataService) {}

  ngOnInit() {}

  async doLogin() {
    const email = (<HTMLInputElement>document.getElementById('email-field')).value;
    const password = (<HTMLInputElement>document.getElementById('password-field')).value;
    const emailIsEmpty: boolean = email.length === 0;
    const passWordIsEmpty: boolean = password.length === 0;
    const valid: boolean = await this.dataService.getData().validate(email, password);
    if (emailIsEmpty || passWordIsEmpty || !valid) {
      this.navctrl.navigateForward('');
      document.getElementById('warning').setAttribute("style", "visibility: visible;");
    } else {
      this.navctrl.navigateForward('/tabs/tab1');
    }
  }

}
