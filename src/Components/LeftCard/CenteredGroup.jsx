import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Box3, Vector3 } from 'three';

export default function CenteredGroup({ children }) {
  const groupRef = useRef();
  const { scene } = useThree();

  useEffect(() => {
    if (groupRef.current) {
      // Tính toán bounding box của nhóm
      const box = new Box3().setFromObject(groupRef.current);
      const center = box.getCenter(new Vector3());

      // Dịch chuyển nhóm ngược lại vị trí trung tâm
      groupRef.current.position.sub(center);
    }
  }, [children]);

  return <group ref={groupRef}>{children}</group>;
}
