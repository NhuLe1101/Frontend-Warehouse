import React, { useState, useEffect } from 'react'
import './popupitems.css';
import ProductTable from '../Product/ProductTable';
import PopupQuantity from '../PopupQuantity/PopupQuantity';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
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

    const handleSelectProduct = (product) => {
        if (product.quantity > 1) {
            setSelectedProduct(product);
            console.log('Product đã chọn:', product); // Kiểm tra giá trị của selectedProduct
            setPopupQuantityVisible(true);  // Hiển thị popup khi số lượng > 1
        } else {
            // Xử lý tự động thêm nếu số lượng = 1
            console.log('tu dong them');
        }
    };

    console.log("compartmentData received:", compartmentData); // Kiểm tra dữ liệu nhận được
    console.log("compartmentData item:", compartmentData.item); // Kiểm tra dữ liệu nhận được

    const handleQuantityConfirm = (quantity) => {
        const compartmentId = compartmentData ? compartmentData.compId : null; // Lấy compId từ compartmentData đã cập nhật
        const productId = selectedProduct ? selectedProduct.itemId : null;


        // console.log('compId :', compartmentData.compId);
        // console.log('ProductId:', selectedProduct.itemId);
        // if (!compartmentId || !productId) {
        //     console.error('compartmentId hoặc productId bị thiếu.');
        //     return;  // Ngăn không gửi request nếu dữ liệu bị thiếu
        // }
        // console.log("Sending quantity:", quantity);

        // Gọi API để thêm item vào ngăn
        fetch(`http://localhost:8080/api/compartments/${compartmentId}/addItem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                itemId: productId,
                quantity: quantity
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => {
                        throw new Error(data.message || 'Có lỗi xảy ra');
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log('Item đã được thêm thành công:', data);
                setSnackbarMessage('Item đã được thêm thành công.');
                setSnackbarSeverity('success'); // Thông báo thành công
                setOpenSnackbar(true);
            })
            .catch((error) => {
                setSnackbarMessage(error.message); // Hiển thị thông báo từ MessageResponse
                setSnackbarSeverity('error'); // Thông báo lỗi
                setOpenSnackbar(true);
            });
    };


    return (
        <div className="popup-items">
            <button className='close-btn' onClick={onClose}></button>
            {isItemPresent ? (
                <>
                    {/* Nếu ngăn đã có item, hiển thị thông tin chi tiết về item */}
                    <h2>Thông tin Item trong ngăn</h2>
                    <div className='item_info'>
                        <p><strong>Tên sản phẩm:</strong> {compartmentData.item.name}</p>
                        <p><strong>Số lượng:</strong> {compartmentData.quantity}</p>
                        <p><strong>Loại:</strong> {compartmentData.item.type}</p>
                    </div>
                </>
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
                        {selectedProduct && (
                            <PopupQuantity
                                open={popupQuantityVisible}
                                onClose={() => setPopupQuantityVisible(false)}
                                maxQuantity={selectedProduct.quantity}
                                onConfirm={handleQuantityConfirm}
                            />
                        )}
                    </div>
                </>
            )}

            {/* Snackbar cho thông báo */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default PopupItems
