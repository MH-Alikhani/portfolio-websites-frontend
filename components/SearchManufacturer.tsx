"use client"

import Image from "next/image"
import { Fragment, useMemo, useState } from "react"
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Transition,
} from "@headlessui/react"

import { manufacturers } from "@/constants"
import { SearchManufacturerProps } from "@/types"

const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
  const [query, setQuery] = useState("")

  const filteredManufacturers = useMemo(() => {
    if (!query.trim()) return manufacturers

    const lowercasedQuery = query.toLowerCase().replace(/\s+/g, "")
    return manufacturers.filter((item) =>
      item.toLowerCase().replace(/\s+/g, "").includes(lowercasedQuery)
    )
  }, [query])

  return (
    <div className='search-manufacturer'>
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className='relative w-full'>
          {/* Button for the combobox */}
          <ComboboxButton className='absolute top-[14px]'>
            <Image
              src='/car-logo.svg'
              width={20}
              height={20}
              className='ml-4'
              alt='car logo'
            />
          </ComboboxButton>

          {/* Input field for searching */}
          <ComboboxInput
            className='search-manufacturer__input'
            displayValue={(item: string) => item}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Volkswagen...'
          />

          {/* Transition for displaying the options */}
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery("")}
          >
            <ComboboxOptions className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10'>
              {filteredManufacturers.length === 0 && query !== "" ? (
                <div className='search-manufacturer__option text-gray-900'>
                  No manufacturers found.
                </div>
              ) : (
                filteredManufacturers.map((item) => (
                  <ComboboxOption
                    key={item}
                    className={({ focus }) =>
                      `relative search-manufacturer__option ${
                        focus ? "bg-slate-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, focus }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item}
                        </span>

                        {selected && (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              focus ? "text-white" : "text-primary-purple"
                            }`}
                          ></span>
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
