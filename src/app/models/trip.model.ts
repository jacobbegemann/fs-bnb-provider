import { Rental } from './rental.model';

export class Trip {

  public name: string;
  public rental: Rental;
  public status: string;

  constructor(public dateTo: string,
    public dateFrom: string,
    public userId: number,
    public rentalID: number) {
  }

  getUserId() { return this.userId; }

}