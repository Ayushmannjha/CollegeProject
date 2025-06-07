import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CenterExplosion from "./CentralExplosion";
import RotatingSphere from "./RotatingSphere";
import MovingStars from "./MovingStars";

import soundFile from './assets/openai-fm-ash-dramatic.mp3';

const EarthScene = () => {
  const [started, setStarted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const audioRef = useRef(null);

  // Play music when scene starts
  useEffect(() => {
    if (started && !audioRef.current) {
      const audio = new Audio(soundFile);
      audio.loop = true;
      audio.volume = 0.8;
      audioRef.current = audio;
      audio.play().catch((err) => console.warn("Autoplay failed:", err));
    }
  }, [started]);

  // Trigger explosion after 30 seconds of starting
  useEffect(() => {
    if (!started) return;

    const timer = setTimeout(() => {
      setShowExplosion(true);

      // Hide explosion after 3 seconds (optional)
     // setTimeout(() => setShowExplosion(false), 3000);
    }, 30000);

    return () => clearTimeout(timer);
  }, [started]);

  return (
    <div
      className={`fade-wrapper ${fadeOut ? "fade-out" : ""}`}
      style={{ position: "relative", width: "100vw", height: "100vh" }}
    >
      {!started ? (
        <button
          onClick={() => setStarted(true)}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "16px 32px",
            fontSize: "24px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          Start
        </button>
      ) : (
        <>
          <Canvas style={{ height: "100%", width: "100%" }}>
            <color attach="background" args={["#0d0d0c"]} />
            <ambientLight intensity={0.4} />
            <directionalLight position={[2, 2, 2]} intensity={9} color={0x9cdba6} />
            <MovingStars />
            <RotatingSphere />

            <OrbitControls
              enableZoom={true}
              enableRotate={true}
              enablePan={false}
              rotateSpeed={0.5}
              zoomSpeed={0.6}
              maxPolarAngle={Math.PI}
              minPolarAngle={0}
            />
          </Canvas>

          {/* Explosion overlay */}
          {showExplosion && <CenterExplosion />}
        </>
      )}
    </div>
  );
};

export default EarthScene;
