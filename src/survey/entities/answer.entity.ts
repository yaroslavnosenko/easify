import { BasicEntity } from '@/database/basic.entity'
import { Place } from '@/places/entities/place.entity'
import { Question } from '@/survey/entities/question.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity()
@ObjectType()
export class Answer extends BasicEntity {
  @ManyToOne(() => Place, (place) => place.answers, { nullable: false })
  place: Promise<Place>

  @Field(() => Question)
  @ManyToOne(() => Question, (question) => question.answers, {
    nullable: false,
  })
  question: Promise<Question>

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  points: number

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  pendingPoints: number
}
