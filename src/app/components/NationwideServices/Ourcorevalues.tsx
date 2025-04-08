import Image from 'next/image'
import React from 'react'

const Ourcorevalues = () => {
  return (
    <div className="bg-black text-white min-h-screen w-full flex flex-col items-center  p-4 md:p-8">
    <div className="max-w-7xl w-full mt-10">
      <div className="mb-10">
        <div className="inline-block bg-white text-black px-6 py-2">
          <h1 className="text-2xl md:text-4xl font-bold tracking-wider">OUR CORE VALUES</h1>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="md:w-1/2 space-y-10">
          {/* Integrity */}
          <div className="flex items-start gap-4">
            <div className="bg-[#a3d8e6] rounded-full p-2 flex-shrink-0">
            <Image src="/image/INTEGRITY.png" alt=' ' width={100} height={100} className='w-7 h-7 object-cover'/>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold tracking-wider mb-2">INTEGRITY</h2>
              <p className="text-sm md:text-base text-gray-300">
                We conduct business with honesty, transparency, and ethical practices.
              </p>
            </div>
          </div>

          {/* People First */}
          <div className="flex items-start gap-4">
            <div className="bg-[#a3d8e6] rounded-full p-2 flex-shrink-0">
            <Image src="/image/PEOPLE-FIRST.png" alt=' ' width={100} height={100} className='w-7 h-7 object-cover'/>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold tracking-wider mb-2">PEOPLE FIRST</h2>
              <p className="text-sm md:text-base text-gray-300">
                We prioritize the well-being and success of our clients, employees, and partners.
              </p>
            </div>
          </div>

          {/* Diversity */}
          <div className="flex items-start gap-4">
            <div className="bg-[#a3d8e6] rounded-full p-2 flex-shrink-0">
            <Image src="/image/DIVERSITY.png" alt=' ' width={100} height={100} className='w-7 h-7 object-cover'/>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold tracking-wider mb-2">DIVERSITY</h2>
              <p className="text-sm md:text-base text-gray-300">
                We champion diversity and inclusivity, particularly supporting and promoting underrepresented
                demographics in the IT industry.
              </p>
            </div>
          </div>
          {/* Quality Over Quantity */}
          <div className="flex items-start gap-4">
            <div className="bg-[#a3d8e6] rounded-full p-2 flex-shrink-0">
            <Image src="/image/QUALITY.png" alt=' ' width={100} height={100} className='w-7 h-7 object-cover'/>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold tracking-wider mb-2">QUALITY OVER QUANTITY</h2>
              <p className="text-sm md:text-base text-gray-300">
                We prioritize delivering high-quality solutions and services over merely increasing our volume of
                work.
              </p>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src="/image/image.jpg"
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
