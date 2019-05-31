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

  doLogin() {
    const username = (<HTMLInputElement>document.getElementById('username-field')).value;
    const password = (<HTMLInputElement>document.getElementById('password-field')).value;
    const usernameIsEmpty: boolean = username.length === 0;
    const passWordIsEmpty: boolean = password.length === 0;
    if (usernameIsEmpty || passWordIsEmpty || !this.dataService.getData().validate(username, password)) {
      this.navctrl.navigateForward('');
      document.getElementById('warning').setAttribute("style", "visibility: visible;");
    } else {
      this.navctrl.navigateForward('/tabs/tab1');
    }
  }

}
