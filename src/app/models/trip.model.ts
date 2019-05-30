import { Rental } from './rental.model';

export class Trip {

  constructor(private dates: string,
    private rental: Rental) {
  }

  getRental() { return this.rental; }

}