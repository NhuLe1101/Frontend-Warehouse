import React from 'react'
import { Box, Typography } from '@mui/material';

const CheckoutListReport = () => {
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
      <Typography variant="h4">CheckoutListReport Page</Typography>
      <Typography>All reports are displayed here.</Typography>
    </Box>
  )
}

export default CheckoutListReport
