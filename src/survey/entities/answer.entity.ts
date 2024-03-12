import { Place } from '@/places/entities/place.entity'
import { Question } from '@/survey/entities/question.entity'
import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
@ObjectType()
export class Answer extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => Place)
  @ManyToOne(() => Place, (place) => place.answers)
  place: Place

  @Field(() => Question)
  @ManyToOne(() => Question, (question) => question.answers)
  question: Question

  @Field(() => Int)
  @Column()
  points: number
}
