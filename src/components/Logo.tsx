import React, { useMemo } from 'react';
import Lottie from 'lottie-react';
import animationData from '../animations/logo-animation.json';

interface LogoProps {
  isDarkMode: boolean;
}

const Logo: React.FC<LogoProps> = ({ isDarkMode }) => {
  const style = {
    height: 60,
    width: 60,
  };

  const themedAnimationData = useMemo(() => {
    const newAnimationData = JSON.parse(JSON.stringify(animationData));
    
    // light grey for dark mode, white for light mode
    const newColor = isDarkMode ? [0.9, 0.9, 0.9, 1] : [1, 1, 1, 1];

    newAnimationData.layers.forEach((layer: any) => {
      if (layer.shapes) {
        layer.shapes.forEach((shape: any) => {
          if (shape.it) {
            shape.it.forEach((item: any) => {
              if (item.ty === 'st' && item.c) { 
                item.c.k = newColor;
              }
            });
          }
        });
      }
    });

    return newAnimationData;
  }, [isDarkMode]);

  return (
    <div className="logo-container">
      <Lottie 
        animationData={themedAnimationData} 
        style={style}
        loop={true} 
      />
      <h1>Matcher</h1>
    </div>
  );
};

export default Logo; 