import { useTexture } from '@react-three/drei';
import React, { useRef, useState } from 'react';
import type { Mesh, BufferGeometry, Material } from 'three';

function Grass(props: any) {
  const grassTexture = useTexture('https://al-ro.github.io/images/grass/blade_diffuse.jpg');
  const alphaMap = useTexture('https://al-ro.github.io/images/grass/blade_alpha.jpg');
  const noiseTexture = useTexture('https://al-ro.github.io/images/grass/blade_diffuse.jpg');
  return (
    <mesh
      {...props}
      
    >
      
    </mesh>
  );
}

export default Grass;
