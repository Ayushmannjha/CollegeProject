import React, { useEffect, useState } from 'react';
import './CenterExplosion.css';

import logo from './assets/images/maharanaprataplogo.png';
import rani from './assets/images/ranilakbailogo-removebg-preview.png';
import shiva from './assets/images/shivaji-logo.png';
import raja from './assets/images/rajavikramaditya.png';

import video1 from './assets/video/maharanapratap.mp4';


// Sub videos for each box
import mhkh from './assets/video/maharanapratapVsBehlolkhan.mp4';
import chk from './assets/video/cheetakkikahani.mp4';


const CenterExplosion = () => {
  const [explode, setExplode] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [videoEnded, setVideoEnded] = useState(null);
  const [selectedSubBox, setSelectedSubBox] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setExplode(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const boxData = [
    {
      id: 'logo',
      img: logo,
      position: 'top-left',
      video: video1,
      subBoxes: [
        { label: 'Sub A1', video: mhkh },
        { label: 'Sub A2', video: chk },
      ],
    },
    {
      id: 'rani',
      img: rani,
      position: 'top-right',
      video: video1,
      subBoxes: [
        { label: 'Sub B1', video: mhkh },
        { label: 'Sub B2', video: chk },
      ],
    },
    {
      id: 'shiva',
      img: shiva,
      position: 'bottom-left',
      video: video1,
      subBoxes: [
        { label: 'Sub C1', video: mhkh },
        { label: 'Sub C2', video: chk },
      ],
    },
    {
      id: 'raja',
      img: raja,
      position: 'bottom-right',
      video: video1,
      subBoxes: [
        { label: 'Maharanapratap Vs Behlol khan', video: mhkh },
        { label: 'Cheetak bravery', video: chk },
      ],
    },
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
            onClick={() => {
              setSelectedBox(box.id);
              setVideoEnded(null);
              setSelectedSubBox(null);
            }}
          >
            {isSelected && !selectedSubBox && (
              <>
                <video
                  src={box.video}
                  autoPlay
                  controls
                  onEnded={() => setVideoEnded(box.id)}
                  style={{
                    width: '100%',
                    height: '80%',
                    objectFit: 'cover',
                    borderRadius: '0.5rem',
                  }}
                />
                <button
                  className="close-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBox(null);
                    setVideoEnded(null);
                    setSelectedSubBox(null);
                  }}
                >
                  ❌
                </button>

                {/* Show sub-boxes after main video ends */}
                {videoEnded === box.id && (
                  <div className="sub-boxes">
                    {box.subBoxes.map((sub, i) => (
                      <div
                        key={i}
                        className="sub-box"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSubBox(sub);
                        }}
                      >
                        {sub.label}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {isSelected && selectedSubBox && (
              <>
                <video
                  src={selectedSubBox.video}
                  autoPlay
                  controls
                  style={{
                    width: '100%',
                    height: '80%',
                    objectFit: 'cover',
                    borderRadius: '0.5rem',
                  }}
                />
                <button
                  className="close-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSubBox(null); // go back to sub-box list
                  }}
                >
                  🔙
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
