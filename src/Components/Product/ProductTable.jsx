import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import TableRowComponent from './TableRowComponent';
import TablePaginationActions from './TablePaginationActions';
import ProductService from '../../api/product';  // Import your API service
import './ProductTable.css';

export default function ProductTable({ isPopup, onSelectProduct }) {
  const [products, setProducts] = React.useState([]);  // State cho danh sách sản phẩm
  const [loading, setLoading] = React.useState(true);  // State cho trạng thái loading
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    ProductService.getAllProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

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
            <TableRowComponent
              key={product.itemId}
              product={product}
              index={index}
              isPopup={isPopup}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </TableContainer>
  );
}
