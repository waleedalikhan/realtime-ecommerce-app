import { Metadata, NextPage } from "next";
import Home from "@/components/pages/home";

export const metadata: Metadata = {
  title: "Realtime Commerce | Home",
  description: "Home page",
};

const HomePage: NextPage = () => {
  return <Home />;
};

export default HomePage;
