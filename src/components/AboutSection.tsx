import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Instagram, Twitter } from "lucide-react";

export function AboutSection() {
  return (
    <div className="container px-4 mx-auto py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-6">About the Photographer</h1>
          <div className="space-y-4 text-lg">
            <p>
              Hello! I'm a passionate photographer dedicated to capturing the beauty of the world around us. 
              With over 10 years of experience, I specialize in landscape, portrait, and street photography.
            </p>
            <p>
              My work has been featured in various exhibitions and publications. I believe that photography 
              is not just about taking pictures, but about telling stories and preserving moments that matter.
            </p>
            <p>
              When I'm not behind the camera, you can find me exploring new locations, hiking in nature, 
              or experimenting with new techniques and equipment.
            </p>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <div className="flex flex-wrap gap-4">
              <Button className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                Email Me
              </Button>
              <Button variant="outline" className="flex items-center">
                <Instagram className="mr-2 h-4 w-4" />
                Instagram
              </Button>
              <Button variant="outline" className="flex items-center">
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
            </div>
          </div>
        </div>
        
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <img 
              src="https://images.unsplash.com/photo-1552168324-d612d77725e3" 
              alt="Photographer" 
              className="w-full h-auto object-cover aspect-[3/4]"
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Photography Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Portrait Sessions",
              description: "Professional portrait photography for individuals, couples, and families.",
            },
            {
              title: "Event Coverage",
              description: "Comprehensive photography services for weddings, parties, and corporate events.",
            },
            {
              title: "Commercial Photography",
              description: "High-quality images for businesses, products, and marketing materials.",
            },
          ].map((service, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6 h-full flex flex-col">
                <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                <p className="text-muted-foreground flex-grow">{service.description}</p>
                <Button variant="link" className="mt-4 p-0">
                  Learn more
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}