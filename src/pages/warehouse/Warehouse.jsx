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
        color={hasItem ? '#4CAF50' : '#e6b07a'} // Green if it has an item
        roughness={0.6}
        metalness={0.1}
      />
      <Text
        position={[0, 0.1, 0.25]}
        fontSize={0.07}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {nameComp}
      </Text>
    </mesh>
  );
}

const Warehouse = () => {
  const [compartments, setCompartments] = useState({});
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedCompartment, setSelectedCompartment] = useState(null);

  const fetchCompartmentFromServer = (compartmentIdentifier) => {
    return fetch(`http://localhost:8080/api/compartments/${compartmentIdentifier.shelfId}/${compartmentIdentifier.nameComp}`)
      .then(response => {
        if (!response.ok) {
          return null;
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error fetching compartment from server:', error);
        throw error;
      });
  };

  const createCompartment = (compartmentData) => {
    return fetch(`http://localhost:8080/api/compartments/${compartmentData.shelfId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(compartmentData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to create compartment');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error creating compartment:', error);
        throw error;
      });
  };


  const handleCompartmentClick = (shelf, shelfIndex, layerIndex, side) => {
    const compartmentIdentifier = {
      nameComp: `N${layerIndex}0${side}`,
      layerIndex: layerIndex,
      side: side,
      shelfId: shelf.shelfId,
    };

    // Gọi API để kiểm tra compartment có tồn tại không
    fetchCompartmentFromServer(compartmentIdentifier)
      .then((compartmentFromServer) => {
        if (compartmentFromServer) {
          // Nếu compartment đã có item, hiển thị thông tin item
          if (compartmentFromServer.hasItem) {
            setSelectedCompartment(compartmentFromServer);
            setPopupVisible(true);
          } else {
            // Nếu compartment chưa có item, hiển thị popup thêm item
            setSelectedCompartment(compartmentFromServer);
            setPopupVisible(true);
          }
        } else {
          // Nếu compartment chưa tồn tại, tạo mới và hiển thị popup thêm item
          createCompartment(compartmentIdentifier)
            .then((newCompartment) => {
              setSelectedCompartment(newCompartment);
              setPopupVisible(true);
            })
            .catch((error) => {
              console.error('Error creating compartment:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error fetching compartment:', error);
      });
  };


  const [shelves, setShelves] = useState([]);

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
      {popupVisible && selectedCompartment && (
        <PopupItems
          compartmentData={selectedCompartment}
          onClose={() => setPopupVisible(false)}
          isItemPresent={selectedCompartment.hasItem}  // Truyền trạng thái item có trong compartment hay không
        />
      )}



    </div>
  );
};

export default Warehouse;