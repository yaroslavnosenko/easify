import { PlacesResolver } from '@/places/places.resolver'
import { PlacesService } from '@/places/places.service'
import { Module } from '@nestjs/common'

@Module({
  providers: [PlacesResolver, PlacesService],
})
export class PlacesModule {}
