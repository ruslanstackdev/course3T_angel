"use client";

import {
  Card,
  CardContent,
  LinearProgress,
  Button,
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
} from "@mui/material";
import {
  PlayCircle,
  AccessTime as ClockIcon,
  BarChart as BarChartIcon,
  ArrowForward as ArrowRightIcon,
  Build as WrenchIcon,
  School as GraduationCapIcon,
  Business as BuildingIcon,
  AttachMoney as DollarSignIcon,
  Group as UsersIcon,
} from "@mui/icons-material";
import Link from "next/link";

const courses = [
  {
    id: 1,
    title: "Section 8 Secrets Course",
    description: "Master Section 8 real estate investing from start to finish",
    progress: 65,
    totalSections: 11,
    completedSections: 7,
    lastAccessed: "2 days ago",
    modules: [
      "Introduction to Section 8",
      "Finding Section 8 Properties",
      "Tenant Screening",
      "HUD Compliance",
      "Property Management",
    ],
  },
  {
    id: 2,
    title: "Wholesale Secrets Video Course",
    description: "Learn how to find and flip wholesale real estate deals",
    progress: 30,
    totalSections: 7,
    completedSections: 2,
    lastAccessed: "1 week ago",
    modules: [
      "Wholesale Basics",
      "Finding Motivated Sellers",
      "Deal Analysis",
      "Contract Negotiation",
    ],
  },
];

const recentTools = [
  {
    name: "Section 8 Calculator",
    description: "Calculate potential Section 8 rental income",
    lastUsed: "1 hour ago",
    icon: <DollarSignIcon sx={{ fontSize: 24, color: "#10B981" }} />,
  },
  {
    name: "Property Analyzer",
    description: "Analyze wholesale deal potential",
    lastUsed: "3 hours ago",
    icon: <BuildingIcon sx={{ fontSize: 24, color: "#3B82F6" }} />,
  },
  {
    name: "Tenant Finder",
    description: "Find and screen Section 8 tenants",
    lastUsed: "Yesterday",
    icon: <UsersIcon sx={{ fontSize: 24, color: "#8B5CF6" }} />,
  },
];

const usageStats = [
  {
    label: "Properties Analyzed",
    value: "15",
    change: "+3 this week",
    trend: "up",
  },
  {
    label: "Potential Deal Value",
    value: "$2.5M",
    change: "+$500K this week",
    trend: "up",
  },
  {
    label: "Learning Progress",
    value: "47%",
    change: "Across both courses",
    trend: "neutral",
  },
];

export default function DashboardPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">Dashboard</Typography>
        <Typography variant="body1" color="text.secondary">Welcome back!</Typography>
      </Box>

      {/* Course Progress Section */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GraduationCapIcon /> Your Learning Journey
          </Typography>
          <Link href="/dashboard/courses" style={{ textDecoration: 'none' }}>
            <Button endIcon={<ArrowRightIcon />} color="primary">
              View All Courses
            </Button>
          </Link>
        </Box>
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} md={6} key={course.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" gutterBottom>{course.title}</Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {course.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ClockIcon fontSize="small" /> Last accessed {course.lastAccessed}
                      </Typography>
                    </Box>
                    <Button variant="contained" size="small" startIcon={<PlayCircle />}>
                      Resume
                    </Button>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={course.progress} 
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {course.completedSections} of {course.totalSections} sections completed
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Current Modules:</Typography>
                    <List dense>
                      {course.modules.map((module, index) => (
                        <ListItem key={index}>
                          <ListItemIcon sx={{ minWidth: 24 }}>
                            <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'text.secondary' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={module} 
                            primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Recently Used Tools */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WrenchIcon /> Investment Tools
          </Typography>
          <Link href="/dashboard/tools" style={{ textDecoration: 'none' }}>
            <Button endIcon={<ArrowRightIcon />} color="primary">
              All Tools
            </Button>
          </Link>
        </Box>
        <Grid container spacing={2}>
          {recentTools.map((tool) => (
            <Grid item xs={12} md={4} key={tool.name}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ p: 1, bgcolor: 'action.hover', borderRadius: 1 }}>
                      {tool.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" gutterBottom>{tool.name}</Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {tool.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Last used: {tool.lastUsed}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Investment Statistics */}
      <Box>
        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <BarChartIcon /> Investment Progress
        </Typography>
        <Grid container spacing={2}>
          {usageStats.map((stat) => (
            <Grid item xs={12} md={4} key={stat.label}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{stat.label}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    <Typography variant="h4" component="span" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.change}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}