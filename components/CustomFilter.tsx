"use client"

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react"
import Image from "next/image"
import { CustomFilterProps } from "@/types"
import { useRouter } from "next/navigation"
import { updateSearchParams } from "@/utils"
import { useState, useCallback } from "react"

/**
 * CustomFilter component that renders a dropdown (Listbox) with selectable options.
 * @param {string} title - The title of the filter.
 * @param {Array} options - The array of options to display in the filter.
 */
const CustomFilter = ({ title, options }: CustomFilterProps) => {
  const router = useRouter()

  const [selected, setSelected] = useState(options[0])

  /**
   * Updates the URL parameters based on the selected filter option.
   * Uses a callback to avoid re-creating the function on each render.
   * @param {object} selectedOption - The selected option from the listbox.
   */
  const handleUpdateParams = useCallback(
    (selectedOption: { title: string; value: string }) => {
      const newPathName = updateSearchParams(
        title,
        selectedOption.value.toLowerCase()
      )
      router.push(newPathName, { scroll: false })
    },
    [router, title]
  )

  /**
   * Handles selection change in the Listbox and updates the state & URL parameters.
   * @param {object} selectedOption - The selected option from the listbox.
   */
  const handleChange = (selectedOption: { title: string; value: string }) => {
    setSelected(selectedOption)
    handleUpdateParams(selectedOption)
  }

  return (
    <div className='w-fit'>
      <Listbox value={selected} onChange={handleChange}>
        <div className='relative w-fit z-10'>
          <ListboxButton className='custom-filter__btn'>
            <span className='block truncate'>{selected.title}</span>
            <Image
              src='/chevron-up-down.svg'
              width={20}
              height={20}
              className='ml-4 object-contain'
              alt='Chevron icon for dropdown'
            />
          </ListboxButton>

          <Transition
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <ListboxOptions className='custom-filter__options'>
              {options.map((option) => (
                <ListboxOption
                  key={option.title}
                  value={option}
                  className={({ focus }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      focus ? "bg-slate-600 text-white" : "text-gray"
                    }`
                  }
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.title}
                    </span>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter
