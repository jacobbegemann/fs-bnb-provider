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
  }

  async ngOnInit() {
    const activeUser = await this.dataService.getData().activeUser();
    this.listings = await this.dataService.getData().getListings(activeUser);
  }

  newListing() {
    this.navctrl.navigateForward('new');
  }

  goToDetails(rental: Rental) {
    this.navctrl.navigateForward(`rental`, {queryParams: {rentalID: rental.id}});
  }

}
