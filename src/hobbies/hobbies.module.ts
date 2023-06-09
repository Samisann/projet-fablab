
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hobbies, HobbiesSchema } from './entities/hobbies.model';
import { HobbiesController } from './controller/hobbies.controller';
import { HobbiesService } from './service/HobbiesService';
import { RetrieveTokenJwtService } from 'src/user/service/RetrieveTokenJwt';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Hobbies.name, schema: HobbiesSchema }]),
      ],
    providers:[HobbiesService,RetrieveTokenJwtService],
    controllers: [HobbiesController],
})
export class hobbiesModule {}
