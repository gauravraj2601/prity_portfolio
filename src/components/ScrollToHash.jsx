import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Find the element by the hash identifier
      const targetId = hash.startsWith("#") ? hash.substring(1) : hash;
      const element = document.getElementById(targetId);
      if (element) {
        // Delay slightly to let the DOM paint completely
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else if (pathname === "/") {
      // Scroll to top of home page if there's no hash
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
}
