import Image from "next/image";

export default function MissionVision() {
  return (
    <div className="w-full bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-9 items-center">
          {/* Image section */}
          <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden">
            <div className="relative">
              <Image
                src="/image/our-misson.jpeg"
                alt="Person jumping across a gap between cliffs with 'POSSIBLE' text"
                width={500}
                height={400}
                className="w-full h-auto rounded-3xl"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-3xl">
              </div>
            </div>
          </div>

          {/* Mission and Vision section */}
          <div className="w-full lg:w-1/2 space-y-8 text-right">
            {/* Mission Section */}
            <div className="space-y-4">
              <div className="inline-block bg-[#8fe1e5] px-4 py-2 ">
                <h2 className="text-black text-2xl font-bold uppercase">
                  Our Mission
                </h2>
              </div>
              <p className="text-sm md:text-base text-justify">
                Our mission is to deliver unparalleled value to our clients by
                empowering them with comprehensive, innovative ERP solutions. We
                are dedicated to fostering long-term partnerships built on trust
                and a relentless pursuit of operational excellence, ensuring
                that every project not only meets but exceeds expectations.
              </p>
            </div>

            {/* Vision Section */}
            <div className="space-y-4">
              <div className="inline-block bg-[#8fe1e5] px-4 py-2 ">
                <h2 className="text-black text-2xl font-bold uppercase">
                  Our Vision
                </h2>
              </div>
              <p className="text-sm md:text-base text-justify">
                Our vision is to revolutionize the IT industry by delivering
                innovative, reliable, and affordable solutions that empower
                businesses to achieve their full potential. We are committed to
                fostering customer satisfaction through exceptional service and
                leveraging our expertise to drive technological advancements.
                Our goal is to be the trusted partner for businesses worldwide,
                ensuring their success through our unwavering dedication to
                quality and excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
