import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { User } from '../models/user.model';
import { ServerUserObject } from '../models/serverUserObject.model';

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

  async doRegistration() {
    const newUser = new ServerUserObject();
    newUser.password = (<HTMLInputElement>document.getElementById('pw')).value;
    newUser.email = (<HTMLInputElement>document.getElementById('eml')).value;
    newUser.firstName = (<HTMLInputElement>document.getElementById('fn')).value;
    newUser.lastName = (<HTMLInputElement>document.getElementById('ln')).value;
    newUser.birthday = (<HTMLInputElement>document.getElementById('bday')).value;
    newUser.phone = (<HTMLInputElement>document.getElementById('tel')).value;
    newUser.location = "Earth";
    newUser.reviews = '[]';
    newUser.bookings = '[]';
    newUser.saved = '[]';
    newUser.messages = '[]';
    newUser.photoSource = '';
    const success: boolean = await this.data.getData().addUser(newUser);
    if (success) {
      this.navctrl.navigateForward('/tabs/tab4');
    }
  }

}
