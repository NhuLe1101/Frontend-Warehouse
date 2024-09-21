import React, { useState, useEffect } from 'react';
import './product.css';
import ProductService from '../../api/product';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    ProductService.getAllProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
      });
  }, []);

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const titleElement = document.querySelector('.container_tittle');
    if (titleElement) {
      titleElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className='product' style={{ marginTop: '56px' }}>
      <div className='product_page_title'>
        <p style={{ fontSize: '32px' }}>QUẢN LÝ SẢN PHẨM</p>
      </div>
      <div className='search_and_filter_product_container'>
        <div className='container_tittle'>
          <p>TÌM KIẾM</p>
        </div>
        <hr />
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
      <div className='products_container'>
        <div className='container_tittle'>
          <p>SẢN PHẨM</p>
        </div>
        <hr />
        <div className='products_table'>
          <div className='products_table_header'>
            <div className='products_table_STT'><p>STT</p></div>
            <div className='products_table_bookingNo'><p>BOOKING NO</p></div>
            <div className='products_table_picture'><p>HÌNH ẢNH</p></div>
            <div className='products_table_name'><p>TÊN</p></div>
            <div className='products_table_type'><p>LOẠI</p></div>
            <div className='products_table_quantity'><p>SỐ LƯỢNG</p></div>
            <div className='products_table_location'><p>KIỆN HÀNG</p></div>
            <div className='products_table_shelfName'><p>KỆ HÀNG</p></div>
            <div className='products_table_checkin'><p>NGÀY NHẬP</p></div>
            <div className='products_table_checkout'><p>NGÀY XUẤT</p></div>
          </div>
          {currentItems.map((product, index) => (
            <div key={product.itemId} className='products_table_item'>
              <div className='products_table_STT'><p>{index + 1 + indexOfFirstItem}</p></div>
              <div className='products_table_bookingNo'><p>{product.booking.bookingId}</p></div>
              <div className='products_table_picture'><img src={product.image} alt="" width={'50px'} height={'50px'} /></div>
              <div className='products_table_name'><p>{product.name}</p></div>
              <div className='products_table_type'><p>{product.type}</p></div>
              <div className='products_table_quantity'><p>{product.quantity}</p></div>
              <div className='products_table_location'><p>{product.position ? product.position : "null"}</p></div>
              <div className='products_table_shelfName'><p>{product.shelf ? product.shelf : "null"}</p></div>
              <div className='products_table_checkin'><p>{product.checkIn}</p></div>
              <div className='products_table_checkout'><p>{product.checkOut}</p></div>
            </div>
          ))}
        </div>
        <div className='product_pagination'>
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index + 1} onClick={() => handlePageChange(index + 1)}
            style={{
              backgroundColor: currentPage === index + 1 ? 'orange' : '',
              color: currentPage === index + 1 ? 'white' : 'black',
            }}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
              &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
