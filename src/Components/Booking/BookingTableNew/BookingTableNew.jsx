import { useState , useEffect } from 'react';
import React, { Fragment } from 'react';
import MUIDataTable from 'mui-datatables';
import BookingService from '../../../api/booking';
import {createTheme, ThemeProvider} from '@mui/material/styles'

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
            customBodyRender: (value) => <a href={value} target='_blank' style={{color: "#fff", textDecoration: "none", backgroundColor: "darkslateblue", padding: "6px", borderRadius:"8px"}}>Link File</a>
        }
    }
];

const options = {
  selectableRows: false,
  elevation: 0,
};

const getMuiTheme = () => createTheme({
    typography:{
        fontFamily:"Poppins",
        
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
                    padding: "7px 32px",
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
