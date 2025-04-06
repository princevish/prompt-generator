import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Get in Touch</h1>
            <p className="text-muted-foreground">
              Have a question about my photography services or interested in booking a session? 
              Fill out the form below or use the contact information provided.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="bg-muted/30 p-6 rounded-lg space-y-6">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">contact@photoportfolio.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">
                      123 Photography Studio<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-3">Follow Me</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Twitter
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Facebook
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-6">Location</h2>
            <div className="aspect-[16/9] w-full rounded-lg overflow-hidden border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304903!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Studio Location"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;