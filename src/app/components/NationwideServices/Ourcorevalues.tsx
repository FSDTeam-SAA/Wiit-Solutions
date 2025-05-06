import { ServiceSection } from '@/types/home'
import Image from 'next/image'
import React from 'react'

const Ourcorevalues = ({coreValuesData}: {coreValuesData: ServiceSection}) => {
  return (
    <div className=" text-white w-full flex flex-col  px-4 md:p-8   !pt-[100px] ">
    <div className="container w-full mt-10">
      <div className="mb-10">
        <div className="inline-block bg-white text-black px-6 py-2">
          <h1 className="text-2xl md:text-4xl font-bold tracking-wider">{coreValuesData?.main_title}</h1>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="md:w-1/2 space-y-10">
          {/* Integrity */}
          <div className="flex items-start gap-4">
            <div className="bg-[#a3d8e6] rounded-full p-2 flex-shrink-0">
            <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Services/${coreValuesData?.icon1}`} alt=' ' width={100} height={100} className='w-7 h-7 object-cover'/>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold tracking-wider mb-2">{coreValuesData?.subtitle1}</h2>
              <p className="text-sm md:text-base text-gray-300">
                {coreValuesData?.description1}
              </p>
            </div>
          </div>

          {/* People First */}
          <div className="flex items-start gap-4">
            <div className="bg-[#a3d8e6] rounded-full p-2 flex-shrink-0">
            <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Services/${coreValuesData?.icon2}`} alt=' ' width={100} height={100} className='w-7 h-7 object-cover'/>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold tracking-wider mb-2">{coreValuesData?.subtitle2}</h2>
              <p className="text-sm md:text-base text-gray-300">
              {coreValuesData?.description2}
              </p>
            </div>
          </div>

          {/* Diversity */}
          <div className="flex items-start gap-4">
            <div className="bg-[#a3d8e6] rounded-full p-2 flex-shrink-0">
            <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Services/${coreValuesData?.icon3}`} alt=' ' width={100} height={100} className='w-7 h-7 object-cover'/>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold tracking-wider mb-2">{coreValuesData?.subtitle3}</h2>
              <p className="text-sm md:text-base text-gray-300">
              {coreValuesData?.description3}
              </p>
            </div>
          </div>
          {/* Quality Over Quantity */}
          <div className="flex items-start gap-4">
            <div className="bg-[#a3d8e6] rounded-full p-2 flex-shrink-0">
            <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Services/${coreValuesData?.icon4}`} alt=' ' width={100} height={100} className='w-7 h-7 object-cover'/>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold tracking-wider mb-2">{coreValuesData?.subtitle4}</h2>
              <p className="text-sm md:text-base text-gray-300">
              {coreValuesData?.description4}
              </p>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Services/${coreValuesData?.img}`} 
              alt="Target with hand representing precision and goal achievement"
              fill
              className="object-cover rounded-full"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Ourcorevalues
