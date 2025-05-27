import { styled } from '@mui/material/styles';
import { Box, Paper, Card, IconButton, Typography, Button, TextField } from '@mui/material';
import { Theme } from '@mui/material/styles';

export const DashboardContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  minHeight: '100vh',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(45deg, #1a237e 30%, #880e4f 90%)'
    : 'linear-gradient(45deg, #1976d2 30%, #dc004e 90%)',
  padding: theme.spacing(4, 0),
}));

export const DashboardPaper = styled(Paper)(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  background: theme.palette.mode === 'dark'
    ? 'rgba(30, 30, 30, 0.9)'
    : 'rgba(255, 255, 255, 0.9)',
}));

export const HeaderBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 32,
});

export const HeaderContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

export const ActionButtons = styled(Box)({
  display: 'flex',
  gap: 16,
});

export const DashboardCard = styled(Card)(({ theme }: { theme: Theme }) => ({
  height: '100%',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

export const CardIconBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

export const CardIcon = styled(Box)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.primary.main,
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

export const LogoutButton = styled(IconButton)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.error.main,
  '&:hover': {
    transform: 'rotate(180deg)',
    transition: 'transform 0.3s ease-in-out',
  },
}));

export const DialogTextField = styled(TextField)(({ theme }: { theme: Theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },
}));

export const DialogButton = styled(Button)(({ theme }: { theme: Theme }) => ({
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

export const BackLink = styled(Button)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

export const NotificationBadge = styled(Box)(({ theme }: { theme: Theme }) => ({
  position: 'relative',
  '& .MuiBadge-badge': {
    right: -3,
    top: 3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export const MenuItemText = styled(Typography)(({ theme }: { theme: Theme }) => ({
  '& .MuiListItemText-primary': {
    fontWeight: 500,
  },
  '& .MuiListItemText-secondary': {
    color: theme.palette.text.secondary,
  },
})); 