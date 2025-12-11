import { Facebook } from "lucide-react";
import logo from "@/assets/logo.png";
import { HashLink } from "./HashLink";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and description */}
          <div className="flex flex-col items-start space-y-4">
            <img src={logo} alt="Plainfield Luminary Program" className="w-16 h-16" />
            <p className="text-muted-foreground">
              Bringing light and community together in Plainfield.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <HashLink to="/#about" className="hover:text-primary transition-colors">
                  About
                </HashLink>
              </li>
              <li>
                <HashLink to="/#get-involved" className="hover:text-primary transition-colors">
                  Get Involved
                </HashLink>
              </li>
              <li>
                <HashLink to="/#contact" className="hover:text-primary transition-colors">
                  Contact
                </HashLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <a
              href="https://www.facebook.com/p/Plainfield-Luminary-Program-61560355185282/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Facebook className="w-5 h-5" />
              Follow us on Facebook
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Plainfield Luminary Program. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
