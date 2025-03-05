import {
  // typeorm decorators here
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({ name: 'EPS_NESTJS_FILE' })
export class FileEntity extends EntityRelationalHelper {
  // @PrimaryGeneratedColumn("uuid", {
  //       /**
  //        * Column name in the database.
  //        */
  //       name: "id",
  //       /**
  //        * Name of the primary key constraint.
  //        */
  //       primaryKeyConstraintName: "PK_36b46d232307066b3a2c9ea3a1d"
  // })
  @PrimaryColumn()
  // @Column()
  id: string;

  @Column()
  path: string;
}
