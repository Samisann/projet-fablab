import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.model';
import { UserController } from './controller/user.controller';
import { UserService } from './service/UserService';
import { EventController } from './controller/event/event.controller';
import { PasswordResetService } from './service/password-reset.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers:[UserService, PasswordResetService],
    exports: [UserService, PasswordResetService],
    controllers: [UserController,EventController],
})
export class UserModule {}
