import { useState, useEffect } from 'react';
import React, { Fragment } from 'react';
import MUIDataTable from 'mui-datatables';
import BookingService from '../../../api/booking';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FaDownload, FaEdit } from 'react-icons/fa'; // Import the download icon from FontAwesome
import EditBooking from '../EditBooking/EditBooking'; // Import the EditBooking component

const columns = (handleEditClick) => [
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
            customBodyRender: (value) => <button className="download-btn" style={{ color: "#fff", textDecoration: "none", backgroundColor: "#0c3c73", padding: "6px", borderRadius: "8px", borderWidth: '0', paddingLeft: '8px', paddingRight: '8px', cursor: 'pointer' }}>
                <FaDownload style={{ marginRight: "6px" }} /> Booking File
            </button>
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
        // Assuming there's a function to save the updated data to the database
        // saveBookingToDatabase(updatedBooking);
        handleClosePopup();
    };

    const newBookingData = bookings.map((obj) => [String(obj.id), "ABC", obj.customerEmail, "0123", obj.excelFile]);
    const data = newBookingData;

    return (
        <Fragment>
            <div>
                <ThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable
                        title={"Danh sách Booking"}
                        data={data}
                        columns={columns(handleEditClick)}
                        options={options}
                    />
                </ThemeProvider>
            </div>

            {isEditing && (
                <EditBooking
                    booking={selectedBooking}
                    onClose={handleClosePopup}
                    onSave={handleSave}
                />
            )}
        </Fragment>
    );
};

export default BookingTableNew;
