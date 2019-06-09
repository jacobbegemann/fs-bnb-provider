import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Trip } from '../models/trip.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public bookings: Array<Trip>;

  constructor(private dataService: DataService,
    private alert: AlertController) { }

  async ngOnInit() {
    this.bookings = await this.dataService.getData()
      .getBookingRequests(parseInt(localStorage.getItem('id')));
    this.bookings.forEach(async (value: any) => {
      const user = await this.dataService.getData().getUserByIdUnproteted(value.userID);
      value.name = `${user.getFirstName()} ${user.getLastName()}`;
      const rental = await this.dataService.getData().getRental(value.rentalID);
      value.rental = rental;
    });
  }

  async accept(trip: Trip) {
    const alert = await this.alert.create({
      header: 'Accept',
      subHeader: 'You have chosen to accept this request.',
      message: 'Are you sure you want accept this request?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Yes',
          handler: () => {
            trip.status = "ACCEPTED";
            this.dataService.getData().patchTrip(trip);
          }
        }
      ]
    });
    await alert.present();
  }

  async reject(trip: Trip) {
    const alert = await this.alert.create({
      header: 'Reject',
      subHeader: 'You have chosen to reject this request.',
      message: 'Are you sure you want reject this request?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Yes',
          handler: () => {
            trip.status = "REJECTED";
            this.dataService.getData().patchTrip(trip);
          }
        }
      ]
    });
    await alert.present();
  }

}
