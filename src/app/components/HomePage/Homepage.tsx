'use client';
import Image from "next/image";
import bannerImage from "../../../../public/image/banner1.jpeg";

import { useEffect, useState } from "react";


type HomeItem = {
  main_title: string;
  description?: string;
  second_sub_title_content?: string;
  name?: string;
  sub_title_after_main_title?: string;
  img?: string;
  // add more fields as needed
};

type HomeApiData = {
  home: HomeItem[];
};
export default function Home() {
  const [data, setData] = useState<HomeApiData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
    
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/frontend-data`, {  
          method: "GET",
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        // console.log("API Response:", result);  // Log the result
        setData(result);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);
  const mappedData = data?.home?.map((item) => item);
  console.log(mappedData?.[0]);





  return (
    <section
      style={{
        backgroundImage: `url(${bannerImage.src})`,
        backgroundSize: "contain",
        backgroundPosition: "",
        backgroundRepeat: "no-repeat",
      }}
      className="h-[700px] bg-cover bg-black "
    >
      <div className="container">
        <div className="md:flex justify-center">
          <div className="pt-0  lg:pt-[50px] ">
            <div className="w-full lg:w-[1040px] h-[28px] bg-[#2B2B2B]  "></div>
            <div className="py-3 w-full lg:w-[1040px] flex justify-center">
              <h2 className="text-[18px] lg:text-[50px] text-white font-semibold  uppercase">
                {/* Your satisfaction, is our priority */}
                {mappedData?.[0]?.main_title}
              </h2>
            </div>
            <div className="w-full lg:w-[1040px] h-[28px] bg-[#2B2B2B] ">
              <p className="text-xs pt-1 lg:pt-0 lg:text-base text-[#57A5BD] text-end pr-2">
                {/* Exceptional IT Solutions Consulting Tailored for you */}
                {mappedData?.[0]?.sub_title_after_main_title}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 lg:flex-row items-center justify-center  lg:justify-end pt-[200px] gap-2 ">
          <div>
            {
              mappedData?.[0]?.img === undefined ? (
                <div>no img</div>
              ) : (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Homes/${mappedData?.[0]?.img}`}
                  alt="Banner Image"
                  width={100}
                  height={100}
                  className="w-[150px]"
                />
              )
            }
           
          </div>

          <div className="w-full lg:w-[520px]">
            <p className="text-white text-justify">
              {/* Unmatched industry expertise available nationwide. We are your trusted
              technology partner offering affordable solutions with quality service at
              competitive prices */}
              {mappedData?.[0]?.second_sub_title_content}
            </p>
            {/* <p className="text-white text-justify mt-7 mb-1">
              Industry Experts in:
            </p>
            <p className="text-white text-justify mt-7">
              Government - Healthcare - Public Schools (K-12) - Manufacturing - Retail
            </p>  */}
          </div>
          {/* <Image
            src={`/${mappedData?.[0]?.img}`} 
            alt="Banner Image"
            width={100}
            height={100}
            className="w-[150px]"
          /> */}

        </div>
        <div className="flex justify-center  lg:justify-end mt-5">
          <button
            className="px-7 py-2 text-black rounded-[80px] bg-no-repeat bg-center bg-cover"
            style={{
              backgroundImage: `url('/image/buttonbg.jpeg')`, // adjust path as needed
            }}
          >
            {/* Contact Us */}
            {mappedData?.[0]?.name}
          </button>
        </div>
      </div>
    </section>
  );
}
