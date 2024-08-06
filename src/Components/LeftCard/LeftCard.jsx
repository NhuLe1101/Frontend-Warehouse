import React from 'react'
import Grid from '../Grid/Grid';
import Package from '../Packaging/Package';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { PackageContext } from './../PackageProvider/PackageProvider';
import { useContext, useEffect, useState } from 'react';

const LeftCard = () => {
  const { packages } = useContext(PackageContext);
  const [gridSize, setGridSize] = useState(20);

  
  useEffect(() => {
    const totalWidth = packages.length * 20;
    const newSize = Math.max(20, totalWidth + 20);
    setGridSize(newSize);
  }, [packages]);

  const centerOffsetX = packages.length > 0 ? (gridSize - packages.length * 20) / 2 : 0;

  const items = [
    // { id: '1', color: 'green', position: [0, 0, 0], dimensions: [5, 4, 3] },
    // Thêm các item khác vào đây
  ];
  const boxDimensions = [16, 8, 16]; // Định nghĩa boxDimensions ở đây
  // const [gridSize, setGridSize] = useState(10); // Kích thước ban đầu của grid
  return (
    <div className='container'>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} />
        {packages.map((pkg, index) => (
          <Package
            key={index}
            dimensions={[pkg.length, pkg.width, pkg.height]}
            items={items}
            position={[pkg.position[0] - centerOffsetX, pkg.position[1], pkg.position[2]]}
          />
        ))}
        <Grid size={gridSize} divisions={10} position={[-centerOffsetX, -boxDimensions[1] / 2, 0]} /> {/* Điều chỉnh vị trí lưới */}
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default LeftCard
