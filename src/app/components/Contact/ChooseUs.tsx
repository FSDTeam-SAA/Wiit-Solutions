import React from "react";
import Image from "next/image"

const ChooseUs = () => {
  return (
    <section className="bg-black text-white py-8 md:py-12 px-4 md:px-8 relative overflow-hidden lg:pr-24">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-8 md:mb-12 relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-1">
            WHY CHOOSE US?
          </h2>
          <div className="w-32 sm:w-48 md:w-64 h-[2px] absolute left-0 sm:left-[98px] mt-1 bg-yellow-500"></div>
        </div>

        {/* Main content - Responsive grid */}
        <div className="lg:flex">
          {/* Left Column - Think Outside the Box */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-8 sm:mt-16 md:mt-28">
            <div className="flex-shrink-0 w-14 h-14 bg-transparent flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full text-blue-500"
              >
                <path d="M20 12v10H4V12"></path>
                <path d="M2 7h20v5H2z"></path>
                <path d="M12 22V7"></path>
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row gap-4 md:gap-5 mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold">
                  Think Outside
                  <span className="block md:ml-14">the Box - </span>
                  Holistic View
                </h3>
                <div className="w-full md:w-[40%]">
                  <p className="text-gray-300 mb-4 md:mb-6 text-sm italic">
                    We approach challenges with creativity and a holistic
                    perspective, finding innovative solutions that address our
                    clients needs comprehensively.
                  </p>
                  <h4 className="text-sm text-blue-400">Key Benefits:</h4>
                </div>
              </div>

              <div className="space-y-4 md:space-y-5">
                <div>
                  <h5 className="font-bold mb-1">Enhanced Engagement:</h5>
                  <p className="text-gray-300 text-sm md:text-base lg:text-lg">
                    A personalized message creates a welcoming atmosphere,
                    encouraging visitors to make a connection with us. This
                    approach fosters a sense of trust and builds stronger
                    relationships with potential clients.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold mb-1">Clear Communication:</h5>
                  <p className="text-gray-300 text-sm md:text-base lg:text-lg">
                    By clearly stating our commitment to providing exceptional
                    ERP implementation consulting services, we ensure that
                    visitors understand the value we offer. This clarity helps
                    in attracting the right audience and addressing their
                    specific needs effectively.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold mb-1">
                    Professionalism and Expertise:
                  </h5>
                  <p className="text-gray-300 text-sm md:text-base lg:text-lg">
                    Highlighting our dedication to professionalism and success
                    creates confidence in our capabilities and expertise. This
                    reassures visitors that they are contacting a reliable and
                    knowledgeable team.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold mb-1">
                    Encouragement to Take Action:
                  </h5>
                  <p className="text-gray-300 text-sm md:text-base lg:text-lg">
                    A friendly and inviting message motivates visitors to take
                    the next step, whether its asking questions, seeking
                    assistance, or discussing their needs. This proactive
                    approach encourages engagement and facilitates meaningful
                    connections.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold mb-1">Building Confidence:</h5>
                  <p className="text-gray-300 text-sm md:text-base lg:text-lg">
                    By expressing our eagerness to help, we instill confidence
                    in visitors that their inquiries are valued and will be
                    addressed promptly. This positive impression can lead to
                    long-term client relationships and repeat business.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - RFT Approach */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-10 lg:mt-0">
            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row gap-4 md:gap-5 mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold">
                  Right First
                  <span className="block">Time (RFT)</span>
                  <span className="block md:ml-5">Approach</span>
                </h3>
                <div className="w-full md:w-[40%]">
                  <p className="text-gray-300 mb-4 md:mb-6 text-sm italic">
                    We believe in getting it right the first time, ensuring
                    efficiency and effectiveness in our solutions.
                  </p>
                  <h4 className="text-sm text-blue-400">Key Benefits:</h4>
                </div>
              </div>

              <div className="space-y-4 md:space-y-2">
                <div>
                  <h5 className="font-bold mb-1">
                    Efficiency and Cost Savings:
                  </h5>
                  <p className="text-gray-300 text-sm">
                    By getting it right the first time, we minimize the need for
                    rework and corrections, which saves both time and money.
                    This approach reduces project timelines and lowers overall
                    costs, allowing you to allocate resources more effectively.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold mb-1">High-Quality Outcomes:</h5>
                  <p className="text-gray-300 text-sm">
                    Our RFT approach ensures thorough planning and execution,
                    leading to superior results. We focus on delivering
                    solutions that consistently meet or exceed your
                    expectations, resulting in higher satisfaction and long-term
                    success.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold mb-1">Enhanced Productivity:</h5>
                  <p className="text-gray-300 text-sm">
                    With a focus on doing things right the first time, our team
                    can work more efficiently and systematically. This
                    streamlined approach brings about discipline,
                    accountability, and improved overall productivity.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold mb-1">Risk Mitigation:</h5>
                  <p className="text-gray-300 text-sm">
                    By prioritizing accuracy and thoroughness, our RFT approach
                    helps identify and address potential issues in the process,
                    reducing the likelihood of errors and complications,
                    ensuring smoother project execution and fewer surprises.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold mb-1">Client Confidence:</h5>
                  <p className="text-gray-300 text-sm">
                    Our commitment to getting it right the first time builds
                    customer and stakeholder trust. Clients can rely on our
                    ability to deliver reliable and effective solutions, knowing
                    that we perform our services with precision.
                  </p>
                </div>
                <div>
                  <h5 className="font-bold mb-1">Long-Term Success:</h5>
                  <p className="text-gray-300 text-sm">
                    The RFT approach establishes a solid foundation for our
                    commitment to long-term success. By implementing solutions
                    correctly from the start, we lay a strong foundation for
                    future growth and sustainable results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Mark Image - Responsive positioning */}
      <div className="hidden lg:block absolute bottom-0 right-0 w-[50%] xl:w-[700px] h-[50%] xl:h-[600px] z-0">
        <div className="relative w-full h-full">
          <Image
            src="/image/oldman.png"
            alt="image"
            width={700}
            height={500}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="hidden lg:block absolute right-[8%] top-[42%] w-[100px] md:w-[150px] z-10">
        <Image
          src="/image/question.png"
          alt="image"
          width={150}
          height={150}
          className="w-full h-auto"
        />
      </div>
    </section>
  );
};

export default ChooseUs;
