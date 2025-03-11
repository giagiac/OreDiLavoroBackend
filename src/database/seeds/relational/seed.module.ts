import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource, DataSourceOptions } from 'typeorm';
import { OracleConnectionOptions } from 'typeorm/driver/oracle/OracleConnectionOptions';
import appConfig from '../../../config/app.config';
import databaseConfig from '../../config/database.config';
import { TypeOrmConfigService } from '../../typeorm-config.service';
import { ArticoliCostiCfSeedModule } from './articoliCostiCf/articoliCostiCf-seed.module';
import { ArticoliCostiCfCommSeedModule } from './articoliCostiCfComm/articoliCostiCfComm-seed.module';
import { RoleSeedModule } from './role/role-seed.module';
import { StatusSeedModule } from './status/status-seed.module';
import { UserSeedModule } from './user/user-seed.module';

@Module({
  imports: [
    RoleSeedModule,
    StatusSeedModule,
    UserSeedModule,
    ArticoliCostiCfSeedModule,
    ArticoliCostiCfCommSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource({
          ...options,
          sid: 'db',
        } as OracleConnectionOptions).initialize();
      },
    }),
  ],
})
export class SeedModule {}
