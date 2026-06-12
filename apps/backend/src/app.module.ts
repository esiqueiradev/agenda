import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CompaniesModule } from './modules/companies/companies.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        url: config.get<string>('databaseUrl'),
        // NEVER change this to true
        synchronize: false,
        migrations: [__dirname + '/database/migrations/*{.js,.ts}'],
        migrationsRun: false,
        migrationsTableName: 'migrations',
        migrationsTransactionMode: 'all',
      }),
      inject: [ConfigService],
    }),
    CompaniesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
