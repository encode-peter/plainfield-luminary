import { useEffect, useRef } from "react";

interface PublicAlbumProps {
  albumLink: string; // The Google Photos share link
  title?: string;
  description?: string;
  height?: number;
}

export const PublicAlbum: React.FC<PublicAlbumProps> = ({
  albumLink,
  title = "",
  description = "",
  height = 480,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create the div for the gallery
    const galleryDiv = document.createElement("div");
    galleryDiv.className = "pa-gallery-player-widget";
    galleryDiv.style.width = "100%";
    galleryDiv.style.height = `${height}px`;
    galleryDiv.style.display = "none"; // PublicAlbum.js will show it
    galleryDiv.setAttribute("data-link", albumLink);
    galleryDiv.setAttribute("data-title", title);
    galleryDiv.setAttribute("data-description", description);

    // Append galleryDiv to container
    containerRef.current?.appendChild(galleryDiv);

    // Inject the PublicAlbum script
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/publicalbum@latest/embed-ui.min.js";
    script.async = true;
    containerRef.current?.appendChild(script);

  }, [albumLink, title, description, height]);

  return <div ref={containerRef}></div>;
};
