import React, { useState, useEffect } from 'react';
import ProductTable from '../../Components/Product/ProductTable'
import './product.css';
import ProductService from '../../api/product';

const Product = () => {
  const [ngaynhapUp, setNgayNhapUp] = useState(false);
  const [ngayxuatUp, setNgayXuatUp] = useState(false);
  const [productsByName, setProductsByName] = useState(null);
  const [allCbIsChecked, setAllCbIsChecked] = useState(false);
  const [itemNullCpmCbIsChecked, setItemNullCpmCbIsChecked] = useState(false);

  const handleCheckboxChange = async (event) => {
    setAllCbIsChecked(event.target.checked);
      if (event.target.checked) {
          // alert("Ô này đang check");
          const products = await ProductService.getProductsByName('');
          setProductsByName(products);
      }
  };
  
  const handleNullCpmCheckboxChange = async (event) => {
    setItemNullCpmCbIsChecked(event.target.checked);
      if (event.target.checked) {
          //alert("Ô này đang check");
          const products = await ProductService.getProductsByCompartment();
          setProductsByName(products);
      }
  };

  const ngaynhapClicked = () => {
    setNgayNhapUp(!ngaynhapUp);
    window.alert(ngaynhapUp ? 'Giảm dần nè!' : 'Tăng dần nè!');
  };

  const ngayxuatClicked = () => {
    setNgayXuatUp(!ngayxuatUp);
    window.alert(ngayxuatUp ? 'Giảm dần nè!' : 'Tăng dần nè!');
  };

  const [searchData, setSearchData] = useState(null);

  const handleInputChange = (event) => {
    setSearchData(event.target.value);
  };

  const searchProduct = async (data) => {
    setSearchData(data);
    const products = await ProductService.getProductsByName(data);
    setProductsByName(products);
  };

  useEffect(() => {
    if (productsByName) {
      console.log(productsByName);
    }
  }, [productsByName]);


  return (
    <div className='product_page' style={{ height: 'fit-content', marginTop: '56px', padding: '0 4.2rem 4.2rem 4.2rem', backgroundColor: '#262838' }}>
      <div className='product_title'>
        <p style={{ textAlign: 'center', fontSize: '32px', padding: '1rem', color: '#fff' }}>QUẢN LÝ SẢN PHẨM</p>
      </div>
      {/* seacrh: start */}
      <div className='search_and_filter_product_container'>
        <div className='container_tittle'>
          <p style={{ color: '#fff' }}>TÌM KIẾM</p>
        </div>
        <hr style={{ marginBottom: '.5rem' }} />
        <div className='search_and_filter_product_wrapper'>
          <div className='search_product_container'>
            <input type="text" name="search_info" placeholder='Tên sản phẩm' value={searchData} onChange={handleInputChange} />
            <button id='btn_search_product' onClick={() => searchProduct(searchData)}>
              <img src="icons/icons8-search-24.png" alt="" width={'18px'} />
            </button>
          </div>
          <div className='filter_product_container'>
            <p>Lọc theo:</p>
            <div className='check_kien_hang_wrapper'>
              <p>Tất cả</p>
              <input type="checkbox" name="all_cb" value="all_cb" checked={allCbIsChecked} onChange={handleCheckboxChange}/>
            </div>
            <div className='check_kien_hang_wrapper'>
              <p>Hàng chưa lên kệ</p>
              <input type="checkbox" name="checkbox_kienhangrong" checked={itemNullCpmCbIsChecked} onChange={handleNullCpmCheckboxChange}/>
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
      {/* seacrh: end */}
      <ProductTable productsByName={productsByName} allProductChecked={allCbIsChecked}></ProductTable>
    </div>
  )
}

export default Product;
