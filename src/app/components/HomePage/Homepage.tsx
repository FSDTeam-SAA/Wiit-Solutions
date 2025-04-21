'use client';
import Image from "next/image";

import { BannerSection } from "@/types/home";
import Link from "next/link";





export default function Banner({ bannerData }: { bannerData: BannerSection }) {
  console.log(bannerData)
  // const [data, setData] = useState<HomeApiData | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {

  //     try {
  //       const response = await fetch(`http://127.0.0.1:8000/api/frontend-data`, {  
  //         method: "GET",
  //         headers: {
  //           // Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const result = await response.json();
  //       // console.log("API Response:", result);  // Log the result
  //       setData(result);
  //     } catch (error) {
  //       console.error("Failed to fetch data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // const mappedData = data?.home?.map((item) => item);
  // console.log(mappedData?.[0]);





  return (
    <section

      className=" bg-black"
    >
      <div className="container pt-[150px]">
        <div>
          <div className="absolute -ml-[50px]">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Banners/${bannerData?.back_img}`}
              alt=""
              width={800}
              height={800}
            />

          </div>
          <div className="md:flex justify-center relative">
            <div className="pt-0  lg:pt-[50px] ">
              <div className="w-full lg:w-[1040px] h-[28px] bg-[#2B2B2B]  "></div>
              <div className="py-3 w-full lg:w-[1040px] flex justify-center">
                <h2 className="text-[18px] lg:text-[50px] text-white font-semibold  uppercase">
                  {/* Your satisfaction, is our priority */}
                  {bannerData?.title}
                </h2>
              </div>
              <div className="w-full lg:w-[1040px] h-[28px] bg-[#2B2B2B] ">
                <p className="text-xs pt-1 lg:pt-0 lg:text-base text-[#57A5BD] text-end pr-2">
                  {/* Exceptional IT Solutions Consulting Tailored for you */}
                  {bannerData?.subtitle}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-4 lg:flex-row items-center justify-center  lg:justify-end pt-[200px] gap-2 ">
            <div>
              <h1>unn</h1>
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
    </section>
  );
}
