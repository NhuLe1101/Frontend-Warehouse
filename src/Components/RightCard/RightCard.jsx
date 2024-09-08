import './rightcard.css';
import React, { useContext } from 'react'
import { useState } from 'react';
import { PackageContext } from '../../contexts/PackageProvider/PackageProvider';
import PopupItems from '../PopupItems/PopupItems';
import { ItemContext } from '../../contexts/ItemProvider/ItemProvider';
const RightCard = () => {
  const [weight, setWeight] = useState(0);
  const [percentWeight, setPercentWeight] = useState(0);
  const { packages, setPackages } = useContext(PackageContext);
  const { items, setItems } = useContext(ItemContext);
  const [showPopup, setShowPopup] = useState(false);
  const updatePositions = (updatedPackages) => {
    return updatedPackages.map((pkg, index) => ({
      ...pkg,
      position: [index * 20, 0, 0],
    }));
  };
  const addPackage = () => {
    const newPackage = {
      id: packages.length,
      length: 16,
      width: 8,
      height: 16,
      weight: 0,
      percentWeight: 0,
    };
    const updatedPackages = [...packages, newPackage];
    setPackages(updatePositions(updatedPackages));

  };
  const updatePositionsItem = (updatedItems) => {
    return updatedItems.map((item, index) => ({
      ...item,
      position: [index * 20, 0, 0],
    }));
  };
  const addItem = (packageId) => {
    const newItem = {
      id: items.length,
      packageId,
      quantity: 1, // Default quantity
      length: 10,  // Default length
      width: 5,    // Default width
      height: 5,   // Default height
      weight: 0,
      type: "",    // To be selected by the user
    };
    const updatedItems = [...items, newItem];
    setItems(updatePositionsItem(updatedItems));
  };

  const handleInputChangePackage = (index, event) => {
    const newPackages = [...packages];
    newPackages[index][event.target.name] = parseFloat(event.target.value);
    setPackages(updatePositions(newPackages));
  };

  const handleInputChangeItem = (index, event) => {
    const newItems = [...items];
    newItems[index][event.target.name] = parseFloat(event.target.value);
    setItems(updatePositionsItem(newItems));
  };

  const deletePackage = (index) => {
    const newPackages = packages.filter((_, i) => i !== index);
    setPackages(newPackages);
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };
  function handleChangeSelect(event) {
    const selectBox = event.target;
    if (selectBox.value !== "") {
      selectBox.style.color = "#fff";  // Màu trắng khi tùy chọn được chọn
    } else {
      selectBox.style.color = "#f0f0f0";  // Màu xám khi chưa chọn
    }
  }
  const handleAddFromProduct = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className='container'>
      <div className='card'>
        <div className="card-package">
          <div className='packaging'>
            <h1>KIỆN HÀNG</h1>
            <div className='top-packaging'>
              <button className='btn-add' onClick={addPackage}>
                THÊM
              </button>
              <button className='btn-add-shelf'>
                THÊM VÀO KHO
              </button>
            </div>
          </div>
          {packages.map((pkg, index) => (
            <div className='package-body' key={pkg.id}>
              <div className='row'>
                <div className='col'>
                  <div className='color'></div>
                </div>
                <div className='col col-demension'>
                  <div className='label-package'>
                    <div className='label'>Kích thước(IN)</div>
                    <div className='label'>Trọng lượng: {pkg.percentWeight} kg</div>
                  </div>
                  <div className='input-group'>
                    <input
                      type='number'
                      placeholder='chiều dài'
                      name='length'
                      value={pkg.length}
                      onChange={(e) => handleInputChangePackage(index, e)}
                    />
                    <input
                      type='number'
                      placeholder='chiều rộng'
                      name='width'
                      value={pkg.width}
                      onChange={(e) => handleInputChangePackage(index, e)}
                    />
                    <input
                      type='number'
                      placeholder='chiều cao'
                      name='height'
                      value={pkg.height}
                      onChange={(e) => handleInputChangePackage(index, e)}
                    />
                    <input
                      type='number'
                      placeholder='trọng lượng'
                      name='weight'
                      value={pkg.weight}
                      onChange={(e) => handleInputChangePackage(index, e)}
                      disabled
                    />
                  </div>
                </div>
                <div className='col'>
                  <button className='btn-delete' onClick={() => deletePackage(index)}>
                    <img src='/icons/icons8-delete-48.png' alt='' />
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
        <div className="card-items">
          <div className='items'>
            <h1>HÀNG HÓA</h1>
            <div className='top-items'>
              <button className='btn-add' onClick={addItem}>
                THÊM
              </button>
              <button className='btn-add-product' onClick={handleAddFromProduct}>
                THÊM TỪ CSDL
              </button>
            </div>
          </div>
          {items.map((item, index) => (
            <div className='items-body' key={item.id}>
              <div className='row'>
                <div className='col'>
                  <div className='color'></div>
                </div>
                <div className='col col-demension'>
                  <div className='label-item'>
                    <div className='label'>Kích thước(IN)</div>
                  </div>
                  <div className='input-group'>
                    <input
                      type="text"
                      placeholder="ID"
                      name="id"
                      value={item.id}
                      readOnly
                    />
                    <input
                      type="number"
                      placeholder="Số lượng"
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) => handleInputChangeItem(index, e)}
                    />
                    <input
                      type="number"
                      placeholder="chiều dài"
                      name="length"
                      value={item.length}
                      onChange={(e) => handleInputChangeItem(index, e)}
                    />
                    <input
                      type="number"
                      placeholder="chiều rộng"
                      name="width"
                      value={item.width}
                      onChange={(e) => handleInputChangeItem(index, e)}
                    />
                    <input
                      type="number"
                      placeholder="chiều cao"
                      name="height"
                      value={item.height}
                      onChange={(e) => handleInputChangeItem(index, e)}
                    />
                    <input
                      type="number"
                      placeholder="trọng lượng"
                      name="weight"
                      value={item.weight}
                      onChange={(e) => handleInputChangeItem(index, e)}
                    />
                    <select
                      name="type"
                      className='select-type'
                      value={item.type}
                      onChange={(e) => handleInputChangeItem(index, e)}
                      onBlur={handleChangeSelect}
                    >
                      <option value="" disabled hidden>Phân loại</option>
                      <option value="electronics">Điện tử</option>
                      <option value="accessories">Phụ kiện</option>
                      <option value="clothing">Quần áo</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                </div>
                <div className='col'>
                  <button className='btn-delete' onClick={() => deleteItem(index)}>
                    <img src="/icons/icons8-delete-48.png" alt="" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {showPopup && (
            <PopupItems
              onClose={handleClosePopup}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default RightCard
