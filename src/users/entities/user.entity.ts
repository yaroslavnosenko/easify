import { BasicEntity } from '@/database/basic.entity'
import { Place } from '@/places/entities/place.entity'
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Column, Entity, OneToMany } from 'typeorm'

export enum UserRole {
  user = 'user',
  admin = 'admin',
  moderator = 'moderator',
}

registerEnumType(UserRole, {
  name: 'UserRole',
})

@Entity()
@ObjectType()
export class User extends BasicEntity {
  @Field(() => UserRole)
  @Column({ enum: UserRole })
  role: UserRole

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
  @OneToMany(() => Place, (place) => place.owner)
  places: Place[]
}
