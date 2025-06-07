import React from "react";
import { Canvas } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";

export default function MaharanaPratapScene2() {
  return (
    <Canvas camera={{ position: [0, 15, 35], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[30, 40, 20]} intensity={0.9} />
      {/* मैदान */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[70, 40]} />
        <meshStandardMaterial color="#C2B280" />
      </mesh>
      {/* टेक्स्ट */}
      <Text
        position={[0, 6, 0]}
        fontSize={2}
        color="#8B0000"
        anchorX="center"
        anchorY="middle"
   
      >
        1576 - हल्दीघाटी का युद्ध
      </Text>
      <OrbitControls />
    </Canvas>
  );
}
