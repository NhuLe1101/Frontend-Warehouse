import React from 'react';
import * as THREE from 'three';

const Items = ({ id, color, position, dimensions, quantity }) => {
    // Tạo một mảng chứa các bản sao của item dựa trên quantity
    const itemInstances = Array.from({ length: quantity }, (_, index) => {
        // Tinh toán vị trí cho các bản sao nếu cần
        const offset = index * 1.5; // Thay đổi giá trị này để thay đổi khoảng cách giữa các bản sao
        return (
            <group key={`${id}-${index}`} position={[position[0] + offset, position[1], position[2]]}>
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
