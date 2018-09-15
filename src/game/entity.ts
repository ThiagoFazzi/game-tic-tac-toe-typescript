import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsIn} from 'class-validator';

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', { nullable: false })
  name?: string

  @IsString()
  @IsIn(["red", "blue", "green", "yellow", "magenta"])
  @Column('text', { nullable: true })
  color?: string

  @Column('json', { nullable: true })
  board: Array<Array<string>>
}