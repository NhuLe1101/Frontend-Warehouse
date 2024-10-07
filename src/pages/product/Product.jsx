import React, { useState } from 'react';
import ProductTable from '../../Components/Product/ProductTable'
import './product.css';
const Product = () => {
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
  return (
    <div className='product_page' style={{height: 'fit-content', marginTop:'56px', padding: '0 4.2rem 4.2rem 4.2rem', backgroundColor: '#262838'}}>
      <div className='product_title'>
        <p style={{textAlign: 'center', fontSize:'32px', padding: '1rem', color: '#fff'}}>QUẢN LÝ SẢN PHẨM</p>
      </div>
      <div className='search_and_filter_product_container'>
        <div className='container_tittle'>
          <p style={{color: '#fff'}}>TÌM KIẾM</p>
        </div>
        <hr style={{marginBottom: '.5rem'}}/>
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
      <ProductTable></ProductTable>
    </div>
  )
}

export default Product;
