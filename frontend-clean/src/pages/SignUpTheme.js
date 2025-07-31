// Centralized theme for SINE Construction IMS Sign Up
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffb300',
      contrastText: '#fff',
    },
    background: {
      default: '#f7f9fb',
      paper: '#fff',
    },
    success: {
      main: '#43a047',
    },
    error: {
      main: '#d32f2f',
    },
    info: {
      main: '#0288d1',
    },
    warning: {
      main: '#ffa000',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h4: { fontWeight: 800 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 700 },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
