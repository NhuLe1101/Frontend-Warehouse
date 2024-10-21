import React from 'react'
import { Box, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4">Dashboard Page</Typography>
      <Typography>Welcome to the Dashboard!</Typography>
    </Box>
  );
}

export default Dashboard
