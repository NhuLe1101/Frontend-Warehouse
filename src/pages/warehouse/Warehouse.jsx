import React, { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { memo } from 'react';
import PopupItems from '../../Components/PopupItems/PopupItems';
import ShelfService from '../../api/shelf';
import { Text } from '@react-three/drei';
function Scene() {
  return (
    <>
      <directionalLight intensity={1} position={[5, 10, 5]} castShadow />
      <ambientLight intensity={0.5} />
    </>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="lightgray" side={2} />
    </mesh>
  );
}

const TruckModel = memo(({ position, scale }) => {
  const { scene } = useGLTF('/models/truck.glb', true);
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.position.set(...position); // Set model position after loading
      modelRef.current.scale.set(...scale); // Set model scale
    }
  }, [position, scale]);

  return (
    <Suspense fallback={<div>Đang tải mô hình...</div>}>
      <primitive ref={modelRef} object={scene.clone()} />
    </Suspense>
  );
});
const AssetsModel = memo(({ position, scale }) => {
  const { scene } = useGLTF('/models/assets.glb', true);
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.position.set(...position); // Set model position after loading
      modelRef.current.scale.set(...scale); // Set model scale
    }
  }, [position, scale]);

  return (
    <Suspense fallback={<div>Đang tải mô hình...</div>}>
      <primitive ref={modelRef} object={scene.clone()} />
    </Suspense>
  );
});
const ShelfModel = memo(({ position }) => {
  const { scene } = useGLTF('/models/metal_shelf_-_5mb.glb', true);
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.position.set(...position);
    }
  }, [position]);

  return (
    <Suspense fallback={<div>Đang tải mô hình...</div>}>
      <primitive ref={modelRef} object={scene.clone()} />
    </Suspense>
  );
});
function Compartment({ position, hasItem, onClick, nameComp }) {
  return (
    <mesh position={position} onClick={onClick}>
      <boxGeometry args={[0.4, 0.35, 0.4]} />

      <meshStandardMaterial
        color={hasItem ? '#4CAF50' : '#e6b07a'} // Green if it has an item, gray otherwise
        roughness={0.6} // Adds a bit of roughness for realism
        metalness={0.1} // Slight metallic effect
      />
      <Text
        position={[0, 0.1, 0.25]} // Adjust position above the box
        fontSize={0.07} // Adjust text size
        color="black" // Text color
        anchorX="center" // Anchor text to center
        anchorY="middle"
      >
        {nameComp} {/* This displays the compartment's name */}
      </Text>
    </mesh>
  );
}

const Warehouse = () => {
  const [compartments, setCompartments] = useState({});
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedCompartment, setSelectedCompartment] = useState(null);

  const saveDataToServer = (compartmentData) => {
    fetch(`http://localhost:8080/api/compartments/${compartmentData.shelfId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(compartmentData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Compartment created:', data);
      })
      .catch((error) => {
        console.error('Error creating compartment:', error);
      });
  };
  const handleCompartmentClick = (shelf, shelfIndex, layerIndex, side) => {
    const compartmentData = {
      nameComp: `N${layerIndex}0${side}`, // Tên ngăn kết hợp tầng và vị trí (Ngăn + tầng + vị trí)
      layerIndex: layerIndex,
      side: side,  // Lưu vị trí (1: left, 2: mid, 3: right)
      hasItem: false,
      shelfId: shelf.shelfId,
    };

    saveDataToServer(compartmentData);
    setPopupVisible(true);
  };


  const handlePopupClose = () => {
    setPopupVisible(false);
  };
  const [shelves, setShelves] = useState([]);

  // Fetch shelves data when the component is mounted
  useEffect(() => {
    ShelfService.getAllShelves()
      .then(data => {
        console.log("Shelves data:", data); // Kiểm tra dữ liệu
        setShelves(data);
      })
      .catch(error => {
        console.error("Error fetching shelves: ", error);
      });
  }, []);
  const compartmentWidth = 0.5;  // Khoảng cách giữa các ngăn
  const layerHeights = [0.4, 0.4, 0.4, 0.4, 0.4];
  const baseHeightOffset = 0.35; // Điều chỉnh chiều cao của box cho khỏi nằm giữa mặt đất
  return (
    <div className='warehouse' style={{ marginTop: '0px' }}>
      <Canvas style={{ width: '100%', height: '100vh', background: 'black' }} shadows camera={{ position: [5, 8, 18], fov: 60 }}>
        <Scene />
        <OrbitControls />
        <Ground />
        {shelves.length > 0 && shelves.map((shelf, shelfIndex) => (
          <group key={shelf.shelfId}>
            {/* console.log(shelf); */}
            <ShelfModel position={[shelf.position.xCoord, shelf.position.yCoord, shelf.position.zCoord]} /> {/* Kiểm tra vị trí */}

            {layerHeights.map((height, layerIndex) => (
              <group
                key={layerIndex}
                position={[
                  shelf.position.xCoord,
                  shelf.position.yCoord + baseHeightOffset + layerHeights.slice(0, layerIndex).reduce((acc, val) => acc + val, 0),
                  shelf.position.zCoord
                ]}
              >
                <Compartment
                  position={[-compartmentWidth, 0, 0]}
                  hasItem={false}
                  onClick={() => handleCompartmentClick(shelf, shelfIndex, layerIndex, 1)}
                  nameComp={`N${layerIndex}01`}  // Left side compartment name
                />
                <Compartment
                  position={[0, 0, 0]}
                  hasItem={false}
                  onClick={() => handleCompartmentClick(shelf, shelfIndex, layerIndex, 2)}
                  nameComp={`N${layerIndex}02`}  // Middle side compartment name
                />
                <Compartment
                  position={[compartmentWidth, 0, 0]}
                  hasItem={false}
                  onClick={() => handleCompartmentClick(shelf, shelfIndex, layerIndex, 3)}
                  nameComp={`N${layerIndex}03`}  // Right side compartment name
                />
              </group>
            ))}
          </group>
        ))}

        <TruckModel position={[5, 1, 11]} scale={[0.5, 0.5, 0.5]} /> {/* Thêm mô hình xe tải ở vị trí nào đó */}
        <TruckModel position={[8, 1, 11]} scale={[0.5, 0.5, 0.5]} /> {/* Thêm mô hình xe tải ở vị trí nào đó */}
        <AssetsModel position={[-6, 0.1, 8]} scale={[0.5, 0.5, 0.5]} />
      </Canvas>
      {popupVisible && (
        <PopupItems
          compartmentData={selectedCompartment}
          // onAddItem={addItemToCompartment}
          onClose={() => setPopupVisible(false)}
        />
      )}

    </div>
  );
};

export default Warehouse;