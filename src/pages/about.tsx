import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Camera, Award, Users, MapPin } from "lucide-react";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[40vh] bg-black">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70">
            <img
              src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=2070&auto=format&fit=crop"
              alt="Photographer"
              className="w-full h-full object-cover opacity-70"
            />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-end items-center text-center p-6 md:p-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              About Me
            </h1>
          </div>
        </section>
        
        {/* Bio Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <div className="sticky top-24 space-y-6">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
                  alt="Photographer Portrait"
                  className="w-full rounded-lg"
                />
                
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">John Doe</h2>
                  <p className="text-muted-foreground flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    New York, USA
                  </p>
                  
                  <div className="flex space-x-4">
                    <Button asChild variant="outline" size="sm">
                      <Link to="/contact">Contact Me</Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link to="/gallery">View Work</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">My Story</h3>
                <p className="text-muted-foreground mb-4">
                  I am a professional photographer with over 10 years of experience capturing moments that tell stories. My journey began when I received my first camera as a gift, and since then, I've been passionate about freezing time through my lens.
                </p>
                <p className="text-muted-foreground mb-4">
                  My work spans multiple genres, from breathtaking landscapes to intimate portraits. I believe that photography is not just about taking pictures; it's about creating visual narratives that evoke emotions and preserve memories.
                </p>
                <p className="text-muted-foreground">
                  Throughout my career, I've had the privilege of working with various clients and publications, each project adding a unique dimension to my portfolio. My photographs have been featured in several exhibitions and magazines, earning recognition for their distinctive style and emotional depth.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">My Approach</h3>
                <p className="text-muted-foreground mb-4">
                  I approach each photography session with a blend of technical expertise and artistic vision. Whether I'm capturing the grandeur of natural landscapes or the subtle expressions in a portrait, I focus on authenticity and emotional connection.
                </p>
                <p className="text-muted-foreground">
                  My style is characterized by a careful attention to light, composition, and moment. I believe in minimal post-processing, preferring to get things right in-camera whenever possible. This approach results in images that feel genuine and timeless.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-muted/30 p-6 rounded-lg text-center">
                  <Camera className="mx-auto h-8 w-8 mb-2" />
                  <h4 className="font-medium mb-1">Expertise</h4>
                  <p className="text-sm text-muted-foreground">
                    Landscape, Portrait, Architecture, Wildlife
                  </p>
                </div>
                
                <div className="bg-muted/30 p-6 rounded-lg text-center">
                  <Award className="mx-auto h-8 w-8 mb-2" />
                  <h4 className="font-medium mb-1">Recognition</h4>
                  <p className="text-sm text-muted-foreground">
                    Multiple awards for excellence in photography
                  </p>
                </div>
                
                <div className="bg-muted/30 p-6 rounded-lg text-center">
                  <Users className="mx-auto h-8 w-8 mb-2" />
                  <h4 className="font-medium mb-1">Clients</h4>
                  <p className="text-sm text-muted-foreground">
                    Worked with over 100 satisfied clients
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Equipment</h3>
                <p className="text-muted-foreground mb-4">
                  I use professional-grade equipment to ensure the highest quality in my work:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Canon EOS R5 & Sony A7R IV</li>
                  <li>Selection of prime lenses (24mm, 35mm, 50mm, 85mm)</li>
                  <li>Professional zoom lenses (16-35mm, 24-70mm, 70-200mm)</li>
                  <li>Lighting equipment for studio and on-location shoots</li>
                  <li>Advanced post-processing software and techniques</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;