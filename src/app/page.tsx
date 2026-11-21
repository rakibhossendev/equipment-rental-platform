import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getHomeData } from "@/lib/action/home/get-home-data";
import type { HomeData } from "../../typescript/main";

import Navbar from "./(public)/_components/Navbar/Navbar";
import Banner from "./(public)/_components/Banner/Banner";
import Footer from "./(public)/_components/Footer/Footer";
import HomeSection from "./(public)/_components/Home/Home";
import FeaturedEquipment from "./(public)/_components/Home/FeaturedEquipment";
import Categories from "./(public)/_components/Home/Categories";
import WhyChooseUs from "./(public)/_components/Home/WhyChooseUs";
import CustomerReviews from "./(public)/_components/Home/CustomerReviews";
import HowItWorks from "./(public)/_components/Home/HowItWorks";
import PlatformStats from "./(public)/_components/Home/PlatformStats";

export default async function Home() {
  // Homepage data (GET /home-data). If the API fails, static
  // sections below still render; Featured/Stats show fallbacks.
  let homeData: HomeData | null = null;

  try {
    homeData = await getHomeData();
  } catch (error) {
    console.error("Homepage data fetch failed:", error);
    homeData = null;
  }

  // Existing auth (BetterAuth) — used for the View Details link.
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isLoggedIn = Boolean(session?.user);

  return (
    <>
      <Navbar />
      <HomeSection />
      <Banner />
      <FeaturedEquipment
        equipment={homeData?.featuredEquipment ?? []}
        isLoggedIn={isLoggedIn}
      />
      <Categories />
      <WhyChooseUs />
      <CustomerReviews />
      <HowItWorks />
      <PlatformStats stats={homeData?.stats ?? null} />
      <Footer />
    </>
  );
}
