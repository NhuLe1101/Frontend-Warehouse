import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import { GridHelper } from 'three';

function Shelf({ position, color, label }) {
    return (
        <mesh position={position}>
            <planeGeometry args={[2, 1]} />
            <meshStandardMaterial color={color} />
            <Text position={[0, 0, 0.1]} fontSize={0.3} color="white">
                {label}
            </Text>
        </mesh>
    );
}
function Grid() {
    return (
        <primitive object={new GridHelper(30, 30, 'white', 'gray')} />
    );
}
function Warehouse3D() {
    return (
      <Canvas
        orthographic
        camera={{ zoom: 50, position: [0, 5, 10] }}
        style={{ backgroundColor: '#1a1a2e' }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
  
        {/* Vẽ các kệ */}
        <Shelf position={[-6, 4, 0]} color="#333366" label="Shelf A" />
        <Shelf position={[-3, 4, 0]} color="#333366" label="Shelf B" />
        <Shelf position={[0, 4, 0]} color="#333366" label="Shelf C" />
  
        {/* Vẽ các khu vực khác */}
        <mesh position={[5, 0, 0]}>
          <planeGeometry args={[2, 8]} />
          <meshStandardMaterial color="darkblue" />
          <Text position={[0, 0, 0.1]} fontSize={0.5} color="white">
            Shipping
          </Text>
        </mesh>
  
        <mesh position={[7, -3, 0]}>
          <planeGeometry args={[2, 4]} />
          <meshStandardMaterial color="#8b4513" />
          <Text position={[0, 0, 0.1]} fontSize={0.5} color="white">
            Receiving
          </Text>
        </mesh>
  
        {/* Grid */}
        <Grid />
  
        {/* Thêm OrbitControls để hỗ trợ zoom */}
        <OrbitControls />
      </Canvas>
    );
  }

export default Warehouse3D;
