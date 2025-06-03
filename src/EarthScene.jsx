import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import "./earthScene.css"; 
import MovingStars from "./MovingStars";
import RotatingSphere from "./RotatingSphere";
import LocationPin from "./LocationPin";
import soundFile from './assets/openai-fm-ash-dramatic.wav';

const EarthScene = () => {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [redirected, setRedirected] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const audioRef = useRef(null);

  // Play music when the scene starts
 useEffect(() => {
    if (started && !audioRef.current) {
      const audio = new Audio(soundFile);
      audio.loop = true;
      audio.volume = 0.8;
      audioRef.current = audio;
      audio.play().catch((err) => console.warn("Autoplay failed:", err));
    }
  }, [started]);

  // Trigger fade out and navigate to /india
  const handleDone = () => {
    if (!redirected) {
      setFadeOut(true);
      setTimeout(() => {
        setRedirected(true);
        navigate("/india");
      }, 1000);
    }
  };

  return (
    <div
      className={`fade-wrapper ${fadeOut ? "fade-out" : ""}`}
      style={{ position: "relative", width: "100vw", height: "100vh" }}
    >
      {!started ? (
        // Start Button Only
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
        // Full Earth Scene
        <Canvas style={{ height: "100%", width: "100%" }}>
          <color attach="background" args={["#0d0d0c"]} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[2, 2, 2]} intensity={9} color={0x9cdba6} />
          <MovingStars />
          <RotatingSphere onDone={handleDone} />
          <LocationPin lat={28.6139} lon={77.209} radius={1.01} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      )}
    </div>
  );
};

export default EarthScene;
