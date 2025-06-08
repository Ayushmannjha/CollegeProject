import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useProgress } from "@react-three/drei";
import CenterExplosion from "./CentralExplosion";
import RotatingSphere from "./RotatingSphere";
import MovingStars from "./MovingStars";

import soundFile from "./assets/sounds/openai-fm-ash-dramatic.mp3";
import secondSoundFile from "./assets/sounds/space-sound-hi-109577.mp3";

// Custom Spinner Component outside WebGL
function Loader({ onLoaded }) {
  const { active, progress } = useProgress();

  useEffect(() => {
    if (!active && progress === 100) {
      onLoaded();
    }
  }, [active, progress, onLoaded]);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        textAlign: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          border: "8px solid #ddd",
          borderTop: "8px solid #000",
          borderRadius: "50%",
          animation: "spin 1.5s linear infinite",
          margin: "0 auto",
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
      <p style={{ color: "white", marginTop: 10 }}>{Math.round(progress)}% loaded</p>
    </div>
  );
}

const EarthScene = () => {
  const [started, setStarted] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  const audioRef = useRef(null);
  const audioRef2 = useRef(null);

  useEffect(() => {
    if (started && loadingComplete && !audioRef.current) {
      const audio1 = new Audio(soundFile);
      audio1.loop = false;
      audio1.volume = 0.8;
      audioRef.current = audio1;

      audio1.play().catch((err) => console.warn("First sound autoplay failed:", err));

      const timeout = setTimeout(() => {
        const audio2 = new Audio(secondSoundFile);
        audio2.loop = false;
        audio2.volume = 0.8;
        audioRef2.current = audio2;

        audio2.play().catch((err) => console.warn("Second sound failed:", err));
      }, 7000);

      return () => clearTimeout(timeout);
    }
  }, [started, loadingComplete]);

  useEffect(() => {
    if (!started || !loadingComplete) return;

    const timer = setTimeout(() => {
      setShowExplosion(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, [started, loadingComplete]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#0d0d0c",
      }}
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
            zIndex: 20,
          }}
        >
          Start
        </button>
      ) : (
        <>
          {!loadingComplete && <Loader onLoaded={() => setLoadingComplete(true)} />}

          <Canvas
            style={{
              height: "100%",
              width: "100%",
              display: "block",
            }}
          >
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

          {loadingComplete && showExplosion && <CenterExplosion />}
        </>
      )}
    </div>
  );
};

export default EarthScene;
