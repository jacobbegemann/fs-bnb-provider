import { UserReview } from './user-review.model';
import { Rental } from './rental.model';
import { Message } from './message.model';
import { Trip } from './trip.model';

export class User {

  private id: number;
  private numBookings: number;
  private reviews: Array<UserReview>;
  private bookings: Array<Trip>;
  private saved: Array<Rental>;
  private messages: Array<Message>;
  private photoSource: string;
  private yearJoined: number;

  constructor(private email: string,
    private password: string,
    private firstName: string,
    private lastName: string,
    private birthday: string,
    private phone: string,
    private location: string) {
    this.numBookings = 0;
    this.reviews = new Array();
    this.bookings = new Array();
    this.saved = new Array();
    this.messages = new Array();
    this.photoSource = "assets/631929649c.svg";
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

  setYearJoined(year: number) {
    this.yearJoined = year;
  }

  setPhoto(url: string) { this.photoSource = url; }

  setNumBookings(num: number) { this.numBookings = num; }

  setId(num: number) { this.id = num; }

  getPassword() { return this.password; }

  getFirstName() { return this.firstName; }

  getLastName() { return this.lastName; }

  getBirthday() { return this.birthday; }

  getPhone() { return this.phone; }

  getYearJoined() { return this.yearJoined; }

  getPhotoSource() { return this.photoSource; }

  getNumBookings() { return this.numBookings; }

  getLocation() { return this.location; }

  getReviews() { return this.reviews; }

  getBookings() { return this.bookings; }

  getSaved() { return this.saved; }

  getMessages() { return this.messages; }

  getEmail() { return this.email; }

  getId() { return this.id; }

}