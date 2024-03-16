import { LocationInput } from '@/places/dto/location.type'
import { PlaceInput } from '@/places/dto/place.input'
import { Place } from '@/places/entities/place.entity'
import { User } from '@/users/entities/user.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PlacesService {
  findAll(): Promise<Place[]> {
    return Place.find()
  }

  findOne(id: string): Promise<Place | null> {
    return Place.findOneBy({ id })
  }

  findAllByLocation(input: LocationInput): Promise<Place[]> {
    console.log(input)
    return Place.find()
  }

  async create(userId: string, input: PlaceInput): Promise<string> {
    const user = await User.findOneByOrFail({ id: userId })
    const {
      location: { lat, lng },
      ...other
    } = input
    const place = Place.create({
      ...other,
      location: { type: 'Point', coordinates: [lat, lng] },
    })
    place.owner = Promise.resolve(user)
    const { id } = await place.save()
    return id
  }

  async update(id: string, input: PlaceInput): Promise<string> {
    const place = await Place.findOneBy({ id })
    const {
      location: { lat, lng },
      ...other
    } = input
    await Place.create({
      ...place,
      ...other,
      location: { type: 'Point', coordinates: [lat, lng] },
    }).save()
    return id
  }
}
