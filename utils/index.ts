import { CarProps, FilterProps } from "@/types"

const API_BASE_URL = "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars"
const DEFAULT_HEADERS = {
  "x-rapidapi-key": process.env.RAPIDAPI_KEY ?? "",
  "x-rapidapi-host": process.env.RAPIDAPI_HOST ?? "",
}

// Utility function to check if API credentials exist
const checkApiCredentials = () => {
  const apiKey = process.env.RAPIDAPI_KEY
  const apiHost = process.env.RAPIDAPI_HOST
  if (!apiKey || !apiHost) {
    throw new Error(
      "Missing API credentials: Ensure RAPIDAPI_KEY and RAPIDAPI_HOST are set in the environment."
    )
  }
  return { apiKey, apiHost }
}

/**
 * Fetch cars based on the provided filters.
 * @param {FilterProps} filters - The car search filters.
 * @returns {Promise<any>} - The API response containing car data.
 */
export async function fetchCars(filters: FilterProps): Promise<any> {
  const { manufacturer, year, model, limit = 10, fuel } = filters

  const { apiKey, apiHost } = checkApiCredentials()

  const headers: Record<string, string> = {
    "x-rapidapi-key": apiKey,
    "x-rapidapi-host": apiHost,
  }

  try {
    const queryParams = new URLSearchParams({
      make: manufacturer ?? "",
      year: year?.toString() ?? "",
      model: model ?? "",
      limit: limit.toString(),
      fuel_type: fuel ?? "",
    })

    const response = await fetch(`${API_BASE_URL}?${queryParams}`, { headers })

    if (!response.ok) {
      throw new Error(`Error fetching cars: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to fetch cars:", error)
    throw error
  }
}

/**
 * Generate the image URL for a specific car.
 * @param {CarProps} car - The car properties (make, model, year).
 * @param {string} [angle] - Optional angle of the car image.
 * @returns {string} - The generated image URL.
 */
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

/**
 * Update the search parameters in the URL.
 * @param {string} type - The parameter type (e.g., 'make', 'model').
 * @param {string} value - The value to set for the parameter.
 * @returns {string} - The updated URL with new search parameters.
 */
export const updateSearchParams = (type: string, value: string): string => {
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.set(type, value)

  return `${window.location.pathname}?${searchParams.toString()}`
}

/**
 * Calculate the rental cost per day for a car based on multiple factors.
 * @param {number} city_mpg - The car's city MPG (fuel efficiency).
 * @param {number} year - The car's manufacturing year.
 * @returns {string} - The calculated rental price per day.
 */
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
