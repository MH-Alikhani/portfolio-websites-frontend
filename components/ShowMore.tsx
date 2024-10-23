"use client"

import { IShowMoreProps } from "@/types"
import { useRouter } from "next/navigation"
import { CustomButton } from "@/components"
import { updateSearchParams } from "@/utils"

const ShowMore = ({ pageNumber, isNext }: IShowMoreProps) => {
  const router = useRouter()

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10

    const newPathname = updateSearchParams("limit", `${newLimit}`)

    router.push(newPathname, { scroll: false })
  }

  return (
    <div className='w-full flex-center gap-5 mt-10'>
      {!isNext && (
        <CustomButton
          btnType='button'
          title='Show More'
          containerStyles='bg-slate-600 rounded-full text-white'
          handleClick={handleNavigation}
        />
      )}
    </div>
  )
}

export default ShowMore
