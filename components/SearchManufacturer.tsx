"use client"

import Image from "next/image"
import { Fragment, useState, useMemo } from "react"
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react"

import { manufacturers } from "@/constants"
import { ISearchManufacturerProps } from "@/types"

/**
 * Debounces a function call by the specified delay.
 * This prevents the function from being called too frequently.
 *
 * @param func - The function to debounce
 * @param delay - Delay in milliseconds before executing the function
 * @returns A debounced function
 */
const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

/**
 * SearchManufacturer component allows users to search and select car manufacturers
 * from a predefined list using a debounced search input.
 *
 * @param {SearchManufacturerProps} props - Component props
 * @param {string} props.manufacturer - Selected manufacturer
 * @param {function} props.setManufacturer - Function to update the selected manufacturer
 * @returns JSX.Element
 */
const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: ISearchManufacturerProps) => {
  const [query, setQuery] = useState("")

  /**
   * Filters the manufacturers list based on the user's query.
   * The query is normalized to ignore case and whitespace.
   */
  const filteredManufacturers = useMemo(() => {
    if (!query.trim()) return manufacturers

    const lowercasedQuery = query.toLowerCase().replace(/\s+/g, "")
    return manufacturers.filter((item) =>
      item.toLowerCase().replace(/\s+/g, "").includes(lowercasedQuery)
    )
  }, [query])

  /**
   * Handles input changes with a 300ms debounce to improve performance
   * and avoid making too many updates in real-time.
   */
  const handleInputChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value)
    },
    300
  )

  return (
    <div className='search-manufacturer'>
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className='relative w-full'>
          {/* Combobox button with a car logo image */}
          <ComboboxButton className='absolute inset-y-0 left-0 flex items-center pl-4'>
            <Image src='/car-logo.svg' width={20} height={20} alt='Car logo' />
          </ComboboxButton>

          {/* Input for searching manufacturers */}
          <ComboboxInput
            className='search-manufacturer__input pl-12'
            displayValue={(item: string) => item}
            onChange={handleInputChange}
            placeholder='Search manufacturer...'
            autoComplete='off'
          />

          {/* Dropdown options with transition */}
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery("")} // Reset query after closing the options
          >
            <ComboboxOptions className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10'>
              {filteredManufacturers.length === 0 && query !== "" ? (
                <div className='search-manufacturer__option px-4 py-2 text-gray-500'>
                  No results found
                </div>
              ) : (
                filteredManufacturers.map((item) => (
                  <ComboboxOption
                    key={item}
                    className={({ active }) =>
                      `relative cursor-pointer select-none search-manufacturer__option ${
                        active ? "bg-slate-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item}
                        </span>
                        {/* Optional icon or indicator for selected option */}
                        {selected && (
                          <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600'></span>
                        )}
                      </>
                    )}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default SearchManufacturer
