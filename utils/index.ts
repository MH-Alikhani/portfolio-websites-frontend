import { CarProps, FilterProps } from "@/types"

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters

  const headers: HeadersInit = {
    "X-RapidAPI-Key": process.env.RAPIDAPI_KEY || "",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  }

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    {
      headers: headers,
    }
  )

  const result = await response.json()

  return result
}

export const generateCarImageUrl = (car: CarProps, angle?: string): string => {
  const { make, year, model } = car
  const url = new URL("https://cdn.imagin.studio/getimage")

  url.searchParams.append("customer", "img")
  url.searchParams.append("make", make)
  url.searchParams.append("modelFamily", model.split(" ")[0])
  url.searchParams.append("modelyear", year.toString())
  url.searchParams.append("zoomType", "fullscreen")

  if (angle) {
    url.searchParams.append("angle", angle)
  }

  return url.toString()
}

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.set(type, value)
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`

  return newPathname
}

export const calculateCarRent = (city_mpg: number, year: number): string => {
  const BASE_PRICE_PER_DAY = 50
  const MILEAGE_FACTOR = 0.15
  const AGE_DEPRECIATION_RATE = 0.02
  const DEMAND_MULTIPLIER = 1.2

  const currentYear = new Date().getFullYear()
  const carAge = currentYear - year

  const mileageRateAdjustment = Math.max(25 - city_mpg, 0) * MILEAGE_FACTOR

  const depreciation = carAge * AGE_DEPRECIATION_RATE * BASE_PRICE_PER_DAY

  const demandFactor = year > currentYear - 5 ? DEMAND_MULTIPLIER : 1

  const rentalRatePerDay =
    (BASE_PRICE_PER_DAY - depreciation + mileageRateAdjustment) * demandFactor

  return Math.max(rentalRatePerDay, 20).toFixed(0)
}
