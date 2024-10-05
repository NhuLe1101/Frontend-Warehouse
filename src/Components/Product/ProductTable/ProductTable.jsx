import * as React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useTheme, createTheme, ThemeProvider, styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
  fontWeight: 700,
}));

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background:{
      default:'#1E1E2C',
      paper:'#1E1E2C',
    },
  },
  typography: {
    indam: {
      fontWeight:600,
    },
  },
});

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(stt, bookingid, name, type, checkin, checkout, quantity) {
  return {
    stt,
    bookingid,
    name,
    type,
    checkin,
    checkout,
    quantity,
    details: [
      {
        stt: 1,
        nganchua: 'A101',
        ke: 'A1',
        soluong: 100,
      },
      {
        stt: 2,
        nganchua: 'A102',
        ke: 'A1',
        soluong: 50,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [active, setActive] = React.useState(false);

  const [bookingId, setbookingId] = React.useState('');
  const [productId, setproductId] = React.useState('');
  const [productName, setproductName] = React.useState('');
  const [productType, setproductType] = React.useState('');
  const [productCheckin, setproductCheckin] = React.useState('');
  const [productCheckout, setproductCheckout] = React.useState('');
  const [productQuantity, setproductQuantity] = React.useState('');


  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = (row) => {
    setSelectedProduct(row);
    setbookingId(row.bookingid);
    setproductId(row.stt);
    setproductName(row.name);
    setproductType(row.type);
    setproductCheckin(dayjs(row.checkin));
    setproductCheckout(dayjs(row.checkout));
    setproductQuantity(row.quantity);
    setOpenModal(true);
  };


  React.useEffect(() => {
    if (selectedProduct !== null) {
      console.log('Selected Product:', selectedProduct);  
    }
  }, [selectedProduct]);

  const handleCloseModal = () => setOpenModal(false);


  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" >
          {row.stt}
        </TableCell>
        <TableCell align="right">{row.bookingid}</TableCell>
        <TableCell align="right">{row.name}</TableCell>
        <TableCell align="right">{row.type}</TableCell>
        <TableCell align="right">{row.checkin}</TableCell>
        <TableCell align="right">{row.checkout}</TableCell>
        <TableCell align="right">{row.quantity}</TableCell>
        <TableCell align="center">
          <ColorButton variant="contained" onClick={() => handleOpenModal(row)}>Sửa</ColorButton>
          <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          
        >
          <Box sx={styleModal}>
              <Box sx={{ width: '100%' }}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                <TextField
                  id="bookingid"
                  label="Mã booking"
                  variant="standard"
                  defaultValue={bookingId}
                  onChange={(e) => setbookingId(e.target.value )}
                  margin="normal"
                />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="productid"
                    label="Mã sản phẩm"
                    variant="standard"
                    defaultValue={productId}
                    onChange={(e) => setproductId(e.target.value )}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="name"
                    label="Tên sản phẩm"
                    variant="standard"
                    defaultValue={productName}
                    onChange={(e) => setproductName(e.target.value )}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="type"
                    label="Loại sản phẩm"
                    variant="standard"
                    defaultValue={productType}
                    onChange={(e) => setproductType(e.target.value )}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <div style={{margin: '1rem 0'}}>
                        <DatePicker
                          label="Ngày nhập"
                          value={productCheckin}
                          onChange={(newvalue) => setproductCheckin(newvalue)}
                        />
                      </div>
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <div style={{margin: '1rem 0'}}>
                        <DatePicker
                          label="Ngày xuất"
                          value={productCheckout}
                          onChange={(newvalue) => setproductCheckout(newvalue)}
                        />
                      </div>
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="type"
                    label="Số lượng"
                    variant="standard"
                    defaultValue={productQuantity}
                    onChange={(e) => setproductQuantity(e.target.value )}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" size="medium" type='submit'>
                    Lưu
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Modal>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Chi tiết
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>NGĂN CHỨA</TableCell>
                    <TableCell align="right">KỆ</TableCell>
                    <TableCell align="right">SỐ LƯỢNG</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detailsRow) => (
                    <TableRow key={detailsRow.date}>
                      <TableCell component="th" scope="row">
                        {detailsRow.stt}
                      </TableCell>
                      <TableCell>{detailsRow.nganchua}</TableCell>
                      <TableCell align="right">{detailsRow.ke}</TableCell>
                      <TableCell align="right">{detailsRow.soluong}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    stt: PropTypes.number.isRequired,
    bookingid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        stt: PropTypes.number.isRequired,
        nganchua: PropTypes.string.isRequired,
        ke: PropTypes.string.isRequired,
        soluong: PropTypes.number.isRequired,
      }),
    ).isRequired,
    type: PropTypes.string.isRequired,
    checkin: PropTypes.string.isRequired,
    checkout: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData(1, 'BK001', 'Áo long bào', 'Quần áo', '2024-08-24', '2024-08-24', 100),
  createData(2, 'BK002', 'Áo long bào ngư', 'Quần áo', '2024-08-24', '2024-08-24', 200),
  createData(3, 'BK003', 'Máy tính', 'Điện tử', '2024-08-24', '2024-08-24', 300),
];

export default function ProductTable() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead >
          <TableRow>
            <TableCell />
            <TableCell>
              <Typography variant="indam">STT</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="indam">BK.ID</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="indam">TÊN</Typography>
            </TableCell>
            <TableCell align="right">
            <Typography variant="indam">LOẠI</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="indam">NGÀY NHẬP</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="indam">NGÀY XUẤT</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="indam">SỐ LƯỢNG</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="indam">THAO TÁC</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))} */}
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <Row key={row.name} row={row} />
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </ThemeProvider>
  );
}
