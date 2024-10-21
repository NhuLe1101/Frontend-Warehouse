import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppProvider } from '@toolpad/core/react-router-dom'; // React Router version
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Outlet, Link } from 'react-router-dom';  // Sử dụng Link từ react-router-dom
import { useDemoRouter } from '@toolpad/core/internal';
import zIndex from '@mui/material/styles/zIndex';

// Cấu hình các mục navigation với đường dẫn tương ứng
const NAVIGATION = [
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'statistic/report',
    title: 'Report',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'statistic/static',
    title: 'Static',
    icon: <BarChartIcon />,
  },
];
// Tạo theme cho dashboard
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Component chính của Statistic
function Statistic(props) {
  const { window } = props;

  // Sử dụng router demo từ toolpad
  // const router = useDemoRouter('/dashboard');
  // const demoWindow = window !== undefined ? window() : undefined;

  return (
    <div className='statistic' style={{ marginTop: '56px', overflow: 'hidden' }}>
      <AppProvider
        navigation={NAVIGATION}
        branding={{
          title: 'My Dashboard',  // Tiêu đề của Dashboard
        }}
        // router={router}
        theme={demoTheme}
        // window={demoWindow}
      >
        <DashboardLayout>
          <Outlet /> {/* Outlet sẽ render các route con như dashboard, report, static */}
        </DashboardLayout>
      </AppProvider>

    </div>
  );
}

Statistic.propTypes = {
  window: PropTypes.func,
};

export default Statistic;
