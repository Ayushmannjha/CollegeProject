import React, { useRef, useState, useMemo, useEffect } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import kEarth from "./assets/images/1_earth_16k.jpg";
import zoomSoundSrc from "./assets/sounds/zoom-sound-effect-125029.mp3"; // Your sound file

const RotatingSphere = ({ onDone }) => {
  const meshRef = useRef();
  const texture = useLoader(THREE.TextureLoader, kEarth);
  const [startTime] = useState(Date.now());
  const { camera } = useThree();
  const audioRef = useRef(null);
  const [playedAudio, setPlayedAudio] = useState(false);

  const targetLat = 28.6139;
  const targetLon = 77.209;

  const indiaVector = useMemo(() => {
    const phi = (90 - targetLat) * (Math.PI / 180);
    const theta = (targetLon + 180) * (Math.PI / 180);
    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.cos(phi);
    const z = Math.sin(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z).normalize().multiplyScalar(1.05);
  }, []);

  // Load audio once
  useEffect(() => {
    audioRef.current = new Audio(zoomSoundSrc);
    audioRef.current.volume = 0.7;
  }, []);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const elapsed = (Date.now() - startTime) / 1000;

    let targetScale = elapsed < 16.5 ? 0.001 : elapsed < 20 ? 0.5 : 2.0;
    const currentScale = mesh.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.02);
    mesh.scale.set(newScale, newScale, newScale);

    // Play sound during zoom
    if (elapsed > 20 && !playedAudio && audioRef.current) {
      audioRef.current.play().catch((err) => console.warn("Audio play failed", err));
      setPlayedAudio(true);
    }

    if (elapsed < 20.5) {
      mesh.rotation.y += 0.03;
    } else {
      mesh.rotation.set(9.8, -0.2, 3.1);
      onDone?.();
    }

    camera.position.set(0, 0, 3.5);
    camera.lookAt(0, 0, 0);
  });

  return (
    <mesh ref={meshRef} scale={[0.001, 0.001, 0.001]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        color="white"
        metalness={0.5}
        roughness={0.4}
      />
    </mesh>
  );
};

export default RotatingSphere;
