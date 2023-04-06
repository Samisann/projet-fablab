import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HobbiesController } from './hobbies/controller/hobbies.controller';
import { HobbiesService } from './hobbies/service/HobbiesService';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/socialnetworks'),
    UserModule
  ],
  controllers: [AppController, HobbiesController],
  providers: [AppService, HobbiesService],
})
export class AppModule {}
