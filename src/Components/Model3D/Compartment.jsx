import React, { useEffect, useState, useRef } from 'react';
import { Text } from '@react-three/drei';
import QRCode from 'qrcode';
import { TextureLoader, Raycaster } from 'three';
import { useThree } from '@react-three/fiber';

const Compartment = ({ position, color, onClick, nameComp, compartmentData }) => {
  const { camera, scene } = useThree();
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [qrTexture, setQrTexture] = useState(null);
  const raycaster = useRef(new Raycaster());

  useEffect(() => {
    if (compartmentData && compartmentData.item) {
      const itemData = compartmentData.item;

      // Thêm thông tin vị trí (Ngăn và Kệ) vào chuỗi mã QR
      const itemString = `
        Tên sản phẩm: ${itemData.name},
        Số lượng: ${compartmentData.quantity},
        Ngăn: ${compartmentData.nameComp},
        Kệ: ${compartmentData.shelf ? compartmentData.shelf.nameShelf : 'Không xác định'}
      `;

      QRCode.toDataURL(itemString)
        .then((url) => {
          setQrCodeUrl(url); // Set QR code URL sau khi tạo
        })
        .catch((err) => {
          console.error("Failed to generate QR code:", err);
        });
    } else {
      setQrCodeUrl(null); // Reset QR code URL nếu không có item
    }
  }, [compartmentData]);

  // Load the texture only after qrCodeUrl is set
  useEffect(() => {
    if (qrCodeUrl) {
      const loader = new TextureLoader();
      loader.load(
        qrCodeUrl,
        (texture) => {
          setQrTexture(texture); // Set the texture after loading
        },
        undefined,
        (err) => {
          console.error("Error loading QR code texture:", err);
        }
      );
    } else {
      setQrTexture(null); // Reset texture if no QR code URL
    }
  }, [qrCodeUrl]);

  const handleClick = (event) => {
    // Lấy vị trí chuột và tạo raycaster
    const mouse = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1
    };
    raycaster.current.setFromCamera(mouse, camera);

    // Kiểm tra va chạm từ raycaster
    const intersects = raycaster.current.intersectObjects(scene.children, true);

    // Chỉ lấy đối tượng gần nhất (nếu có) và kiểm tra với đối tượng hiện tại
    if (intersects.length > 0 && intersects[0].object === event.object) {
      onClick(); // Chỉ gọi onClick nếu là đối tượng gần nhất
    }
  };

  return (
    <mesh position={position} onClick={handleClick}>
      <boxGeometry args={[0.4, 0.35, 0.4]} />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />
      
      {/* Only display QRCode if qrTexture is loaded and compartment has an item */}
      {qrTexture && (
        <mesh position={[0, -0.05, 0.25]}>
          <planeGeometry args={[0.2, 0.2]} />
          <meshBasicMaterial map={qrTexture} />
        </mesh>
      )}

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
};

export default Compartment;
