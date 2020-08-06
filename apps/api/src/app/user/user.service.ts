import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER, USER_TOKEN } from '@ship-game/backend/schema';
import { from, Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER_TOKEN) private readonly user: Model<USER>) {
  }

  loginUser({name}: any): Observable<USER>{
   const newUser = new this.user({ name });
   return from(newUser.save());
  }
}
