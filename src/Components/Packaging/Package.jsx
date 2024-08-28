import React from 'react'
import * as THREE from 'three';
import Items from '../../Components/Items/Items';
const Package = ({ dimensions, items, position }) => {
    return (
        <group position={position}>
            <mesh>
                <boxGeometry args={dimensions} />
                <meshStandardMaterial color="white" transparent={true} opacity={0.15} />
            </mesh>
            <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(...dimensions)]} />
                <lineBasicMaterial color="white" />
            </lineSegments>
            {items.map((item) => (
                <Items
                    key={item.id}
                    id={item.id}
                    color={item.color}
                    position={item.position.map((pos, index) =>
                        index === 1 ? pos - dimensions[1] / 2 : pos)}
                    dimensions={item.dimensions}
                />
            ))}
        </group>
    );
};

export default Package
