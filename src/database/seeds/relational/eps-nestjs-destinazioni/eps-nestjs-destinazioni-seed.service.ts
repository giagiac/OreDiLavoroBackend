import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EpsNestjsDestinazioniEntity } from '../../../../eps-nestjs-destinazionis/infrastructure/persistence/relational/entities/eps-nestjs-destinazioni.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EpsNestjsDestinazioniSeedService {
  constructor(
    @InjectRepository(EpsNestjsDestinazioniEntity)
    private repository: Repository<EpsNestjsDestinazioniEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    // if (count === 0) {
    //   await this.repository.save(
    //     this.repository.create({
    //       LINK: '|IT|VE|MARGHERA VE|30175|VIA PETROLI 4',
    //       KM: '70.4 km',
    //       RESPONSE: `{"rows":[{"elements":[{"distance":{"text":"70.4 km","value":70363},"duration":{"text":"52 mins","value":3107},"status":"OK"}]}],"originAddresses":["Via dei Piccardi, 47, 34138 Trieste TS, Italy"],"destinationAddresses":["Via della Badia, 4, 33052 Cervignano del Friuli UD, Italy"]}`,
    //       VALUE: 70363,
    //     }),
    //   );
    // }
  }
}
