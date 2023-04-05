import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { PasswordResetService } from './auth/service/password-reset.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/socialnetworks'),
    UserModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, PasswordResetService],
})
export class AppModule {}
