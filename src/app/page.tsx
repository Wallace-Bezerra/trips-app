import { QuickSearch } from './components/QuickSearch'
import { RecommendedTrips } from './components/RecommendedTrips'
import { TripSearch } from './components/TripSearch'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between pt-[106px]">
      <TripSearch />
      <QuickSearch />
      <RecommendedTrips />
    </main>
  )
}
