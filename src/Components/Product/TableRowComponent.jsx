
import * as React from 'react';
import { TableRow, TableCell, IconButton, Collapse, Box, Typography, TableHead, TableBody } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function TableRowComponent({ product, index, isPopup, onSelectProduct }) {
  const [open, setOpen] = React.useState(false);
  let count = 1; 
  const handleButtonClick = () => {
    if (product.quantity === 1) {
      // Nếu quantity là 1, tự động thêm vào compartment
      onSelectProduct(product, 1);  // Gửi số lượng mặc định là 1
    } else {
      // Nếu quantity > 1, mở popup để nhập số lượng
      onSelectProduct(product);
    }
  };
  return (
    <>
      <TableRow>
        <TableCell>{product.itemId}</TableCell>
        <TableCell>
          <div className='imgPrdContainer'>
            <img className='imgPrd' src={product.image} alt=""/>
          </div>
        </TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell>{product.quantity}</TableCell>
        <TableCell>{product.checkin}</TableCell>
        <TableCell>{product.checkout}</TableCell>
        <TableCell>{product.status}</TableCell>
        <TableCell>{product.booking.id}</TableCell>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {isPopup && (
          <TableCell>
            <button variant="contained" color="primary" onClick={handleButtonClick}>
              Select
            </button>
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom>
               <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Kệ</TableCell>
                  <TableCell>Ngăn chứa</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              </Typography>
              <Typography variant="body2">
                <TableBody>
                  <TableCell>{count++}</TableCell>
                  <TableCell>null</TableCell>
                  <TableCell>null</TableCell>
                  <TableCell>null</TableCell>
                </TableBody>
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
