import { Dispatch, SetStateAction, MouseEventHandler } from "react"

// Interface for props of the home component
export interface IHomeProps {
  searchParams: IFilterProps
}

export interface ICustomButtonProps {
  isDisabled?: boolean
  btnType?: "button" | "submit"
  containerStyles?: string
  textStyles?: string
  title: string
  rightIcon?: string
  handleClick?: MouseEventHandler<HTMLButtonElement>
}

// Interface for the search manufacturer component props
export interface ISearchManufacturerProps {
  manufacturer: string
  setManufacturer: Dispatch<SetStateAction<string | null>>
}

// Interface for car properties
export interface ICarProps {
  city_mpg: number
  class: string
  combinationMpg: number
  cylinders: number
  displacement: number
  drive: string
  fuelType: string
  highwayMpg: number
  make: string
  model: string
  transmission: string
  year: number
}

// Interface for filtering options in car searches
export interface IFilterProps {
  manufacturer: string
  year: number
  fuel: string
  limit: number
  model: string
}

// Interface for option data in dropdowns or selection menus
export interface IOptionProps {
  title: string
  value: string
}

// Interface for a custom filter component
export interface ICustomFilterProps {
  title: string
  options: IOptionProps[]
}

// Interface for "show more" button or pagination controls
export interface IShowMoreProps {
  pageNumber: number
  isNext: boolean
}
