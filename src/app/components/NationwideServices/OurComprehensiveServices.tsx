import { OurComprehensiveService } from "@/types/home";
import Image from "next/image";
import React from "react";

const OurComprehensiveServices = ({ ourcomprenhensiveData }: { ourcomprenhensiveData: OurComprehensiveService }) => {
 
  return (
    <div className="bg-black text-white py-16 px-4 md:px-8">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-2">
            {ourcomprenhensiveData?.title}
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px bg-teal-400 w-12"></div>
            <p className="text-teal-400 uppercase tracking-widest text-sm ">
              {ourcomprenhensiveData?.subtitle}
            </p>
            <div className="h-px   bg-teal-400 w-12"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* PROJECT MANAGEMENT */}
          <div className="flex flex-col h-full">
            <div className="flex justify-center">
              <div className="w-32 h-32">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Services/${ourcomprenhensiveData?.img1}`}
                  alt=" "
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="bg-teal-200 py-2 px-4 mb-4">
              <h3 className="text-black font-bold text-center uppercase text-lg">
                {ourcomprenhensiveData?.title1}
              </h3>
            </div>
            <div>
              <div dangerouslySetInnerHTML={{ __html: ourcomprenhensiveData?.content1 }} />
            </div>
          </div>

          {/* CHANGE MANAGEMENT */}
          <div className="flex flex-col h-full">
            <div className="flex justify-center ">
              <div className="w-32 h-32">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Services/${ourcomprenhensiveData?.img2}`}
                  alt=" "
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="bg-teal-200 py-2 px-4 mb-4">
              <h3 className="text-black font-bold text-center uppercase text-lg">
                {ourcomprenhensiveData?.title2}
              </h3>
            </div>
            <div>
              <div dangerouslySetInnerHTML={{ __html: ourcomprenhensiveData?.content2 }} />
            </div>
          </div>

          {/* FUNCTIONAL CONSULTING */}
          <div className="flex flex-col h-full">
            <div className="flex justify-center ">
              <div className="w-32 h-32">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Services/${ourcomprenhensiveData?.img3}`}
                  alt=" "
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="bg-teal-200 py-2 px-4 mb-4">
              <h3 className="text-black font-bold text-center uppercase text-lg">
                {ourcomprenhensiveData?.title3}
              </h3>
            </div>
            <div>
              <div dangerouslySetInnerHTML={{ __html: ourcomprenhensiveData?.content3 }} />
            </div>
          </div>

          {/* TECHNICAL CONSULTING */}
          <div className="flex flex-col h-full">
            <div className="flex justify-center ">
              <div className="w-32 h-32">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Services/${ourcomprenhensiveData?.img4}`}
                  alt=" "
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="bg-teal-200 py-2 px-4 mb-4">
              <h3 className="text-black font-bold text-center uppercase text-lg">
                {ourcomprenhensiveData?.title4}
              </h3>
            </div>
            <div>
              <div dangerouslySetInnerHTML={{ __html: ourcomprenhensiveData?.content4 }} />
            </div>
          </div>

          {/* STAFF AUGMENTATION */}
          <div className="flex flex-col h-full">
            <div className="flex justify-center ">
              <div className="w-32 h-32">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Services/${ourcomprenhensiveData?.img5}`}
                  alt=" "
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="bg-teal-200 py-2 px-4 mb-4">
              <h3 className="text-black font-bold text-center uppercase text-lg">
                {ourcomprenhensiveData?.title5}
              </h3>
            </div>
            <div>
              <div dangerouslySetInnerHTML={{ __html: ourcomprenhensiveData?.content5 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurComprehensiveServices;
