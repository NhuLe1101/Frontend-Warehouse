import React, { useState, useEffect } from 'react'
import './popupitems.css';
import ProductTable from '../Product/ProductTable';
import PopupQuantity from './PopupQuantity';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import ItemInfo from '../ItemInfo/ItemInfo';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CompartmentService from './../../api/compartment';

const PopupItems = ({ compartmentData, onClose, isItemPresent }) => {
    const [ngaynhapUp, setNgayNhapUp] = useState(false);
    const [ngayxuatUp, setNgayXuatUp] = useState(false);

    const ngaynhapClicked = () => {
        setNgayNhapUp(!ngaynhapUp);
        window.alert(ngaynhapUp ? 'Giảm dần nè!' : 'Tăng dần nè!');
    };

    const ngayxuatClicked = () => {
        setNgayXuatUp(!ngayxuatUp);
        window.alert(ngayxuatUp ? 'Giảm dần nè!' : 'Tăng dần nè!');
    };

    const searchProduct = () => {
        window.alert('Oh no! Nút này chưa chạy được đâu!');
    };
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [popupQuantityVisible, setPopupQuantityVisible] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const [isEditMode, setIsEditMode] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false); 

    const handleSelectProduct = (product) => {
        setIsEditMode(false); 
        setSelectedProduct(product);
        setPopupQuantityVisible(true);
    };

    const handleQuantityConfirm = (quantity) => {
        const compartmentId = compartmentData.compId;
        const itemId = selectedProduct?.itemId;

        if (isEditMode) {
            CompartmentService.updateItemQuantity(compartmentId, itemId, quantity)
                .then((response) => {
                    setSnackbarMessage('Số lượng đã được cập nhật thành công.');
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true);
                    setPopupQuantityVisible(false);
                })
                .catch((error) => {
                    setSnackbarMessage(error.response.data.message || 'Có lỗi xảy ra');
                    setSnackbarSeverity('error');
                    setOpenSnackbar(true);
                });
        } else {
            CompartmentService.addItemToCompartment(compartmentId, itemId, quantity)
                .then((response) => {
                    setSnackbarMessage('Item đã được thêm thành công.');
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true);
                    setPopupQuantityVisible(false);
                })
                .catch((error) => {
                    setSnackbarMessage(error.response.data.message || 'Có lỗi xảy ra');
                    setSnackbarSeverity('error');
                    setOpenSnackbar(true);
                });
        }
    };

    const handleEdit = () => {
        setIsEditMode(true); // Chế độ "edit"

        const product = compartmentData.item ? {
            itemId: compartmentData.item.itemId,
            name: compartmentData.item.name,
            quantity: compartmentData.item.quantity 
        } : null;

        setSelectedProduct(product);
        setPopupQuantityVisible(true); 
    };


    const handleDelete = () => {
        setOpenDeleteDialog(true);
    };

    const confirmDelete = () => {
        const compartmentId = compartmentData.compId;
        const itemId = compartmentData.item.itemId;

        CompartmentService.deleteItemFromCompartment(compartmentId, itemId)
            .then((response) => {
                setSnackbarMessage('Item đã được xóa thành công.');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                setTimeout(() => {
                    onClose();
                }, 3000);
            })
            .catch((error) => {
                setSnackbarMessage(error.response.data.message || 'Có lỗi xảy ra');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            });
    };

    const cancelDelete = () => {
        setOpenDeleteDialog(false); 
    };

    const handleCheckout = () => {
        console.log('Checkout sản phẩm');
    };
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return; // Không đóng snackbar nếu lý do là clickaway
        }

        setOpenSnackbar(false);

        onClose();
    };

    return (
        <div className="popup-items">
            <button className='close-btn' onClick={onClose}></button>
            {isItemPresent ? (
                <ItemInfo
                    compartmentData={compartmentData}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onCheckout={handleCheckout}
                />
            ) : (
                <>
                    {/* Nếu ngăn chưa có item, hiển thị giao diện thêm item */}
                    <h2>Chọn sản phẩm để thêm vào kiện hàng</h2>
                    <div className='product_page'>
                        <div className='search_and_filter_product_container'>
                            <div className='container_tittle'>
                                <p style={{ color: '#fff' }}>TÌM KIẾM</p>
                            </div>
                            <hr style={{ marginBottom: '.5rem' }} />
                            <div className='search_and_filter_product_wrapper'>
                                <div className='search_product_container'>
                                    <input type="text" name="search_info" placeholder='Tên sản phẩm' />
                                    <button id='btn_search_product' onClick={searchProduct}>
                                        <img src="icons/icons8-search-24.png" alt="" width={'18px'} />
                                    </button>
                                </div>
                                <div className='filter_product_container'>
                                    <p>Lọc theo:</p>
                                    <div className='check_kien_hang_wrapper'>
                                        <p>Hàng chưa lên kệ</p>
                                        <input type="checkbox" name="checkbox_kienhangrong" />
                                    </div>
                                    <button id='btn_ngaynhapDown' onClick={ngaynhapClicked} className={ngaynhapUp ? 'hidden_btn_date' : 'active_btn_date'}>
                                        Ngày nhập <img src="icons/icons8-down-24.png" alt="" />
                                    </button>
                                    <button id='btn_ngaynhapUp' onClick={ngaynhapClicked} className={!ngaynhapUp ? 'hidden_btn_date' : 'active_btn_date'}>
                                        Ngày nhập <img src="icons/icons8-up-24.png" alt="" />
                                    </button>
                                    <button id='btn_ngayxuatDown' onClick={ngayxuatClicked} className={ngayxuatUp ? 'hidden_btn_date' : 'active_btn_date'}>
                                        Ngày xuất <img src="icons/icons8-down-24.png" alt="" />
                                    </button>
                                    <button id='btn_ngayxuatUp' onClick={ngayxuatClicked} className={!ngayxuatUp ? 'hidden_btn_date' : 'active_btn_date'}>
                                        Ngày xuất <img src="icons/icons8-up-24.png" alt="" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ProductTable isPopup={true} onSelectProduct={handleSelectProduct} />
                    </div>
                </>

            )}
            {selectedProduct && (
                <PopupQuantity
                    open={popupQuantityVisible}
                    onClose={() => setPopupQuantityVisible(false)}
                    maxQuantity={isEditMode ? compartmentData.item.quantity : selectedProduct.quantity}  // Sử dụng quantity từ compartment khi ở chế độ edit
                    onConfirm={handleQuantityConfirm}  // Gọi hàm xác nhận dựa trên chế độ "add" hoặc "edit"
                />
            )}
            <Dialog
                open={openDeleteDialog}
                onClose={cancelDelete}
            >
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa sản phẩm này khỏi ngăn chứa không? Hành động này không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelDelete} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={confirmDelete} sx={{ color: 'white', backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
                    >
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Snackbar cho thông báo */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}  // Gọi hàm handleSnackbarClose khi snackbar đóng
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </div>
    );
};

export default PopupItems
