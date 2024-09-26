import React from 'react'
import './booking.css';
import TableTitle from '../../Components/Booking/BookingTableTitle/TableTitle';
import BookingItems from '../../Components/Booking/BookingItems/BookingItems';
import PopupAddBooking from '../../Components/Booking/PopupAddBooking/PopupAddBooking';
import BookingTableNew from '../../Components/Booking/BookingTableNew/BookingTableNew';
import BtnAddNewBooking from '../../Components/Booking/BtnAddNewBooking/BtnAddNewBooking';

const Booking = () => {
  return (
    <div className='booking' style={{marginTop:'56px'}}>
      <div className='booking_title'>
        <p style={{fontSize:'32px'}}>QUẢN LÝ BOOKING</p>
      </div>
      <BtnAddNewBooking></BtnAddNewBooking>
      {/* <PopupAddBooking></PopupAddBooking>
      <div className='booking_table'>
        <TableTitle></TableTitle>
        <BookingItems></BookingItems>
      </div> */}
      <BookingTableNew></BookingTableNew>

    </div>
  )
}

export default Booking
