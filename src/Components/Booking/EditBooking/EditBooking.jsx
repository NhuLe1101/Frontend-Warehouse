import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./editbooking.css";
import BookingService from "../../../api/booking";
import Swal from "sweetalert2";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const EditBooking = ({ booking, onClose, onOpen }) => {
  const [formData, setFormData] = useState(booking);

  const AlertSuccess = () => {
    Swal.fire({
      icon: "success",
      text: "Cập nhật thành công!",
    }).then((result) => {
      window.location.reload();
    });
  };

  useEffect(() => {
    setFormData(booking);
  }, [booking]);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      //console.log(formData);
      await BookingService.updateBooking(formData);
      //setSaveStatus('success');
      AlertSuccess();
    } catch (error) {
      //setSaveStatus('error');
      console.error("Có lỗi xảy ra khi upload dữ liệu:", error);
    }
  };

  if (!booking) return null;

  function formatId(id) {
    if (id < 10) {
      return "BK000" + id;
    } else if (id < 100) {
      return "BK00" + id;
    } else if (id < 1000) {
      return "BK0" + id;
    } else {
      return "BK" + id;
    }
  }
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={onOpen}
      style={{ zIndex: "0" }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Chi tiết Booking
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers style={{ width: "360px" }}>
        <form className="formEditBk">
          <label>
            ID:
            <input
              type="text"
              name="id"
              value={formatId(formData.id)}
              onChange={handleInputChange}
              readOnly
              disabled
            />
          </label>
          <label>
            Tên:
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Điện thoại:
            <input
              type="text"
              name="numberphone"
              value={formData.numberphone}
              onChange={handleInputChange}
            />
          </label>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSaveClick}>
          LƯU
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default EditBooking;
