import { useRef, useEffect, useCallback } from "react";

const useScrollEventListener = (func, threshold, style) => {
  // console.log("요청옴");
  const dom = useRef();

  const handleScroll = useCallback(([entry]) => {
    const { current } = dom;
    if (entry.isIntersecting) {
      // console.log("실행됨");
      func();
    }
  }, []);

  useEffect(() => {
    let observer;
    const { current } = dom;
    if (current) {
      observer = new IntersectionObserver(handleScroll, { threshold });
      observer.observe(current);
      return () => observer && observer.disconnect();
    }
  }, [handleScroll]);
  return {
    ref: dom,
    style,
  };
};
export default useScrollEventListener;
