import { useEffect, useState } from 'react';
import React from 'react'
import '../../../pages/booking/booking.css'; 
import BookingService from '../../../api/booking';

const BookingItems = () => {
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
  return (
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
  )
}

export default BookingItems
