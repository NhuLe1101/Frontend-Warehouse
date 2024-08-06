import './rightcard.css';
import React, {useContext} from 'react'
import { useState } from 'react';
import { PackageContext } from '../PackageProvider/PackageProvider';
const RightCard = () => {
  const [weight, setWeight] = useState(0);
  const [percentWeight, setPercentWeight] = useState(0);
  const { packages, setPackages } = useContext(PackageContext);
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
      // position: [packages.length * 20, 0, 0],
    };
    const updatedPackages = [...packages, newPackage];
    setPackages(updatePositions(updatedPackages));

  };

  const handleInputChange = (index, event) => {
    const newPackages = [...packages];
    newPackages[index][event.target.name] = parseFloat(event.target.value);

    setPackages(updatePositions(newPackages));
  };

  const deletePackage = (index) => {
    const newPackages = packages.filter((_, i) => i !== index);
    setPackages(newPackages);
  };
  return (
    <div className='container'>
      <div className='card'>
        <div className="card-package">
          <div className='packaging'>
            <h1>KIỆN HÀNG</h1>
            <button className='btn-add' onClick={addPackage}>
              THÊM
            </button>
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
                  onChange={(e) => handleInputChange(index, e)}
                />
                <input
                  type='number'
                  placeholder='chiều rộng'
                  name='width'
                  value={pkg.width}
                  onChange={(e) => handleInputChange(index, e)}
                />
                <input
                  type='number'
                  placeholder='chiều cao'
                  name='height'
                  value={pkg.height}
                  onChange={(e) => handleInputChange(index, e)}
                />
                <input
                  type='number'
                  placeholder='trọng lượng'
                  name='weight'
                  value={pkg.weight}
                  onChange={(e) => handleInputChange(index, e)}
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
          <div className='packaging'>
            <h1>HÀNG HÓA</h1>
            <button className='btn-add'>
              THÊM
            </button>
          </div>
          <div className='package-body'>
            <div className='row'>
              <div className='col'>
                <div class="color" >
                </div>
              </div>
              <div className='col col-demension'>
                <div className='label-package'>
                  <div className='label'>Kích thước(IN)</div>
                  {/* <div className='label'>Khoảng trống: %</div> */}

                  {/* <div className='label'>Trọng lượng: {percentWeight} kg</div> */}
                </div>
                <div className='input-group'>
                  <input type="text" id="productIds" placeholder="ID" />
                  <input type="number" id="quantity" placeholder="Số lượng" />
                  <input type="number" placeholder="chiều dài" />
                  <input type="number" placeholder="chiều rộng" />
                  <input type="number" placeholder="chiều cao" />
                  <input type="number" placeholder="trọng lượng" />
                </div>
              </div>
              <div className='col'>
                <button className='btn-delete'>
                  <img src="/icons/icons8-delete-48.png" alt="" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default RightCard
