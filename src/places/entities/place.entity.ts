import { Answer } from '@/survey/entities/answer.entity'
import { User } from '@/users/entities/user.entity'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
@ObjectType()
export class Place extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => String)
  @Column()
  name: string

  @Field(() => Number)
  @Column({ default: 0 })
  score: number

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.places)
  user: User

  @Field(() => [Answer])
  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[]
}
