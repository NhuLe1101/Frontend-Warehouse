import React, {useState} from 'react'
import './booking.css';
import { Button, Dialog, DialogContent } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BookingTableNew from '../../Components/Booking/BookingTable/BookingTableNew';
import BtnAddNewBooking from '../../Components/Booking/BtnAddNewBooking/BtnAddNewBooking';

const Booking = () => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='booking' style={{ marginTop: '56px'}}>
      <div className='booking_title'>
        <p style={{ fontSize: '32px' }}>QUẢN LÝ BOOKING</p>
      </div>
      <Button
        variant="contained"
        startIcon={<FileUploadIcon />}
        onClick={handleClickOpen}
        style={{ marginTop: '10px', marginBottom: '10px' }} // Adjust the spacing
      >
        Nhập file
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <BtnAddNewBooking />
        </DialogContent>
      </Dialog>

      <BookingTableNew></BookingTableNew>

    </div>
  )
}

export default Booking
