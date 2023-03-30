import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.model';
import { UserController } from './controller/user.controller';
import { UserService } from './service/UserService';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers:[UserService],
    controllers: [UserController],
})
export class UserModule {}
