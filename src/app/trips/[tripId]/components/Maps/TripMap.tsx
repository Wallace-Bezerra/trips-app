'use client'
import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import process from 'process'
import Button from '@/app/components/Button'

interface TripMapProps {
  address: string
}

const containerStyle = {
  width: '100%',
  height: '100%',
}

const TripMap = ({ address }: TripMapProps) => {
  // eslint-disable-next-line no-undef
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null)
  const handleOpenGoogleMaps = () => {
    if (center) {
      const { lat, lng } = center
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
      window.open(url, '_blank')
    }
  }
  useEffect(() => {
    const fetchCityCoordinates = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address,
          )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}`,
        )
        if (response.ok) {
          const data = await response.json()
          const { lat, lng } = data.results[0].geometry.location
          setCenter({ lat, lng })
        } else {
          throw new Error('Failed to fetch city coordinates')
        }
      } catch (error) {
        console.error(error)
      }
    }

    if (address) {
      fetchCityCoordinates()
    }
  }, [address])
  return (
    <div className="flex h-[460px] w-full flex-col ">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
        {center && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <Marker position={center} />
          </GoogleMap>
        )}
      </LoadScript>
      <Button onClick={handleOpenGoogleMaps} variant="outlined">
        Ver no Google Maps
      </Button>
    </div>
  )
}

export default React.memo(TripMap)
