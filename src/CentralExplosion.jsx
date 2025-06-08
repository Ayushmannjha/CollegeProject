import React, { useEffect, useState } from 'react';
import './CenterExplosion.css';
import logo from './assets/images/maharanaprataplogo.png';
import rani from './assets/images/ranilakbailogo-removebg-preview.png';
import shiva from './assets/images/shivaji-logo.png';
import raja from './assets/images/rajavikramaditya.png';

import video1 from './assets/video/maharanapratap.mp4';
import video2 from './assets/video/maharanapratap.mp4';
import video3 from './assets/video/maharanapratap.mp4';
import video4 from './assets/video/maharanapratap.mp4';

const CenterExplosion = () => {
  const [explode, setExplode] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setExplode(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const boxData = [
    { id: 'logo', img: logo, position: 'top-left', video: video1 },
    { id: 'rani', img: rani, position: 'top-right', video: video2 },
    { id: 'shiva', img: shiva, position: 'bottom-left', video: video3 },
    { id: 'raja', img: raja, position: 'bottom-right', video: video4 },
  ];

  return (
    <div className="explosion-overlay">
      {boxData.map((box) => {
        const isSelected = selectedBox === box.id;
        const hideOthers = selectedBox && selectedBox !== box.id;
        const explodeClass = explode ? box.position : '';

        return (
          <div
            key={box.id}
            className={`box ${box.id} ${explodeClass} ${isSelected ? 'centered-box' : ''} ${hideOthers ? 'hidden' : ''}`}
            style={{
              backgroundImage: isSelected ? 'none' : `url(${box.img})`,
            }}
            onClick={() => setSelectedBox(box.id)}
          >
            {isSelected && (
              <>
                <video
                  src={box.video}
                  autoPlay
                  controls
                  loop
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '0.5rem',
                  }}
                />
                <button
                  className="close-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBox(null);
                  }}
                >
                  ❌
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CenterExplosion;
