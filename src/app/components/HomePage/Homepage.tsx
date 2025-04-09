import Image from "next/image";
import bannerImage from "../../../../public/image/banner1.jpeg";
import partner from "@/../../public/image/partner.png";
// import partnerd from "@/../../public/image/buttonbg.jpeg";

export default function Home() {
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
        <div className="pt-0  lg:pt-[50px] ml-[50px]">
          <div className="w-full lg:w-[1040px] h-[28px] bg-[#2B2B2B]  "></div>
          <div className="py-3 w-full lg:w-[1040px] flex justify-center">
            <h2 className="text-[18px] lg:text-[50px] text-white font-semibold  uppercase">
              Your satisfaction,is our priority
            </h2>
          </div>
          <div className="w-full lg:w-[1040px] h-[28px] bg-[#2B2B2B] ">
            <p className="text-xs pt-1 lg:pt-0 lg:text-base text-[#57A5BD] text-end pr-2">
              Exceptional IT Solutions Consulting Tailored for you
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 lg:flex-row items-center justify-center  lg:justify-end pt-[200px] ">
          <div>
            <Image
              src={partner}
              alt="Banner Image"
              width={100}
              height={100}
              className="w-[150px]"
            />
          </div>
          <div className="w-full lg:w-[500px]">
            <p className="text-white text-justify">
              unmatched industry expertise avalable nationwide. We are your
              trusted technology partner offering affordable solutions with
              quality serv±e at competitive prices
            </p>
            <p className="text-white text-justify mt-1 mb-1">
              Industry Experts in:
            </p>
            <p className="text-white text-justify">
              Government - Healthcare - Publk Schools (K-12) - Manufacturing -
              Retail
            </p>
          </div>
        </div>
        <div className="flex justify-center  lg:justify-end mt-5">
          <button
            className="px-7 py-2 text-black rounded-[80px] bg-no-repeat bg-center bg-cover"
            style={{
              backgroundImage: `url('/image/buttonbg.jpeg')`, // adjust path as needed
            }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
