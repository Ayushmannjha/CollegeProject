import React from "react";

const LocationPin = ({ lat, lon, radius = 1.01 }) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return (
    <mesh position={[x, y, z]}>
      <coneGeometry args={[0.02, 0.06, 16]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

export default LocationPin;
