import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventController } from './event/controller/event.controller';
import { PasswordResetService } from './auth/service/password-reset.service';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/service/UserService';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/socialnetworks'),
    UserModule
  ],
  controllers: [AppController, EventController, AuthController],
  providers: [AppService, UserService, PasswordResetService], 
})
export class AppModule {}
