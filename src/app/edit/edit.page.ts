import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ServerRentalObject } from '../models/serverRentalObject.model';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  public counter: number = 0;
  public uploadArray = [this.counter];
  public publishDone: boolean = false;
  public found: boolean = true;
  public id: number;
  private pictureSources: Array<string>;
  private pictureIndex = 0;

  constructor(private navctrl: NavController,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private alert: AlertController) {
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
    this.activatedRoute.queryParamMap.subscribe(
      (data: any) => {
        this.find(data.params.rentalID);
        this.id = data.params.rentalID;
      }
    );
  }

  async publish(id: number) {
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
          newRental.pictureSources += `${dataUri}@`;
        }
      }
    }
    newRental.hostID = parseInt(localStorage.getItem("id"));
    newRental.id = id;
    const success: boolean = await this.dataService.getData().updateRental(newRental);
    if (success) {
      this.publishDone = true;
    }
  }

  async delete() {
    const alert = await this.alert.create({header: 'Careful',
    subHeader: 'You have chosen to delete this listing.',
    message: 'Are you sure you want to delete this listing?',
    buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Yes',
          handler: () => {
            this.dataService.getData().deleteRental(this.id);
            this.navctrl.navigateForward('tabs/tab1');
          }
        }
      ]
    });
    await alert.present();
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

  async find(rentalID: number) {
    this.dataService.getData().getRental(rentalID).then((value) => {
      this.found = true;
      (<HTMLInputElement>document.getElementById('lcn')).setAttribute("value", value.getLocation());
      this.pictureSources = value.getPictureSources();
      this.addPhoto(this.pictureSources[this.pictureIndex]);
      this.pictureIndex++;
      (<HTMLInputElement>document.getElementById('dsc')).setAttribute("value", value.getName());
      (<HTMLInputElement>document.getElementById('prc')).setAttribute("value", value.getPrice());
    }, (onreject) => {
      this.found = false;
    });
  }

  addPhoto(src: string) {
    if (src) {
      const dataTransfer = new DataTransfer();
      console.log(src);
      dataTransfer.items.add(new File([src], `Upload ${(this.pictureIndex + 1).toString()}`));
      const list = dataTransfer.files;
      (<HTMLInputElement>document.getElementById(
        this.uploadArray[this.uploadArray.length - 1].toString())
      ).files = list;
      this.handleFiles();
    }
  }

  addNext() {
    if (this.pictureIndex < this.pictureSources.length
      && this.pictureIndex != 0) {
      this.addPhoto(this.pictureSources[this.pictureIndex]);
    }
  }

}

