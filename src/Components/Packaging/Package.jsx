import React, { useContext, useEffect } from 'react';
import * as THREE from 'three';
import Items from '../../Components/Items/Items'; // Ensure path is correct
import { ItemContext } from '../../contexts/ItemProvider/ItemProvider';

const Package = ({ dimensions,position }) => {
    const { items } = useContext(ItemContext); // Fetch items from context

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
            {items
                .filter(item => item.packageId) // Lọc items để chỉ lấy các item thuộc package này
                .map(item => (
                    <Items
                        key={item.id}
                        id={item.id}
                        color={item.color}
                        dimensions={[item.length, item.width, item.height]}
                        position={[item.position[0], item.position[1] - dimensions[1] / 5, item.position[2]]}
                        quantity={item.quantity} // Truyền quantity vào đây
                    />
                ))}
        </group>
    );
};

export default Package;
