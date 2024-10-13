import React from 'react'

const Scene = () => {
    return (
        <>
          <directionalLight intensity={1} position={[5, 10, 5]} castShadow />
          <ambientLight intensity={0.5} />
        </>
      );
}

export default Scene
