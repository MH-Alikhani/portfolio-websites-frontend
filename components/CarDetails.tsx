"use client"

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import Image from "next/image"
import { Fragment } from "react"
import { ICarProps } from "@/types"
import { generateCarImageUrl } from "@/utils"

interface ICarDetailsProps {
  isOpen: boolean
  closeModal: () => void
  car: ICarProps
}

const CarDetails = ({ isOpen, closeModal, car }: ICarDetailsProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        {/* Background overlay */}
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm' />
        </TransitionChild>

        {/* Dialog container */}
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-6 sm:p-10 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              {/* Dialog content */}
              <DialogPanel className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-8 text-left shadow-xl transition-all flex flex-col gap-6'>
                {/* Close button */}
                <button
                  type='button'
                  className='absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition ease-in-out'
                  onClick={closeModal}
                >
                  <Image
                    src='/close.svg'
                    alt='Close'
                    width={24}
                    height={24}
                    className='object-contain'
                  />
                </button>

                {/* Car images */}
                <div className='flex-1 flex flex-col gap-5'>
                  <div className='relative w-full h-48 sm:h-64 bg-pattern bg-cover bg-center rounded-lg shadow'>
                    <Image
                      src={generateCarImageUrl(car, "angle")}
                      alt={`${car.make} ${car.model}`}
                      fill
                      priority
                      className='object-contain rounded-lg'
                    />
                  </div>

                  <div className='flex gap-4'>
                    {["13", "29", "33"].map((angle) => (
                      <div
                        key={angle}
                        className='flex-1 relative w-full h-28 bg-slate-600-100 rounded-lg shadow hover:scale-105 transition-transform'
                      >
                        <Image
                          src={generateCarImageUrl(car, angle)}
                          alt={`Car angle ${angle}`}
                          fill
                          priority
                          className='object-contain rounded-lg'
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Car details */}
                <div className='flex-1 flex flex-col gap-4'>
                  <h2 className='text-2xl font-bold capitalize text-gray-900'>
                    {car.make} {car.model}
                  </h2>

                  <div className='mt-4 flex flex-wrap gap-6'>
                    {Object.entries(car).map(([key, value]) => (
                      <div
                        className='flex justify-between gap-8 w-full text-right'
                        key={key}
                      >
                        <h4 className='text-sm text-gray-900 font-semibold capitalize'>
                          {key.replace(/_/g, " ")}
                        </h4>
                        <p className='text-gray-600 font-medium'>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CarDetails
