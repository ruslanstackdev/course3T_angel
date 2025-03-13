"use client";

import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Tabs,
  Tab,
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";

const courses = [
  {
    id: 1,
    title: "Section 8 Secrets Course",
    subtitle:
      "Your Guide to Buying Your First Section 8 Rental Property in the Next 60 Days",
    description:
      "Master the art of Section 8 real estate investing with our comprehensive course. Learn how to find properties, work with housing authorities, screen tenants, and maximize your rental income.",
    image:
      "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80&w=800",
    price: 997,
    features: [
      "Complete Section 8 investment strategy",
      "Property selection criteria",
      "Tenant screening process",
      "HUD compliance guidelines",
      "Property management best practices",
      "Risk mitigation strategies",
    ],
    modules: [
      {
        title: "Introduction to Section 8",
        lessons: 3,
        duration: "45 minutes",
        completed: true,
      },
      {
        title: "Finding Section 8 Properties",
        lessons: 4,
        duration: "1.5 hours",
        completed: true,
      },
      {
        title: "Working with Housing Authorities",
        lessons: 3,
        duration: "1 hour",
        completed: true,
      },
      {
        title: "Tenant Screening Process",
        lessons: 4,
        duration: "1.5 hours",
        completed: false,
      },
      {
        title: "Property Management",
        lessons: 5,
        duration: "2 hours",
        completed: false,
      },
    ],
    stats: {
      students: "1,234",
      rating: 4.8,
      reviews: 156,
      completed: "65%",
    },
  },
  {
    id: 2,
    title: "Wholesale Secrets Video Course",
    subtitle: "Learn How to Find and Flip Wholesale Real Estate Deals",
    description:
      "Discover the secrets of successful real estate wholesaling. From finding motivated sellers to closing deals, this course covers everything you need to know to start wholesaling properties.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    price: 797,
    features: [
      "Complete wholesaling blueprint",
      "Deal analysis framework",
      "Contract templates",
      "Buyer list building strategies",
      "Marketing techniques",
      "Negotiation scripts",
    ],
    modules: [
      {
        title: "Wholesale Basics",
        lessons: 3,
        duration: "1 hour",
        completed: true,
      },
      {
        title: "Finding Motivated Sellers",
        lessons: 4,
        duration: "2 hours",
        completed: true,
      },
      {
        title: "Deal Analysis",
        lessons: 3,
        duration: "1.5 hours",
        completed: false,
      },
      {
        title: "Contract Negotiation",
        lessons: 4,
        duration: "2 hours",
        completed: false,
      },
    ],
    stats: {
      students: "876",
      rating: 4.7,
      reviews: 92,
      completed: "30%",
    },
  },
];

export default function CoursesPage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: any, newValue: any) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Real Estate Investment Courses
      </Typography>

      <Grid container spacing={4}>
        {courses.map((course) => (
          <Grid item xs={12} key={course.id}>
            <Card>
              <Grid container spacing={2}>
                {/* Course Image */}
                <Grid item xs={12} md={4}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={course.image}
                    alt={course.title}
                  />
                </Grid>

                {/* Course Details */}
                <Grid item xs={12} md={8}>
                  <Box sx={{ padding: 2 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {course.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {course.subtitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {course.description}
                    </Typography>

                    {/* Tabs */}
                    <Tabs
                      value={tabValue}
                      onChange={handleTabChange}
                      textColor="primary"
                      indicatorColor="primary"
                      sx={{ marginBottom: 2 }}
                    >
                      <Tab label="Overview" />
                      <Tab label="Curriculum" />
                    </Tabs>

                    {/* Tab Content */}
                    {tabValue === 0 && (
                      <Box>
                        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                          <Grid item xs={6} md={3}>
                            <Box display="flex" alignItems="center">
                              <PeopleIcon sx={{ marginRight: 1 }} />
                              <Typography variant="body2">
                                {course.stats.students} Students
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <Box display="flex" alignItems="center">
                              <StarIcon sx={{ marginRight: 1 }} />
                              <Typography variant="body2">
                                {course.stats.rating}/5 Rating
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <Box display="flex" alignItems="center">
                              <MenuBookIcon sx={{ marginRight: 1 }} />
                              <Typography variant="body2">
                                {course.modules.length} Modules
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <Box display="flex" alignItems="center">
                              <AccessTimeIcon sx={{ marginRight: 1 }} />
                              <Typography variant="body2">
                                {course.stats.completed} Completed
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>

                        <Typography variant="subtitle1" gutterBottom>
                          What you&apos;ll learn:
                        </Typography>
                        <List>
                          {course.features.map((feature, index) => (
                            <ListItem key={index}>
                              <ListItemIcon>
                                <CheckCircleIcon color="success" />
                              </ListItemIcon>
                              <ListItemText primary={feature} />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}

                    {tabValue === 1 && (
                      <Box>
                        {course.modules.map((module, index) => (
                          <Box
                            key={index}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{
                              padding: 2,
                              backgroundColor: "grey.100",
                              borderRadius: 1,
                              marginBottom: 1,
                            }}
                          >
                            <Box display="flex" alignItems="center">
                              {module.completed ? (
                                <CheckCircleIcon color="success" />
                              ) : (
                                <PlayCircleOutlineIcon color="disabled" />
                              )}
                              <Box marginLeft={2}>
                                <Typography variant="body1">
                                  {module.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {module.lessons} lessons • {module.duration}
                                </Typography>
                              </Box>
                            </Box>
                            <Button
                              variant={module.completed ? "text" : "contained"}
                              color={module.completed ? "success" : "primary"}
                              size="small"
                            >
                              {module.completed ? "Review" : "Start"}
                            </Button>
                          </Box>
                        ))}
                      </Box>
                    )}

                    <Divider sx={{ marginY: 2 }} />

                    {/* Price and Button */}
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6">
                        ${course.price}{" "}
                        <Typography variant="body2" component="span" color="text.secondary">
                          One-time payment
                        </Typography>
                      </Typography>
                      <Button
                        variant="contained"
                        color="success"
                        endIcon={<ArrowForwardIcon />}
                      >
                        Continue Learning
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}