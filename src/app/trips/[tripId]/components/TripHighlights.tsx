import { Trip } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

export const TripHighlights = ({ trip }: { trip: Trip }) => {
  return (
    <div className="container mb-10 mt-5 w-full px-5 ">
      <h3 className="mb-2 text-lg font-semibold text-primaryDarker lg:hidden">
        Destaques
      </h3>
      <ul className="grid grid-flow-row-dense grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[10px] lg:max-w-4xl">
        {trip.highlights.map((item) => {
          return (
            <li
              className="flex items-center gap-2"
              key={`${item} ${trip.name}`}
            >
              <Image src="/check-icon.png" alt="" width={15} height={15} />
              <p>{item}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
