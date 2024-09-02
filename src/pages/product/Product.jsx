import React from 'react'
import './product.css';
const Product = () => {
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
            <input type="text" name="search_info" id="" placeholder='Tên kệ'/>
            <button>Tìm kiếm</button>
          </div>
          <div className='filter_product_container'>
            <p>Sắp xếp theo</p>
            <button>Ngày nhập <img src="icons/icons8-down-24.png" alt="" /></button>
            <button>Ngày xuất <img src="icons/icons8-down-24.png" alt="" /></button>
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
              <p>VỊ TRÍ</p>
            </div>
            <div className='products_table_shelfName'>
              <p>TÊN KỆ</p>
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