import './rightcard.css';
import React from 'react'
import { useState } from 'react';
const RightCard = () => {
  const [weight, setWeight] = useState(0);
  const [percentWeight, setPercentWeight] = useState(0);

  return (
    <div className='container'>
      <div className='card'>
        <div className="card-package">
          <div className='packaging'>
            <h1>PACKAGING</h1>
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
                  <div className='label'>Kích thước(Cm)</div>
                  <div className='label'>Khoảng trống:</div>

                  <div className='label'>Trọng lượng: {percentWeight} %</div>
                </div>
                <div className='input-group'>
                  <input type="number" placeholder="chiều dài" />
                  <input type="number" placeholder="chiều rộng" />
                  <input type="number" placeholder="chiều cao" />
                  <input type="number" placeholder="trọng lượng" value={weight} disabled />
                </div>
              </div>
              <div className='col'>
                <button className='btn-delete'><img src="" alt="" /></button>
              </div>
            </div>
          </div>
        </div>
        <div className="card-items">

        </div>
      </div>
    </div>
  )
}

export default RightCard
