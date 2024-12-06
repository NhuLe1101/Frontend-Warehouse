import { useState, useEffect } from "react";
import React, { Fragment } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Button,
  TablePagination,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BookingService from "../../../api/booking";
import { FaDownload, FaEdit, FaPrint, FaRegTrashAlt } from "react-icons/fa";
import EditBooking from "../EditBooking/EditBooking";
import Swal from "sweetalert2";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#171722",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
  },
});

const BookingTableNew = () => {
  const [bookings, setBookings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const API_URL = process.env.REACT_APP_API_URL;

  const downloadClicked = (rowIndex) => {
    Swal.fire({
      title: "Đang tải xuống...",
      timer: 1000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then(() => {
      const excelFile = bookings[rowIndex].excelFile.split("\\").pop();
      window.open(`http://localhost:8080/api/booking/download/${excelFile}`);
      //window.open(`${API_URL}/api/booking/download/${excelFile}`);
    });
  };

  const handleEditClick = (rowIndex) => {
    setSelectedBooking(bookings[rowIndex]);
    setIsEditing(true);
  };

  const handleCancleClick = (bookingId) => {
    Swal.fire({
      title: "Bạn thật sự muốn huỷ?",
      text: "Nếu huỷ, những sản phẩm thuộc Booking này sẽ bị huỷ theo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Đóng",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Đang huỷ...",
          text: "Vui lòng chờ trong giây lát.",
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });

        //fetch("${API_URL}/api/booking/delete/${bookingId}", {
        fetch(`http://localhost:8080/api/booking/delete/${bookingId}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Huỷ không thành công");
            }
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(response.json());
              }, 1000);
            });
          })
          .then((data) => {
            Swal.fire("Đã huỷ!", "Huỷ thành công", "success");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          })
          .catch((error) => {
            Swal.fire("Thất bại!", "Huỷ không thành công", "error");
          });
      }
    });
  };

  const handlePrintClick = async (rowIndex) => {
    console.log(bookings[rowIndex]);
    Swal.fire({
      title: "Đang in...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(
        "http://localhost:8080/api/jasper/generate-pdf-booking",
        // eslint-disable-next-line no-template-curly-in-string
        //"${API_URL}/api/jasper/generate-pdf-booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookings[rowIndex]),
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

  const handleClosePopup = () => {
    setIsEditing(false);
    setSelectedBooking(null);
  };

  const handleSave = (updatedBooking) => {
    const updatedBookings = bookings.map((b) =>
      b.id === updatedBooking.id ? updatedBooking : b
    );
    setBookings(updatedBookings);
    handleClosePopup();
  };

  useEffect(() => {
    BookingService.getAllBookings()
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Fragment>
      <ThemeProvider theme={darkTheme}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>HỌ VÀ TÊN</TableCell>
                <TableCell>EMAIL</TableCell>
                <TableCell>SỐ ĐIỆN THOẠI</TableCell>
                <TableCell>FILE BOOKING</TableCell>
                <TableCell colSpan={3}>THAO TÁC</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(bookings) && bookings.length > 0 ? (
                bookings
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((booking, index) => (
                    <TableRow key={booking.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{booking.customerName}</TableCell>
                      <TableCell>{booking.customerEmail}</TableCell>
                      <TableCell>{booking.numberphone}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<FaDownload />}
                          onClick={() => downloadClicked(index)}
                        >
                          Tải xuống
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<FaEdit />}
                          onClick={() => handleEditClick(index)}
                        >
                          Sửa
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<FaPrint />}
                          onClick={() => handlePrintClick(index)}
                        >
                          Xuất PDF
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<FaRegTrashAlt />}
                          onClick={() => handleCancleClick(booking.id)}
                        >
                          Huỷ
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={Array.isArray(bookings) ? bookings.length : 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số hàng mỗi trang:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to}/${count !== -1 ? count : `nhiều hơn ${to}`}`
            }
          />
        </TableContainer>
      </ThemeProvider>

      {isEditing && (
        <EditBooking
          booking={selectedBooking}
          onClose={handleClosePopup}
          onSave={handleSave}
          onOpen={isEditing}
        />
      )}
    </Fragment>
  );
};

export default BookingTableNew;
