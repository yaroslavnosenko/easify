import { BasicEntity } from '@/database/basic.entity'
import { Place } from '@/places/entities/place.entity'
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Column, Entity, OneToMany } from 'typeorm'

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
export class User extends BasicEntity {
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
