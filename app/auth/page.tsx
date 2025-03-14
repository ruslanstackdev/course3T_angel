"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  Button,
  TextField,
  Checkbox,
  Card,
  CardContent,
  CardHeader,
  Typography,
  FormControlLabel,
  Box,
  Container,
  Alert,
} from "@mui/material";
import { Mail as MailIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { supabase } from "@/lib/supabase";

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: "400px",
  margin: "0 auto", // Add this to center the card horizontally
}));

export default function AuthPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!isSignIn && password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (isSignIn) {
        // Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        console.log("Sign in successful:", data);

        // Refresh the session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Wait a brief moment for the session to be properly set
          setTimeout(() => {
            router.push('/dashboard');
            router.refresh();
          }, 100);
        } else {
          throw new Error("Session not established");
        }

      } else {
        // Sign Up - Modified to use site URL from environment
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL 
          || process.env.NEXT_PUBLIC_VERCEL_URL 
          || window.location.origin;
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${siteUrl}/auth/callback`,
          },
        });
        if (error) throw error;
        
        setError("Please check your email for verification link");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#1e2a4a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
      }}
    >
      <Container 
        maxWidth="sm" 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box 
          sx={{ 
            textAlign: "center", 
            mb: 4,
            width: '100%', // Add this to ensure full width
            maxWidth: '400px' // Match StyledCard maxWidth
          }}
        >
          <Typography variant="h3" component="h1" sx={{ color: "white", fontWeight: "bold" }}>
            Real Estate App
          </Typography>
        </Box>

        <StyledCard>
          <CardHeader
            title={
              <Typography variant="h5" align="center">
                {isSignIn ? "Log in" : "Sign up"}
              </Typography>
            }
            subheader={
              <Typography variant="body2" color="textSecondary" align="center">
                {isSignIn
                  ? "Log in to your account"
                  : "Create your Real Estate App account"}
              </Typography>
            }
          />
          <CardContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Box 
              component="form" 
              onSubmit={handleSubmit} 
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Box>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  required
                  InputProps={{
                    startAdornment: (
                      <MailIcon sx={{ color: "text.secondary", mr: 1 }} />
                    ),
                  }}
                />
              </Box>

              <TextField
                fullWidth
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />

              {!isSignIn && (
                <TextField
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                />
              )}

              {isSignIn && (
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <FormControlLabel
                    control={<Checkbox id="remember" />}
                    label={
                      <Typography variant="body2" color="textSecondary">
                        Remember me
                      </Typography>
                    }
                  />
                  <Button
                    variant="text"
                    sx={{ color: "primary.main", p: 0 }}
                  >
                    Forgot your password?
                  </Button>
                </Box>
              )}

              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{
                  bgcolor: "success.main",
                  "&:hover": {
                    bgcolor: "success.dark",
                  },
                  mt: 2,
                }}
              >
                {loading ? "Loading..." : (isSignIn ? "Sign In" : "Sign Up")}
              </Button>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2" color="textSecondary" component="span">
                  {isSignIn ? "Don't have an account? " : "Already have an account? "}
                </Typography>
                <Button
                  variant="text"
                  sx={{ color: "success.main", p: 0 }}
                  onClick={() => setIsSignIn(!isSignIn)}
                >
                  {isSignIn ? "Sign up" : "Sign in"}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </StyledCard>
      </Container>
    </Box>
  );
}