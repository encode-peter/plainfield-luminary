import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Mission } from "@/components/Mission";
import { Events } from "@/components/Events";
import { Sponsors } from "@/components/Sponsors";
import { Impact } from "@/components/Impact";
import { HowItWorks } from "@/components/HowItWorks";
import { Donation } from "@/components/Donation";
import { Volunteer } from "@/components/Volunteer";
import { GetInvolved } from "@/components/GetInvolved";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen index-section">
      <Header />
      <Hero />
      <About />
      <Mission />
      <Events />
      <Sponsors />
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
