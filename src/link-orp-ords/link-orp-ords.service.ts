import { OrdCliRighesService } from '../ord-cli-righes/ord-cli-righes.service';
import { OrdCliRighe } from '../ord-cli-righes/domain/ord-cli-righe';

import { OrpEffCiclisService } from '../orp-eff-ciclis/orp-eff-ciclis.service';
import { OrpEffCicli } from '../orp-eff-ciclis/domain/orp-eff-cicli';

import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { CreateLinkOrpOrdDto } from './dto/create-link-orp-ord.dto';
import { UpdateLinkOrpOrdDto } from './dto/update-link-orp-ord.dto';
import { LinkOrpOrdRepository } from './infrastructure/persistence/link-orp-ord.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { LinkOrpOrd } from './domain/link-orp-ord';

@Injectable()
export class LinkOrpOrdsService {
  constructor(
    private readonly ordCliRigheService: OrdCliRighesService,

    private readonly orpEffCicliService: OrpEffCiclisService,

    // Dependencies here
    private readonly linkOrpOrdRepository: LinkOrpOrdRepository,
  ) {}

  async create(createLinkOrpOrdDto: CreateLinkOrpOrdDto) {
    // Do not remove comment below.
    // <creating-property />
    let ordCliRighe: OrdCliRighe | null | undefined = undefined;

    if (createLinkOrpOrdDto.ordCliRighe) {
      const ordCliRigheObject = await this.ordCliRigheService.findById(
        createLinkOrpOrdDto.ordCliRighe.id,
      );
      if (!ordCliRigheObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            ordCliRighe: 'notExists',
          },
        });
      }
      ordCliRighe = ordCliRigheObject;
    } else if (createLinkOrpOrdDto.ordCliRighe === null) {
      ordCliRighe = null;
    }

    const linkOrpOrd: OrpEffCicli | undefined = undefined;

    // if (createLinkOrpOrdDto.linkOrpOrd) {
    //   const linkOrpOrdObject = await this.orpEffCicliService.findById(
    //     createLinkOrpOrdDto.linkOrpOrd.ORP_EFF_DOC_ID,
    //   );
    //   if (!linkOrpOrdObject) {
    //     throw new UnprocessableEntityException({
    //       status: HttpStatus.UNPROCESSABLE_ENTITY,
    //       errors: {
    //         linkOrpOrd: 'notExists',
    //       },
    //     });
    //   }
    //   linkOrpOrd = linkOrpOrdObject;
    // }

    return this.linkOrpOrdRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      ordCliRighe,

      linkOrpOrd,

      // ORP_EFF_DOC_ID: createLinkOrpOrdDto.ORP_EFF_DOC_ID,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.linkOrpOrdRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(ORP_EFF_DOC_ID: LinkOrpOrd['ORP_EFF_DOC_ID']) {
    return this.linkOrpOrdRepository.findById(ORP_EFF_DOC_ID);
  }

  findByIds(ids: LinkOrpOrd['ORP_EFF_DOC_ID'][]) {
    return this.linkOrpOrdRepository.findByIds(ids);
  }

  async update(
    ORP_EFF_DOC_ID: LinkOrpOrd['ORP_EFF_DOC_ID'],

    updateLinkOrpOrdDto: UpdateLinkOrpOrdDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let ordCliRighe: OrdCliRighe | null | undefined = undefined;

    if (updateLinkOrpOrdDto.ordCliRighe) {
      const ordCliRigheObject = await this.ordCliRigheService.findById(
        updateLinkOrpOrdDto.ordCliRighe.id,
      );
      if (!ordCliRigheObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            ordCliRighe: 'notExists',
          },
        });
      }
      ordCliRighe = ordCliRigheObject;
    } else if (updateLinkOrpOrdDto.ordCliRighe === null) {
      ordCliRighe = null;
    }

    const linkOrpOrd: OrpEffCicli | undefined = undefined;

    // if (updateLinkOrpOrdDto.linkOrpOrd) {
    //   const linkOrpOrdObject = await this.orpEffCicliService.findById(
    //     updateLinkOrpOrdDto.linkOrpOrd.ORP_EFF_DOC_ID,
    //   );
    //   if (!linkOrpOrdObject) {
    //     throw new UnprocessableEntityException({
    //       status: HttpStatus.UNPROCESSABLE_ENTITY,
    //       errors: {
    //         linkOrpOrd: 'notExists',
    //       },
    //     });
    //   }
    //   linkOrpOrd = linkOrpOrdObject;
    // }

    return this.linkOrpOrdRepository.update(ORP_EFF_DOC_ID, {
      // Do not remove comment below.
      // <updating-property-payload />
      ordCliRighe,

      linkOrpOrd,

      ORP_EFF_DOC_ID: updateLinkOrpOrdDto.ORP_EFF_DOC_ID,
    });
  }

  remove(ORP_EFF_DOC_ID: LinkOrpOrd['ORP_EFF_DOC_ID']) {
    return this.linkOrpOrdRepository.remove(ORP_EFF_DOC_ID);
  }
}
