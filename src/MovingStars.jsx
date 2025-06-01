import React, { useRef, useMemo } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MovingStars = ({ count = 10000 }) => {
  const meshRef = useRef();
  const texture = useLoader(
    THREE.TextureLoader,
    "https://threejs.org/examples/textures/sprites/circle.png"
  );

  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      pos.push(
        THREE.MathUtils.randFloatSpread(200),
        THREE.MathUtils.randFloatSpread(200),
        THREE.MathUtils.randFloatSpread(200)
      );
    }
    return new Float32Array(pos);
  }, [count]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005;
      meshRef.current.rotation.x += 0.0003;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        color="white"
        size={0.7}
        sizeAttenuation
        transparent
        opacity={0.9}
        alphaTest={0.1}
        depthWrite={false}
      />
    </points>
  );
};

export default MovingStars;
