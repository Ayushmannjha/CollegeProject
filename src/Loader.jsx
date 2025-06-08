import React, { useEffect } from "react";
import { useProgress } from "@react-three/drei";
import ClipLoader from "react-spinners/ClipLoader"; // Import spinner

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
        zIndex: 10000,
        textAlign: "center",
        pointerEvents: "none",
      }}
    >
      <ClipLoader size={80} color="#000000" /> {/* Black spinner */}
      <p style={{ color: "white", marginTop: 15 }}>
        {Math.round(progress)}% loaded
      </p>
    </div>
  );
}

export default Loader;
