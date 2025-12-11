import { useLocation, useNavigate } from "react-router-dom";

interface HashLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const HashLink = ({ to, children, className }: HashLinkProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const [pathname, hash] = to.split("#");

    if (location.pathname !== pathname) {
      navigate(pathname, { replace: false });
      // wait a tick to scroll after navigation
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};
