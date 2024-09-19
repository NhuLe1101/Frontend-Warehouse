import { Fragment, useEffect, useState } from 'react';
import React from 'react';
import '../../../pages/booking/booking.css'; 
import BookingService from '../../../api/booking';

const BookingItems = () => {
  const [bookings, setBookings] = useState([]);
  const [activeFormEdit, setActiveFormEdit] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [delivery, setDelivery] = useState('');
  const [status, setStatus] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');

  useEffect(() => {
    BookingService.getAllBookings()
      .then((data) => {
        setBookings(data); 
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
      });
  }, []);

  const editBooking = (booking) => {
    setSelectedBooking(booking); 
    setEmail(booking.customerEmail);
    setPhoneNumber(booking.numberphone);
    setFullName(booking.customerName);
    setDelivery(booking.delivery);
    setStatus(booking.status);
    setCheckin(booking.checkIn);
    setCheckout(booking.checkOut);
    setActiveFormEdit(true); 
  };

  const active_form_edit_of_booking_page = () => {
    setActiveFormEdit(false);
  };
  

  const handleSubmitFormEdit = async (e) => {
    e.preventDefault();
    try {
      const message = await BookingService.updateBooking(selectedBooking.bookingId, status);
      alert(message); 
      setActiveFormEdit(false);
      window.location.reload();
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật dữ liệu:", error);
    }
  };
  

  // Hàm xử lý khi người dùng muốn xoá booking
  const deleteBooking = async (bookingId) => {
    window.alert("Chức năng 'Chuyển vào thùng rác' đang xây dựng!");
    // const isConfirmed = window.confirm("Bạn có chắc chắn muốn xoá booking này không?");
    // if (isConfirmed) {
    //   try {
    //     const message = await BookingService.deleteBooking(bookingId); // Gọi API xoá booking
    //     alert(message); // Hiển thị thông báo từ backend
    //     window.location.reload(); // Tải lại danh sách booking sau khi xoá
    //   } catch (error) {
    //     console.error("Có lỗi xảy ra khi xoá dữ liệu:", error);
    //   }
    // }
  };

  return (
    <Fragment>
      {activeFormEdit && (
        <div className="form_of_booking_page active_form_edit_of_booking_page">
          <button id="close_form_edit_of_booking_page" onClick={active_form_edit_of_booking_page}>
            <p>x</p>
          </button>
          <p className="title_form_of_booking_page">THÔNG TIN BOOKING</p>
          <form onSubmit={handleSubmitFormEdit}>
            <div>
              <p>Email</p>
              <input type="email" value={email} disabled/>
            </div>
            <div>
              <p>Số điện thoại</p>
              <input type="number" value={phoneNumber}  disabled/>
            </div>
            <div>
              <p>Họ và tên</p>
              <input type="text" value={fullName}  disabled/>
            </div>
            <div>
              <p>Delivery</p>
              <input type="text" value={delivery} disabled />
            </div>
            <div>
                <p>Status</p>
                <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option value="Đã huỷ">Đã huỷ</option>
                    <option value="Đang lưu kho">Đang lưu kho</option>
                    <option value="Đã xuất kho">Đã xuất kho</option>
                    <option value="Quá hạn">Quá hạn</option>
                </select>
            </div>
            <div>
              <p>Ngày nhập</p>
              <input type="date" value={checkin} disabled />
            </div>
            <div>
              <p>Ngày xuất</p>
              <input type="date" value={checkout} disabled/>
            </div>
            <button type="submit" id="btn_submit_form_of_booking_page">Lưu thay đổi</button>
          </form>
        </div>
      )}

      <div className="booking_table_items">
        {bookings.map((booking, index) => (
          <div key={booking.bookingId} className="booking_table_item">
            <div className="booking_table_stt">
              <p>{index + 1 }</p>
            </div>
            <div className='booking_table_id'>
                <p>{booking.bookingId}</p>
            </div>
            <div className="booking_table_email">
              <p>{booking.customerEmail}</p>
            </div>
            <div className="booking_table_sodienthoai">
              <p>{booking.numberphone}</p>
            </div>
            <div className="booking_table_hovaten" style={{display: "none"}}>
              <p>{booking.customerName}</p>
            </div>
            <div className="booking_table_fileexcel" style={{display: "none"}}>
              <p>abcd.xlsx</p>
            </div>
            <div className="booking_table_delivery">
              <p>{booking.delivery}</p>
            </div>
            <div className="booking_table_checkin">
              <p>{booking.checkIn}</p>
            </div>
            <div className="booking_table_checkout">
              <p>{booking.checkOut}</p>
            </div>
            <div className="booking_table_status">
              <p>{booking.status}</p>
            </div>
            <div className="booking_table_sua">
              <button type="button" onClick={() => editBooking(booking)}>
                <img src="icons/icons8-edit-48.png" alt="" width={18} />
                <p>Chi tiết</p>
              </button>
            </div>
            <div className="booking_table_xoa">
              <button type="button" onClick={() => deleteBooking(booking.bookingId)}>
                <img src="icons/icons8-delete-60.png" alt="" width={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default BookingItems;
