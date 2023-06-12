import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './user/event.module';
import { UserModule } from './user/user.module';
import { HobbiesController } from './hobbies/controller/hobbies.controller';
import { HobbiesService } from './hobbies/service/HobbiesService';
import { hobbiesModule } from './hobbies/hobbies.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './user/service/AuthGuard';
import { AuthService } from './user/service/AuthService';




@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/socialnetworks'),
    UserModule,
    EventModule,
    hobbiesModule,
   
  ],
  controllers: [AppController],
  providers: [AppService,AuthService,{
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
})
export class AppModule {}
