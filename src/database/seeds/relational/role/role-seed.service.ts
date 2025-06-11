import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { RoleEnum } from '../../../../roles/roles.enum';

@Injectable()
export class RoleSeedService {
  constructor(
    @InjectRepository(RoleEntity)
    private repository: Repository<RoleEntity>,
  ) {}

  async run() {
    const countUser = await this.repository.count({
      where: {
        id: RoleEnum.user,
      },
    });

    if (!countUser) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.user,
          name: 'User',
        }),
      );
    }

    const countAdmin = await this.repository.count({
      where: {
        id: RoleEnum.admin,
      },
    });

    if (!countAdmin) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.admin,
          name: 'Admin',
        }),
      );
    }

    const countAutisti = await this.repository.count({
      where: {
        id: RoleEnum.autista,
      },
    });

    if (!countAutisti) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.autista,
          name: 'Autista',
        }),
      );
    }

    const countBadge = await this.repository.count({
      where: {
        id: RoleEnum.badge,
      },
    });

    if (!countBadge) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.badge,
          name: 'Badge',
        }),
      );
    }
  }
}
