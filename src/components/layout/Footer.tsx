import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Photo Portfolio. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link 
              to="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link 
              to="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link 
              to="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link 
              to="/contact" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Contact"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Gallery
          </Link>
          <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}