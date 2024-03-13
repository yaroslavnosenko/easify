import { BasicEntity } from '@/database/basic.entity'
import { Answer } from '@/survey/entities/answer.entity'
import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany } from 'typeorm'

@Entity()
@ObjectType()
export class Question extends BasicEntity {
  @Field(() => String)
  @Column()
  name: string

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Promise<Answer[]>
}
