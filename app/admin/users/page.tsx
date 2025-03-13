"use client";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Box,
  Paper,
  TableContainer,
  InputAdornment,
} from "@mui/material";
import {
  Search as SearchIcon,
  PersonAdd as UserPlusIcon,
  Edit as EditIcon,
  Delete as TrashIcon,
} from "@mui/icons-material";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Student",
    joinDate: "2024-01-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Student",
    joinDate: "2024-02-01",
    status: "Active",
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin",
    joinDate: "2023-12-01",
    status: "Active",
  },
];

export default function UsersPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<UserPlusIcon />}
          sx={{
            bgcolor: 'rgb(16, 185, 129)',
            '&:hover': {
              bgcolor: 'rgb(5, 150, 105)'
            }
          }}
        >
          Add User
        </Button>
      </Box>

      <Card>
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Users</Typography>
            <TextField
              placeholder="Search users..."
              variant="outlined"
              size="small"
              sx={{ width: 256 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
        <CardContent>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Join Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell sx={{ width: 100 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell sx={{ fontWeight: 500 }}>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '9999px',
                          bgcolor: 'rgb(220, 252, 231)',
                          color: 'rgb(22, 101, 52)',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                        }}
                      >
                        {user.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small">
                          <EditIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                        <IconButton size="small" sx={{ color: 'error.main' }}>
                          <TrashIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}