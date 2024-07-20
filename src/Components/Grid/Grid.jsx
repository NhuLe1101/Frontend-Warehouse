import React from 'react'
const Grid = ({ size, divisions, position }) => {
  return (
    <gridHelper args={[size, divisions]} position={position} />
    
  );
};

export default Grid
