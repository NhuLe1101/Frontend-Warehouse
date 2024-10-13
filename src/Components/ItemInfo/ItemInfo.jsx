import React from 'react'
import './iteminfo.css';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const ItemInfo = ({ compartmentData, onEdit, onDelete, onCheckout }) => {
    const totalWeight = compartmentData.quantity * compartmentData.item.weight;
    const formattedCheckin = new Date(compartmentData.item.checkin).toLocaleDateString('vi-VN');
    const formattedCheckout = new Date(compartmentData.item.checkout).toLocaleDateString('vi-VN');
    return (
        <>
            <h2>Thông tin Item trong ngăn {compartmentData.nameComp}</h2>
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
                    </div>
                </div>
            </div>
        </>

    );
};
export default ItemInfo