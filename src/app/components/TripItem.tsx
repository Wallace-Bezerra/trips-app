import { Trip } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import ReactCountryFlag from 'react-country-flag'

interface TripItemProps {
  trip: Trip
}
export const TripItem = ({ trip }: TripItemProps) => {
  return (
    <Link href={`/trips/${trip.id}`}>
      <div className="flex flex-col gap-[10px]">
        <Image
          className="h-72 w-72 rounded-2xl object-cover"
          src={trip.coverImage}
          alt=""
          width={1470}
          height={980}
        />

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium text-primaryDarker">
            {trip.name}
          </h3>
          <div className="flex items-center gap-2">
            <ReactCountryFlag countryCode={trip.countryCode} svg />
            <p className="text-xs font-normal text-grayPrimary">
              {trip.location}
            </p>
          </div>
          <p className="text-sm font-normal text-grayPrimary">
            {new Date(trip.startDate).toLocaleDateString()}
          </p>
          <p className="text-xs font-normal text-grayPrimary">
            <span className="font-semibold text-primaryLighter">
              R$
              {trip.pricePerDay.toString()}
            </span>{' '}
            por noite
          </p>
        </div>
      </div>
    </Link>
  )
}
