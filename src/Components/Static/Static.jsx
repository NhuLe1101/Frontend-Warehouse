import React from 'react'
import { Box, Typography } from '@mui/material';

const Static = () => {
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
      <Typography variant="h4">Static Page</Typography>
      <Typography>This is the static content page.</Typography>
    </Box>
  );
}

export default Static
