import React from 'react'
import Grid from '../Grid/Grid';
import Package from '../Packaging/Package';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { PackageContext } from '../../contexts/PackageProvider/PackageProvider';
import { useContext, useEffect, useState } from 'react';
import CenteredGroup from './CenteredGroup';

const LeftCard = () => {
  const { packages, setPackages } = useContext(PackageContext);
  const [gridSize, setGridSize] = useState(20);
  const [gridPosition, setGridPosition] = useState([0, 0, 0]);

  const marginBox = (axes = 0, attr = 'length', padding = 5) => {
    for (let index = 0; index < packages.length - 1; index++) {
      const element = packages[index];
      const nextElement = packages[index + 1];
      let distance = Math.abs(nextElement.position[axes] - element.position[axes]);
      let trueDistance = (element[attr] / 2) + (nextElement[attr] / 2) + padding;
      if (distance < trueDistance) {
        nextElement.position[axes] = trueDistance + element.position[axes];
      }
    }
    setPackages(packages)
  }

  const alignBoxOnGround = () => {
    // căn chỉnh tất cả các hộp đều nằm trên mặt bàn
    let arrayYaxes = packages.map(pkg => pkg.width);
    const maxheight = Math.max(...arrayYaxes);
    let maxindexyaxis = arrayYaxes.indexOf(maxheight);
    for (let index = 0; index < packages.length; index++) {
      const element = packages[index];
      if (index == maxindexyaxis) continue;
      element.position[1] = gridPosition[1] + element.width / 2;
    }
    setPackages(packages);
  }

  const resizeGrid = () => {
    let totalWidth = packages.reduce((acc, pkg) => acc + pkg.length + 10, 0);
    const newSize = totalWidth + packages.length * 15;
    console.log(gridSize, totalWidth);
    
    if (gridSize < totalWidth) {
      setGridSize(newSize);
    }
  }

  useEffect(() => {
    if (packages.length == 0) return;
    let position = [0, -Math.max(...packages.map(pkg => pkg.width / 2)), 0];
    setGridPosition(() => position);
    resizeGrid();
    alignBoxOnGround();
    marginBox(0, 'length', 5);
  }, [packages]);

  const items = [
    // { id: '1', color: 'green', position: [0, 0, 0], dimensions: [5, 4, 3] },
    // { id: '2', color: 'pink', position: [5, 10, 11], dimensions: [5, 4, 3] },

    // Thêm các item khác vào đây
  ];
  return (
    <div className='container'>
      <Canvas>
        <PerspectiveCamera makeDefault position={[40, 10, 0]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} />
        <axesHelper args={[10]} />
        <CenteredGroup>
          {packages.map((pkg, index) => (
            <Package
              key={index}
              dimensions={[pkg.length, pkg.width, pkg.height]}
              items={items}
              position={[pkg.position[0], pkg.position[1], pkg.position[2]]}
            />
          ))}
        </CenteredGroup>
        <Grid size={gridSize} divisions={10} position={gridPosition} />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default LeftCard
