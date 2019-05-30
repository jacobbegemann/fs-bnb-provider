import { User } from './user.model';

export class Rental {

  public id: number;

  constructor(private name: string, 
    private location: string,
    private pictureSources: Array<string>,
    private host: User,
    private price: string) {}

    getLocation() { return this.location; }

    getPictureSources() { return this.pictureSources; }

    getCoverPhoto() { return this.pictureSources[0]; }

    getHost() { return this.host; }

    getPrice() { return this.price; }

    getName() { return this.name; }

    getEmail() { return this.host.getEmail(); }
}