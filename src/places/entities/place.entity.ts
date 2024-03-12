import { BasicEntity } from '@/database/basic.entity'
import { Answer } from '@/survey/entities/answer.entity'
import { User } from '@/users/entities/user.entity'
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, OneToMany, Point } from 'typeorm'

export enum PlaceType {
  food = 'food',
  service = 'service',
  transportation = 'transportation',
  shopping = 'shopping',
}

registerEnumType(PlaceType, {
  name: 'PlaceType',
})

@Entity()
@ObjectType()
export class Place extends BasicEntity {
  @Field(() => String)
  @Column()
  name: string

  @Column('geometry')
  location: Point

  @Field(() => Number)
  @Column({ default: 0 })
  score: number

  @Field(() => PlaceType)
  @Column({ enum: PlaceType })
  type: PlaceType

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.places, { nullable: false })
  user: User

  @Field(() => [Answer])
  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[]
}
