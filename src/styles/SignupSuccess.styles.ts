import { styled } from '@mui/material/styles';
import { Box, Container, Paper, Typography, Button } from '@mui/material';
import { Theme } from '@mui/material/styles';

export const SuccessContainer = styled(Container)(({ theme }: { theme: Theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(45deg, #1a237e 30%, #880e4f 90%)'
    : 'linear-gradient(45deg, #1976d2 30%, #dc004e 90%)',
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease-in-out',
}));

export const SuccessPaper = styled(Paper)(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  borderRadius: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  animation: 'fadeIn 0.5s ease-in-out',
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

export const CheckmarkBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.success.main,
  borderRadius: '50%',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(1)' },
  },
}));

export const SuccessTitle = styled(Typography)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 'bold',
  animation: 'slideIn 0.5s ease-in-out',
  '@keyframes slideIn': {
    '0%': {
      opacity: 0,
      transform: 'translateX(-20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },
}));

export const SuccessMessage = styled(Typography)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  animation: 'fadeIn 0.5s ease-in-out 0.2s both',
}));

export const LoginButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  height: '48px',
  borderRadius: '24px',
  textTransform: 'none',
  fontSize: '1.1rem',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
})); 