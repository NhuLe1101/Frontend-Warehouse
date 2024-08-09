import React from 'react'
import Grid from '../Grid/Grid';
import Package from '../Packaging/Package';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { PackageContext } from './../PackageProvider/PackageProvider';
import { useContext, useEffect, useState } from 'react';

const LeftCard = () => {
  const { packages, setPackages } = useContext(PackageContext);
  const [gridSize, setGridSize] = useState(20);
  const [gridPosition, setGridPosition] = useState([0,0,0]);
  // const [count, setCount] = useState(0);
  useEffect(() => {
    const totalWidth = packages.reduce((acc, pkg) => acc + Math.max(pkg.height,pkg.length,pkg.width), 0);
    let position=[-centerOffsetX,-Math.max(...packages.map(pkg => pkg.width / 2)), 0];
    // console.log(totalWidth);
    // const totalWidth = packages.length * 20;
    const newSize = Math.max(20, totalWidth + 20);
    setGridSize(newSize);
    setGridPosition(position);
    let arrayYaxes = packages.map(pkg => pkg.width);
    const maxheight = Math.max(...arrayYaxes);
    let maxindexyaxis = arrayYaxes.indexOf(maxheight);
    
    for (let index = 0; index < packages.length; index++) {
      const element = packages[index];
      if(index == maxindexyaxis) continue;
      element.position[1] = gridPosition[1] + element.width/2;
    }
    setPackages(packages);
    

    // if(count > 0) {
    // packages.map((index,pkg) => pkg.position=[index*20, pkg.width / 2, 0]);
    // setPackages(packages);
    // }
    // setCount(count + 1);
    // console.log(count);
    
    // console.log('ok');
  }, [packages]);

  // var count = 0;
  const centerOffsetX = packages.length > 0 ? (gridSize - packages.length * 20) / 2 : 0;

  const items = [
    // { id: '1', color: 'green', position: [0, 0, 0], dimensions: [5, 4, 3] },
    // Thêm các item khác vào đây
  ];
  const boxDimensions = [16, 8, 16]; // Định nghĩa boxDimensions ở đây
  return (
    <div className='container'>
      <Canvas>
        <PerspectiveCamera makeDefault position={[40, 10, 0]} />
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
        <Grid size={gridSize} divisions={10} position={gridPosition} />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default LeftCard
