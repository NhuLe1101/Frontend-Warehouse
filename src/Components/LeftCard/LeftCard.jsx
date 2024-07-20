import React from 'react'
import Grid from '../Grid/Grid';
import Package from '../Packaging/Package';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
const LeftCard = () => {
    const items = [
        { id: '1', color: 'green', position: [0, 0, 0], dimensions: [5, 4, 3] },
        // { id: '2', color: 'black', position: [5, 2, 1], dimensions: [1, 5, 2] },
        // { id: '3', color: 'purple', position: [3, 2, 2], dimensions: [3, 5, 2] },
        // Thêm các item khác vào đây
      ];
      const boxDimensions = [8, 6, 8]; // Định nghĩa boxDimensions ở đây
      // const [gridSize, setGridSize] = useState(10); // Kích thước ban đầu của grid
  return (
    <div className='container'>
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <Package dimensions={boxDimensions} items={items} position={[0, 0, 0]}/>
      {/* <Package dimensions={boxDimensions} items={items} position={[10, 0, 0]}/> */}
      <Grid size={10} divisions={10} position={[0, -boxDimensions[1] / 2, 0]} /> {/* Điều chỉnh vị trí lưới */}
      <OrbitControls />
    </Canvas>
    </div>
  )
}

export default LeftCard
