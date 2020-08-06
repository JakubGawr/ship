import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER, USER_TOKEN } from '@ship-game/backend/schema';
import { from, Observable } from 'rxjs';
import { UserLoginDTO } from '@ship-game/backend/validation';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER_TOKEN) private readonly user: Model<USER>) {
  }

  loginUser(user: UserLoginDTO): Observable<UserLoginDTO>{
   const newUser = new this.user(user);
   return from(newUser.save());
  }
}
