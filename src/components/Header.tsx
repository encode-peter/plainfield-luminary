import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Facebook, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    // { name: "Home", href: "/" },
    // { name: "Gallery", href: "/gallery" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Plainfield Luminary Program" className="h-10 w-auto" />
            <span className="font-display text-lg font-bold text-primary hidden sm:block">
              Plainfield Luminaries
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Social Links */}
            <a
              href="https://www.facebook.com/people/Plainfield-Luminary-Program/61560355185282/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>

            <Button asChild size="sm" className="ml-2">
              <a
                href="https://www.zeffy.com/en-US/donation-form/light-and-unite-plainfield"
                target="_blank"
                rel="noopener noreferrer"
              >
                Donate
              </a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-primary/20">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="flex items-center gap-4 pt-2">
                <a
                  href="https://www.facebook.com/people/Plainfield-Luminary-Program/61560355185282/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>

              <Button asChild size="sm" className="w-fit">
                <a
                  href="https://www.zeffy.com/en-US/donation-form/light-and-unite-plainfield"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Donate
                </a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
