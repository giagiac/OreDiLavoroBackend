import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { OracleConnectionOptions } from 'typeorm/driver/oracle/OracleConnectionOptions';
import { AuthAppleModule } from './auth-apple/auth-apple.module';
import appleConfig from './auth-apple/config/apple.config';
import { AuthFacebookModule } from './auth-facebook/auth-facebook.module';
import facebookConfig from './auth-facebook/config/facebook.config';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import googleConfig from './auth-google/config/google.config';
import { AuthTwitterModule } from './auth-twitter/auth-twitter.module';
import twitterConfig from './auth-twitter/config/twitter.config';
import { AuthModule } from './auth/auth.module';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
import { AllConfigType } from './config/config.type';
import databaseConfig from './database/config/database.config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import fileConfig from './files/config/file.config';
import { FilesModule } from './files/files.module';
import { HomeModule } from './home/home.module';
import mailConfig from './mail/config/mail.config';
import { MailModule } from './mail/mail.module';
import { MailerModule } from './mailer/mailer.module';
import { SessionModule } from './session/session.module';
import { UsersModule } from './users/users.module';

// <database-block>
const infrastructureDatabaseModule = TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource({
          ...options,
          sid: 'db',
        } as OracleConnectionOptions).initialize();
      },
    });
// </database-block>

import { ArticoliCostiCfCommModule } from './articoli-costi-cf-comm/articoli-costi-cf-comm.module';

import { CfCommsModule } from './cf-comms/cf-comm.module';

import { CfModule } from './cfs/cf.module';

import { ArticoliCostiCfsModule } from './articoli-costi-cf/articoli-costi-cf.module';

import { ArtAnaModule } from './art-ana/art-ana.module';

import { ArtCostiModule } from './art-costi/art-costi.module';

import { TipiCostiArtsModule } from './tipi-costi-art/tipi-costi-art.module';

import { OrpEffCicliEsecsModule } from './orp-eff-cicli-esecs/orp-eff-cicli-esecs.module';

import { OrpEffCiclisModule } from './orp-eff-ciclis/orp-eff-ciclis.module';

import { LinkOrpOrdsModule } from './link-orp-ords/link-orp-ords.module';

import { OrdCliRighesModule } from './ord-cli-righes/ord-cli-righes.module';

import { OrpEffsModule } from './orp-effs/orp-effs.module';

import { X1TrasCodicisModule } from './x1-tras-codicis/x1-tras-codicis.module';

import { EpsNestjsOrpEffCicliEsecsModule } from './eps-nestjs-orp-eff-cicli-esecs/eps-nestjs-orp-eff-cicli-esecs.module';

import { OperatorisModule } from './operatoris/operatoris.module';

import { EpsNestjsTargaMezzisModule } from './eps-nestjs-targa-mezzis/eps-nestjs-targa-mezzis.module';

import { OrdCliTrasModule } from './ord-cli-tras/ord-cli-tras.module';

import { AppReq3HypServsModule } from './app-req3-hyp-servs/app-req3-hyp-servs.module';

import { HypServReq2Module } from './hyp-serv-req2/hyp-serv-eq2.module';

import { ScheduleTasksModule } from './schedule-tasks/schedule-tasks.module';

import { EpsNestjsDestinazionisModule } from './eps-nestjs-destinazionis/eps-nestjs-destinazionis.module';

import { OrdClisModule } from './ord-clis/ord-clis.module';

import { DatabaseSeederService } from './database/database-seeder.service';
import { EpsNestjsOrpEffCicliEsecChildrenModule } from './eps-nestjs-orp-eff-cicli-esec-children/eps-nestjs-orp-eff-cicli-esec-children.module';
import { DatabaseModule } from './database/database.module';
import { UserSeedModule } from './database/seeds/relational/user/user-seed.module';

@Module({
  imports: [
    EpsNestjsOrpEffCicliEsecChildrenModule,
    OrdClisModule,
    EpsNestjsDestinazionisModule,
    ScheduleTasksModule,
    AppReq3HypServsModule,
    HypServReq2Module,
    OrdCliTrasModule,
    EpsNestjsTargaMezzisModule,
    OperatorisModule,
    EpsNestjsOrpEffCicliEsecsModule,
    X1TrasCodicisModule,
    OrpEffsModule,
    OrdCliRighesModule,
    LinkOrpOrdsModule,
    OrpEffCiclisModule,
    OrpEffCicliEsecsModule,
    TipiCostiArtsModule,
    ArtCostiModule,
    ArtAnaModule,
    ArticoliCostiCfsModule,
    CfModule,
    CfCommsModule,
    ArticoliCostiCfCommModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig, mailConfig, fileConfig, facebookConfig, googleConfig, twitterConfig, appleConfig],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    AuthFacebookModule,
    AuthGoogleModule,
    AuthTwitterModule,
    AuthAppleModule,
    SessionModule,
    MailModule,
    MailerModule,
    HomeModule,
    DatabaseModule,
    UserSeedModule
  ],
  // providers: [
  //   DatabaseSeederService, // Aggiungi il servizio qui
  //   // ... altri provider
  // ],
})
export class AppModule {}
