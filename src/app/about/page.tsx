import AboutBanner from "../components/about/AboutBanner";
import StorySection from "../components/about/StorySection";
import TeamSection from "../components/about/TeamSection";
import Testimonials from "../components/Testimonials";

export default function AboutPage() {
  return (
    <>
    <AboutBanner/>
     <StorySection/>
     <Testimonials/>
     <TeamSection/>
    </>
  );
}