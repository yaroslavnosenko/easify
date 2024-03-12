import { BasicEntity } from '@/database/basic.entity'
import { Place } from '@/places/entities/place.entity'
import { Question } from '@/survey/entities/question.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity()
@ObjectType()
export class Answer extends BasicEntity {
  @Field(() => Place)
  @ManyToOne(() => Place, (place) => place.answers, { nullable: false })
  place: Place

  @Field(() => Question)
  @ManyToOne(() => Question, (question) => question.answers, {
    nullable: false,
  })
  question: Question

  @Field(() => Int)
  @Column()
  points: number
}
