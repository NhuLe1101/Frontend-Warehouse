import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { People, Inventory, PersonAdd } from '@mui/icons-material';
import './dashboard.css'
import AuthService from './../../api/auth-login';
import { useState, useEffect } from 'react';
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
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    AuthService.countUsers().then(count => {
      setUserCount(count);
    });
  }, []);
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
            value="2300"
            icon={<Inventory fontSize="large" />}
            bgColor="linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Tổng Khách Hàng"
            value="500"
            icon={<PersonAdd fontSize="large" />}
            bgColor="linear-gradient(135deg, #81C784 0%, #66BB6A 100%)"
          />
        </Grid>
      </Grid>

      <Box sx={{ width: '98%', height: '500px', backgroundColor: '#f0f0f0', borderRadius: 2, display: 'flex', justifyContent: 'center', alignItems: 'center',  }}>
        <img
          src="/images/warehouse2D.png"
          alt="Warehouse Interface"
          style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }}

        />
      </Box>
    </Box>
  );
}

export default Dashboard;