import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './user/event.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/socialnetworks'),
    UserModule,
    EventModule
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
