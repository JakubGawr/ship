import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDTO } from '@ship-game/backend/validation';

@Controller()
export class UserController {
  constructor(private userService: UserService) {
  }

  @Post('login')
  getUser(
    @Body() name: UserLoginDTO
  ) {
    return this.userService.loginUser(name);
  }

}
