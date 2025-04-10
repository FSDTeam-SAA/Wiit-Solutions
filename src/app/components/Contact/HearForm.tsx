// "use client";

// import type React from "react";

// import { useState } from "react";
// import Image from "next/image";

// export default function HearForm() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     companyName: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     // Add your form submission logic here
//   };

//   return (
//     <section className="text-white py-16 px-4 md:px-8 relative overflow-hidden">
//       {/* Phone with icons */}
//       <div className="w-full h-[500px] relative">
//   <Image 
//     src="/image/mobile.jpeg" 
//     alt="image" 
//     width={500} 
//     height={500} 
//     className="w-full h-full object-cover"
//   />
// </div>

//       <h1 className="absolute text-3xl font-bold text-white left-[20%] bottom-[47%]">WED LOVE TO HEAR FROM YOU</h1>
//       <div className="w-[180px] h-[1.5px] bg-yellow-400 absolute ml-[24%] bottom-[47%]"></div>
//       <div className="mb-12 flex justify-center">

//         <div className="flex gap-36">
//           <div className="">
//             <p className="text-sm md:text-base mb-8 max-w-2xl">
//               At WIIT Solutions Group, we are dedicated to providing exceptional
//               ERP implementation consulting services. Whether you have
//               questions, need assistance, or want to discuss your specific
//               needs, our team is here to help. Reach out to us today, and lets
//               explore how we can support your business goals and drive success
//               together.
//             </p>

//             <form
//               onSubmit={handleSubmit}
//               className="grid grid-cols-1 md:grid-cols-2 gap-4"
//             >
//               <div>
//                 <input
//                   type="text"
//                   name="firstName"
//                   placeholder="*First Name"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   required
//                   className="italic w-full p-3 bg-white text-black border border-gray-300 rounded-sm"
//                 />
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="*Phone Number"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                   className="italic w-full p-3 bg-white text-black border border-gray-300 rounded-sm"
//                 />
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="lastName"
//                   placeholder="*Last Name"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   required
//                   className="italic w-full p-3 bg-white text-black border border-gray-300 rounded-sm"
//                 />
//               </div>
//               <div className="md:row-span-2">
//                 <textarea
//                   name="message"
//                   placeholder="*Comments/Questions"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                   className="italic w-full h-full p-3 bg-white text-black border border-gray-300 rounded-sm min-h-[104px]"
//                 ></textarea>
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="companyName"
//                   placeholder="*Company Name"
//                   value={formData.companyName}
//                   onChange={handleChange}
//                   required
//                   className="italic w-full p-3 bg-white text-black border border-gray-300 rounded-sm"
//                 />
//               </div>
//               <div>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="*Email Address"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="italic w-full p-3 bg-white text-black border border-gray-300 rounded-sm"
//                 />
//               </div>
//               <div className="">
//                 <button
//                   type="submit"
//                   className="w-full p-3 bg-blue-400 hover:bg-blue-500 text-white font-medium transition-colors duration-200 rounded-sm"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>

//           <div className="lg:pl-8 mt-8 lg:mt-0">
//             <div className="mb-8">
//               <h3 className="text-xl md:text-2xl font-bold relative">
//                 OUR ADDRESS
//               </h3>
//               <div className="w-[180px] h-[1.5px] bg-yellow-400 absolute"></div>
//               <div className="flex items-start mt-8">
//                 <div className="mr-3 mt-1">
//                   <svg
//                     className="w-9 h-9 text-white"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="font-bold">3948 LEGACY DRIVE | STE 106</p>
//                   <p>PLANO, TEXAS 75023</p>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-xl md:text-2xl font-bold">
//                 OUR CONTACT
//               </h3>
//               <div className="w-[180px] h-[1.5px] bg-yellow-400 absolute"></div>
//               <div className="flex items-center mt-8">
//                 <div className="mr-3">
//                   <svg
//                     className="w-7 h-7 text-white"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
//                     <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
//                   </svg>
//                 </div>
//                 <a
//                   href="mailto:CONTACT@WIITSOLUTIONS.COM"
//                   className="hover:text-blue-300 transition-colors duration-200"
//                 >
//                   CONTACT@WIITSOLUTIONS.COM
//                 </a>
//               </div>
//               <div className="flex items-center mt-5">
//                 <div className="mr-3">
//                   <svg
//                     className="w-7 h-7 text-white"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
//                   </svg>
//                 </div>
//                 <a
//                   href="tel:469-642-3303"
//                   className="hover:text-blue-300 transition-colors duration-200"
//                 >
//                   469-642-3303
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }




"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";

export default function HearForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <section className="text-white py-8 md:py-16 px-4 md:px-8 relative overflow-hidden bg-black">
      {/* Mobile Image - Responsive */}
      <div className="w-full h-[300px] sm:h-[400px] md:h-[600px] relative mb-16 md:mb-20">
        <Image 
          src="/image/mobile2.jpeg" 
          alt="image" 
          width={1000} 
          height={1000} 
          className="md:w-full md:h-full  object-center"
        />
        
        {/* Heading - Responsive positioning */}
        <div className="absolute left-0 lg:left-[-40%] right-0 bottom-[10px] md:bottom-[-1px] text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white px-4">
            WED LOVE TO HEAR FROM YOU
          </h1>
          <div className="w-[180px] h-[1.5px] bg-yellow-400 mx-auto mt-2"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-12 xl:gap-36">
          {/* Left Column - Form */}
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <p className="text-sm md:text-base mb-8 max-w-2xl">
              At WIIT Solutions Group, we are dedicated to providing exceptional
              ERP implementation consulting services. Whether you have
              questions, need assistance, or want to discuss your specific
              needs, our team is here to help. Reach out to us today, and lets
              explore how we can support your business goals and drive success
              together.
            </p>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="*First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="italic w-full p-3 bg-white text-black border border-gray-300 rounded-sm"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="phone"
                  placeholder="*Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="italic w-full p-3 bg-white text-black border border-gray-300 rounded-sm"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="*Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="italic w-full p-3 bg-white text-black border border-gray-300 rounded-sm"
                />
              </div>
              <div className="md:row-span-2">
                <textarea
                  name="message"
                  placeholder="*Comments/Questions"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="italic w-full h-full p-3 bg-white text-black border border-gray-300 rounded-sm min-h-[104px]"
                ></textarea>
              </div>
              <div>
                <input
                  type="text"
                  name="companyName"
                  placeholder="*Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="italic w-full p-3 bg-white text-black border border-gray-300 rounded-sm"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="*Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="italic w-full p-3 bg-white text-black border border-gray-300 rounded-sm"
                />
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <button
                  type="submit"
                  className="w-full p-3 bg-blue-400 hover:bg-blue-500 text-white font-medium transition-colors duration-200 rounded-sm"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Contact Info */}
          <div className="w-full lg:w-1/2">
            <div className="mb-12">
              <div className="relative">
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  OUR ADDRESS
                </h3>
                <div className="w-[180px] h-[1.5px] bg-yellow-400"></div>
              </div>
              <div className="flex items-start mt-8">
                <div className="mr-3 mt-1 flex-shrink-0">
                  <svg
                    className="w-7 h-7 sm:w-9 sm:h-9 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="font-bold">3948 LEGACY DRIVE | STE 106</p>
                  <p>PLANO, TEXAS 75023</p>
                </div>
              </div>
            </div>

            <div>
              <div className="relative">
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  OUR CONTACT
                </h3>
                <div className="w-[180px] h-[1.5px] bg-yellow-400"></div>
              </div>
              <div className="flex items-center mt-8">
                <div className="mr-3 flex-shrink-0">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <a
                  href="mailto:CONTACT@WIITSOLUTIONS.COM"
                  className="hover:text-blue-300 transition-colors duration-200 text-sm sm:text-base break-all"
                >
                  CONTACT@WIITSOLUTIONS.COM
                </a>
              </div>
              <div className="flex items-center mt-5">
                <div className="mr-3 flex-shrink-0">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                </div>
                <a
                  href="tel:469-642-3303"
                  className="hover:text-blue-300 transition-colors duration-200 text-sm sm:text-base"
                >
                  469-642-3303
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}