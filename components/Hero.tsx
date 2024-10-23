"use client"

import Image from "next/image"
import { CustomButton } from "./"

const Hero = () => {
  const handleScroll = () => {
    const discoverSection = document.getElementById("discover")
    if (discoverSection) {
      discoverSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className='hero'>
      <div className='flex-1 pt-36 padding-x'>
        <h1 className='hero__title '>Instant Mobility, Anytime, Anywhere.</h1>
        <p className='hero__subtitle'>
          Streamline your car rental experience with our effortless booking
          process.
        </p>

        <CustomButton
          title='Explore Cars'
          containerStyles='bg-slate-500 text-white rounded-full mt-10'
          handleClick={handleScroll}
        />
      </div>
      <div className='hero__image-container'>
        <div className='hero__image'>
          <Image src='/hero.png' alt='hero' fill className='object-contain' />
        </div>
        <div className='hero__image-overlay ' />
      </div>
    </div>
  )
}

export default Hero
