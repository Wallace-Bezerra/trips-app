interface TripDescriptionProps {
  description: string
}

export const TripDescription = ({ description }: TripDescriptionProps) => {
  return (
    <div className="container mb-5 w-full px-5">
      <h3 className="mb-2 text-lg font-semibold text-primaryDarker">
        Sobre a Viagem
      </h3>
      <p className="text-sm font-normal leading-relaxed text-primaryDarker">
        {description}
      </p>
    </div>
  )
}
