import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import TableRowComponent from "./TableRowComponent";
import TablePaginationActions from "./TablePaginationActions";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ProductService from "../../api/product"; // Import your API service
import "./ProductTable.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0b0b16",
      paper: "#0b0b16",
    },
  },
  typography: {
    indam: {
      fontWeight: 1000,
    },
  },
});

export default function ProductTable({
  isPopup,
  onSelectProduct,
  productsByName,
}) {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // State cho trạng thái loading
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [allProduct, setAllProduct] = useState([]);

  const allProducts = async () => {
    try {
      const a = await ProductService.getProductsByStatus();
      setAllProduct(a);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    allProducts();
  }, []);

  React.useEffect(() => {
    if (productsByName) {
      setProducts(Array.isArray(productsByName) ? productsByName : allProduct);
      setLoading(false);
    } else {
      ProductService.getProductsByStatus()
        .then((data) => {
          setProducts(Array.isArray(data) ? data : []);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [productsByName]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell variant="indam">STT</TableCell>
              <TableCell variant="indam">HÌNH ẢNH</TableCell>
              <TableCell variant="indam">TÊN</TableCell>
              <TableCell variant="indam">TỔNG SỐ LƯỢNG</TableCell>
              <TableCell variant="indam">NGÀY NHẬP</TableCell>
              <TableCell variant="indam">NGÀY XUẤT</TableCell>
              <TableCell variant="indam">TRẠNG THÁI</TableCell>
              <TableCell variant="indam">BOOKING</TableCell>
              <TableCell variant="indam" colSpan={3}>
                THAO TÁC
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product, index) => (
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
          labelRowsPerPage="Số hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to}/${count !== -1 ? count : `nhiều hơn ${to}`}`
          }
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>
    </ThemeProvider>
  );
}
