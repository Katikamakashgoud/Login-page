import { styled } from '@mui/material/styles';
import { Container, Paper, Typography, TextField, Button, Link } from '@mui/material';
import { Theme } from '@mui/material/styles';

export const ForgotPasswordContainer = styled(Container)(({ theme }: { theme: Theme }) => ({
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

export const ForgotPasswordPaper = styled(Paper)(({ theme }: { theme: Theme }) => ({
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

export const ForgotPasswordTitle = styled(Typography)(({ theme }: { theme: Theme }) => ({
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

export const ForgotPasswordForm = styled('form')(({ theme }: { theme: Theme }) => ({
  marginTop: theme.spacing(1),
  width: '100%',
  animation: 'fadeIn 0.5s ease-in-out 0.2s both',
}));

export const StyledTextField = styled(TextField)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },
}));

export const SubmitButton = styled(Button)(({ theme }: { theme: Theme }) => ({
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

export const BackToLoginLink = styled(Link)(({ theme }: { theme: Theme }) => ({
  marginTop: theme.spacing(2),
  fontWeight: 'bold',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'scale(1.05)',
  },
})); 