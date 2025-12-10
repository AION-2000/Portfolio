import React, { useCallback } from 'react';

const useSmoothScroll = () => {
  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    // Extract ID from href (e.g., "#work" -> "work")
    const targetId = href.replace(/.*\#/, "");
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      // Push state to history to update URL without jumping
      window.history.pushState({}, "", `#${targetId}`);
    }
  }, []);

  return scrollTo;
};

export default useSmoothScroll;