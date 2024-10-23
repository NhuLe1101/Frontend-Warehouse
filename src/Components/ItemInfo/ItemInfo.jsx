import React from 'react'
import './iteminfo.css';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PrintIcon from '@mui/icons-material/Print';
import QRCode from 'qrcode';

const ItemInfo = ({ compartmentData, onEdit, onDelete, onCheckout }) => {
    const totalWeight = compartmentData.quantity * compartmentData.item.weight;
    const formattedCheckin = new Date(compartmentData.item.checkin).toLocaleDateString('vi-VN');
    const formattedCheckout = new Date(compartmentData.item.checkout).toLocaleDateString('vi-VN');

    let printWindow = null;

    const handlePrintQR = () => {
        const qrData = `
                        Tên sản phẩm: ${compartmentData.item.name},
                        Số lượng: ${compartmentData.quantity},
                        Ngăn: ${compartmentData.nameComp},
                        Kệ: ${compartmentData.shelf ? compartmentData.shelf.nameShelf : 'Không xác định'}
                        `;
        QRCode.toDataURL(qrData)
            .then((url) => {
                // Kiểm tra nếu cửa sổ in đã được mở trước đó
                if (printWindow) {
                    printWindow.close(); // Đóng cửa sổ in trước đó nếu nó đang mở
                }

                // Mở cửa sổ mới để in mã QR
                printWindow = window.open('', '_blank');
                printWindow.document.write('<html><head><title>In QR</title></head><body>');
                printWindow.document.write(`<h3>Mã QR cho ngăn ${compartmentData.nameComp} kệ ${compartmentData.shelf.nameShelf}</h3>`);
                printWindow.document.write(`<img src="${url}" alt="QR Code" />`); // Hiển thị QR code
                printWindow.document.write('</body></html>');
                printWindow.document.close();

                // Đợi một chút trước khi thực hiện in
                printWindow.focus();
                setTimeout(() => {
                    printWindow.print(); // Thực hiện in QR code
                }, 500); // Thời gian đợi để cửa sổ tải mã QR trước khi in
            })
            .catch((err) => {
                console.error("Failed to generate QR code:", err);
            });
    };


    return (
        <>
            <h2>Thông tin Item trong ngăn {compartmentData.nameComp} kệ {compartmentData.shelf.nameShelf}</h2>
            <div className="item-container">
                <div className="item-image">
                    <img
                        src={compartmentData.item.image ? compartmentData.item.image : './images/help_4131773.png'}
                        alt={compartmentData.item.name || "Sản phẩm không có hình ảnh"}
                        style={{ width: '100%' }}
                    />
                </div>

                <div className="item-info">
                    <p style={{ fontSize: '20px' }}>
                        <strong style={{ fontSize: '20px' }}>Tên sản phẩm:</strong> {compartmentData.item.name}
                    </p>
                    <p style={{ fontSize: '20px' }}>
                        <strong style={{ fontSize: '20px' }}>Số lượng:</strong> {compartmentData.quantity}
                    </p>
                    <p style={{ fontSize: '20px' }}>
                        <strong style={{ fontSize: '20px' }}>Loại:</strong> {compartmentData.item.type}
                    </p>
                    <p style={{ fontSize: '20px' }}>
                        <strong style={{ fontSize: '20px' }}>Cân nặng:</strong> {compartmentData.item.weight} (g)
                    </p>
                    <p style={{ fontSize: '20px' }}>
                        <strong style={{ fontSize: '20px' }}>Tổng cân nặng:</strong> {totalWeight} (g)
                    </p>
                    <p style={{ fontSize: '20px' }}>
                        <strong style={{ fontSize: '20px' }}>Ngày Checkin:</strong> {formattedCheckin}
                    </p>
                    <p style={{ fontSize: '20px' }}>
                        <strong style={{ fontSize: '20px' }}>Ngày Checkout:</strong> {formattedCheckout}
                    </p>

                    <div className="item-actions">
                        <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                            onClick={onEdit}
                            style={{ marginRight: '10px' }}>Sửa
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={onDelete}
                            style={{ marginRight: '10px' }}> Xóa
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<LocalShippingIcon />}
                            onClick={onCheckout}>Checkout
                        </Button>
                        {/* Nút để in QR Code */}
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<PrintIcon />}
                            onClick={handlePrintQR}
                            style={{ marginLeft: '10px' }}>In QR
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ItemInfo;