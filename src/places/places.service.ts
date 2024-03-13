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

  findOne(id: string): Promise<Place> {
    return Place.findOneBy({ id })
  }

  findAllByLocation(input: LocationInput): Promise<Place[]> {
    console.log(input)
    return Place.find()
  }

  async create(userId: string, input: PlaceInput): Promise<Place> {
    const user = await User.findOneBy({ id: userId })
    const {
      location: { lat, lng },
      ...other
    } = input
    const place = Place.create({
      ...other,
      location: { type: 'Point', coordinates: [lat, lng] },
    })
    place.owner = Promise.resolve(user)
    return place.save()
  }

  async update(id: string, input: PlaceInput): Promise<Place> {
    const place = await Place.findOneBy({ id })
    const {
      location: { lat, lng },
      ...other
    } = input
    return Place.create({
      ...place,
      ...other,
      location: { type: 'Point', coordinates: [lat, lng] },
    }).save()
  }
}
