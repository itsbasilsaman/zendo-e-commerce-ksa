 
import FeatureCard from "./components/MenuShowCase";
import PopularProducts from "./components/ProductLists";
import Testimonials from "./components/Testimonials";
import VegetablesCarousel from "./components/UI/Carousel";

export default function Home() {
  return (
    <div>
      <PopularProducts/>
       <FeatureCard/>
      <VegetablesCarousel/>
      <Testimonials/>
    </div>
  );
}
