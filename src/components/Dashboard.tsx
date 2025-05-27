import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Avatar,
  Grid,
  CardContent,
  IconButton,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {
  DashboardContainer,
  DashboardPaper,
  HeaderBox,
  HeaderContent,
  ActionButtons,
  DashboardCard,
  CardIconBox,
  LogoutButton,
  DialogTextField,
  DialogButton,
  NotificationBadge,
  MenuItemText,
} from '../styles/Dashboard.styles';

function Dashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
  const [darkMode, setDarkMode] = useState(theme.palette.mode === 'dark');
  const [profileDialog, setProfileDialog] = useState(false);
  const [securityDialog, setSecurityDialog] = useState(false);
  const [settingsDialog, setSettingsDialog] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  const [lastLogin, setLastLogin] = useState(new Date().toLocaleString());

  // Profile state
  const [profile, setProfile] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    location: user.location || '',
    bio: user.bio || '',
  });

  // Security state
  const [security, setSecurity] = useState({
    twoFactor: false,
    emailNotifications: true,
    loginAlerts: true,
  });

  // Settings state
  const [settings, setSettings] = useState({
    language: 'English',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
  });

  useEffect(() => {
    // Update last login time
    const lastLoginTime = localStorage.getItem('lastLogin');
    if (lastLoginTime) {
      setLastLogin(new Date(lastLoginTime).toLocaleString());
    }
    localStorage.setItem('lastLogin', new Date().toISOString());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const handleProfileUpdate = () => {
    const updatedUser = { ...user, ...profile };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setProfileDialog(false);
  };

  const handleSecurityUpdate = () => {
    const updatedUser = { ...user, security };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setSecurityDialog(false);
  };

  const handleSettingsUpdate = () => {
    const updatedUser = { ...user, settings };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setSettingsDialog(false);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
    setNotifications(0);
  };

  return (
    <DashboardContainer>
      <Container maxWidth="lg">
        <DashboardPaper>
          <HeaderBox>
            <HeaderContent>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                Welcome, {user.email?.split('@')[0] || 'User'}!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last login: {lastLogin}
              </Typography>
            </HeaderContent>
            <ActionButtons>
              <Tooltip title="Notifications">
                <IconButton onClick={handleNotificationClick}>
                  <Badge badgeContent={notifications} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Toggle Dark Mode">
                <IconButton onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout">
                <LogoutButton onClick={handleLogout}>
                  <LogoutIcon />
                </LogoutButton>
              </Tooltip>
            </ActionButtons>
          </HeaderBox>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <DashboardCard onClick={() => setProfileDialog(true)}>
                <CardContent>
                  <CardIconBox>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      <PersonIcon />
                    </Avatar>
                    <Typography variant="h6">Profile</Typography>
                  </CardIconBox>
                  <Typography variant="body2" color="text.secondary">
                    Manage your personal information and preferences
                  </Typography>
                </CardContent>
              </DashboardCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <DashboardCard onClick={() => setSecurityDialog(true)}>
                <CardContent>
                  <CardIconBox>
                    <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                      <SecurityIcon />
                    </Avatar>
                    <Typography variant="h6">Security</Typography>
                  </CardIconBox>
                  <Typography variant="body2" color="text.secondary">
                    Update your password and security settings
                  </Typography>
                </CardContent>
              </DashboardCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <DashboardCard onClick={() => setSettingsDialog(true)}>
                <CardContent>
                  <CardIconBox>
                    <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                      <SettingsIcon />
                    </Avatar>
                    <Typography variant="h6">Settings</Typography>
                  </CardIconBox>
                  <Typography variant="body2" color="text.secondary">
                    Customize your account settings and preferences
                  </Typography>
                </CardContent>
              </DashboardCard>
            </Grid>
          </Grid>

          {/* Profile Dialog */}
          <Dialog open={profileDialog} onClose={() => setProfileDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <DialogTextField
                    label="Name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <DialogTextField
                    label="Email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <DialogTextField
                    label="Phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationOnIcon />
                  </ListItemIcon>
                  <DialogTextField
                    label="Location"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  />
                </ListItem>
              </List>
            </DialogContent>
            <DialogActions>
              <DialogButton onClick={() => setProfileDialog(false)}>Cancel</DialogButton>
              <DialogButton onClick={handleProfileUpdate} variant="contained">Save</DialogButton>
            </DialogActions>
          </Dialog>

          {/* Security Dialog */}
          <Dialog open={securityDialog} onClose={() => setSecurityDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Security Settings</DialogTitle>
            <DialogContent>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <LockIcon />
                  </ListItemIcon>
                  <ListItemText primary="Two-Factor Authentication" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={security.twoFactor}
                      onChange={(e) => setSecurity({ ...security, twoFactor: e.target.checked })}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Email Notifications" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={security.emailNotifications}
                      onChange={(e) => setSecurity({ ...security, emailNotifications: e.target.checked })}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Login Alerts" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={security.loginAlerts}
                      onChange={(e) => setSecurity({ ...security, loginAlerts: e.target.checked })}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </DialogContent>
            <DialogActions>
              <DialogButton onClick={() => setSecurityDialog(false)}>Cancel</DialogButton>
              <DialogButton onClick={handleSecurityUpdate} variant="contained">Save</DialogButton>
            </DialogActions>
          </Dialog>

          {/* Settings Dialog */}
          <Dialog open={settingsDialog} onClose={() => setSettingsDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Account Settings</DialogTitle>
            <DialogContent>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <LanguageIcon />
                  </ListItemIcon>
                  <DialogTextField
                    select
                    label="Language"
                    value={settings.language}
                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  >
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Spanish">Spanish</MenuItem>
                    <MenuItem value="French">French</MenuItem>
                  </DialogTextField>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <DialogTextField
                    select
                    label="Timezone"
                    value={settings.timezone}
                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                  >
                    <MenuItem value="UTC">UTC</MenuItem>
                    <MenuItem value="EST">EST</MenuItem>
                    <MenuItem value="PST">PST</MenuItem>
                  </DialogTextField>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <DialogTextField
                    select
                    label="Date Format"
                    value={settings.dateFormat}
                    onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
                  >
                    <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                    <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                    <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                  </DialogTextField>
                </ListItem>
              </List>
            </DialogContent>
            <DialogActions>
              <DialogButton onClick={() => setSettingsDialog(false)}>Cancel</DialogButton>
              <DialogButton onClick={handleSettingsUpdate} variant="contained">Save</DialogButton>
            </DialogActions>
          </Dialog>

          {/* Notifications Menu */}
          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={handleNotificationClose}
          >
            <MenuItem onClick={handleNotificationClose}>
              <MenuItemText>
                <ListItemText primary="New login detected" secondary="2 minutes ago" />
              </MenuItemText>
            </MenuItem>
            <MenuItem onClick={handleNotificationClose}>
              <MenuItemText>
                <ListItemText primary="Password changed" secondary="1 hour ago" />
              </MenuItemText>
            </MenuItem>
            <MenuItem onClick={handleNotificationClose}>
              <MenuItemText>
                <ListItemText primary="Profile updated" secondary="2 hours ago" />
              </MenuItemText>
            </MenuItem>
          </Menu>
        </DashboardPaper>
      </Container>
    </DashboardContainer>
  );
}

export default Dashboard; 