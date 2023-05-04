import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Events, EventSchema } from './entities/event.model';
import { EventService } from './service/EventService';
import { EventController } from './controller/event/event.controller';
import { Hobbies, HobbiesSchema } from 'src/hobbies/entities/hobbies.model';
import { UserModule } from './user.module';

@Module({
    imports: [   MongooseModule.forFeature([{ name: Events.name, schema: EventSchema }]),
    MongooseModule.forFeature([{ name: Hobbies.name, schema: HobbiesSchema }]),
    UserModule,
  ],
    providers:[EventService],
    controllers: [EventController],
})
export class EventModule {}
