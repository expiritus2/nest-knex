import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nest-knexjs';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDbConfig } from './config/db';

@Module({
    imports: [
        KnexModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getDbConfig,
        }),
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
