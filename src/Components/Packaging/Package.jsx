import React, { useContext, useEffect } from 'react';
import * as THREE from 'three';
import Items from '../../Components/Items/Items'; // Ensure path is correct
import { ItemContext } from '../../contexts/ItemProvider/ItemProvider';
const limitPosition = (position, containerSize, objectSize) => {
    const halfContainer = containerSize / 2;
    const halfObject = objectSize / 2;

    return Math.min(Math.max(position, -halfContainer + halfObject), halfContainer - halfObject);
};

const Package = ({ dimensions, position }) => {
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
                .map(item => {
                    // Giới hạn vị trí của item để không ra ngoài package
                    const limitedX = limitPosition(item.position[0], dimensions[0], item.length);
                    const limitedY = limitPosition(item.position[1] - dimensions[1] / 5, dimensions[1], item.height);
                    const limitedZ = limitPosition(item.position[2], dimensions[2], item.width);

                    return (
                        <Items
                            key={item.id}
                            id={item.id}
                            color={item.color}
                            dimensions={[item.length, item.width, item.height]}
                            position={[limitedX, limitedY, limitedZ]} // Vị trí giới hạn
                            quantity={item.quantity} // Truyền quantity vào đây
                            packageDimensions={dimensions} // Truyền kích thước package để kiểm tra giới hạn
                        />
                    );
                })}
        </group>
    );
};

export default Package;
