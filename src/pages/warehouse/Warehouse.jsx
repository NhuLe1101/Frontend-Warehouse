import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { memo } from 'react';

function Scene() {
  return (
    <>
      <directionalLight intensity={1} position={[5, 10, 5]} castShadow />
      <ambientLight intensity={0.5} />
    </>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="lightgray" side={2} />
    </mesh>
  );
}

const ShelfModel = memo(({ position }) => {
  const { scene } = useGLTF('/models/metal_shelf_-_5mb.glb', true);
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.position.set(...position); // Set model position after loading
    }
  }, [position]);

  return (
    <Suspense fallback={<div>Đang tải mô hình...</div>}>
      <primitive ref={modelRef} object={scene.clone()} />
    </Suspense>
  );
});
const TruckModel = memo(({ position, scale }) => {
  const { scene } = useGLTF('/models/truck.glb', true);
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.position.set(...position); // Set model position after loading
      modelRef.current.scale.set(...scale); // Set model scale
    }
  }, [position, scale]);

  return (
    <Suspense fallback={<div>Đang tải mô hình...</div>}>
      <primitive ref={modelRef} object={scene.clone()} />
    </Suspense>
  );
});
const Warehouse = () => {
  const shelfPositions = [
    [-6, 0, 0],
    [-3, 0, 0],
    [0, 0, 0],
    [3, 0, 0],
    [6, 0, 0],
    // cách ra nè
    [-6, 0, -2],
    [-3, 0, -2],
    [0, 0, -2],
    [3, 0, -2],
    [6, 0, -2]
    // Thêm các vị trí khác tại đây
  ];

  return (
    <div className='warehouse' style={{ marginTop: '0px' }}>
      <Canvas style={{ width: '100%', height: '100vh' , background: 'black'}} shadows camera={{ position: [5, 8, 18], fov: 60 }}>
        <Scene />
        <OrbitControls />
        <Ground />
        {shelfPositions.map((pos, index) => (
          <ShelfModel key={index} position={pos} />
        ))}
        <TruckModel position={[5, 1, 11]} scale={[0.5,0.5,0.5]}/> {/* Thêm mô hình xe tải ở vị trí nào đó */}
        <TruckModel position={[8, 1, 11]} scale={[0.5,0.5,0.5]}/> {/* Thêm mô hình xe tải ở vị trí nào đó */}

      </Canvas>
    </div>
  );
};

export default Warehouse;