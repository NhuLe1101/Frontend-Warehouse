import React from 'react';
import * as THREE from 'three';

const limitPosition = (position, containerSize, objectSize, offset = 0) => {
    const halfContainer = containerSize / 2;
    const halfObject = objectSize / 2;

    return Math.min(Math.max(position + offset, -halfContainer + halfObject), halfContainer - halfObject);
};

const Items = ({ id, color, position, dimensions, quantity, packageDimensions }) => {
    // Tạo một mảng chứa các bản sao của item dựa trên quantity
    const itemInstances = Array.from({ length: quantity }, (_, index) => {
        // Tinh toán vị trí cho các bản sao
        const offsetX = index * 1.5; // Khoảng cách giữa các item theo trục X
        const limitedX = limitPosition(position[0], packageDimensions[0], dimensions[0], offsetX);
        const limitedY = limitPosition(position[1], packageDimensions[1], dimensions[1]);
        const limitedZ = limitPosition(position[2], packageDimensions[2], dimensions[2]);

        return (
            <group key={`${id}-${index}`} position={[limitedX, limitedY, limitedZ]}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} />
                <mesh>
                    <boxGeometry args={dimensions} />
                    <meshStandardMaterial 
                        color={color} 
                        opacity={0.7}
                        depthWrite={false}
                        depthTest={true} />
                </mesh>
                <lineSegments>
                    <edgesGeometry args={[new THREE.BoxGeometry(...dimensions)]} />
                    <lineBasicMaterial color="white" />
                </lineSegments>
            </group>
        );
    });

    return <>{itemInstances}</>; // Render tất cả các bản sao
};

export default Items;
