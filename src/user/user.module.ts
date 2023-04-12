import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.model';
import { UserController } from './controller/user.controller';
import { UserService } from './service/UserService';
import { PasswordResetService } from 'src/auth/service/password-reset.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers:[UserService, PasswordResetService],
    controllers: [UserController],
})
export class UserModule {}
