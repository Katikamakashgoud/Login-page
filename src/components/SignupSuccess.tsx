import React from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function SignupSuccess() {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(45deg, #1976d2 30%, #dc004e 90%)',
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            borderRadius: 2,
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
          }}
        >
          <CheckCircleOutlineIcon
            sx={{
              fontSize: 80,
              color: 'success.main',
              mb: 2,
              animation: 'scaleIn 0.5s ease-in-out',
              '@keyframes scaleIn': {
                '0%': {
                  transform: 'scale(0)',
                },
                '50%': {
                  transform: 'scale(1.2)',
                },
                '100%': {
                  transform: 'scale(1)',
                },
              },
            }}
          />
          <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            Account Created Successfully!
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 4 }}>
            Your account has been created. You can now login with your email and password.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate('/')}
            sx={{
              height: '48px',
              borderRadius: '24px',
              textTransform: 'none',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              },
            }}
          >
            Go to Login
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default SignupSuccess; 