import { UserReview } from './user-review.model';
import { Rental } from './rental.model';
import { Message } from './message.model';
import { Trip } from './trip.model';

export class User {

  private numBookings: number;
  private reviews: Array<UserReview>;
  private bookings: Array<Trip>;
  private saved: Array<Rental>;
  private messages: Array<Message>;

  constructor(private username: string, 
    private password: string,
    private email: string,
    private firstName: string,
    private lastName: string,
    private birthday: string,
    private phone: string,
    private photoSource: string,
    private yearJoined: number,
    private location: string) {
      this.numBookings = 0;
      this.reviews = new Array();
      this.bookings = new Array();
      this.saved = new Array();
      this.messages = new Array();
    }

    addReview(review: UserReview) {
      this.reviews.push(review);
    }

    addBooking(trip: Trip) {
      this.bookings.push(trip);
    }

    saveHome(home: Rental) {
      this.saved.push(home);
    }

    recieveMessage(message: Message) {
      this.messages.push(message);
    }

    setPhoto(url: string) { this.photoSource = url; }

    getUsername() { return this.username; }

    getPassword() { return this.password; }
    
    getFirstName() { return this.firstName; }

    getLastName() { return this.lastName; }

    getBirthday() { return this.birthday; }

    getPhone() { return this.phone; }

    getPhotoSource() { return this.photoSource; }

    getYearJoined() { return this.yearJoined; }

    getNumBookings() { return this.numBookings; }

    getLocation() { return this.location; }

    getReviews() { return this.reviews; }

    getBookings() { return this.bookings; }

    getSaved() { return this.saved; }

    getMessages() { return this.messages; }

    getEmail() { return this.email; }

}