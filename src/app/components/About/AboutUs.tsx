"use client"
import { AboutSection } from "@/types/home";
import Image from "next/image";
import Link from "next/link";


const AboutUs = ({ aboutData }: { aboutData: AboutSection }) => {
  return (
    <section className=" py-10 px-4 md:px-8 bg-black  md:mt-[1150px] lg:mt-0 pt-[150px]">
      <div className="container">
        <div className="flex flex-col-reverse lg:flex-row justify-between gap-10">
          {/* Left Content */}
          <div className="w-full lg:w-[60%]">
            {/* Top Heading and Image */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mt-20">
              <div className="sm:w-[48%]">
                <h1 className=" flex flex-col text-[40px] md:text-[60px] lg:text-[80px] font-bold text-white leading-none">
                  <p>
                    {aboutData?.main_title
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
                  <hr className="md:w-36 w-20 ml-10 border-2 border-yellow-500" />
                </h1>
              </div>
              <div className="sm:w-[48%] ">
                {aboutData?.img1 === undefined ? (
                  <div>no img</div>
                ) : (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Abouts/${aboutData?.img1}`}
                    alt="Banner Image"
                    width={100}
                    height={100}
                    className="w-[150px] h-[110px]"
                  />
                )}
              </div>
            </div>

            {/* Info Sections */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-10 mt-10 ">
              {/* Who We Are */}
              <div className="w-full md:w-[48%]">
                <h3 className="text-sm tracking-[4px] font-semibold uppercase text-white bg-[#A4A4A4]/20 inline-block px-2 py-1">
                  {aboutData?.first_paragraph_subtitle}
                </h3>
                <div className="text-white" dangerouslySetInnerHTML={{ __html: aboutData?.first_paragraph_content }} />
              </div>

              {/* What We Do */}
              <div className="w-full md:w-[48%] space-y-3 ">
                <h3 className="text-sm tracking-[4px] font-semibold uppercase text-white bg-[#A4A4A4]/20 inline-block px-2 py-1">
                {aboutData?.second_paragraph_subtitle}
                </h3>
                <div className="text-white" dangerouslySetInnerHTML={{ __html: aboutData?.second_paragraph_content}} />
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 ">
              <Link href={aboutData.link}>
                <button
                  className="px-7 py-2 text-black font-medium rounded-full bg-no-repeat bg-center bg-cover"
                  style={{
                    backgroundImage: `url('/image/buttonbg.jpeg')`,
                  }}
                >
                  {/* Contact Us */}
                  {aboutData.name}
                </button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-[35%] flex justify-center ">
            {aboutData.img2 === undefined ? (
              <div>no img</div>
            ) : (
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Abouts/${aboutData?.img2}`}
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
