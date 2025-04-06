import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutSection } from "@/components/AboutSection";

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="flex-grow w-full pt-24 pb-16">
        <AboutSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;