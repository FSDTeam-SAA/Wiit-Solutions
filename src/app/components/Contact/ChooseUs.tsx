import { WhyChooseUsSection } from "@/types/home";
import Image from "next/image";
import React from "react";

const ChooseUs = ({ chooseUsData }: { chooseUsData: WhyChooseUsSection }) => {
  return (
    <section className="bg-black text-white relative overflow-hidden py-20">
      <div className="container">
        {/* Heading */}
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-1">
            {chooseUsData?.main_title}
          </h2>
          <div className="w-32 sm:w-48 md:w-64 h-[2px] absolute left-0 sm:left-[98px] mt-1 bg-yellow-500"></div>
        </div>

        {/* Main content - Responsive grid */}
        <div className="flex flex-col lg:flex-row  ">
          {/* Left Column - Think Outside the Box */}
          <div className="w-full md:w-[100%] lg:w-[45%] flex flex-col sm:flex-row gap-4 sm:gap-8 mt-8 sm:mt-16 md:mt-28">
            <div className="flex-shrink-0 w-14 h-14 bg-transparent flex items-center justify-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/WhyChooseUs/${chooseUsData?.left_side_icon}`}
                alt="Person jumping across a gap between cliffs with 'POSSIBLE' text"
                width={100}
                height={100}
                className="w-14 h-14 object-cover"
              />
            </div>

            <div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-5 mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold leading-snug">
                  {chooseUsData?.left_side_main_title &&
                    chooseUsData.left_side_main_title.split(" ").map((word, index) => {
                      const highlightWords = ["Box", "Holistic"];
                      const wordElement = highlightWords.includes(word.replace(/[^a-zA-Z]/g, "")) ? (
                        <span key={index} className="">
                          {word}{" "}
                        </span>
                      ) : (
                        word + " "
                      );

                      // Insert <br /> after specific words
                      const withLineBreak =
                        word === "Outside" || word === "-" ? (
                          <React.Fragment key={index}>
                            {wordElement}
                            <br />
                          </React.Fragment>
                        ) : (
                          <React.Fragment key={index}>{wordElement}</React.Fragment>
                        );

                      return withLineBreak;
                    })}
                </h3>

                <div className="w-full md:w-[40%]">
                  <p className="text-gray-300 text-sm mb-4 md:mb-6 italic">
                    {chooseUsData?.left_side_comments}
                  </p>
                  <h4 className="text-sm text-blue-400">Key Benefits:</h4>
                </div>
              </div>

              <div className="space-y-4 md:space-y-2">
                <div dangerouslySetInnerHTML={{ __html: chooseUsData?.left_side_content }} />
              </div>
            </div>
          </div>

          {/* Right Column - RFT Approach */}
          <div className="w-full md:w-[100%] lg:w-[45%] flex flex-col sm:flex-row gap-4 sm:gap-8 mt-10 lg:mt-0">
            <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/WhyChooseUs/${chooseUsData?.middle_side_icon}`}
                alt="Person jumping across a gap between cliffs with 'POSSIBLE' text"
                width={100} height={100}
                className="w-[80px] h-[80px] object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row mb-6 space-y-3">
                <h3 className="text-2xl sm:text-3xl font-bold leading-snug w-[300px] md:w-[180px] lg:w-[300px]">
                  {chooseUsData?.middle_side_main_title &&
                    chooseUsData.middle_side_main_title.split(" ").map((word, index) => {
                      const highlightWords = ["Time", "Approach"];
                      const wordElement = highlightWords.includes(word.replace(/[^a-zA-Z]/g, "")) ? (
                        <span key={index} className="">
                          {word}{" "}
                        </span>
                      ) : (
                        word + " "
                      );

                      // Insert <br /> after specific words
                      const withLineBreak =
                        word === "Approach" || word === "-" ? (
                          <React.Fragment key={index}>
                            {wordElement}
                            <br />
                          </React.Fragment>
                        ) : (
                          <React.Fragment key={index}>{wordElement}</React.Fragment>
                        );

                      return withLineBreak;
                    })}
                </h3>
                <div className="w-full md:w-[40%]">
                  <p className="text-gray-300 mb-4 md:mb-6 text-sm italic">
                    {chooseUsData?.middle_side_comments}
                  </p>
                  <h4 className="text-sm text-blue-400">  {chooseUsData?.middle_side_key_title}</h4>
                </div>
              </div>

              <div className="space-y-4 md:space-y-2">
                <div dangerouslySetInnerHTML={{ __html: chooseUsData?.middle_side_content }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Mark Image - Responsive positioning */}
      <div className="hidden lg:block absolute bottom-0 lg:bottom-[-200px] mb-[-45px] right-0 lg:right-[-300px]  w-[50%] xl:w-[700px] h-[50%] xl:h-[600px] ">
        <div className="relative w-full h-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/WhyChooseUs/${chooseUsData?.img}`}
            alt="image"
            width={300}
            height={300}
            className="w-full h-full  lg: object-contain lg:w-[400px] lg:h-[400px] "
          />
        </div>
      </div>
      <div className="hidden lg:block absolute right-[-3%]  top-[40%] xl:top-[35%] w-[200px] md:w-[400px]  ">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/WhyChooseUs/${chooseUsData?.icon}`}
          alt="image"
          width={1000}
          height={1000}
          className="w-[400px] h-[400px] object-contain transform rotate-[-30deg]"
        />
      </div>
    </section>
  );
};

export default ChooseUs;
