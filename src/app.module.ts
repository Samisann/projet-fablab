import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HobbiesController } from './hobbies/controller/hobbies.controller';
import { HobbiesService } from './hobbies/service/HobbiesService';
import { hobbiesModule } from './hobbies/hobbies.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/socialnetworks'),
    UserModule,
    hobbiesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
