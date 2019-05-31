import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Rental } from '../models/rental.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public listings: Array<Rental>;

  constructor(private navctrl: NavController,
    private dataService: DataService) {
      this.listings = dataService.getData().peekUser().getListings();
    }

  newListing() {
    this.navctrl.navigateForward('new');
  }

  goToDetails() {
    this.navctrl.navigateForward('rental');
  }

}
