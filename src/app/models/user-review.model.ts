import { User } from './user.model';

export class UserReview {

  constructor(private reviewer: User,
    private reviewee: User,
    private text: string,
    private rating: number) {}

}