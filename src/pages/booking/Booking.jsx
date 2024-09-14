import { useEffect, useState } from 'react';
import React from 'react'
import './booking.css';
import BookingService from '../../api/booking-upload';

const Booking = () => {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    BookingService.getAllBookings()
      .then((data) => {
        setBookings(data); 
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
      });
  }, []);


  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [delivery, setDelivery] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = await BookingService.upload(email, phoneNumber, fullName, delivery, file, status, checkin, checkout);
      alert(message); // Hiển thị thông báo từ backend
      setActiveForm(!activeForm);
      window.location.reload();
    } catch (error) {
      console.error("Có lỗi xảy ra khi upload dữ liệu:", error);
    }
  };

  const [activeForm, setActiveForm] = useState(false);
  const addNewBooking = () => {
    setActiveForm(!activeForm);
  }
  const active_form_create_new_booking = () =>{
    setActiveForm(!activeForm);
  }
  return (
    <div className='booking' style={{marginTop:'56px'}}>
      <div className='booking_title'>
        <p style={{fontSize:'32px'}}>QUẢN LÝ BOOKING</p>
      </div>
      <div className='booking_add_button'>
        <button type="button" className='btn_add_new_line add_button_container' onClick={addNewBooking}>
          <p>Thêm mới</p>
          <img src="icons/icons8-add-24.png" alt="" width={'18px'}/>
        </button>
        <div className={`form_create_new_booking ${activeForm === true ? 'active_form_create_new_booking' : 'hide_form_create_new_booking'}`} >
          <button id='close_form_create_new_booking' onClick={active_form_create_new_booking} >
            <p>x</p>
          </button>
          <p className='title_form_create_new_booking'>THÔNG TIN BOOKING</p>
          <form action="" onSubmit={handleSubmit}>
            <div>
              <p>Email</p>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div>
              <p>Số điện thoại</p>
              <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
            </div>
            <div>
              <p>Họ và tên</p>
              <input type="text"  value={fullName} onChange={(e) => setFullName(e.target.value)} required/>
            </div>
            <div>
              <p>File Excel</p>
              <input type="file"  accept=".csv" onChange={(e) => setFile(e.target.files[0])} required/>
            </div>
            <div>
              <p>Delivery</p>
              <input type="text"  value={delivery} onChange={(e) => setDelivery(e.target.value)} required/>
            </div>
            <div>
              <p>Status</p>
              <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required/>
            </div>
            <div>
              <p>Ngày nhập</p>
              <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} required/>
            </div>
            <div>
              <p>Ngày xuất</p>
              <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} required/>
            </div>
            <button type="submit" id='btn_submit_form_create_new_booking'>Thêm mới</button>
          </form>
        </div>
        <button type="button" className='btn_create_file add_button_container'>
          <a href="https://www.appsheet.com/newshortcut/1aa24261-b440-4ca3-b224-75c16a5b2800" target="_blank" rel="noopener noreferrer">Công cụ tạo file Excel</a>
          <img src="icons/icons8-excel-24.png" alt="" width={'18px'}/>
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
          <div className='booking_table_delivery'>
            <p>Delivery</p>
          </div>
          <div className='booking_table_status'>
            <p>Trạng thái</p>
          </div>
          <div className='booking_table_checkin'>
            <p>Ngày nhập</p>
          </div>
          <div className='booking_table_checkout'>
            <p>Ngày xuất</p>
          </div>
          <div className='booking_table_sua'>
             <p></p>
          </div>
          <div className='booking_table_xoa'>
            <p></p> 
          </div>
        </div>
        <div className='booking_table_items'>
          {bookings.map((booking) => (
            <div key={booking.bookingId} className='booking_table_item'>
              <div className='booking_table_stt'>
                <p>{booking.bookingId}</p>
              </div>
              <div className='booking_table_email'>
                <p>{booking.customerEmail}</p>
              </div>
              <div className='booking_table_sodienthoai'>
                <p>{booking.numberphone}</p>
              </div>
              <div className='booking_table_hovaten'>
                <p>{booking.customerName}</p>
              </div>
              <div className='booking_table_fileexcel'>
                <p>abcd.xlsx</p>
              </div>
              <div className='booking_table_delivery'>
                <p>{booking.delivery}</p>
              </div>
              <div className='booking_table_status'>
                <p>{booking.status}</p>
              </div>
              <div className='booking_table_checkin'>
              <p>{booking.checkIn}</p>
              </div>
              <div className='booking_table_checkout'>
                <p>{booking.checkOut}</p>
              </div>
              <div className='booking_table_sua'>
                <button type="button">
                  <img src="icons/icons8-edit-48.png" alt="" width={18}/>
                </button>
              </div>
              <div className='booking_table_xoa'>
                <button type='button'>
                  <img src="icons/icons8-delete-60.png" alt="" width={18}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Booking
