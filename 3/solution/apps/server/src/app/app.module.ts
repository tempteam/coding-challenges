import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleController } from './people/people.controller';
import { PeopleService } from './people/people.service';
import { PlanetService } from './planet/planet.service';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 300, // cache duration in seconds
      max: 100,
    }),
  ],
  controllers: [AppController, PeopleController],
  providers: [AppService, PeopleService, PlanetService],
})
export class AppModule {}
