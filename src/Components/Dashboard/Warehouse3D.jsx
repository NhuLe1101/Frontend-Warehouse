import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import { GridHelper } from 'three';
import { useThree } from "@react-three/fiber";
import ShelfModel from '../Model3D/ShelfModel';
// function Shelf({ position, color, label }) {
//     return (
//         <mesh position={position}>
//             <planeGeometry args={[2, 1]} />
//             <meshStandardMaterial color={color} />
//             <Text position={[0, 0, 0.1]} fontSize={0.3} color="white">
//                 {label}
//             </Text>
//         </mesh>
//     );
// }
function Grid() {
    return (
        <primitive object={new GridHelper(30, 30, 'white', 'gray')} />
    );
}
// const Compartment = ({ position, color, nameComp }) => {
//   return (
//     <mesh position={position}>
//       <boxGeometry args={[0.4, 0.35, 0.4]} />
//       <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />

//       {/* Hiển thị tên của compartment */}
//       <Text
//         position={[0, 0.1, 0.25]}
//         fontSize={0.07}
//         color="white"
//         anchorX="center"
//         anchorY="middle"
//       >
//        N101
//       </Text>
//     </mesh>
//   );
// };
function Warehouse3D() {
    return (
      <Canvas
        orthographic
        camera={{ zoom: 50, position: [0, 5, 10] }}
        style={{ backgroundColor: '#CCCCCC' }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
  
        {/* Vẽ các kệ */}
        {/* <Compartment position={[0, 0, 0]} color="#e6b07a" nameComp="Compartment 1" /> */}
        <ShelfModel position={[0, 0, 0]} />

  
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
        {/* <Grid /> */}
  
        {/* Thêm OrbitControls để hỗ trợ zoom */}
        <OrbitControls />
      </Canvas>
    );
  }

export default Warehouse3D;
