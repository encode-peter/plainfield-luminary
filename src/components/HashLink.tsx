import { useLocation, useNavigate } from "react-router-dom";

interface HashLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const HashLink = ({ to, children, className }: HashLinkProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isExternal = to.startsWith("http");

  const handleClick = (e: React.MouseEvent) => {
    if (isExternal) return;
    e.preventDefault();
    const [pathname, hash] = to.split("#");
    if (hash) {
      if (location.pathname !== pathname) {
        navigate(pathname, { replace: false });
        // wait a tick to scroll after navigation
        setTimeout(() => {
          const el = document.getElementById(hash);
          el?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      } else {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      if (location.pathname !== pathname) {
        navigate(pathname, { replace: false });
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <a
      href={to}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
};
