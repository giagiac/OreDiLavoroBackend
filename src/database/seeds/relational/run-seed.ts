import { NestFactory } from '@nestjs/core';
import { RoleSeedService } from './role/role-seed.service';
import { SeedModule } from './seed.module';
import { StatusSeedService } from './status/status-seed.service';
import { UserSeedService } from './user/user-seed.service';
import { ArticoliCostiCfSeedService } from './articoliCostiCf/articoliCostiCf-seed.service';
import { ArticoliCostiCfCommSeedService } from './articoliCostiCfComm/articoliCostiCfComm-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(RoleSeedService).run();
  await app.get(StatusSeedService).run();
  await app.get(UserSeedService).run();

  await app.get(ArticoliCostiCfSeedService).run();
  await app.get(ArticoliCostiCfCommSeedService).run();

  await app.close();
};

void runSeed();
