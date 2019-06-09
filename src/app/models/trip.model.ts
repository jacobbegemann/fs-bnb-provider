import { Rental } from './rental.model';

export class Trip {

  public name: string;
  public rental: Rental;
  public status: string;
  public id: number;

  constructor(public dateTo: string,
    public dateFrom: string,
    public userId: number,
    public rentalID: number) {
  }

  getUserId() { return this.userId; }

}