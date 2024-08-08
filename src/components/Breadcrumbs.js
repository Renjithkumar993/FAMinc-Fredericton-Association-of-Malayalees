import React from 'react';
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useLocation, Link as RouterLink } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const formatBreadcrumb = (value) => {
    // Replace hyphens with spaces and capitalize each word
    return value.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div style={{ marginTop: '60px', marginBottom: '20px' }}>
      <MUIBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          fontSize: '0.8rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Link
          color="inherit"
          to="/"
          component={RouterLink}
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.8rem',
            textDecoration: 'none',
            padding: '6px 8px',
            borderRadius: '4px',
            background: '#f0f0f0',
            transition: 'background 0.3s',
            '&:hover': {
              background: '#e0e0e0',
            }
          }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const breadcrumb = formatBreadcrumb(value);

          return isLast ? (
            <Typography
              color="textPrimary"
              key={to}
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.8rem',
                padding: '6px 8px',
                borderRadius: '4px',
                background: '#f0f0f0'
              }}
            >
              {breadcrumb}
            </Typography>
          ) : (
            <Link
              color="inherit"
              to={to}
              component={RouterLink}
              key={to}
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.8rem',
                textDecoration: 'none',
                padding: '6px 8px',
                borderRadius: '4px',
                background: '#f0f0f0',
                transition: 'background 0.3s',
                '&:hover': {
                  background: '#e0e0e0',
                }
              }}
            >
              {breadcrumb}
            </Link>
          );
        })}
      </MUIBreadcrumbs>
    </div>
  );
};

export default Breadcrumbs;
