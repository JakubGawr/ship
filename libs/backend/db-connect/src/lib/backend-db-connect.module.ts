import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const CONNECT_DATA = 'mongodb+srv://kuba:123@cluster0.7cb5z.mongodb.net/ships?retryWrites=true&w=majority';

@Module({
  imports: [MongooseModule.forRoot(CONNECT_DATA)
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class BackendDbConnectModule {
}
