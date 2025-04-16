"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";


type AboutItem = {
  main_title: string;
  description?: string;
  second_sub_title_content?: string;
  name?: string;
  sub_title_after_main_title?: string;
  img1?: string;
  img2?: string;
  // 1st_paragraph_subtitle?: string;
  // add more fields as needed
};

type HomeApiData = {
  about: AboutItem[];
};

const AboutUs = () => {
  const [data, setData] = useState<HomeApiData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
     
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/frontend-data`,
          {
            method: "GET",
            headers: {
              // Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

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
  const mappedData = data?.about?.map((item) => item);
  console.log(mappedData?.[0]);
  return (
    <section className="py-10 px-4 md:px-8 bg-black">
      <div className="container mx-auto">
        <div className="flex flex-col-reverse lg:flex-row justify-between gap-10">
          {/* Left Content */}
          <div className="w-full lg:w-[60%]">
            {/* Top Heading and Image */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
              <div className="sm:w-[48%]">
                <h1 className=" flex flex-col justify-center items-center text-[40px] md:text-[60px] lg:text-[80px] font-bold text-white leading-none">
                  <p>
                    {mappedData?.[0]?.main_title
                      ?.split(" ")
                      .map((word, index) =>
                        word === "Us" ? (
                          <span key={index} className="text-[#A1EBFF]">
                            {word}{" "}
                          </span>
                        ) : (
                          word + " "
                        )
                      )}
                  </p>
                  <hr className="md:w-36 w-20 border-2 border-yellow-500" />
                </h1>
              </div>
              <div className="sm:w-[48%] ">
                {mappedData?.[0]?.img1 === undefined ? (
                  <div>no img</div>
                ) : (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Abouts/${mappedData?.[0]?.img1}`}
                    alt="Banner Image"
                    width={100}
                    height={100}
                    className="w-[150px]"
                  />
                )}
              </div>
            </div>

            {/* Info Sections */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-10 mt-10">
              {/* Who We Are */}
              <div className="w-full md:w-[48%]">
                <h3 className="text-sm tracking-[4px] font-semibold uppercase text-white bg-[#A4A4A4]/20 inline-block px-2 py-1">
                  who we are
                  {/* {mappedData?.[0]?.1st_paragraph_subtitle} */}
                </h3>
                <p className="text-[13px] text-white font-normal mt-5">
                  WiiT Solutions Group is a network of seasoned providers of
                  tailored ERP solutions, specializing in the implementation and
                  optimization of Enterprise Resource Planning (ERP) systems.
                  With a proven track record of delivering successful outcomes
                  for our clients across various industries, we combine
                  technical and functional expertise with a deep understanding
                  of business processes to drive efficiency, productivity, and
                  growth.
                </p>
                <p className="text-[13px] text-white font-normal mt-5">
                  Our team of seasoned professionals brings a wealth of
                  experience and knowledge to every project, ensuring that we
                  not only meet but exceed our clients expectations. We take
                  pride in our commitment to excellence, integrity, and customer
                  satisfaction.
                </p>
              </div>

              {/* What We Do */}
              <div className="w-full md:w-[48%]">
                <h3 className="text-sm tracking-[4px] font-semibold uppercase text-white bg-[#A4A4A4]/20 inline-block px-2 py-1">
                  what we do
                </h3>
                <p className="text-[13px] text-white font-normal mt-5">
                  At WiiT Solutions Group, we recognize the unique challenges
                  businesses face in todays rapidly evolving digital landscape.
                  Thats why we offer personalized strategic guidance and support
                  tailored to each clients specific needs and goals.
                </p>
                <p className="text-[13px] text-white font-normal mt-5">
                  From initial consultation to post-implementation support and
                  beyond, we are dedicated to delivering value at every stage of
                  the ERP lifecycle. With a focus on quality, innovation, and
                  continuous improvement, we empower our clients to stay ahead
                  of the competition.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <button
                className="px-7 py-2 text-black font-medium rounded-full bg-no-repeat bg-center bg-cover"
                style={{
                  backgroundImage: `url('/image/buttonbg.jpeg')`,
                }}
              >
                {/* Contact Us */}
                {mappedData?.[0]?.name}
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-[35%] flex justify-center">
            {mappedData?.[0]?.img2 === undefined ? (
              <div>no img</div>
            ) : (
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Abouts/${mappedData?.[0]?.img2}`}
                alt="About"
                width={550}
                height={600}
                className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[550px] h-auto object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
