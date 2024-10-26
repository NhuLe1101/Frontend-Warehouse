import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const PopupQuantity = ({ open, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);

  // Xử lý sự kiện khi thay đổi giá trị input số lượng
  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(value > 0 ? value : 1); // Đảm bảo số lượng luôn lớn hơn 0
  };

  const handleConfirm = () => {
    onConfirm(quantity);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Nhập số lượng</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="quantity"
          variant="standard"
          label="Số lượng"
          type="number"
          fullWidth
          value={quantity}
          onChange={handleQuantityChange}
          inputProps={{ min: 1 }}  // Chỉ giới hạn giá trị nhỏ nhất là 1
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupQuantity;
