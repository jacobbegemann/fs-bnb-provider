import { Rental } from './rental.model';
import { User } from './user.model';

export class RentalReview {

  constructor(private reviewer: User,
    private reviewee: Rental,
    private text: string,
    private rating: number) {}

}