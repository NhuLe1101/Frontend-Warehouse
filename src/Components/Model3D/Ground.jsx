import React from 'react'

const Ground = () => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[17.5, 15]} />
            <meshStandardMaterial color="lightgray" side={2} />
        </mesh>
    );
}


export default Ground
