import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './entities/event.model';
import { EventService } from './service/EventService';
import { EventController } from './controller/event/event.controller';
import { Hobbies, HobbiesSchema } from 'src/hobbies/entities/hobbies.model';

@Module({
    imports: [   MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    MongooseModule.forFeature([{ name: Hobbies.name, schema: HobbiesSchema }])
  ],
    providers:[EventService],
    controllers: [EventController],
})
export class EventModule {}
