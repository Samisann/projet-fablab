import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.model';
import { UserController } from './controller/user.controller';
import { UserService } from './service/UserService';
<<<<<<< HEAD
import { EventController } from './controller/event/event.controller';
=======
import { PasswordResetService } from './service/password-reset.service';
>>>>>>> 1351ea5 (feat(Password forgot and updated in the database))

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers:[UserService, PasswordResetService],
    controllers: [UserController],
})
export class UserModule {}
