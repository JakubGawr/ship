import { Injectable } from '@nestjs/common';
import { Message } from '@ship-game/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
