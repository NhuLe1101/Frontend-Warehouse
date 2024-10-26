
import { useState, useEffect } from 'react';
import React, { Fragment } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button, TablePagination } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BookingService from '../../../api/booking';
import { FaDownload, FaEdit, FaPrint } from 'react-icons/fa';
import EditBooking from '../EditBooking/EditBooking';
import Swal from 'sweetalert2';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            paper: '#171722',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0bec5',
        },
    },
});

const BookingTableNew = () => {
    const [bookings, setBookings] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const downloadClicked = (rowIndex) => {
        Swal.fire({
            title: "Đang tải xuống...",
            timer: 1000,
            didOpen: () => {
                Swal.showLoading();
            }
        }).then(() => {
            const excelFile = bookings[rowIndex].excelFile.split('\\').pop();
            window.open(`http://localhost:8080/api/booking/download/${excelFile}`);
        });
    };

    const handleEditClick = (rowIndex) => {
        setSelectedBooking(bookings[rowIndex]);
        setIsEditing(true);
    };

    const handlePrintClick = (rowIndex) => {
        Swal.fire({
            title: "Đang in...",
            timer: 1000,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    };

    const handleClosePopup = () => {
        setIsEditing(false);
        setSelectedBooking(null);
    };

    const handleSave = (updatedBooking) => {
        const updatedBookings = bookings.map((b) => b.id === updatedBooking.id ? updatedBooking : b);
        setBookings(updatedBookings);
        handleClosePopup();
    };

    useEffect(() => {
        BookingService.getAllBookings()
            .then((data) => setBookings(data))
            .catch((error) => console.error("Có lỗi xảy ra:", error));
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
                                <TableCell colSpan={2}>THAO TÁC</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((booking, index) => (
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
                                            Booking File
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
                                            In
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={bookings.length}
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
