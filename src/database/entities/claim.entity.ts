import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'claim',
})
export class Claim {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__claim',
  })
  id: string;

  @Column({
    name: 'external_id',
    length: '256',
    nullable: true,
  })
  externalId: string;

  @Column({
    type: 'smallint',
  })
  difficulty: number;

  @CreateDateColumn({
    name: 'creation_time',
  })
  creationTime: Date;

  @DeleteDateColumn({
    name: 'deletion_time',
  })
  deletionTime: Date;
}
