import * as React from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  TableHead,
  TableBody,
} from "@mui/material";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa"; // Import the download icon from FontAwesome
import EditProduct from "./EditProduct/EditProduct";

export default function TableRowComponent({
  product,
  index,
  isPopup,
  onSelectProduct,
}) {
  const [open, setOpen] = React.useState(false);
  const [compartments, setCompartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let count = 1;
  const handleButtonClick = () => {
    if (product.quantity === 1) {
      // Nếu quantity là 1, tự động thêm vào compartment
      onSelectProduct(product, 1); // Gửi số lượng mặc định là 1
    } else {
      // Nếu quantity > 1, mở popup để nhập số lượng
      onSelectProduct(product);
    }
  };
  useEffect(() => {
    if (open) {
      fetch(`http://localhost:8080/api/product/${product.itemId}/compartments`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch compartments");
          }
          return response.json();
        })
        .then((data) => {
          setCompartments(data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Hàng chưa lên kệ");
          setLoading(false);
        });
    }
  }, [open, product.itemId]);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditClick = (rowData) => {
    setSelectedProduct(rowData);
    setIsEditing(true);
  };

  const handleClosePopup = () => {
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <TableRow>
        <TableCell>{index + 1}</TableCell>
        <TableCell>
          <div className="imgPrdContainer">
            <img
              className="imgPrd"
              src={product.image || "/favicon.ico"}
              alt=""
            />
          </div>
        </TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell>{product.quantity}</TableCell>
        <TableCell>{formatDate(product.checkin)}</TableCell>
        <TableCell>{formatDate(product.checkout)}</TableCell>
        <TableCell>{product.status}</TableCell>
        <TableCell>{product.booking.id}</TableCell>
        <TableCell>
          <IconButton size="small" onClick={() => handleEditClick(product)}>
            <FaEdit />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {isPopup && (
          <TableCell>
            <Button
              variant="contained"
              color="primary"
              onClick={handleButtonClick}
            >
              Chọn
            </Button>
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={13}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom>
                <TableHead style={{ display: "block", width: "100%" }}>
                  <TableRow style={{ display: "flex", width: "100%" }}>
                    <TableCell width={"25%"}>STT</TableCell>
                    <TableCell width={"25%"}>Kệ</TableCell>
                    <TableCell width={"25%"}>Ngăn chứa</TableCell>
                    <TableCell width={"25%"}>Số lượng</TableCell>
                  </TableRow>
                </TableHead>
              </Typography>
              <Typography variant="body2">
                <TableBody style={{ display: "block", width: "100%" }}>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4}>Đang tải...</TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={4}>{error}</TableCell>
                    </TableRow>
                  ) : compartments.length > 0 ? (
                    compartments.map((compartment, idx) => (
                      <TableRow
                        key={compartment.compId}
                        style={{ display: "flex", width: "100%" }}
                      >
                        <TableCell width={"25%"}>{count++}</TableCell>
                        <TableCell width={"25%"}>
                          {compartment.shelf?.nameShelf || "Không xác định"}
                        </TableCell>
                        <TableCell width={"25%"}>
                          {compartment.nameComp}
                        </TableCell>
                        <TableCell width={"25%"}>
                          {compartment.quantity}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>Không có dữ liệu</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {isEditing && (
        <EditProduct product={selectedProduct} onClose={handleClosePopup} />
      )}
    </>
  );
}
