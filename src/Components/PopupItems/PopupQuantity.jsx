import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const PopupQuantity = ({ open, onClose, maxQuantity, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);  // Số lượng mặc định ban đầu là 1

  // Xử lý sự kiện khi thay đổi giá trị input số lượng
  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (value > 0 && value <= maxQuantity) {
      setQuantity(value);
    } else {
      setQuantity(maxQuantity);
    }
  };

  // Gọi hàm onConfirm khi người dùng xác nhận số lượng
  const handleConfirm = () => {
    onConfirm(quantity);  // Truyền số lượng đã nhập về cho component cha
    onClose();  // Đóng popup sau khi xác nhận
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

          label={`Số lượng (tối đa ${maxQuantity})`}
          type="number"
          fullWidth
          value={quantity}
          onChange={handleQuantityChange}
          inputProps={{ min: 1, max: maxQuantity }}
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
