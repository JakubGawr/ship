import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_SCHEMA, USER_TOKEN } from '@ship-game/backend/schema';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  imports:[MongooseModule.forFeature([{name: USER_TOKEN, schema: USER_SCHEMA}])],
  providers: [UserService]
})
export class UserModule {}
