import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { EdgesGeometry, LineSegments, LineBasicMaterial, BoxGeometry, MeshStandardMaterial } from 'three';
import { GridHelper } from 'three';

// Component để vẽ một khối hộp có viền trắng
function BoxWithEdges({ position }) {
  const boxRef = React.useRef();

  return (
    <mesh position={position} ref={boxRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#5e03fc" />
      {/* Viền trắng */}
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new BoxGeometry(1, 1, 1)]} />
        <lineBasicMaterial attach="material" color="white" />
      </lineSegments>
    </mesh>
  );
}

// Component để vẽ một tầng với 3 ngăn không có khoảng cách
function ShelfLevel({ position }) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <BoxWithEdges key={i} position={[position[0] + i, position[1], position[2]]} />
      ))}
    </>
  );
}

// Component để vẽ một kệ với 5 tầng
function Shelf({ position }) {
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <ShelfLevel key={i} position={[position[0], position[1] + i, position[2]]} />
      ))}
    </>
  );
}

function Grid() {
  return <primitive object={new GridHelper(30, 10, 'white', 'gray')} />;
}

function Warehouse3D() {
  const rows = 4; // Số hàng
  const columns = 5; // Số kệ mỗi hàng
  const shelfSpacingX = 5; // Khoảng cách ngang giữa các kệ
  const shelfSpacingZ = 5; // Khoảng cách dọc giữa các hàng

  return (
    <Canvas
      orthographic
      camera={{ zoom: 15, position: [15, 20, 30] }}
      style={{ backgroundColor: '#1c1b1b', width: '100%', height: '50vh' }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <Grid />

      {/* Vẽ nhiều kệ với đúng trục X, Y, Z */}
      {Array.from({ length: rows }).map((_, rowIndex) =>
        Array.from({ length: columns }).map((_, columnIndex) => (
          <Shelf
            key={`${rowIndex}-${columnIndex}`}
            position={[
              columnIndex * shelfSpacingX - (columns * shelfSpacingX) / 2.2, // Lùi về hướng X âm
              0.5, // Tầng mặc định
              rowIndex * shelfSpacingZ - (rows * shelfSpacingZ) / 1.5, // Điều chỉnh trục Z để căn giữa
            ]}
          />
        ))
      )}
 
      <mesh position={[-6, 0, 12]} scale={[12, 0.01, 5]}>
        <boxGeometry />
        <meshStandardMaterial color="#ff5d54" />
        <Text
          position={[0, 1, 0]}  // Đặt tại vị trí trên bề mặt của box
          rotation={[-Math.PI / 2, 1, 0]}  // Xoay chữ 90 độ về phía mặt sàn
          fontSize={0.150}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Nhận/Đóng hàng
        </Text>
      </mesh>

      <mesh position={[8, 0, 12]} scale={[8, 0.01, 5]}>
        <boxGeometry />
        <meshStandardMaterial color="#1384ed" />
        <Text
          position={[0, 1, 0]}  // Đặt tại vị trí trên bề mặt của box
          rotation={[-Math.PI / 2, 1, 0]}  // Xoay chữ 90 độ về phía mặt sàn
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Vận chuyển
        </Text>
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}

export default Warehouse3D