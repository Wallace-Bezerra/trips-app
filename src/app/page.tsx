import { QuickSearch } from './components/QuickSearch'
import { RecommendedTrips } from './components/RecommendedTrips'
import { TripSearch } from './components/TripSearch'

export default function Home() {
  return (
    <main className="container mx-auto mb-[100px] flex flex-col items-center justify-between">
      <TripSearch />
      <QuickSearch />
      <RecommendedTrips />
    </main>
  )
}
