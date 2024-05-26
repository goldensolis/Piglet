import React, { useEffect, useState } from 'react';
import LottieAnimation from './LottieAnimation';
import piggyhappy from '../animations/piggyhappy.json';
import piggyswim from '../animations/piggyswim.json';
import piggywalk from '../animations/piggywalk.json';

const animations = [piggyhappy, piggyswim, piggywalk];

const getRandomPosition = () => {
  const x = Math.random() * 100; // Horizontal position in percentage
  const y = 20 + Math.random() * 50; // Vertical position in percentage 
  return { x, y };
};

const getRandomDirection = () => {
  return Math.random() > 0.5 ? 'right' : 'left';
};

const BackgroundPig = ({ animationData, size, direction, initialPosition }) => {
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    const movePig = () => {
      setPosition((prevPosition) => {
        const newX = direction === 'right' ? prevPosition.x + 0.5 : prevPosition.x - 0.5;
        return { ...prevPosition, x: newX > 100 ? -10 : newX < -10 ? 100 : newX };
      });
    };

    const interval = setInterval(movePig, 50); // Move every 50ms

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div
      style={{
        position: 'absolute',
        top: `${position.y}%`,
        left: `${position.x}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: -1,
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <LottieAnimation animationData={animationData} />
    </div>
  );
};

const BackgroundPigs = ({ counts = [2, 1, 1], size = 100 }) => {
  const pigComponents = [];
  counts.forEach((count, index) => {
    for (let i = 0; i < count; i++) {
      pigComponents.push(
        <BackgroundPig
          key={`${index}-${i}`}
          animationData={animations[index % animations.length]}
          size={size}
          direction={getRandomDirection()}
          initialPosition={getRandomPosition()}
        />
      );
    }
  });

  return <>{pigComponents}</>;
};

export default BackgroundPigs;
