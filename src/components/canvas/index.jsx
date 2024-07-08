import React from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Example of extending THREE namespace with a custom object
extend({ CustomMaterial: THREE.MeshStandardMaterial });

const MainRenderer = ({ children }) => {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {children}
    </Canvas>
  );
};

export default MainRenderer;
