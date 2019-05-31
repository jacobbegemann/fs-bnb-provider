import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  public counter: number = 0;
  public uploadArray = [this.counter];

  constructor(private navctrl: NavController) {
    this.counter++;
  }

  handleFiles() {
    this.uploadArray.push(this.counter);
    this.counter++;
  }

  erase(index: number) {
    this.uploadArray = this.uploadArray.filter((value) => {
      return value != index;
    });
  }

  ngOnInit() {
  }

  async publish() {
    // const location = (<HTMLInputElement>document.getElementById('lcn')).value;
    // const pictures = new Array<string>();
    // this.uploadArray.forEach(async (value) => {
    //   const file: File = (<HTMLInputElement>document.getElementById(value.toString())).files[0];
    //   const data = await this.readFile(file);
    //   const fs = require('fs');
    //   fs.writeFile(`${location}-${value}`, data, function (err: any) {
    //     if (err) throw err;
    //   });
    //   pictures.push();
    // });
    this.navctrl.navigateForward('tabs/tab1');
  }

  readFile(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

}
