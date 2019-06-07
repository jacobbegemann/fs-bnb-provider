import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServerRentalObject } from '../models/serverRentalObject.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  public counter: number = 0;
  public uploadArray = [this.counter];
  public publishDone: boolean = false;

  constructor(private navctrl: NavController,
    private dataService: DataService) {
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
    const newRental = new ServerRentalObject();
    newRental.location = (<HTMLInputElement>document.getElementById('lcn')).value;
    newRental.name = (<HTMLInputElement>document.getElementById('dsc')).value;
    newRental.price = parseFloat((<HTMLInputElement>document.getElementById('prc')).value);
    newRental.pictureSources = '';
    for (let i = 0; i < this.uploadArray.length; i++) {
      let value = this.uploadArray[i];
      const file: File = (<HTMLInputElement>document.getElementById(`${value}`)).files[0];
      if (file) {
        const dataUri: string = await this.getImageData(file);
        if (dataUri) {
          newRental.pictureSources += `${dataUri}&`;
        }
      }
    }
    newRental.hostID = parseInt(localStorage.getItem("id"));
    const success: boolean = await this.dataService.getData().addRental(newRental);
    if (success) {
      this.publishDone = true;
    }
  }

  navHome() {
    this.navctrl.navigateForward('tabs/tab1');
  }

  getImageData(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event: any) {
        const dataUri = event.target.result;
        resolve(dataUri);
      };
      reader.onerror = function (event: any) {
        console.error("File could not be read! Code " + event.target.error.code);
        reject(event.target.error.code);
      };
      reader.readAsDataURL(file);
    })
  }

}
