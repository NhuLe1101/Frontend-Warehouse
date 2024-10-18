import { useState, useEffect } from 'react';
import React, { Fragment } from 'react';
import MUIDataTable from 'mui-datatables';
import BookingService from '../../../api/booking';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FaDownload, FaEdit } from 'react-icons/fa'; // Import the download icon from FontAwesome
import EditBooking from '../EditBooking/EditBooking'; // Import the EditBooking component
import Swal from 'sweetalert2';

const columns = (handleEditClick, downloadClicked) => [
    {
        name: "STT",
    },
    {
        name: "Họ và tên",
    },
    {
        name: "Email",
    },
    {
        name: "Số điện thoại",
    },
    {
        name: "Excel File",
        options: {
            customBodyRender: (value, tableMeta) => (<button className="download-btn" style={{ color: "#fff", textDecoration: "none", backgroundColor: "#0c3c73", padding: "6px", borderRadius: "8px", borderWidth: '0', paddingLeft: '8px', paddingRight: '8px', cursor: 'pointer' }}
                onClick={() => downloadClicked(tableMeta.rowIndex)} >
                <FaDownload style={{ marginRight: "6px" }} /> Booking File
            </button>)
        }
    },
    {
        name: "Thao tác",
        options: {
            customBodyRender: (value, tableMeta) => (
                <button
                    className="edit-bk-btn"
                    style={{ color: "#fff", textDecoration: "none", backgroundColor: "#0c3c73", padding: "6px", borderRadius: "8px", borderWidth: '0', paddingLeft: '8px', paddingRight: '8px', cursor: 'pointer' }}
                    onClick={() => handleEditClick(tableMeta.rowIndex)}
                >
                    <FaEdit style={{ marginRight: "6px" }} /> Sửa
                </button>
            )
        }
    }
];

const options = {
    selectableRows: false,
    textLabels: {
        body: {
            noMatch: "Không tìm thấy dữ liệu",
        },
        pagination: {
            next: "Trang sau",
            previous: "Trang trước",
            rowsPerPage: "Số hàng mỗi trang",
            displayRows: "trên",
        },
        toolbar: {
            search: "Tìm kiếm",
            viewColumns: "Xem cột",
        },
        filter: {
            title: "Bộ lọc",
            reset: "Đặt lại",
        },
        viewColumns: {
            title: "Hiển thị cột",
        },
    },
    elevation: 0,
};

const getMuiTheme = () => createTheme({
    typography: {
        fontFamily: "sans-serif",
    },
    palette: {
        background: {
            paper: "#1E1E2C",
            default: "#0f172a",
        },
        mode: 'dark',
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                head: {
                    padding: "7px 15px",
                },
                body: {
                    padding: "32px",
                    color: "#e2e8f0",
                },
            }
        }
    }
})

const BookingTableNew = () => {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const downloadClicked = (rowIndex) => {
        let timerInterval;
        Swal.fire({
            title: "Tải xuống",
            html: "Tập tin sẽ được tải xuống sau <b></b> giây!",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            let excelFile = bookings[rowIndex].excelFile.split('\\').pop();
            //alert(excelFile);
            window.open(`http://localhost:8080/api/booking/download/${excelFile}`);
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("Lỗi tải xuống!");
            }
        });
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

    const handleEditClick = (rowIndex) => {
        setSelectedBooking(bookings[rowIndex]);
        setIsEditing(true);
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

    const newBookingData = bookings.map((obj) => [String(obj.id), obj.customerName, obj.customerEmail, obj.numberphone, obj.excelFile]);
    const data = newBookingData;

    return (
        <Fragment>
            <div>
                <ThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable
                        title={"Danh sách Booking"}
                        data={data}
                        columns={columns(handleEditClick, downloadClicked)}
                        options={options}
                    />
                </ThemeProvider>
            </div>

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
