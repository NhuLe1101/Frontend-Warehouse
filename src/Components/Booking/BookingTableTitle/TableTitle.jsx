import React from 'react'
import '../../../pages/booking/booking.css'; 

const TableTitle = () => {
  return (
    <div className='booking_table_title'>
    <div className='booking_table_stt'>
      <p>STT</p>
    </div>
    <div className='booking_table_id'>
      <p>ID</p>
    </div>
    <div className='booking_table_email'>
      <p>Email</p>
    </div>
    <div className='booking_table_sodienthoai'>
      <p>Số điện thoại</p>
    </div>
    <div className='booking_table_hovaten' style={{display: "none"}}>
      <p>Họ và tên</p>
    </div>
    <div className='booking_table_fileexcel' style={{display: "none"}}>
      <p>File Excel</p>
    </div>
    <div className='booking_table_delivery'>
      <p>Delivery</p>
    </div>
    <div className='booking_table_checkin'>
      <p>Ngày nhập</p>
    </div>
    <div className='booking_table_checkout'>
      <p>Ngày xuất</p>
    </div>
    <div className='booking_table_status'>
      <p>Trạng thái</p>
    </div>
    <div className='booking_table_sua'>
       <p></p>
    </div>
    <div className='booking_table_xoa'>
      <p></p> 
    </div>
  </div>
  )
}

export default TableTitle
