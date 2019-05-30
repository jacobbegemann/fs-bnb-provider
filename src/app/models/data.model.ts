import { User } from './user.model';
import { Rental } from './rental.model';
import { UserReview } from './user-review.model';
import { Message } from './message.model';
import { Trip } from './trip.model';

export class Data {

  private users: Array<User>;
  private rentals: Array<Rental>;
  private rentalID: number = 0;

  constructor() {
    this.users = new Array();
    this.rentals = new Array();
    this.addDummyData();
  }

  peekUser(): User {
    return this.users[this.users.length - 1];
  }

  addUser(user: User) {
    this.users.push(user);
  }

  addRental(rental: Rental) {
    rental.id = this.rentalID;
    this.rentals.push(rental);
    this.rentalID++;
  }

  validate(username: string, password: string): boolean {
    let found: boolean = false;
    this.users.forEach((user) => {
      if (user.getUsername() === username && user.getPassword() === password) {
        found = true;
      }
    });
    return found;
  }

  find(username: string) {
    let found: boolean = false;
    this.users.forEach((user) => {
      if (user.getUsername() === username) found = true;
    });
    return found;
  }

  addDummyData() {
    const johnDoe = new User(
      "example", "password", "example@email.com", "John",
      "Doe", "01/01/1900", "1234567890",
      "assets/gettyimages-985138634-612x612.jpg",
      2010, "New York");
    const janeSmith = new User(
      "example", "password", "example@email.com", "Jane",
      "Smith", "01/01/1900", "1234567890",
      "assets/gettyimages-985138634-612x612.jpg",
      2010, "New York"
    );
    const bobDylan = new User(
      "example", "password", "example@email.com", "Bob",
      "Dylan", "01/01/1900", "1234567890",
      "assets/gettyimages-985138634-612x612.jpg",
      2010, "New York"
    );
    this.users.push(johnDoe);
    const sampleReview1 = new UserReview(bobDylan, johnDoe,
       "This host was excellent, very clean and very nice. Definitely recommend!", 5);
    const sampleReview2 = new UserReview(janeSmith, johnDoe,
       "This host pretty good, clean and mostly left you alone. Would recommend!", 4);
    johnDoe.addReview(sampleReview1);
    johnDoe.addReview(sampleReview2);
    const save1 = new Rental(
      "A nice home in suburban MA...",
      "Norwood, Massachusetts",
      ["assets/2L6A5804-HDR-Mail-altrd_1_-_small.webp"],
      janeSmith,
      "$50/night"
    );
    this.addRental(save1);
    johnDoe.saveHome(save1);
    const message1 = new Message(
      janeSmith, johnDoe, "Hello there! Welcome to fs-bnb.", "10:00"
    );
    johnDoe.recieveMessage(message1);
    johnDoe.addBooking(new Trip("March 5-10", save1));
  }

  getRentals() { return this.rentals; }

}