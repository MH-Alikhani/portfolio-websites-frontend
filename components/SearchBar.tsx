"use client"

import Image from "next/image"
import { SearchManufacturer } from "./"
import { useRouter } from "next/navigation"
import React, { useState, useCallback } from "react"

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src={"/magnifying-glass.svg"}
      alt={"Search"}
      width={40}
      height={40}
      className='object-contain'
    />
  </button>
)

const SearchBar = () => {
  const router = useRouter()
  const [manufacturer, setManufacturer] = useState("")
  const [model, setModel] = useState("")

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!manufacturer && !model) {
        return alert("Please fill in the search bar")
      }

      updateSearchParams(
        model.trim().toLowerCase(),
        manufacturer.trim().toLowerCase()
      )
    },
    [manufacturer, model]
  )

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search)

    model ? searchParams.set("model", model) : searchParams.delete("model")
    manufacturer
      ? searchParams.set("manufacturer", manufacturer)
      : searchParams.delete("manufacturer")

    const newPathName = `${window.location.pathname}?${searchParams.toString()}`

    router.push(newPathName, { scroll: false })
  }

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      {/* Manufacturer Search */}
      <div className='searchbar__item'>
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>

      {/* Model Search */}
      <div className='searchbar__item'>
        <Image
          src='/model-icon.png'
          alt='car model'
          width={25}
          height={25}
          className='absolute w-[20px] h-[20px] ml-4'
        />
        <input
          type='text'
          name='model'
          value={model}
          placeholder='Tiguan'
          className='searchbar__input'
          onChange={(e) => setModel(e.target.value)}
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>

      {/* Submit button for larger screens */}
      <SearchButton otherClasses='max-sm:hidden' />
    </form>
  )
}

export default SearchBar
