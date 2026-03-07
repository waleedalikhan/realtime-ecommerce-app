import Banner from "@/components/pages/home/Banner";
import Features from "@/components/pages/home/Features";
import CTAStrip from "@/components/global/CTAStrip";

const Home: React.FC = () => {
  return (
    <>
      <Banner />
      <Features />
      <CTAStrip />
    </>
  );
};

export default Home;
