import React from 'react';
import { Box, Typography, Card, CardContent, Grid, useTheme } from '@mui/material';
import { FormControlLabel, Switch } from '@mui/material';
import { People, Inventory, PersonAdd } from '@mui/icons-material';
import './dashboard.css'
import AuthService from './../../api/auth-login';
import ProductService from './../../api/product';
import BookingService from '../../api/booking';
import { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StatCard = ({ title, value, icon, bgColor }) => (
  <Card sx={{ background: bgColor, color: '#fff', borderRadius: 2, width: '100%' }}>
    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Box sx={{ fontSize: 40 }}>{icon}</Box>
      <Typography variant="h6" component="div">{title}</Typography>
      <Typography variant="h4">{value}</Typography>

    </CardContent>
  </Card>
);

const Dashboard = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [userCount, setUserCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    AuthService.countUsers().then(count => {
      setUserCount(count);
    });
    ProductService.getTotalItemsInStock().then(count => {
      setItemCount(count);
    });
    BookingService.getTotalCustomers().then(count => {
      setCustomerCount(count);
    });
    ProductService.getMonthlyItemCount().then(data => {
      setMonthlyData(data);
    });
  }, []);
  const chartData = {
    labels: monthlyData.map(item => `Tháng ${item.month}`), // Gán tháng từ dữ liệu
    datasets: [
      {
        label: 'Tổng số lượng hàng nhập mỗi tháng',
        data: monthlyData.map(item => item.totalQuantity), // Tổng số lượng hàng nhập
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống kê tổng số lượng hàng nhập mỗi tháng',
      },
    },
  };
  const [is3D, setIs3D] = useState(false);

  const handleToggle = () => {
    setIs3D(!is3D);
  };
  return (
    <Box
      sx={{
        py: 4,
        px: 3,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',

      }}
    >
      <Grid container spacing={4} sx={{ mb: 4, maxWidth: '100%' }}>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Tổng Nhân Viên"
            value={userCount}
            icon={<People fontSize="large" />}
            bgColor="linear-gradient(135deg, #FF8A65 0%, #FF6F61 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Tổng Sản Phẩm Trong Kho"
            value={itemCount}
            icon={<Inventory fontSize="large" />}
            bgColor="linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Tổng Khách Hàng"
            value={customerCount}
            icon={<PersonAdd fontSize="large" />}
            bgColor="linear-gradient(135deg, #81C784 0%, #66BB6A 100%)"
          />
        </Grid>
      </Grid>
      {/* giao dien chart */}
      <Box
        sx={{
          width: '98%',
          mb: 4,
          border: '1px solid',
          borderColor: theme.palette.divider, // Sử dụng màu viền theo theme
          borderRadius: '8px',
          backgroundColor: theme.palette.background.paper, // Sử dụng màu nền theo theme
          p: 2,
        }}
      >
        <Line data={chartData} options={chartOptions} />
      </Box>
      {/* giao dien mo phong warehouse */}
      <Box
        sx={{
          width: '98%',
          height: '500px',
          border: '1px solid',
          borderRadius: '8px',
          borderColor: 'divider',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          mb: 4,
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6">Giao diện mô phỏng kho hàng</Typography>
          <FormControlLabel
            control={<Switch checked={is3D} onChange={handleToggle} />}
            label={is3D ? 'Chế độ 3D' : 'Chế độ 2D'}
          />
        </Box>

        {/* Main content area */}
        {is3D ? (
          <Box sx={{ width: '100%', height: '100%' }}>
            {/* Component 3D sẽ được thêm ở đây */}
            <Typography align="center" sx={{ marginTop: '50px' }}>
              Chế độ 3D đang được phát triển...
            </Typography>
          </Box>
        ) : (
          <TransformWrapper initialScale={1} minScale={0.5} maxScale={3}>
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                {/* Custom zoom buttons */}
                <div className="zoom-buttons">
                  <button className="zoom-button" onClick={() => zoomIn()}>+</button>
                  <button className="zoom-button" onClick={() => zoomOut()}>-</button>
                  <button className="zoom-button" onClick={() => resetTransform()}>Reset</button>
                </div>

                <TransformComponent>
                  <img
                    src={isDarkMode ? '/images/warehouse2D-dark.png' : '/images/warehouse2D-light.png'}
                    alt="Warehouse Interface"
                    className="zoomable-image"
                  />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        )}
      </Box>

    </Box>
  );
}

export default Dashboard;