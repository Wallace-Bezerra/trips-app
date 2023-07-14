'use client'
import React from 'react'
import Image from 'next/image'
import ReactCountryFlag from 'react-country-flag'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Trip } from '@prisma/client'
import Link from 'next/link'
import { Navigation, Pagination } from 'swiper/modules'
export const TripHeader = ({ trip }: { trip: Trip }) => {
  return (
    <div className="flex w-full flex-col">
      <div className="lg:hidden">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          navigation={true}
          pagination={true}
          modules={[Navigation, Pagination]}
        >
          <SwiperSlide>
            <Image
              className="mb-5 h-[300px] w-full object-cover"
              src={trip.coverImage}
              alt={trip.name}
              width={393}
              height={208}
            />
          </SwiperSlide>
          {trip.imagesUrl.map((image, index) => {
            return (
              <SwiperSlide key={index}>
                <Image
                  className="mb-5 h-[300px] w-full object-cover"
                  src={image}
                  alt={trip.name}
                  width={393}
                  height={208}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
      <div className="mt-10 hidden max-h-[450px] grid-cols-[2fr,1fr,1fr,1fr] grid-rows-2 gap-4 rounded-sm px-5 md:order-2 lg:grid">
        <Image
          className="col-span-2 row-start-1 row-end-3 hidden h-full w-full rounded-xl object-cover lg:flex"
          src={trip.coverImage}
          alt={trip.name}
          width={800}
          quality={100}
          height={420}
        />
        {trip.imagesUrl.map((image, index) => {
          return (
            <Image
              key={index}
              className="hidden h-full w-full rounded-xl object-cover lg:flex"
              src={image}
              alt={trip.name}
              width={400}
              height={200}
            />
          )
        })}
      </div>
      <div className="flex flex-col gap-2 px-5 md:order-1 md:mt-10">
        <div className="flex items-center gap-3">
          <Link className="w-max transition-all hover:scale-110" href={'/'}>
            <Image src="/back-icon.svg" alt="" width={24} height={24} />
          </Link>
          <h2 className="text-2xl font-semibold text-primaryDarker lg:text-3xl">
            {trip.name}
          </h2>
        </div>

        <div className="flex items-center gap-2 lg:gap-5">
          <div className="flex h-5 w-5 items-center lg:h-8 lg:w-8">
            <ReactCountryFlag
              countryCode={trip.countryCode}
              style={{
                width: '100%',
                height: '100%',
              }}
              svg
            />
          </div>
          <p className="text-xs font-medium text-grayPrimary underline lg:text-lg">
            {trip.location}
          </p>
        </div>
        <p className="flex items-center gap-2 text-xs font-normal text-grayPrimary lg:hidden">
          <span className="text-lg font-semibold text-primaryLighter ">
            R$
            {trip.pricePerDay.toString()}
          </span>{' '}
          por noite
        </p>
      </div>
    </div>
  )
}
