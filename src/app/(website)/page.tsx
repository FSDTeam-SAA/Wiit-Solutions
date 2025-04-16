
import AboutUs from "../components/About/AboutUs";
import MissionVision from "../components/About/OurMisson";
import ChooseUs from "../components/Contact/ChooseUs";
import HearForm from "../components/Contact/HearForm";
import Homepage from "../components/HomePage/Homepage";
import OurComprehensiveServices from "../components/NationwideServices/OurComprehensiveServices";
import Ourcorevalues from "../components/NationwideServices/Ourcorevalues";


export default function Home() {
  return (
    <div>
      <Homepage />
      <AboutUs />
      <MissionVision />
      <Ourcorevalues />
      <OurComprehensiveServices />
      <ChooseUs />
      <HearForm />
    </div>
  );
}
