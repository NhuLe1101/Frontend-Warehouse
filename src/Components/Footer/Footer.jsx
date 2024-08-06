import React from 'react'
import './footer.css'; 

const Footer = () => {
  return (
    <div className="footer">
        <div className='content'>
          <div className='content_1'>
            <h3>Logo</h3>
            <p>Công ty của chúng tôi cung cấp dịch vụ cho thuê kho hàng. Chúng tôi cam kết luôn đảm bảo chất lượng và số lượng hàng hoá của bạn.</p>
          </div>
          <div className='content_2'>
            <h3>Liên lạc với chúng tôi</h3>
            <p>Email: warehousesgu2024@gmail.com</p>
            <p>Số điện thoại: +84 28284 48444</p>
          </div>
        </div>
        <div className='copyright'>
          <p>Copyright © 2024 WAREHOUSE SERVICE. All rights reserved.</p>
        </div> 
    </div>
  )
}

export default Footer
