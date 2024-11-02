import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import Swal from "sweetalert2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const CheckoutListReport = () => {
  const [checkoutGroups, setCheckoutGroups] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    fetchPendingCheckoutItems();
  }, []);

  const fetchPendingCheckoutItems = () => {
    fetch("http://localhost:8080/api/jasper/checkout-records/grouped")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCheckoutGroups(data);
      })
      .catch((error) => {
        setSnackbarMessage(
          "Error fetching data: " + (error.message || "Network error")
        );
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  const handlePrintCheckoutGroup = async (group) => {
    console.log(group);
    Swal.fire({
      title: "Đang in...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(
        "http://localhost:8080/api/jasper/generate-pdf-checkout-item",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(group),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Mở PDF trong một tab mới
      const newWindow = window.open(url, "_blank");
      if (newWindow) {
        newWindow.addEventListener("load", () => {
          newWindow.print(); // Tự động gọi hộp thoại in
        });
      }

      Swal.close(); // Đóng thông báo sau khi mở PDF
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Không thể tạo PDF. Vui lòng thử lại.",
      });
      console.error("Error generating PDF:", error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const uniqueValues = (array) => {
    return [...new Set(array)];
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filteredCheckoutGroups = selectedDate
    ? Object.entries(checkoutGroups).filter(
        ([date]) =>
          new Date(date).toDateString() ===
          dayjs(selectedDate).toDate().toDateString()
      )
    : Object.entries(checkoutGroups);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ py: 4, width: "80%", margin: "0 auto" }}>
        <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
          Danh sách sản phẩm xuất kho
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "inline-flex", marginRight: "1rem" }}>
            <Typography variant="h8">Ngày xuất hàng: </Typography>
          </div>
          <DatePicker value={selectedDate} onChange={handleDateChange} />
        </div>
        {filteredCheckoutGroups.length === 0 ? (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", color: "gray", mt: 2 }}
          >
            Không có dữ liệu.
          </Typography>
        ) : (
          filteredCheckoutGroups.map(([date, items], index) => (
            <Box key={index} sx={{ mb: 4 }}>
              <Box sx={{ textAlign: "left", mb: 2, mt: 2 }}>
                <Typography variant="h8">Ngày xuất hàng: {date}</Typography>
              </Box>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell>Tên sản phẩm</TableCell>
                      <TableCell>Số lượng</TableCell>
                      <TableCell>Tổng thời gian lưu kho (ngày)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((record, idx) => (
                      <TableRow key={record.id}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>{record.item.name}</TableCell>
                        <TableCell>{record.quantity}</TableCell>
                        <TableCell>{record.storageDuration}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ ml: 2 }}
                  onClick={() => handlePrintCheckoutGroup(items)}
                >
                  In chi tiết
                </Button>
              </Box>
            </Box>
          ))
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "center", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
};

export default CheckoutListReport;
