import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.model';
import { UserController } from './controller/user.controller';
import { UserService } from './service/UserService';
import { EventController } from './controller/event/event.controller';
import { PasswordResetService } from './service/password-reset.service';
import { EventSchema } from './entities/event.model';
import { JwtModule } from '@nestjs/jwt';
import { Constants } from 'src/utils/constant';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/AuthService';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './service/AuthGuard';
import { RetrieveTokenJwtService } from './service/RetrieveTokenJwt';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            global: true,
            secret: Constants.secret,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers:[UserService, PasswordResetService,AuthService,RetrieveTokenJwtService],
    exports: [UserService],
    controllers: [UserController,AuthController],
})
export class UserModule {}