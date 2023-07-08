'use client'
import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

interface TripMapProps {
  address: string
}

const containerStyle = {
  width: '100%',
  height: '100%',
}

function TripMap({ address }: TripMapProps) {
  // eslint-disable-next-line no-undef
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null)

  useEffect(() => {
    const fetchCityCoordinates = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address,
          )}&key=AIzaSyAj70SvmzuJvzUAWQKm9kjLRM_mP8BgwFs`,
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
  console.log(address)
  console.log(center)
  return (
    <div className="h-[400px] w-full">
      <LoadScript googleMapsApiKey="AIzaSyAj70SvmzuJvzUAWQKm9kjLRM_mP8BgwFs">
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
    </div>
  )
}

export default React.memo(TripMap)
