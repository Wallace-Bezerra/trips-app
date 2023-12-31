import TripMap from './Maps/TripMap'

interface TripLocationProps {
  address: string
  description: string
  descriptionLocation: string
}
export const TripLocation = ({
  address,
  description,
  descriptionLocation,
}: TripLocationProps) => {
  return (
    <div className="container mb-10 w-full px-5 md:gap-10 lg:flex lg:justify-between">
      <div className="w-full lg:max-w-2xl">
        <h3 className="mb-5 text-lg font-semibold text-primaryDarker">
          Localização
        </h3>
        <TripMap address={address} />
      </div>
      <div className="lg:w-1/2">
        <h3 className="mb-3 mt-5 text-lg font-semibold text-primaryDarker lg:mt-0">
          {address}
        </h3>
        <p>{descriptionLocation}</p>
      </div>
    </div>
  )
}
