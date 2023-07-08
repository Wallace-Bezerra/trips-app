import Button from '@/app/components/Button'
import TripMap from './Maps/TripMap'

interface TripLocationProps {
  address: string
  description: string
}
export const TripLocation = ({ address, description }: TripLocationProps) => {
  return (
    <div className="container mb-10 w-full px-5">
      <h3 className="mb-5 text-lg font-semibold text-primaryDarker">
        Localização
      </h3>
      <TripMap address={address} />
      <h3 className="mb-3 mt-5 text-lg font-semibold text-primaryDarker">
        {address}
      </h3>
      <p>{description.slice(0, 200)} ...</p>
      <Button variant="outlined">Ver no Google Maps</Button>
    </div>
  )
}