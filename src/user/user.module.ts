import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.model';
import { UserController } from './controller/user.controller';
import { UserService } from './service/UserService';
import { EventController } from './controller/event/event.controller';
import { PasswordResetService } from './service/password-reset.service';
import { EventSchema } from './entities/event.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers:[UserService, PasswordResetService],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule {}