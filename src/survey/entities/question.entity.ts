import { Answer } from '@/survey/entities/answer.entity'
import { Field, ObjectType } from '@nestjs/graphql'
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
@ObjectType()
export class Question extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => String)
  @Column()
  name: string

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[]
}
