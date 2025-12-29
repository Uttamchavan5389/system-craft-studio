// Updated: 2025-12-29
import { useEffect, useState } from "react";

interface UseParallaxOptions {
  speed?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  enabled?: boolean;
}

/**
 * Custom hook for parallax scroll effects
 * @param speed - Parallax speed multiplier (0.1 = slow, 1.0 = fast)
 * @param offset - Initial offset in pixels
 * @param direction - Parallax movement direction
 * @param enabled - Enable/disable parallax effect
 */
export const useParallax = ({
  speed = 0.5,
  offset = 0,
  direction = "up",
  enabled = true,
}: UseParallaxOptions = {}) => {
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const parallaxValue = scrollY * speed;

      const newTransform = {
        x: direction === "left" ? -parallaxValue : direction === "right" ? parallaxValue : 0,
        y: direction === "up" ? -parallaxValue : direction === "down" ? parallaxValue : 0,
      };

      setTransform({
        x: newTransform.x + (direction === "left" || direction === "right" ? offset : 0),
        y: newTransform.y + (direction === "up" || direction === "down" ? offset : 0),
      });
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [speed, offset, direction, enabled]);

  return transform;
};

/**
 * Hook for element-based parallax (parallax relative to element position)
 */
export const useElementParallax = (
  ref: React.RefObject<HTMLElement>,
  speed: number = 0.5
) => {
  const [transform, setTransform] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate when element enters viewport
      const elementCenter = elementTop + rect.height / 2;
      const viewportCenter = scrollY + windowHeight / 2;
      const distance = (viewportCenter - elementCenter) * speed;

      setTransform(distance);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [ref, speed]);

  return transform;
};

