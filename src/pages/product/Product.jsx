import React, { useState, useEffect } from "react";
import ProductTable from "../../Components/Product/ProductTable";
import "./product.css";
import ProductService from "../../api/product";
import SelectSmall from "../../Components/Product/Select/SelectComponent";
const Product = () => {
  const [productsByName, setProductsByName] = useState(null);
  const [searchData, setSearchData] = useState(null);

  const handleReset = () => {
    setSearchData("");
  };

  /**test select*/
  const all = async () => {
    const products = await ProductService.getAllProducts();
    setProductsByName(products);
    handleReset();
  };

  const itemByNullComp = async () => {
    const products = await ProductService.getProductsIsNullCompartment();
    setProductsByName(products);
  };

  const checkinDec = async () => {
    const products = await ProductService.getProductsByCheckinDecrease();
    setProductsByName(products);
  };

  const checkinInc = async () => {
    const products = await ProductService.getProductsByCheckinIncrease();
    setProductsByName(products);
  };

  const checkoutDec = async () => {
    const products = await ProductService.getProductsByCheckoutDecrease();
    setProductsByName(products);
  };

  const checkoutInc = async () => {
    const products = await ProductService.getProductsByCheckoutIncrease();
    setProductsByName(products);
  };
  /**test select*/

  const handleInputChange = (event) => {
    setSearchData(event.target.value);
  };

  const searchItem = async (data) => {
    setSearchData(data);
    const products = await ProductService.searchItem(data);
    setProductsByName(products);
  };

  useEffect(() => {
    if (productsByName) {
      console.log(productsByName);
    }
  }, [productsByName]);

  return (
    <div
      className="product_page"
      style={{
        height: "fit-content",
        marginTop: "56px",
        padding: "0 4.2rem 4.2rem 4.2rem",
        backgroundColor: "#262838",
      }}
    >
      <div className="product_title">
        <p
          style={{
            textAlign: "center",
            fontSize: "32px",
            padding: "1rem",
            color: "#fff",
          }}
        >
          QUẢN LÝ SẢN PHẨM
        </p>
      </div>
      {
        /* seacrh: start */
        <div className="search_and_filter_product_container">
          <div className="container_tittle">
            <p style={{ color: "#fff" }}>TÌM KIẾM</p>
          </div>
          <hr style={{ marginBottom: ".5rem" }} />
          <div className="search_and_filter_product_wrapper">
            <div className="search_product_container">
              <input
                type="text"
                name="search_info"
                placeholder="Tên sản phẩm"
                value={searchData}
                onChange={handleInputChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    searchItem(searchData);
                  }
                }}
              />
              <button
                id="btn_search_product"
                onClick={() => searchItem(searchData)}
              >
                <img src="icons/icons8-search-24.png" alt="" width={"18px"} />
              </button>
              <SelectSmall
                all={all}
                itemByNullComp={itemByNullComp}
                checkinDec={checkinDec}
                checkinInc={checkinInc}
                checkoutDec={checkoutDec}
                checkoutInc={checkoutInc}
              ></SelectSmall>
            </div>
          </div>
        </div>
        /* seacrh: end */
      }
      <ProductTable productsByName={productsByName}></ProductTable>
    </div>
  );
};

export default Product;
