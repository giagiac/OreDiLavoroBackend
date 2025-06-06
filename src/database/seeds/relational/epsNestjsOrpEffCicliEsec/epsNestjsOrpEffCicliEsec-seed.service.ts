import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoTrasferta } from '../../../../eps-nestjs-orp-eff-cicli-esecs/domain/eps-nestjs-orp-eff-cicli-esec';
import { Repository } from 'typeorm';
import { EpsNestjsOrpEffCicliEsecEntity } from '../../../../eps-nestjs-orp-eff-cicli-esecs/infrastructure/persistence/relational/entities/eps-nestjs-orp-eff-cicli-esec.entity';

@Injectable()
export class EpsNestjsOrpEffCicliEsecSeedService {
  constructor(
    @InjectRepository(EpsNestjsOrpEffCicliEsecEntity)
    private repository: Repository<EpsNestjsOrpEffCicliEsecEntity>,
  ) {}

  async run() {
    const countEsec = await this.repository.find({
      where: { DOC_ID: '2024-OP-0004007' },
    });

    console.log(countEsec);

    // if (countEsec.length == 0) {
    //   const currentDate = new Date();
    //   await this.repository.save(
    //     this.repository.create({
    //       TEMPO_MINUTI_OP: 0,
    //       TEMPO_MINUTI_MACC: 0,
    //       NOTE: 'Una mia nota...',
    //       DATA_FINE: currentDate,
    //       DATA_INIZIO: currentDate,
    //       TEMPO_OPERATORE: '1',
    //       TEMPO_MACCHINA: '0',
    //       COD_OP: '0002060315',
    //       COD_ART: 'LA0100001',
    //       DOC_RIGA_ESEC_ID: '2024-OP-0004007\\0002\\001',
    //       DOC_RIGA_ID: '2024-OP-0004007\\0001',
    //       DOC_ID: '2024-OP-0004007',
    //       NUM_RIGA: 1,
    //       AZIENDA_ID: 1,
    //       TIPO_TRASFERTA: 'in_sede',
    //     }),
    //   );
    //   await this.repository.save(
    //     this.repository.create({
    //       TEMPO_MINUTI_OP: 0,
    //       TEMPO_MINUTI_MACC: 0,
    //       NOTE: 'Una mia nota...',
    //       DATA_FINE: currentDate,
    //       DATA_INIZIO: currentDate,
    //       TEMPO_OPERATORE: '2',
    //       TEMPO_MACCHINA: '0',
    //       COD_OP: '0002060315',
    //       COD_ART: 'LA0100001',
    //       DOC_RIGA_ESEC_ID: '2024-OP-0004007\\0002\\002',
    //       DOC_RIGA_ID: '2024-OP-0004007\\0001',
    //       DOC_ID: '2024-OP-0004007',
    //       NUM_RIGA: 2,
    //       AZIENDA_ID: 1,
    //       TIPO_TRASFERTA: 'in_giornata',
    //     }),
    //   );
    // }
  }
}
