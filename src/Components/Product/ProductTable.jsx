import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import TableRowComponent from './TableRowComponent';
import TablePaginationActions from './TablePaginationActions';
import ProductService from '../../api/product';  // Import your API service
import './ProductTable.css';

export default function ProductTable() {
  const [products, setProducts] = React.useState([]);  // State for product data
  const [loading, setLoading] = React.useState(true);  // State for loading
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Fetch product data when component mounts
  React.useEffect(() => {
    ProductService.getAllProducts()
      .then((data) => {
        setProducts(data);  // Set the fetched products
        setLoading(false);  // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Show a loading message while data is being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>HÌNH ẢNH</TableCell>
            <TableCell>TÊN</TableCell>
            <TableCell>SỐ LƯỢNG</TableCell>
            <TableCell>NGÀY NHẬP</TableCell>
            <TableCell>NGÀY XUẤT</TableCell>
            <TableCell>TRẠNG THÁI</TableCell>
            <TableCell>BOOKING</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
            <TableRowComponent key={product.id} product={product} index={index} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </TableContainer>
  );
}
