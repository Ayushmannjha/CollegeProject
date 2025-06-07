import React, { useEffect, useState } from 'react';
import './CenterExplosion.css';
import logo from './assets/images/maharanaprataplogo.png';
import rani from './assets/images/ranilakbailogo-removebg-preview.png';
import shiva from './assets/images/shivaji-logo.png';
import raja from './assets/images/rajavikramaditya.png';
const CenterExplosion = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation once after mount
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="explosion-overlay">
      <div
        className={`box red ${animate ? 'top-left' : ''}`}
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className={`box blue ${animate ? 'top-right' : ''}`}  style={{
          backgroundImage: `url(${rani})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}/>
      <div className={`box green ${animate ? 'bottom-left' : ''}`} style={{
          backgroundImage: `url(${shiva})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}/>
      <div className={`box yellow ${animate ? 'bottom-right' : ''}`} style={{
          backgroundImage: `url(${raja})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}/>
    </div>
  );
};

export default CenterExplosion;
