"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  TextField,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import {
  Upload as UploadIcon,
  VideoCall as VideoIcon,
  Add as PlusIcon,
  Edit as EditIcon,
  Delete as TrashIcon,
} from "@mui/icons-material";

const courses = [
  {
    id: 1,
    title: "Section 8 Secrets Course",
    modules: [
      {
        id: 1,
        title: "Introduction to Section 8",
        videos: [
          { id: 1, title: "Welcome to Section 8 Investing", duration: "10:30" },
          { id: 2, title: "Understanding HUD Guidelines", duration: "15:45" },
        ],
      },
      {
        id: 2,
        title: "Finding Section 8 Properties",
        videos: [
          { id: 3, title: "Market Research Fundamentals", duration: "20:15" },
          { id: 4, title: "Property Selection Criteria", duration: "18:30" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Wholesale Secrets Video Course",
    modules: [
      {
        id: 1,
        title: "Wholesale Basics",
        videos: [
          { id: 1, title: "Introduction to Wholesaling", duration: "12:20" },
          { id: 2, title: "Finding Deals", duration: "16:45" },
        ],
      },
      {
        id: 2,
        title: "Deal Analysis",
        videos: [
          { id: 3, title: "Running the Numbers", duration: "22:10" },
          { id: 4, title: "Negotiation Strategies", duration: "19:30" },
        ],
      },
    ],
  },
];

export default function AdminPage() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [selectedModule, setSelectedModule] = useState<{
    id: number;
    title: string;
    videos: { id: number; title: string; duration: string }[];
  } | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openModuleDialog, setOpenModuleDialog] = useState(false);
  const [openVideoDialog, setOpenVideoDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box sx={{ p: 4, spacing: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4" component="h1">
          Course Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlusIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add New Course
        </Button>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: 3 }}>
        {/* Course Selection */}
        <Card>
          <CardHeader title="Courses" />
          <CardContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {courses.map((course) => (
                <Button
                  key={course.id}
                  variant={selectedCourse.id === course.id ? "contained" : "outlined"}
                  onClick={() => setSelectedCourse(course)}
                  fullWidth
                >
                  {course.title}
                </Button>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Course Content Management */}
        <Card>
          <CardHeader
            title={selectedCourse.title}
            action={
              <Button
                variant="outlined"
                startIcon={<PlusIcon />}
                onClick={() => setOpenModuleDialog(true)}
              >
                Add Module
              </Button>
            }
          />
          <CardContent>
            <Tabs
              value={tabValue}
              onChange={(_, newValue) => setTabValue(newValue)}
              sx={{ mb: 2 }}
            >
              {selectedCourse.modules.map((module, index) => (
                <Tab
                  key={module.id}
                  label={module.title}
                  onClick={() => setSelectedModule(module)}
                />
              ))}
            </Tabs>

            {selectedCourse.modules.map((module, index) => (
              <Box
                key={module.id}
                role="tabpanel"
                hidden={tabValue !== index}
              >
                {tabValue === index && (
                  <>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                      <Typography variant="h6">{module.title}</Typography>
                      <Button
                        variant="contained"
                        startIcon={<VideoIcon />}
                        onClick={() => setOpenVideoDialog(true)}
                      >
                        Upload Video
                      </Button>
                    </Box>

                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Title</TableCell>
                          <TableCell>Duration</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {module.videos.map((video) => (
                          <TableRow key={video.id}>
                            <TableCell>{video.title}</TableCell>
                            <TableCell>{video.duration}</TableCell>
                            <TableCell align="right">
                              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                                <Button
                                  size="small"
                                  startIcon={<EditIcon />}
                                  onClick={() => {}}
                                >
                                  Edit
                                </Button>
                                <Button
                                  size="small"
                                  color="error"
                                  startIcon={<TrashIcon />}
                                  onClick={() => {}}
                                >
                                  Delete
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </>
                )}
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>

      {/* Add Course Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Course</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Course Title"
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary">
            Create Course
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Module Dialog */}
      <Dialog open={openModuleDialog} onClose={() => setOpenModuleDialog(false)}>
        <DialogTitle>Add New Module</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Module Title"
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModuleDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary">
            Create Module
          </Button>
        </DialogActions>
      </Dialog>

      {/* Upload Video Dialog */}
      <Dialog open={openVideoDialog} onClose={() => setOpenVideoDialog(false)}>
        <DialogTitle>Upload Video</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Video Title"
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
            />
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadIcon />}
              fullWidth
            >
              Upload Video File
              <input type="file" hidden accept="video/*" />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenVideoDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary">
            Upload Video
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}