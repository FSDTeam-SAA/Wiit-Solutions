import { PossibleSection } from "@/types/home";
import Image from "next/image";

export default function MissionVision({ missionVisionData }: { missionVisionData: PossibleSection }) {
  
  return (
    <div className="w-full bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-9 items-center">
          {/* Image section */}
          <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden ">
            <div className="relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Possibles/${missionVisionData?.img}`}
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
          <div className="w-full lg:w-1/2 space-y-8 text-right ">
            {/* Mission Section */}
            <div className="space-y-4">
              <div className="inline-block bg-[#8fe1e5] px-4 py-2 ">
                <h2 className="text-black text-2xl font-bold uppercase">
                  {missionVisionData?.title1}
                </h2>
              </div>
              <p className="text-sm md:text-base text-justify">
                {missionVisionData?.title1_content}
              </p>
            </div>

            {/* Vision Section */}
            <div className="space-y-4">
              <div className="inline-block bg-[#8fe1e5] px-4 py-2 ">
                <h2 className="text-black text-2xl font-bold uppercase">
                  {missionVisionData?.title2}
                </h2>
              </div>
              <p className="text-sm md:text-base text-justify">
                {missionVisionData?.title2_content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
