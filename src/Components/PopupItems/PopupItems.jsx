import React, { useState } from 'react'
import './popupitems.css';
const PopupItems = ({onClose}) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [ngaynhapUp, setNgayNhapUp] = useState(false);
    const [ngayxuatUp, setNgayXuatUp] = useState(false);

    const ngaynhapClicked = () => {
        setNgayNhapUp(!ngaynhapUp);
        if (ngaynhapUp === true)
            window.alert('Giảm dần nè!');
        else
            window.alert('Tăng dần nè!');
    }
    const ngayxuatClicked = () => {
        setNgayXuatUp(!ngayxuatUp);
        if (ngayxuatUp === true)
            window.alert('Giảm dần nè!');
        else
            window.alert('Tăng dần nè!');
    }
    const searchitem = () => {
        window.alert('Oh no! Nút này chưa chạy được đâu!')
    };
    return (
        <div className="popup-items">
            <button className='close-btn' onClick={onClose}></button>
            <h2>Chọn các sản phẩm để thêm vào kiện hàng</h2>
            <div className='search_and_filter_item_container'>
                <div className='container_title'>
                    <p>TÌM KIẾM</p>
                </div>
                <hr />
                <div className='search_and_filter_item_wrapper'>
                    <div className='search_item_container'>
                        <input type="text" name="search_info" id="" placeholder='Tên sản phẩm' />
                        <button id='btn_search_item' onClick={searchitem}>
                            <img src="icons/icons8-search-24.png" alt="" width={'18px'} />
                        </button>
                    </div>
                    <div className='filter_item_container'>
                        <p>Sắp xếp theo:</p>
                        <div className='check_kien_hang_wrapper'>
                            <p>Hàng chưa lên kệ</p>
                            <input type="checkbox" name="checkbox_kienhangrong" id="" />
                        </div>
                        <button id='btn_ngaynhapDown' onClick={ngaynhapClicked} className={ngaynhapUp === true ? 'hidden_btn_date' : 'active_btn_date'}>Ngày nhập <img src="icons/icons8-down-24.png" alt="" /></button>
                        <button id='btn_ngaynhapUp' onClick={ngaynhapClicked} className={ngaynhapUp === false ? 'hidden_btn_date' : 'active_btn_date'}>Ngày nhập <img src="icons/icons8-up-24.png" alt="" /></button>
                        <button id='btn_ngayxuatDown' onClick={ngayxuatClicked} className={ngayxuatUp === true ? 'hidden_btn_date' : 'active_btn_date'}>Ngày xuất <img src="icons/icons8-down-24.png" alt="" /></button>
                        <button id='btn_ngayxuatUp' onClick={ngayxuatClicked} className={ngayxuatUp === false ? 'hidden_btn_date' : 'active_btn_date'}>Ngày xuất <img src="icons/icons8-up-24.png" alt="" /></button>
                    </div>
                </div>
            </div>
            <div className='items_container'>
                <div className='container_title'>
                    <p>SẢN PHẨM</p>
                </div>
                <hr />
                <div className='items_table'>
                    <div className='items_table_header'>
                        <div className='items_table_STT'>
                            <p>STT</p>
                        </div>
                        <div className='products_table_bookingNo'>
                            <p>BK NO</p>
                        </div>
                        <div className='items_table_name'>
                            <p>TÊN</p>
                        </div>
                        <div className='items_table_type'>
                            <p>LOẠI</p>
                        </div>
                        <div className='items_table_quantity'>
                            <p>SỐ LƯỢNG</p>
                        </div>
                        <div className='items_table_location'>
                            <p>KIỆN HÀNG</p>
                        </div>
                        <div className='items_table_shelfName'>
                            <p>KỆ HÀNG</p>
                        </div>
                        <div className='items_table_checkin'>
                            <p>NGÀY NHẬP</p>
                        </div>
                        <div className='items_table_checkout'>
                            <p>NGÀY XUẤT</p>
                        </div>
                        <div className='items_table_select'>
                            <p>CHỌN ITEM</p>
                        </div>
                    </div>
                    <div className='items_table_item'>
                        <div className='items_table_STT'>
                            <p>1</p>
                        </div>
                        <div className='products_table_bookingNo'>
                            <p>001</p>
                        </div>
                        <div className='items_table_name'>
                            <p>Lightstick J97</p>
                        </div>
                        <div className='items_table_type'>
                            <p>Lightstick J97</p>
                        </div>
                        <div className='items_table_quantity'>
                            <p>1</p>
                        </div>
                        <div className='items_table_location'>
                            <p>Null</p>
                        </div>
                        <div className='items_table_shelfName'>
                            <p>Null</p>
                        </div>
                        <div className='items_table_checkin'>
                            <p>23/08/2024</p>
                        </div>
                        <div className='items_table_checkout'>
                            <p>23/08/2024</p>
                        </div>
                        <div className='items_table_select'>
                            {/* Checkbox để chọn sản phẩm */}
                            <div class="check_container">
                                <input id="checkbox" class="hidden" type="checkbox"/>
                                    <label class="checkbox" for="checkbox"></label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <button className='btn-add-items' >Thêm vào kiện hàng</button>
        </div>
    );
};

export default PopupItems
