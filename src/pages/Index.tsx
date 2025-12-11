import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Mission } from "@/components/Mission";
import { Events } from "@/components/Events";
import { HowItWorks } from "@/components/HowItWorks";
import { Impact } from "@/components/Impact";
import { Donation } from "@/components/Donation";
import { GetInvolved } from "@/components/GetInvolved";
import { Volunteer } from "@/components/Volunteer";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Mission />
      <Events />
      <Impact />
      <HowItWorks />
      <Donation />
      <Volunteer />
      <GetInvolved />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
