import React, { useState, useEffect } from 'react';
import './product.css';
const Product = () => {
  const [ngaynhapUp, setNgayNhapUp] = useState(false);
  const [ngayxuatUp, setNgayXuatUp] = useState(false);
  const ngaynhapClicked = () => {
    setNgayNhapUp(!ngaynhapUp);
    if(ngaynhapUp === true)
      window.alert('Giảm dần nè!');
    else
    window.alert('Tăng dần nè!');
  }
  const ngayxuatClicked = () => {
    setNgayXuatUp(!ngayxuatUp);
    if(ngayxuatUp === true)
      window.alert('Giảm dần nè!');
    else
    window.alert('Tăng dần nè!');
  }
  const searchProduct = () => {
    window.alert('Oh no! Nút này chưa chạy được đâu!')
  };
  return (
    <div className='product' style={{marginTop:'56px'}}>
      <div className='product_page_title'>
        <p style={{fontSize:'32px'}}>QUẢN LÝ SẢN PHẨM</p>
      </div>
      <div className='search_and_filter_product_container'>
        <div className='container_tittle'>
          <p>TÌM KIẾM</p>
        </div>
        <hr />
        <div className='search_and_filter_product_wrapper'>
          <div className='search_product_container'>
            <input type="text" name="search_info" id="" placeholder='Tên sản phẩm'/>
            <button id='btn_search_product' onClick={searchProduct}>
              <img src="icons/icons8-search-24.png" alt="" width={'18px'}/>
            </button>
          </div>
          <div className='filter_product_container'>
            <p>Lọc theo:</p>
            <div className='check_kien_hang_wrapper'>
              <p>Hàng chưa lên kệ</p>
              <input type="checkbox" name="checkbox_kienhangrong" id="" />
            </div>
            <button id='btn_ngaynhapDown' onClick={ngaynhapClicked} className={ngaynhapUp === true? 'hidden_btn_date' : 'active_btn_date'}>Ngày nhập <img src="icons/icons8-down-24.png" alt="" /></button>
            <button id='btn_ngaynhapUp' onClick={ngaynhapClicked}  className={ngaynhapUp === false ? 'hidden_btn_date' : 'active_btn_date'}>Ngày nhập <img src="icons/icons8-up-24.png" alt="" /></button>
            <button id='btn_ngayxuatDown' onClick={ngayxuatClicked} className={ngayxuatUp === true? 'hidden_btn_date' : 'active_btn_date'}>Ngày xuất <img src="icons/icons8-down-24.png" alt="" /></button>
            <button id='btn_ngayxuatUp' onClick={ngayxuatClicked} className={ngayxuatUp === false ? 'hidden_btn_date' : 'active_btn_date'}>Ngày xuất <img src="icons/icons8-up-24.png" alt="" /></button>
          </div>
        </div>
      </div>
      <div className='products_container'>
        <div className='container_tittle'>
          <p>SẢN PHẨM</p>
        </div>
        <hr />
        <div className='products_table'>
          <div className='products_table_header'>
            <div className='products_table_STT'>
              <p>STT</p>
            </div>
            <div className='products_table_bookingNo'>
              <p>BOOKING NO</p>
            </div>
            <div className='products_table_picture'>
              <p>HÌNH ẢNH</p>
            </div>
            <div className='products_table_name'>
              <p>TÊN</p>
            </div>
            <div className='products_table_type'>
              <p>LOẠI</p>
            </div>
            <div className='products_table_quantity'>
              <p>SỐ LƯỢNG</p>
            </div>
            <div className='products_table_location'>
              <p>KIỆN HÀNG</p>
            </div>
            <div className='products_table_shelfName'>
              <p>KỆ HÀNG</p>
            </div>
            <div className='products_table_checkin'>
              <p>NGÀY NHẬP</p>
            </div>
            <div className='products_table_checkout'>
              <p>NGÀY XUẤT</p>
            </div>
          </div>
          <div className='products_table_item'>
            <div className='products_table_STT'>
              <p>1</p>
            </div>
            <div className='products_table_bookingNo'>
              <p>001</p>
            </div>
            <div className='products_table_picture'>
              <img src="logo192.png" alt="" width={'50px'} height={'50px'}/>
            </div>
            <div className='products_table_name'>
              <p>Lightstick J97</p>
            </div>
            <div className='products_table_type'>
              <p>Hàng đặc biệt</p>
            </div>
            <div className='products_table_quantity'>
              <p>1</p>
            </div>
            <div className='products_table_location'>
              <p>null</p>
            </div>
            <div className='products_table_shelfName'>
              <p>A5</p>
            </div>
            <div className='products_table_checkin'>
              <p>23/08/2024</p>
            </div>
            <div className='products_table_checkout'>
              <p>09/09/2024</p>
            </div>
          </div>
        </div> 
      </div>  
    </div>
  )
}

export default Product