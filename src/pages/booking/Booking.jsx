import { Padding } from '@mui/icons-material'
import React from 'react'
import './booking.css';

const Booking = () => {
  return (
    <div className='booking' style={{marginTop:'56px'}}>
      <div className='booking_title'>
        <p style={{fontSize:'32px'}}>QUẢN LÝ BOOKING</p>
      </div>
      <div className='booking_add_button'>
        <button type="button" className='add_button_container'>
          <img src="icons/icons8-attachment-50.png" alt="" width={24}/>
          <a href="https://www.appsheet.com/newshortcut/1aa24261-b440-4ca3-b224-75c16a5b2800">Thêm mới</a>
        </button>
      </div>
      <div className='booking_table'>
        <div className='booking_table_title'>
          <div className='booking_table_stt'>
            <p>STT</p>
          </div>
          <div className='booking_table_email'>
            <p>Email</p>
          </div>
          <div className='booking_table_sodienthoai'>
            <p>Số điện thoại</p>
          </div>
          <div className='booking_table_hovaten'>
            <p>Họ và tên</p>
          </div>
          <div className='booking_table_fileexcel'>
            <p>File Excel</p>
          </div>
          <div className='booking_table_sua'>
             <p></p>
          </div>
          <div className='booking_table_xoa'>
            <p></p> 
          </div>
        </div>
        <div className='booking_table_items'>
          <div className='booking_table_item'>
            <div className='booking_table_stt'>
              <p>#1</p>
            </div>
            <div className='booking_table_email'>
              <p>nva111@gmail.com</p>
            </div>
            <div className='booking_table_sodienthoai'>
              <p>0987766666</p>
            </div>
            <div className='booking_table_hovaten'>
              <p>Nguyễn Văn A</p>
            </div>
            <div className='booking_table_fileexcel'>
              <p>abcd.xlsx</p>
            </div>
            <div className='booking_table_sua'>
               <button type="button">
                <img src="icons/icons8-edit-48.png" alt="" width={24}/>
               </button>
            </div>
            <div className='booking_table_xoa'>
              <button type='button'>
                <img src="icons/icons8-delete-60.png" alt="" width={24}/>
              </button>
            </div>
          </div>
          <div className='booking_table_item'>
            <div className='booking_table_stt'>
              <p>#2</p>
            </div>
            <div className='booking_table_email'>
              <p>nva111@gmail.com</p>
            </div>
            <div className='booking_table_sodienthoai'>
              <p>0987766666</p>
            </div>
            <div className='booking_table_hovaten'>
              <p>Nguyễn Văn A</p>
            </div>
            <div className='booking_table_fileexcel'>
              <p>abcd.xlsx</p>
            </div>
            <div className='booking_table_sua'>
               <button type="button">
                <img src="icons/icons8-edit-48.png" alt="" width={24}/>
               </button>
            </div>
            <div className='booking_table_xoa'>
              <button type='button'>
                <img src="icons/icons8-delete-60.png" alt="" width={24}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking
