import React, { memo, useEffect, useRef, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

const ShelfModel = memo(({ position }) => {
    const { scene } = useGLTF('/models/metal_shelf_-_5mb.glb', true);
    const modelRef = useRef();
  
    useEffect(() => {
      if (modelRef.current) {
        modelRef.current.position.set(...position);
      }
    }, [position]);
  
    return (
      <Suspense fallback={<div>Đang tải mô hình...</div>}>
        <primitive ref={modelRef} object={scene.clone()} />
      </Suspense>
    );
  });
  
  export default ShelfModel;
  