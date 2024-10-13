import React from 'react';
import { Text } from '@react-three/drei';

const Compartment = ({ position, hasItem, onClick, nameComp }) => {
    return (
      <mesh position={position} onClick={onClick}>
        <boxGeometry args={[0.4, 0.35, 0.4]} />
        <meshStandardMaterial
          color={hasItem ? '#4CAF50' : '#e6b07a'}
          roughness={0.6}
          metalness={0.1}
        />
        <Text
          position={[0, 0.1, 0.25]}
          fontSize={0.07}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {nameComp}
        </Text>
      </mesh>
    );
  };
  
  export default Compartment;
  