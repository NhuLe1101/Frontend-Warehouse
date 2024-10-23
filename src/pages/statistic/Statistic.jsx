import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SummarizeIcon from '@mui/icons-material/Summarize';
import DescriptionIcon from '@mui/icons-material/Description';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppProvider } from '@toolpad/core/react-router-dom'; // React Router version
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Outlet, Link } from 'react-router-dom';  // Sử dụng Link từ react-router-dom


// Cấu hình các mục navigation với đường dẫn tương ứng
const NAVIGATION = [
  {
    segment: 'statistic/dashboard',
    title: 'Tổng quan',
    icon: <DashboardIcon />,
  },
  {
    segment: 'statistic/report',
    title: 'Báo cáo',
    icon: <SummarizeIcon />,
    children: [
      {
        segment: 'checkout-list',
        title: 'Sản phẩm xuất kho',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'delivery-confirmation',
        title: 'Vận chuyển',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'statistic/static',
    title: 'Thống kê',
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
      <div style={{ position: 'relative', zIndex: '0' }}>

        <AppProvider
          navigation={NAVIGATION}
          branding={{
            title: 'Thống kê và báo cáo',  // Tiêu đề của Dashboard
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
    </div>
  );
}

Statistic.propTypes = {
  window: PropTypes.func,
};

export default Statistic;
