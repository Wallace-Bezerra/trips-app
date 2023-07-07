import React from 'react'
import Image from 'next/image'
import ReactCountryFlag from 'react-country-flag'
import { Trip } from '@prisma/client'
import Link from 'next/link'

export const TripHeader = ({ trip }: { trip: Trip }) => {
  return (
    <div className="w-full">
      <Image
        className="mb-5 h-[300px] w-full object-cover"
        src={trip.coverImage}
        alt={trip.name}
        width={393}
        height={208}
      />
      <div className="flex flex-col gap-2 px-5">
        <div className="flex items-center gap-3">
          <Link className="w-max transition-all hover:scale-110" href={'/'}>
            <Image src="/back-icon.svg" alt="" width={24} height={24} />
          </Link>
          <h2 className="text-2xl font-semibold text-primaryDarker">
            {trip.name}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <ReactCountryFlag countryCode={trip.countryCode} svg />
          <p className="text-xs font-medium text-grayPrimary underline">
            {trip.location}
          </p>
        </div>
        <p className="text-xs font-normal text-grayPrimary">
          <span className="font-semibold text-primaryLighter">
            R$
            {trip.pricePerDay.toString()}
          </span>{' '}
          por noite
        </p>
      </div>
    </div>
  )
}
