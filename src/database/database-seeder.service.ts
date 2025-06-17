// src/database/database-seeder.service.ts
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserSeedService } from './seeds/relational/user/user-seed.service';
import { RoleSeedService } from './seeds/relational/role/role-seed.service';
import { StatusSeedService } from './seeds/relational/status/status-seed.service';

@Injectable()
export class DatabaseSeederService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseSeederService.name);

  // Iniettiamo la connessione al database (DataSource)
  constructor(
    private readonly dataSource: DataSource,
    private readonly statusSeedService: StatusSeedService,
    private readonly roleSeedService: RoleSeedService,
    private readonly userSeedService: UserSeedService,
  ) {}

  async onModuleInit() {
    this.logger.log('Avvio delle migration e del seeding...');
    await this.runMigrations();
    await this.seedDatabase();
    this.logger.log('Migration e seeding completati.');
  }

  async runMigrations() {
    try {
      this.logger.log('Esecuzione delle migration del database...');
      const migrations = await this.dataSource.runMigrations();

      if (migrations.length > 0) {
        this.logger.log('Migration eseguite con successo:');
        migrations.forEach((migration) => {
          this.logger.log(`- ${migration.name}`);
        });
      } else {
        this.logger.log('Il database è già aggiornato. Nessuna migration da eseguire.');
      }
      this.logger.log('Migration eseguite con successo.');
    } catch (error) {
      this.logger.error("Errore durante l'esecuzione delle migration:", error.stack);
      // In un caso reale, potresti voler terminare l'applicazione se le migration falliscono
      process.exit(1);
    }
  }

  async seedDatabase() {
    await this.statusSeedService.run();
    await this.roleSeedService.run();
    await this.userSeedService.run();
  }
}
