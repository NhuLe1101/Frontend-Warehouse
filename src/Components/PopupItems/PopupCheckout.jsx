import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import TextField from '@mui/material/TextField';


const PopupCheckout = ({ open, onClose, handleConfirm }) => {
    const [referenceNo, setReferenceNo] = useState('');
    const [plateNumber, setPlateNumber] = useState('');

    const handleReferenceNoChange = (event) => {
        setReferenceNo(event.target.value);
    };

    const handlePlateNumberChange = (event) => {
        setPlateNumber(event.target.value);
    };

    const handleConfirmClick = () => {
        handleConfirm(referenceNo, plateNumber);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Nhập thông tin checkout</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="referenceNo"
                    label="Mã xác nhận"
                    type="text"
                    fullWidth
                    variant="standard" 
                    value={referenceNo}
                    onChange={handleReferenceNoChange}
                    sx={{
                        marginBottom: "8px", 
                    }}
                />
                <TextField
                    margin="dense"
                    id="plateNumber"
                    label="Biển số xe"
                    type="text"
                    fullWidth
                    variant="standard" 
                    value={plateNumber}
                    onChange={handlePlateNumberChange}
                    sx={{
                        marginBottom: "8px", 
                    }}
                />
                
            </DialogContent>


            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Hủy
                </Button>
                <Button onClick={handleConfirmClick} color="primary">
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PopupCheckout
