import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private navctrl: NavController, private data: DataService) { 

  }

  ngOnInit() {
  }

  doRegistration() { 
    const firstName: string = (<HTMLInputElement>document.getElementById('fn')).value;
    const lastName: string = (<HTMLInputElement>document.getElementById('ln')).value;
    const email: string = (<HTMLInputElement>document.getElementById('eml')).value;
    const phone: string = (<HTMLInputElement>document.getElementById('tel')).value;
    const username: string = (<HTMLInputElement>document.getElementById('usn')).value;
    const password: string = (<HTMLInputElement>document.getElementById('pw')).value;
    const birthday: string = (<HTMLInputElement>document.getElementById('bday')).value;
    const taken: boolean = this.data.getData().find(username);
    if (!taken) {
      this.data.getData().addUser(new User(
        username, 
        password,
        email, 
        firstName, 
        lastName,
        birthday, 
        phone, 
        "assets/631929649c.svg", 
        (new Date()).getFullYear(),
        "United States"
      ));
      this.navctrl.navigateForward('/tabs/tab4');
    }
  }

}
