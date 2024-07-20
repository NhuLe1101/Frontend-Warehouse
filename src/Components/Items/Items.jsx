import React from 'react'
import * as THREE from 'three';

const Items = ({ id, color, position, dimensions }) => {
    return (
        <group position={[position[0], position[1] + dimensions[1] / 2, position[2]]}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} />
            <mesh>
                <boxGeometry args={dimensions} />
                <meshStandardMaterial 
                    color={color} 
                    opacity={0.1}
                    depthWrite={false}
                    depthTest={true} />
            </mesh>
            <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(...dimensions)]} />
                <lineBasicMaterial color="white" />
            </lineSegments>
        </group>
    );
};

export default Items
