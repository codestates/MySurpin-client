import { useRef, useEffect, useCallback } from "react";

<<<<<<< HEAD:mysurpin-client/src/hooks/useScrollEventListener.js.js
const useScrollEventListener = (func, threshold, style) => {
=======
const useScrollEventListener = (func, threshold) => {
>>>>>>> ed57e190e979d75d5159642126ab13810ef6ff86:mysurpin-client/src/hooks/useScrollEventListener.js
  const dom = useRef();

  const handleScroll = useCallback(([entry]) => {
    const { current } = dom;
    if (entry.isIntersecting) {
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
