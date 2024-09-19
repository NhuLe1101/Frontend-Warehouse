import React from 'react'
import './booking.css';
import TableTitle from '../../Components/Booking/BookingTableTitle/TableTitle';
import BookingItems from '../../Components/Booking/BookingItems/BookingItems';
import PopupAddBooking from '../../Components/Booking/PopupAddBooking/PopupAddBooking';

const Booking = () => {
  return (
    <div className='booking' style={{marginTop:'56px'}}>
      <div className='booking_title'>
        <p style={{fontSize:'32px'}}>QUẢN LÝ BOOKING</p>
      </div>
      <PopupAddBooking></PopupAddBooking>
      <div className='booking_table'>
        <TableTitle></TableTitle>
        <BookingItems></BookingItems>
      </div>

    </div>
  )
}

export default Booking
