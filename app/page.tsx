import { fetchCars } from "@/utils"
import { IHomeProps } from "@/types"
import { fuels, yearsOfProduction } from "@/constants"
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components"

export default async function Home({ searchParams }: IHomeProps) {
  const {
    manufacturer = "",
    year = 2024,
    fuel = "",
    limit = 12,
    model = "",
  } = searchParams

  const allCars = await fetchCars({ manufacturer, year, fuel, limit, model })

  if (!Array.isArray(allCars) || allCars.length < 1) {
    return (
      <main className='overflow-hidden'>
        <Hero />
        <div className='mt-12 padding-x padding-y max-width'>
          <div className='home__text-container'>
            <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
            <p>Explore the cars you might like</p>
          </div>
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>No Result</h2>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar />

          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
        </div>

        <section>
          <div className='home__cars-wrapper'>
            {allCars.map((car, index) => (
              <CarCard
                car={car}
                key={car.id || `${car.model}-${car.fuel}-${index}`}
              />
            ))}
          </div>

          <ShowMore pageNumber={limit / 10} isNext={limit < allCars.length} />
        </section>
      </div>
    </main>
  )
}
