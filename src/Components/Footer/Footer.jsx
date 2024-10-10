import React from 'react'
import './footer.css'; 
import { Height } from '@mui/icons-material';

const Footer = () => {
  return (
    <div className="footer">
        <div className='content'>
          <div className='content_1'>
            <img src="/images/logo-warehouse.png" alt="" height={'75'}/>
            <p>Công ty của chúng tôi cung cấp dịch vụ cho thuê kho hàng. Chúng tôi cam kết luôn đảm bảo chất lượng và số lượng hàng hoá của bạn.</p>
          </div>
          <div className='content_2'>
            <div style={{display: 'block', height: '75px', width: 'auto'}}></div>
            <h3>Liên lạc với chúng tôi</h3>
            <p>Email: whs@gmail.com</p>
            <p>Số điện thoại: +84 28284 48444</p>
          </div>
        </div>
        <div className='copyright'>
          <p>Copyright © 2024.</p>
        </div> 
    </div>
  )
}

export default Footer
