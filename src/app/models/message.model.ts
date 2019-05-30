import { User } from './user.model';

export class Message {

  constructor(private sender: User,
     private receiver: User,
     private text: string,
     private time: string) {
  }

  getSender() { return this.sender; }

  getReceiver() { return this.receiver; }

  getText() { return this.text; }

  getTime() { return this.time; }

}