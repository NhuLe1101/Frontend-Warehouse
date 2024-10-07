import React from 'react'
import './booking.css';
import BookingTableNew from '../../Components/Booking/BookingTableNew/BookingTableNew';
import BtnAddNewBooking from '../../Components/Booking/BtnAddNewBooking/BtnAddNewBooking';

const Booking = () => {
  return (
    <div className='booking' style={{marginTop:'56px'}}>
      <div className='booking_title'>
        <p style={{fontSize:'32px'}}>QUẢN LÝ BOOKING</p>
      </div>
      
      <BtnAddNewBooking></BtnAddNewBooking>
      <BookingTableNew></BookingTableNew>

    </div>
  )
}

export default Booking
