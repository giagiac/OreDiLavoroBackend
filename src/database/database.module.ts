import { Module } from '@nestjs/common';
import { appDataSourceProvider } from './database.providers';
import { DatabaseSeederService } from './database-seeder.service';
import { UserSeedModule } from './seeds/relational/user/user-seed.module';
import { RoleSeedModule } from './seeds/relational/role/role-seed.module';
import { StatusSeedModule } from './seeds/relational/status/status-seed.module';

@Module({
  imports: [StatusSeedModule, RoleSeedModule, UserSeedModule], // <--- Importa il modulo che esporta UserSeedService
  providers: [appDataSourceProvider, DatabaseSeederService],
  exports: [appDataSourceProvider, DatabaseSeederService],
})
export class DatabaseModule {}