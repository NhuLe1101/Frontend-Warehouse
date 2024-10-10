import { useState , useEffect } from 'react';
import React, { Fragment } from 'react';
import MUIDataTable from 'mui-datatables';
import BookingService from '../../../api/booking';
import {createTheme, ThemeProvider} from '@mui/material/styles'
import { FaDownload, FaEdit } from 'react-icons/fa'; // Import the download icon from FontAwesome

const columns = [
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
            customBodyRender: (value) => <button className="download-btn" style={{color: "#fff", textDecoration: "none", backgroundColor: "#0c3c73", padding: "6px", borderRadius:"8px"}}>
        <FaDownload style={{marginRight: "6px"}} /> Booking File
      </button>
        }
    },
    {
        name: "Thao tác",
        options: {
            customBodyRender: (value) => <button className="download-btn" style={{color: "#fff", textDecoration: "none", backgroundColor: "#0c3c73", padding: "6px", borderRadius:"8px"}}>
        <FaEdit style={{marginRight: "6px"}} /> Sửa </button>
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
    typography:{
        fontFamily:"sans-serif",
        
    },
    palette:{
        background: {
            paper:"#1E1E2C",
            default: "#0f172a",
        },
        mode: 'dark',
    },
    components: {
        MuiTableCell:{
            styleOverrides:{
                head:{
                    padding: "7px 15px",
                },
                body:{
                    padding: "16px",
                    color:"#e2e8f0",
                },
            }
        }
    }
})

const BookingTableNew = () => {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
    BookingService.getAllBookings()
      .then((data) => {
          setBookings(data); 
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
      });
  }, []);

  const newBookingData = bookings.map(obj => [String(obj.id), obj.customerName, obj.customerEmail, obj.numberphone, obj.excelFile]);

  const data = newBookingData;

  return (
    <Fragment>
        <div>
            <ThemeProvider theme={getMuiTheme}>
                <MUIDataTable
                title={"Danh sách Booking"}
                data={data}
                columns={columns}
                options={options}
                />
            </ThemeProvider>
        </div>
    </Fragment>
  )
}

export default BookingTableNew
