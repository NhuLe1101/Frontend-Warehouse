import React, { memo, useEffect, useRef, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

const AssetsModel = memo(({ position, scale }) => {
    const { scene } = useGLTF('/models/assets.glb', true);
    const modelRef = useRef();
  
    useEffect(() => {
      if (modelRef.current) {
        modelRef.current.position.set(...position);
        modelRef.current.scale.set(...scale);
      }
    }, [position, scale]);
  
    return (
      <Suspense fallback={<div>Đang tải mô hình...</div>}>
        <primitive ref={modelRef} object={scene.clone()} />
      </Suspense>
    );
  });
  
  export default AssetsModel;
  