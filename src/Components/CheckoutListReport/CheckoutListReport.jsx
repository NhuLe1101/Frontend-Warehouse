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
  Select,
  MenuItem,
} from "@mui/material";
import Swal from "sweetalert2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const CheckoutListReport = () => {
  const today = dayjs();
  const [checkoutGroups, setCheckoutGroups] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [startDate, setStartDate] = useState(today.subtract(1, "day"));
  const [endDate, setEndDate] = useState(today);
  const [selectedRange, setSelectedRange] = useState("today");
  // const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetchPendingCheckoutItems();
  }, []);

  const fetchPendingCheckoutItems = () => {
    fetch("http://localhost:8080/api/jasper/checkout-records/grouped")
    // fetch(`${API_URL}/api/jasper/checkout-records/grouped`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCheckoutGroups(data);
        console.log(data);
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
        // `${API_URL}/api/jasper/generate-pdf-checkout-item`,
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

      const newWindow = window.open(url, "_blank");
      if (newWindow) {
        newWindow.addEventListener("load", () => {
          newWindow.print();
        });
      }

      Swal.close();
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

  const handleDateChange = (date, type) => {
    if (type === "start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    const today = dayjs();
    setSelectedRange(value);
    switch (value) {
      case "today":
        setStartDate(today.subtract(1, "day"));
        setEndDate(today.endOf("day"));
        break;
      case "3days":
        setStartDate(today.subtract(3, "day"));
        setEndDate(today.endOf("day"));
        break;
      case "7days":
        setStartDate(today.subtract(7, "day"));
        setEndDate(today.endOf("day"));
        break;
      case "30days":
        setStartDate(today.subtract(30, "day"));
        setEndDate(today.endOf("day"));
        break;
      default:
        break;
    }
  };

  const filteredCheckoutGroups = Object.entries(checkoutGroups).filter(
    ([date]) => {
      const currentDate = new Date(date);
      return (
        currentDate >= dayjs(startDate).toDate() &&
        currentDate <= dayjs(endDate).toDate()
      );
    }
  );

  const combinedItems = filteredCheckoutGroups.flatMap(
    ([date, items]) => items
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ py: 4, width: "80%", margin: "0 auto" }}>
        <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
          Danh sách sản phẩm xuất kho
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Select
            value={selectedRange}
            onChange={handleSelectChange}
            displayEmpty
            sx={{ marginRight: "1rem" }}
          >
            <MenuItem value="" disabled>
              Chọn khoảng thời gian
            </MenuItem>
            <MenuItem value="today">Hôm nay</MenuItem>
            <MenuItem value="3days">3 ngày trước</MenuItem>
            <MenuItem value="7days">7 ngày trước</MenuItem>
            <MenuItem value="30days">30 ngày trước</MenuItem>
          </Select>
          <div style={{ display: "inline-flex", marginRight: "1rem" }}>
            <Typography variant="h8">Ngày bắt đầu: </Typography>
          </div>
          <DatePicker
            value={startDate}
            onChange={(date) => handleDateChange(date, "start")}
          />
          <div
            style={{
              display: "inline-flex",
              marginRight: "1rem",
              marginLeft: "1rem",
            }}
          >
            <Typography variant="h8">Ngày kết thúc: </Typography>
          </div>
          <DatePicker
            value={endDate}
            onChange={(date) => handleDateChange(date, "end")}
          />
        </div>
        {combinedItems.length === 0 ? (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", color: "gray", mt: 2 }}
          >
            Không có dữ liệu.
          </Typography>
        ) : (
          <Box sx={{ mb: 4, mt: 4 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Ngày xuất kho</TableCell>
                    <TableCell align="center">
                      Tổng thời gian lưu kho (ngày)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {combinedItems.map((record, idx) => (
                    <TableRow key={record.id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{record.item.name}</TableCell>
                      <TableCell>{record.quantity}</TableCell>
                      <TableCell>{record.checkoutDate}</TableCell>
                      <TableCell align="center">
                        {record.storageDuration}
                      </TableCell>
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
                onClick={() => handlePrintCheckoutGroup(combinedItems)}
              >
                In chi tiết
              </Button>
            </Box>
          </Box>
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
