import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Link,
  Checkbox,
  FormControlLabel,
  Divider,
  IconButton,
  InputAdornment,
  LinearProgress,
  Tooltip,
  useTheme,
  Switch,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import SignupSuccess from './components/SignupSuccess';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { theme } from './theme';

const getTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: mode === 'light' ? '#f5f5f5' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: mode === 'light' 
            ? 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))'
            : 'linear-gradient(rgba(30, 30, 30, 0.9), rgba(30, 30, 30, 0.9))',
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
  },
});

// Button position styles
const buttonPositions = {
  'shift-left': { transform: 'translateX(-100px)' },
  'shift-top': { transform: 'translateY(-50px)' },
  'shift-right': { transform: 'translateX(100px)' },
  'shift-bottom': { transform: 'translateY(50px)' },
};

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [buttonPosition, setButtonPosition] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const navigate = useNavigate();

  const theme = getTheme(darkMode ? 'dark' : 'light');

  // Calculate password strength
  useEffect(() => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    if (password.match(/[^A-Za-z0-9]/)) strength += 25;
    setPasswordStrength(strength);
  }, [password]);

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return 'error';
    if (passwordStrength <= 50) return 'warning';
    if (passwordStrength <= 75) return 'info';
    return 'success';
  };

  const shiftButton = () => {
    const positions = ['shift-left', 'shift-top', 'shift-right', 'shift-bottom'];
    const currentIndex = positions.indexOf(buttonPosition);
    const nextPosition = positions[(currentIndex + 1) % positions.length];
    setButtonPosition(nextPosition);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Check for lockout
      if (lockoutTime && Date.now() < lockoutTime) {
        const remainingTime = Math.ceil((lockoutTime - Date.now()) / 1000);
        throw new Error(`Account temporarily locked. Please try again in ${remainingTime} seconds.`);
      }

      // Get stored users
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === email);

      if (!user) {
        throw new Error('Email not registered');
      }

      if (user.password !== password) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        if (newAttempts >= 3) {
          const lockoutDuration = 300000; // 5 minutes
          const newLockoutTime = Date.now() + lockoutDuration;
          setLockoutTime(newLockoutTime);
          throw new Error('Too many failed attempts. Account locked for 5 minutes.');
        }
        
        throw new Error('Invalid password');
      }

      // Reset attempts on successful login
      setLoginAttempts(0);
      setLockoutTime(null);

      // Store current user
      localStorage.setItem('currentUser', JSON.stringify(user));

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            background: darkMode 
              ? 'linear-gradient(45deg, #1a237e 30%, #880e4f 90%)'
              : 'linear-gradient(45deg, #1976d2 30%, #dc004e 90%)',
            padding: 3,
            borderRadius: 2,
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: 'white',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'rotate(180deg)',
              },
            }}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              borderRadius: 2,
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
            }}
          >
            <Box
              sx={{
                backgroundColor: 'primary.main',
                borderRadius: '50%',
                padding: 2,
                marginBottom: 2,
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': {
                    transform: 'scale(1)',
                  },
                  '50%': {
                    transform: 'scale(1.05)',
                  },
                  '100%': {
                    transform: 'scale(1)',
                  },
                },
              }}
            >
              <LockOutlinedIcon sx={{ color: 'white', fontSize: 40 }} />
            </Box>
            <Typography 
              component="h1" 
              variant="h5" 
              sx={{ 
                mb: 3, 
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
              }}
            >
              login user
            </Typography>
            <Box 
              component="form" 
              onSubmit={handleSubmit} 
              sx={{ 
                mt: 1, 
                width: '100%',
                animation: 'fadeIn 0.5s ease-in-out 0.2s both',
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ 
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {password && (
                <Box sx={{ width: '100%', mb: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={passwordStrength}
                    color={getPasswordStrengthColor() as any}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                    Password strength: {passwordStrength}%
                  </Typography>
                </Box>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                <Tooltip title="Reset your password">
                  <Link href="/forgot-password" variant="body2" underline="hover">
                    Forgot password?
                  </Link>
                </Tooltip>
              </Box>
              {error && (
                <Alert severity={error.includes('successful') ? 'success' : 'error'} sx={{ mt: 2, mb: 2 }}>
                  {error}
                </Alert>
              )}
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '48px',
                  mt: 3,
                  mb: 2,
                }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  onClick={shiftButton}
                  sx={{
                    position: 'absolute',
                    transition: 'all 0.3s ease-in-out',
                    ...(buttonPosition && buttonPositions[buttonPosition as keyof typeof buttonPositions]),
                    height: '48px',
                    borderRadius: '24px',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Login'}
                </Button>
              </Box>
              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: 2, 
                  mb: 2,
                  '& .MuiIconButton-root': {
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1) rotate(5deg)',
                    },
                  },
                }}
              >
                <Tooltip title="Sign in with Google">
                  <IconButton color="primary" aria-label="Google login">
                    <GoogleIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Sign in with Facebook">
                  <IconButton color="primary" aria-label="Facebook login">
                    <FacebookIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Sign in with Twitter">
                  <IconButton color="primary" aria-label="Twitter login">
                    <TwitterIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography 
                variant="body2" 
                align="center" 
                sx={{ 
                  mt: 2,
                  animation: 'fadeIn 0.5s ease-in-out 0.4s both',
                }}
              >
                Don't have an account?{' '}
                <Link 
                  href="/signup" 
                  underline="hover" 
                  sx={{ 
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  Create Account
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup-success" element={<SignupSuccess />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 