import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './entities/event.model';
import { EventService } from './service/EventService';
import { EventController } from './controller/event/event.controller';
import { Hobbies, HobbiesSchema } from 'src/hobbies/entities/hobbies.model';
import { UserService } from './service/UserService';
import { User, UserSchema } from './entities/user.model';
import { JwtService } from '@nestjs/jwt';
import { RetrieveTokenJwtService } from './service/RetrieveTokenJwt';
import { GeoLocationService } from './service/geolocation.service';

@Module({
    imports: [   MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Hobbies.name, schema: HobbiesSchema }])
  ],
    providers:[EventService, UserService, JwtService,RetrieveTokenJwtService, GeoLocationService],
    controllers: [EventController],
})
export class EventModule {}