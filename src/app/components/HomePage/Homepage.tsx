'use client';
import Image from "next/image";

import { BannerSection } from "@/types/home";
import Link from "next/link";





export default function Banner({ bannerData }: { bannerData: BannerSection }) {

  return (
    <section

      className=" bg-black"
    >
      <div className="container pt-[150px]">
        <div>
          <div className="absolute -ml-[50px] ">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Banners/${bannerData?.back_img}`}
              alt=""
              width={800}
              height={800}
              className="w-full h-full  object-cover"
            />

          </div>
          <div className="md:flex justify-center relative">
            <div className="pt-0 lg:pt-[50px] w-full max-w-[1040px] mx-auto">
              {/* Top bar */}
              <div className="w-full h-[28px] bg-[#2B2B2B]"></div>

              {/* Title section */}
              <div className="py-3 w-full flex justify-center px-4 lg:px-0">
                <h2 className="text-[18px] lg:text-[50px] text-white font-semibold uppercase text-center">
                  {bannerData?.title}
                </h2>
              </div>

              {/* Bottom bar with subtitle */}
              <div className="w-full h-[28px] bg-[#2B2B2B] relative">
                <p className="text-xs lg:text-base text-[#57A5BD] absolute right-2 bottom-1 lg:bottom-0 whitespace-nowrap overflow-hidden text-ellipsis max-w-[90%]">
                  {bannerData?.subtitle}
                </p>
              </div>
            </div>

          </div>
          <div className="sm:static md:absolute top-[750px] right-[20%]  lg:static sm-full  md:w-[500px] lg:w-full  ">
            <div className="flex flex-col gap-y-4 lg:flex-row items-center justify-center  lg:justify-end pt-[350px]  md:pt-[200px] gap-2 ">
              <div>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Banners/${bannerData?.logo}`}
                  alt="Banner Image"
                  width={100}
                  height={100}
                  className="w-[150px]"
                />

              </div>

              <div className="w-full lg:w-[520px] ">
                <p className="text-white text-justify">
                  <div className="text-white" dangerouslySetInnerHTML={{ __html: bannerData?.description }} />
                </p>

              </div>

            </div>
            <div className="flex justify-center  lg:justify-end mt-5 ">
              <Link href={bannerData?.button_link}>
                <button
                  className="px-7 py-2 text-black rounded-[80px] bg-no-repeat bg-center bg-cover"
                  style={{
                    backgroundImage: `url('/image/buttonbg.jpeg')`, // adjust path as needed
                  }}
                >
                  {/* Contact Us */}
                  {bannerData?.button_text}
                </button>
              </Link>
            </div>
         </div>
        </div>
      </div>
    </section>
  );
}
