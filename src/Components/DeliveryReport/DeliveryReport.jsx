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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CompartmentService from "./../../api/compartment";
import Swal from "sweetalert2";

const DeliveryReport = () => {
  const [checkoutGroups, setCheckoutGroups] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchPendingCheckoutItems();
  }, []);

  const fetchPendingCheckoutItems = () => {
    CompartmentService.getPendingCheckoutItems()
      .then((response) => {
        const groupedData = groupByReferenceNoAndDelivery(response.data);
        setCheckoutGroups(groupedData);
      })
      .catch((error) => {
        setSnackbarMessage(
          "Error fetching data: " +
            (error.response?.data?.message || "Network error")
        );
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  // Hàm nhóm items theo referenceNo và delivery
  const groupByReferenceNoAndDelivery = (data) => {
    const groups = {};
    data.forEach((record) => {
      const key = `${record.referenceNo}-${record.delivery}`;
      if (!groups[key]) {
        groups[key] = {
          referenceNo: record.referenceNo,
          delivery: record.delivery,
          checkoutDate: record.checkoutDate,
          employeeName: record.user?.profileName || "N/A", // Lấy tên nhân viên từ CheckoutRecord
          items: [],
        };
      }
      groups[key].items.push(record);
    });
    return Object.values(groups);
  };

  const handleConfirmCheckoutGroup = (group) => {
    Promise.all(
      group.items.map((record) => CompartmentService.confirmCheckout(record.id))
    )
      .then(() => {
        setSnackbarMessage("Xuất hàng đã được xác nhận thành công!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        fetchPendingCheckoutItems(); // Cập nhật lại danh sách sau khi xác nhận
      })
      .catch((error) => {
        setSnackbarMessage(
          error.response?.data.message ||
            "Có lỗi xảy ra trong quá trình xác nhận checkout"
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
        "http://localhost:8080/api/jasper/generate-pdf-delivery-report",
        // `${API_URL}/api/jasper/generate-pdf-delivery-report`,
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

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleOpenDialog = (group) => {
    setSelectedGroup(group);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedGroup(null);
  };

  const handleConfirmCancelCheckout = () => {
    if (selectedGroup) {
      Promise.all(
        selectedGroup.items.map((record) =>
          CompartmentService.cancelCheckout(record.id)
        )
      )
        .then(() => {
          setSnackbarMessage(
            "Xuất hàng đã bị hủy và sản phẩm đã được trả lại vào ngăn!"
          );
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          fetchPendingCheckoutItems(); // Cập nhật lại danh sách sau khi hủy
        })
        .catch((error) => {
          setSnackbarMessage(
            error.response?.data.message ||
              "Có lỗi xảy ra trong quá trình hủy checkout"
          );
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        })
        .finally(() => {
          handleCloseDialog();
        });
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ py: 4, width: "80%", margin: "0 auto" }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
        Báo cáo thông tin đơn xuất hàng
      </Typography>

      {checkoutGroups.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", color: "gray" }}>
          Không có item nào đang chờ xuất hàng.
        </Typography>
      ) : (
        checkoutGroups.map((group, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Box sx={{ textAlign: "left", mb: 2 }}>
              <Typography variant="h6">Biển số xe: {group.delivery}</Typography>
              <Typography variant="h6">
                Mã xác nhận: {group.referenceNo}
              </Typography>
              <Typography variant="h6">
                Ngày xuất hàng: {group.checkoutDate}
              </Typography>
              <Typography variant="h6">
                Nhân viên xuất hàng: {group.employeeName}
              </Typography>
            </Box>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Trọng lượng</TableCell>
                    <TableCell>Phân loại</TableCell>
                    <TableCell>Ngăn chứa</TableCell>
                    <TableCell>Kệ</TableCell>
                    <TableCell>Tổng thời gian lưu kho (ngày)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {group.items.map((record, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{record.item.name}</TableCell>
                      <TableCell>{record.quantity}</TableCell>
                      <TableCell>{record.item.weight}</TableCell>
                      <TableCell>{record.item.type}</TableCell>
                      <TableCell>{record.compartment.nameComp}</TableCell>
                      <TableCell>
                        {record.compartment.shelf.nameShelf}
                      </TableCell>
                      <TableCell>{record.storageDuration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                color="error"
                sx={{ mr: 2 }}
                onClick={() => handleOpenDialog(group)}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleConfirmCheckoutGroup(group)}
              >
                Xác nhận
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ ml: 2 }}
                onClick={() => handlePrintCheckoutGroup(group)}
              >
                In PDF
              </Button>
            </Box>
          </Box>
        ))
      )}

      {/* Dialog xác nhận */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="confirm-cancel-dialog-title"
        aria-describedby="confirm-cancel-dialog-description"
      >
        <DialogTitle id="confirm-cancel-dialog-title">Xác nhận hủy</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-cancel-dialog-description">
            Bạn có chắc chắn muốn hủy xuất hàng? Hành động này không thể hoàn
            tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleConfirmCancelCheckout} color="error" autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>

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
  );
};

export default DeliveryReport;
