"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Tabs,
  Tab,
  Box,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

export default function SettingsPage() {
  const [tabValue, setTabValue] = useState("general");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Settings
        </Typography>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ mb: 3 }}
        >
          <Tab label="General" value="general" />
          <Tab label="Security" value="security" />
          <Tab label="Notifications" value="notifications" />
        </Tabs>

        {tabValue === "general" && (
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                General Settings
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <FormControl fullWidth>
                  <TextField
                    label="Site Name"
                    defaultValue="Real Estate Investment Platform"
                    fullWidth
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Support Email"
                    type="email"
                    defaultValue="support@example.com"
                    fullWidth
                  />
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Timezone</InputLabel>
                  <Select
                    defaultValue="UTC"
                    label="Timezone"
                  >
                    <MenuItem value="UTC">UTC</MenuItem>
                    <MenuItem value="EST">Eastern Time</MenuItem>
                    <MenuItem value="CST">Central Time</MenuItem>
                    <MenuItem value="PST">Pacific Time</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ 
                    bgcolor: 'rgb(16, 185, 129)',
                    '&:hover': {
                      bgcolor: 'rgb(5, 150, 105)'
                    }
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {tabValue === "security" && (
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Security Settings
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1">
                      Two-Factor Authentication
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Add an extra layer of security to your account
                    </Typography>
                  </Box>
                  <FormControlLabel
                    control={<Switch />}
                    label=""
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1">
                      Session Timeout
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Automatically log out after inactivity
                    </Typography>
                  </Box>
                  <FormControl sx={{ width: 180 }}>
                    <InputLabel>Timeout</InputLabel>
                    <Select
                      defaultValue="30"
                      label="Timeout"
                    >
                      <MenuItem value="15">15 minutes</MenuItem>
                      <MenuItem value="30">30 minutes</MenuItem>
                      <MenuItem value="60">1 hour</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ 
                    bgcolor: 'rgb(16, 185, 129)',
                    '&:hover': {
                      bgcolor: 'rgb(5, 150, 105)'
                    }
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {tabValue === "notifications" && (
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Notification Preferences
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1">
                      Email Notifications
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Receive updates about new course enrollments
                    </Typography>
                  </Box>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label=""
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1">
                      System Notifications
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Receive alerts about system updates
                    </Typography>
                  </Box>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label=""
                  />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ 
                    bgcolor: 'rgb(16, 185, 129)',
                    '&:hover': {
                      bgcolor: 'rgb(5, 150, 105)'
                    }
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
}