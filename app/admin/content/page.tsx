"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  IconButton,
  Box,
  InputAdornment,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as PlusIcon,
  VideoFile as FileVideoIcon,
  Visibility as EyeIcon,
  Delete as TrashIcon,
} from "@mui/icons-material";
import { supabase } from "@/lib/supabase";

interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: number;
  module_id: string;
  order: number;
}

interface Module {
  id: string;
  title: string;
  order: number;
  course_id: string;
  videos: Video[];
}

interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  image_url: string;
  modules: Module[];
}

export default function ContentPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form states
  const [newCourse, setNewCourse] = useState({
    title: "",
    subtitle: "",
    description: "",
    price: 0,
    image_url: "",
  });

  const [newModule, setNewModule] = useState({
    title: "",
    course_id: "",
    order: 0,
  });

  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    url: "",
    module_id: "",
    order: 0,
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const { data: courses, error: coursesError } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false });

      if (coursesError) throw coursesError;

      const coursesWithModules = await Promise.all(
        courses.map(async (course) => {
          const { data: modules, error: modulesError } = await supabase
            .from("modules")
            .select("*")
            .eq("course_id", course.id)
            .order("order");

          if (modulesError) throw modulesError;

          const modulesWithVideos = await Promise.all(
            modules.map(async (module) => {
              const { data: videos, error: videosError } = await supabase
                .from("videos")
                .select("*")
                .eq("module_id", module.id)
                .order("order");

              if (videosError) throw videosError;

              return { ...module, videos };
            })
          );

          return { ...course, modules: modulesWithVideos };
        })
      );

      setCourses(coursesWithModules);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setIsLoading(false);
    }
  }

  async function createCourse(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("courses")
        .insert([newCourse])
        .select()
        .single();

      if (error) throw error;

      setCourses([...courses, { ...data, modules: [] }]);
      setNewCourse({
        title: "",
        subtitle: "",
        description: "",
        price: 0,
        image_url: "",
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  }

  async function createModule(e: React.FormEvent, courseId: string) {
    e.preventDefault();
    try {
      const moduleData = {
        ...newModule,
        course_id: courseId,
      };

      const { data, error } = await supabase
        .from("modules")
        .insert([moduleData])
        .select()
        .single();

      if (error) throw error;

      const updatedCourses = courses.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            modules: [...course.modules, { ...data, videos: [] }],
          };
        }
        return course;
      });

      setCourses(updatedCourses);
      setNewModule({
        title: "",
        course_id: "",
        order: 0,
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating module:", error);
    }
  }

  async function createVideo(e: React.FormEvent, moduleId: string) {
    e.preventDefault();
    try {
      const videoData = {
        ...newVideo,
        module_id: moduleId,
      };

      const { data, error } = await supabase
        .from("videos")
        .insert([videoData])
        .select()
        .single();

      if (error) throw error;

      const updatedCourses = courses.map((course) => {
        return {
          ...course,
          modules: course.modules.map((module) => {
            if (module.id === moduleId) {
              return {
                ...module,
                videos: [...module.videos, data],
              };
            }
            return module;
          }),
        };
      });

      setCourses(updatedCourses);
      setNewVideo({
        title: "",
        description: "",
        url: "",
        module_id: "",
        order: 0,
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating video:", error);
    }
  }

  async function deleteVideo(videoId: string) {
    try {
      const { error } = await supabase
        .from("videos")
        .delete()
        .eq("id", videoId);

      if (error) throw error;

      const updatedCourses = courses.map((course) => ({
        ...course,
        modules: course.modules.map((module) => ({
          ...module,
          videos: module.videos.filter((video) => video.id !== videoId),
        })),
      }));

      setCourses(updatedCourses);
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  }

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4">Content Management</Typography>
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <DialogTitle>Create New Course</DialogTitle>
          <DialogContent>
            <form onSubmit={createCourse} className="space-y-4 mt-4">
              <TextField
                fullWidth
                label="Course Title"
                value={newCourse.title}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, title: e.target.value })
                }
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={newCourse.description}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, description: e.target.value })
                }
                margin="normal"
              />
              <TextField
                fullWidth
                label="Image URL"
                value={newCourse.image_url}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, image_url: e.target.value })
                }
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Create Course
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5">All Content</Typography>
            <TextField
              placeholder="Search content..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 250 }}
            />
          </Box>
          
          {isLoading ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>Loading...</Box>
          ) : (
            <Box sx={{ mt: 2 }}>
              {filteredCourses.map((course) => (
                <Card key={course.id} sx={{ mb: 3 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">{course.title}</Typography>
                      <Button
                        variant="outlined"
                        startIcon={<PlusIcon />}
                        onClick={() => {/* handle module dialog */}}
                      >
                        Add Module
                      </Button>
                    </Box>

                    {course.modules.map((module) => (
                      <Box key={module.id} sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {module.title}
                          </Typography>
                          <Button
                            variant="outlined"
                            startIcon={<FileVideoIcon />}
                            size="small"
                            onClick={() => {/* handle video dialog */}}
                          >
                            Add Video
                          </Button>
                        </Box>

                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>URL</TableCell>
                                <TableCell>Order</TableCell>
                                <TableCell align="right">Actions</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {module.videos.map((video) => (
                                <TableRow key={video.id}>
                                  <TableCell>{video.title}</TableCell>
                                  <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {video.url}
                                  </TableCell>
                                  <TableCell>{video.order}</TableCell>
                                  <TableCell align="right">
                                    <IconButton
                                      size="small"
                                      onClick={() => window.open(video.url, "_blank")}
                                    >
                                      <EyeIcon />
                                    </IconButton>
                                    <IconButton
                                      size="small"
                                      color="error"
                                      onClick={() => deleteVideo(video.id)}
                                    >
                                      <TrashIcon />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </div>
  );
}