import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

const LottieAnimation = ({ animationData }) => {
  const animationContainer = useRef(null);

  useEffect(() => {
    if (animationContainer.current) {
      lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData,
      });
    }
  }, [animationData]);

  return <div ref={animationContainer}></div>;
};

export default LottieAnimation;
