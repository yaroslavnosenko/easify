import { PlaceInput } from '@/places/dto/place.input'
import { Place } from '@/places/entities/place.entity'
import { User } from '@/users/entities/user.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PlacesService {
  findAll(): Promise<Place[]> {
    return Place.find()
  }

  findOne(id: string): Promise<Place> {
    return Place.findOneBy({ id })
  }

  async create(userId: string, input: PlaceInput): Promise<Place> {
    const user = await User.findOneBy({ id: userId })
    const place = Place.create({ ...input })
    place.user = user
    return place.save()
  }

  async update(id: string, input: PlaceInput) {
    const place = await Place.findOneBy({ id })
    return Place.create({ ...place, ...input }).save()
  }
}
