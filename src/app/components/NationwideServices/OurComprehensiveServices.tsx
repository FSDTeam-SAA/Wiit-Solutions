import Image from "next/image";
import React from "react";

const OurComprehensiveServices = () => {
  return (
    <div className="bg-black text-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-2">
            Our  Services
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px bg-teal-400 w-12"></div>
            <p className="text-teal-400 uppercase tracking-widest text-sm ">
              Available Nationwide
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
                  src="/image/Change-Management.png"
                  alt=" "
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="bg-teal-200 py-2 px-4 mb-4">
              <h3 className="text-black font-bold text-center uppercase text-lg">
                Project Management
              </h3>
            </div>
            <p className="text-sm h-[200px]">
              Our Project Management as a Service (PMaaS) offering provides
              scalable, cost-effective project management solutions for your
              business. Whether you require short-term assistance or a complete
              project overhaul, our experienced project management professionals
              guide you from start to finish.
            </p>
            <div>
              <h4 className="text-teal-200 bg-gray-500 tracking-widest inline-block bg-opacity-60 font-bold mb-2 uppercase text-sm">
                Key Benefits
              </h4>
              <ul className="text-xs space-y-2">
                <li className="text-gray-300">
                  <span className="font-bold text-white">Flexibility:</span>{" "}
                  Hire project management professionals as needed, without
                  long-term commitments.
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">Expertise:</span>{" "}
                  Access to industry-leading insights, tools, and methodologies.
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    Cost-effectiveness:
                  </span>{" "}
                  Save time and money by avoiding the overhead of hiring project
                  management staff.
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    Improved Delivery Quality:
                  </span>{" "}
                  Ensure projects are delivered on time and within budget.
                </li>
              </ul>
            </div>
          </div>

          {/* CHANGE MANAGEMENT */}
          <div className="flex flex-col h-full">
            <div className="flex justify-center ">
              <div className="w-32 h-32">
                <Image
                  src="/image/Project-Management.png"
                  alt=" "
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="bg-teal-200 py-2 px-4 mb-4">
              <h3 className="text-black font-bold text-center uppercase text-lg">
                Change Management
              </h3>
            </div>
            <p className="text-sm h-[200px]">
              We understand the critical role of change management in the
              successful implementation of new systems and processes. Our change
              management services ensure a smooth transition and maximize the
              benefits of your ERP investment.
            </p>
            <div className="mt-auto">
              <h4 className="text-teal-200 bg-gray-500 tracking-widest inline-block bg-opacity-60 font-bold mb-2 uppercase text-sm">
                Key Benefits
              </h4>
              <ul className="text-xs space-y-2">
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    Improved Efficiency:
                  </span>{" "}
                  Streamline business processes.
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    Better Decision Making:
                  </span>{" "}
                  Access real-time information.
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    Increased Collaboration:
                  </span>{" "}
                  Enhance cross-functional communication.
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    Improved Data Analysis:
                  </span>{" "}
                  Gain deeper operational insights.
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    Greater Flexibility:
                  </span>{" "}
                  Tailor ERP systems to your needs.
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    Higher User Adoption:
                  </span>{" "}
                  Intuitive and train employees.
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    Minimized Resistance:
                  </span>{" "}
                  Ensure a smooth transition.
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    Accelerated Technology Adoption:
                  </span>{" "}
                  Boost employee morale.
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    Improved Engagement:
                  </span>{" "}
                  Empower employees to embrace change.
                </li>
              </ul>
            </div>
          </div>

          {/* FUNCTIONAL CONSULTING */}
          <div className="flex flex-col h-full">
            <div className="flex justify-center ">
              <div className="w-32 h-32">
                <Image
                  src="/image/Functional.png"
                  alt=" "
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="bg-teal-200 py-2 px-4 mb-4">
              <h3 className="text-black font-bold text-center uppercase text-lg">
                Functional Consulting
              </h3>
            </div>
            <p className="text-sm h-[200px]">
              Our ERP functional consulting services provide expert guidance and
              support to help organizations maximize the benefits of their
              Enterprise Resource Planning (ERP) systems. We focus on
              streamlining operations, improving efficiency, and delivering
              customized, industry-specific solutions.
            </p>
            <div>
              <h4 className="text-teal-200 bg-gray-500 tracking-widest inline-block bg-opacity-60 font-bold mb-2 uppercase text-sm">
                Key Benefits
              </h4>
              <ul className="text-xs space-y-2">
                <li className="text-gray-300">
                  <span className="font-bold text-white">Expert Guidance:</span>{" "}
                  Our consultants offer strategic solutions and ensure
                  successful ERP implementation and operation.
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    Comprehensive Support:
                  </span>{" "}
                  From initial consultation to ongoing maintenance, we provide
                  all-inclusive assistance.
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    Optimized Utilization:
                  </span>{" "}
                  We help businesses unlock their full potential by optimizing
                  their ERP systems.
                </li>
              </ul>
            </div>
          </div>

          {/* TECHNICAL CONSULTING */}
          <div className="flex flex-col h-full">
            <div className="flex justify-center ">
              <div className="w-32 h-32">
                <Image
                  src="/image/Technical.png"
                  alt=" "
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="bg-teal-200 py-2 px-4 mb-4">
              <h3 className="text-black font-bold text-center uppercase text-lg">
                Technical Consulting
              </h3>
            </div>
            <p className="text-sm h-[200px]">
              Our technical consulting services for ERP implementation provide
              expert guidance and support throughout the entire process. We
              ensure that your ERP system is effectively integrated into your
              business operations, optimizing performance and delivering maximum
              value.
            </p>
            <div className="">
              <h4 className="text-teal-200 bg-gray-500 tracking-widest inline-block bg-opacity-60 font-bold mb-2 uppercase text-sm">
                Key Benefits
              </h4>
              <ul className="text-xs space-y-2">
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    Requirement Analysis:
                  </span>{" "}
                  Thorough analysis of your business processes and requirements
                  to ensure optimal results.
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    System Design and Configuration:
                  </span>{" "}
                  Designing and configuring the ERP system to align with your
                  business processes, reducing errors and ensuring data
                  security.
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    Data Migration and Integration:
                  </span>{" "}
                  Accurate data migration from legacy systems and seamless
                  integration with existing applications.
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    User Training and Support:
                  </span>{" "}
                  Comprehensive training sessions and ongoing support to ensure
                  successful adoption of the ERP system.
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    Monitoring and Optimization:
                  </span>{" "}
                  Continuous monitoring of the ERP system post-implementation to
                  ensure it operates efficiently, making necessary adjustments
                  based on user feedback.
                </li>
              </ul>
            </div>
          </div>

          {/* STAFF AUGMENTATION */}
          <div className="flex flex-col h-full">
            <div className="flex justify-center ">
              <div className="w-32 h-32">
                <Image
                  src="/image/Staff.png"
                  alt=" "
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="bg-teal-200 py-2 px-4 mb-4">
              <h3 className="text-black font-bold text-center uppercase text-lg">
                Staff Augmentation
              </h3>
            </div>
            <p className="text-sm h-[200px]">
              We provide top-tier staff augmentation services to fill businesses
              short-term talent shortages and specialized skill gaps. Our staff
              augmentation services seamlessly integrate specialized external
              professionals into your existing workforce, ensuring access to the
              expertise you need without the long-term commitment of permanent
              hires.
            </p>
            <div>
              <h4 className="text-teal-200 bg-gray-500 tracking-widest inline-block bg-opacity-60 font-bold mb-2 uppercase text-sm">
                Key Benefits
              </h4>
              <ul className="text-xs space-y-2">
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    Enhanced Scalability:
                  </span>{" "}
                  Quickly scale your team based on project needs.
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    Cost-Effectiveness:
                  </span>{" "}
                  Save on costs related to permanent hiring.
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    Immediate Access to Specialized Talent:
                  </span>{" "}
                  Gain instant access to skilled professionals.
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">Flexibility:</span>{" "}
                  Adjust your team size as needed.
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    Improved Efficiency:
                  </span>{" "}
                  Minimize disruptions and maintain productivity.
                </li>
                <li className="text-gray-300">
                  <span className="font-bold text-white">
                    Industry Experience:
                  </span>{" "}
                  Benefit from diverse project backgrounds and innovative
                  approaches.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurComprehensiveServices;
