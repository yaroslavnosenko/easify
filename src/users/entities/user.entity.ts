import { Place } from '@/places/entities/place.entity'
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

export enum UserType {
  user = 'user',
  admin = 'admin',
  moderator = 'moderator',
}

registerEnumType(UserType, {
  name: 'UserType',
})

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => UserType)
  @Column({ enum: UserType })
  type: UserType

  @Field(() => String)
  @Column()
  email: string

  @Field(() => String)
  @Column()
  firstName: string

  @Field(() => String)
  @Column()
  lastName: string

  @Field(() => [Place])
  @OneToMany(() => Place, (place) => place.user)
  places: Place[]
}
