import { User } from './user.model';
import { Rental } from './rental.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UserReview } from './user-review.model';
import { Message } from './message.model';
import { Trip } from './trip.model';
import { ServerUserObject } from './serverUserObject.model';
import { AuthenticationResponse } from './authentication-response.model';
import { ServerRentalObject } from './serverRentalObject.model';

export class Data {

  private rentalID: number = 0;

  constructor(private client: HttpClient) { }

  activeUser(): Promise<User> {
    const token: string = localStorage.getItem("token");
    const id: string = localStorage.getItem("id");
    const headers = {
      'Authorization': token
    }
    const options = {
      headers: headers
    }
    return new Promise((resolve, reject) => {
      this.client.get(`http://localhost:3000/users/${id}`, options)
        .subscribe((response: ServerUserObject) => {
          const clientUserObject = new User(response.email,
            response.password,
            response.firstName,
            response.lastName,
            response.birthday,
            response.phone,
            response.location);
          this.addFieldsNotRequiredUser(response, clientUserObject);
          resolve(clientUserObject);
        },
          (err: HttpErrorResponse) => {
            console.log('Backend returned status code: ', err.status);
            reject(err);
          })
    });
  }

  getRental(id: number): Promise<Rental> {
    return new Promise((resolve, reject) => {
      this.client.get(`http://localhost:3000/properties/${id}`)
        .subscribe((response: ServerRentalObject) => {
          const rental = new Rental(
            response.name,
            response.location,
            response.pictureSources.split('@'),
            response.hostID,
            response.price.toString()
          );
          rental.id = response.id;
          resolve(rental);
        },
          (err: HttpErrorResponse) => {
            console.log('Backend returned status code: ', err.status);
            reject(err);
          });
    })
  }

  getUserByIdUnproteted(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      this.client.get(`http://localhost:3000/users/unprotected/${id}`)
        .subscribe((response: ServerUserObject) => {
          resolve(new User(
            response.email,
            response.password,
            response.firstName,
            response.lastName,
            response.birthday,
            response.phone,
            response.location
          ));
        },
          (err: HttpErrorResponse) => {
            console.log('Backend returned status code: ', err.status);
            reject(err.status);
          }
        )
    })
  }

  addUser(user: ServerUserObject): Promise<boolean> {
    return new Promise((resolve) => {
      this.client.post(`http://localhost:3000/users`, user)
        .subscribe((response: AuthenticationResponse) => {
          localStorage.setItem("id", response.id.toString());
          localStorage.setItem("token", response.token);
          resolve(true);
        },
          (err: HttpErrorResponse) => {
            console.log('Backend returned status code: ', err.status);
            resolve(false);
          })
    });
  }

  getListings(user: User): Promise<Array<Rental>> {
    return new Promise((resolve, reject) => {
      this.client.get(`http://localhost:3000/properties/byHost/${user.getId()}`)
        .subscribe((response: Array<ServerRentalObject>) => {
          const array: Array<Rental> = new Array();
          for (let i = 0; i < response.length; i++) {
            const curr = response[i];
            const rental = new Rental(
              curr.name,
              curr.location,
              curr.pictureSources.split('@'),
              curr.hostID,
              curr.price.toString()
            );
            rental.id = curr.id;
            array.push(rental);
          }
          resolve(array);
        },
          (err: HttpErrorResponse) => {
            console.log('Backend returned status code: ', err.status);
            reject(err.status);
          }
        )
    });
  }

  addRental(rental: ServerRentalObject): Promise<boolean> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {
      headers: httpHeaders,
    }
    return new Promise((resolve) => {
      this.client.post(`http://localhost:3000/properties`, rental, options)
        .subscribe((response) => {
          resolve(true);
        },
          (err: HttpErrorResponse) => {
            console.log(err);
            resolve(false);
          });
    });
  }

  validate(email: string, password: string): Promise<boolean> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {
      headers: httpHeaders,
    }
    return new Promise((resolve) => {
      this.client.post(
        'http://localhost:3000/users/authentication',
        { email: email, password: password },
        options
      ).subscribe((response: AuthenticationResponse) => {
        localStorage.setItem("id", response.id.toString());
        localStorage.setItem("token", response.token);
        resolve(true);
      },
        (err: HttpErrorResponse) => {
          console.log('Backend returned status code: ', err.status);
          resolve(false);
        });
    })
  }

  addFieldsNotRequiredUser(serverResponseObject: ServerUserObject,
    clientUserObject: User) {
    const id: number = serverResponseObject.id;
    const numBookings: number = serverResponseObject.numBookings;
    const reviews: string = serverResponseObject.reviews;
    const bookings: string = serverResponseObject.bookings;
    const saved: string = serverResponseObject.saved;
    const messages: string = serverResponseObject.messages;
    const photo: string = serverResponseObject.photoSource;
    const yearJoined: number = serverResponseObject.yearJoined;
    if (numBookings) {
      clientUserObject.setNumBookings(numBookings);
    }
    if (reviews) {
      const array: Array<UserReview> = JSON.parse(reviews);
      array.forEach((value) => clientUserObject.addReview(value));
    }
    if (bookings) {
      const array: Array<Trip> = JSON.parse(bookings);
      array.forEach((value) => clientUserObject.addBooking(value));
    }
    if (saved) {
      const array: Array<Rental> = JSON.parse(saved);
      array.forEach((value) => clientUserObject.saveHome(value));
    }
    if (messages) {
      const array: Array<Message> = JSON.parse(saved);
      array.forEach((value) => clientUserObject.recieveMessage(value));
    }
    if (photo) clientUserObject.setPhoto(photo);
    if (yearJoined) clientUserObject.setYearJoined(yearJoined);
    if (id) clientUserObject.setId(id);
  }

}