import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PopupItems from '../../Components/PopupItems/PopupItems';
import ShelfService from '../../api/shelf';
import Scene from '../../Components/Model3D/Scene';
import Ground from '../../Components/Model3D/Ground';
import AssetsModel from '../../Components/Model3D/AssetsModel';
import ShelfModel from '../../Components/Model3D/ShelfModel';
import TruckModel from '../../Components/Model3D/TruckModel';
import Compartment from '../../Components/Model3D/Compartment';
import WarehouseView from '../../Components/WarehouseView/WarehouseView';
// import QRCodeScanner from '../../Components/QRCodeScanner/QRCodeScanner';

const Warehouse = () => {
  const [compartments, setCompartments] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedCompartment, setSelectedCompartment] = useState(null);
  const [selectedView, setSelectedView] = useState('default'); // View lựa chọn: default, available, checkout

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

    fetchCompartmentFromServer(compartmentIdentifier)
      .then((compartmentFromServer) => {
        if (compartmentFromServer) {
          setSelectedCompartment(compartmentFromServer);
        } else {
          createCompartment(compartmentIdentifier)
            .then((newCompartment) => {
              setSelectedCompartment(newCompartment);
            })
            .catch((error) => {
              console.error('Error creating compartment:', error);
            });
        }
        setPopupVisible(true);
      })
      .catch((error) => {
        console.error('Error fetching compartment:', error);
      });
  };

  const [shelves, setShelves] = useState([]);

  useEffect(() => {
    ShelfService.getAllShelves()
      .then(data => {
        setShelves(data);
      })
      .catch(error => {
        console.error("Error fetching shelves: ", error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/api/compartments')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCompartments(data);
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch(error => {
        console.error('Error fetching compartments:', error);
      });
  }, []);

  const getCompartmentColor = (compartments, shelfId, nameComp) => {
    if (!Array.isArray(compartments)) {
      console.error("Compartments is not an array:", compartments);
      compartments = [];
    }

    const compartment = compartments.find(c => c.shelf.shelfId === shelfId && c.nameComp === nameComp);

    if (!compartment) {
      return '#e6b07a';
    }

    if (selectedView === 'available' && compartment.item) {
      return '#4CAF50';
    }

    if (selectedView === 'checkout' && compartment.item && new Date(compartment.item.checkout) < new Date()) {
      return '#FF0000';
    }

    return '#e6b07a';
  };

  const compartmentWidth = 0.5;
  const layerHeights = [0.4, 0.4, 0.4, 0.4, 0.4];
  const baseHeightOffset = 0.35;

  return (
    <div className='warehouse' style={{ marginTop: '0px' }}>
      <WarehouseView selectedView={selectedView} setSelectedView={setSelectedView} />

      <Canvas style={{ width: '100%', height: '100vh', background: 'black' }} shadows camera={{ position: [5, 10, 18], fov: 60 }}>
        <Scene />
        <OrbitControls />
        <Ground />
        {shelves.length > 0 && shelves.map((shelf, shelfIndex) => (
          <group key={shelf.shelfId}>
            <ShelfModel position={[shelf.position.xCoord, shelf.position.yCoord, shelf.position.zCoord]} />

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
                  color={getCompartmentColor(compartments, shelf.shelfId, `N${layerIndex}01`)}
                  onClick={() => handleCompartmentClick(shelf, shelfIndex, layerIndex, 1)}
                  nameComp={`N${layerIndex}01`}
                  compartmentData={compartments.find(c => c.shelf.shelfId === shelf.shelfId && c.nameComp === `N${layerIndex}01`)}
                />
                <Compartment
                  position={[0, 0, 0]}
                  color={getCompartmentColor(compartments, shelf.shelfId, `N${layerIndex}02`)}
                  onClick={() => handleCompartmentClick(shelf, shelfIndex, layerIndex, 2)}
                  nameComp={`N${layerIndex}02`}
                  compartmentData={compartments.find(c => c.shelf.shelfId === shelf.shelfId && c.nameComp === `N${layerIndex}02`)}
                />
                <Compartment
                  position={[compartmentWidth, 0, 0]}
                  color={getCompartmentColor(compartments, shelf.shelfId, `N${layerIndex}03`)}
                  onClick={() => handleCompartmentClick(shelf, shelfIndex, layerIndex, 3)}
                  nameComp={`N${layerIndex}03`}
                  compartmentData={compartments.find(c => c.shelf.shelfId === shelf.shelfId && c.nameComp === `N${layerIndex}03`)}
                />
              </group>
            ))}
          </group>
        ))}
        <TruckModel position={[5, 1, 11]} scale={[0.5, 0.5, 0.5]} />
        <TruckModel position={[8, 1, 11]} scale={[0.5, 0.5, 0.5]} />
        <AssetsModel position={[-6, 0.1, 8]} scale={[0.5, 0.5, 0.5]} />
      </Canvas>
      {popupVisible && selectedCompartment && (
        <PopupItems
          compartmentData={selectedCompartment}
          onClose={() => setPopupVisible(false)}
          isItemPresent={selectedCompartment.hasItem}
        />
      )}
    </div>
  );
};

export default Warehouse;