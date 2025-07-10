import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  IconButton,
  Tooltip,
  Fade,
  Slide,
  Avatar,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";
import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Login as LoginIcon,
  AdminPanelSettings as AdminIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useAuthStore } from "../../stores/authStore";
import { useThemeStore } from "../../stores/themeStore";
import { apiService } from "../../services/api";
import MyTextField from "../common/MyTextField";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();
  const { mode, toggleTheme } = useThemeStore();
  const theme = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await apiService.login({ email, password });
      login(response.user, response.token);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setLoading(true);
    setError("");

    try {
      const response = await apiService.login({
        email: demoEmail,
        password: demoPassword,
      });
      login(response.user, response.token);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const gradientBackground =
    mode === "light"
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)";

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: gradientBackground,
        padding: 2,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 30% 70%, ${alpha(
            theme.palette.primary.main,
            0.1
          )} 0%, transparent 50%),
                      radial-gradient(circle at 70% 30%, ${alpha(
                        theme.palette.secondary.main,
                        0.1
                      )} 0%, transparent 50%)`,
          pointerEvents: "none",
        },
      }}
    >
      {/* Floating geometric shapes */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: 60,
          height: 60,
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-20px)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          right: "15%",
          width: 80,
          height: 80,
          backgroundColor: alpha(theme.palette.secondary.main, 0.1),
          borderRadius: "20%",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />

      <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
        <IconButton
          onClick={toggleTheme}
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            backgroundColor: alpha(theme.palette.background.paper, 0.1),
            backdropFilter: "blur(10px)",
            color:
              theme.palette.mode === "light"
                ? "white"
                : theme.palette.text.primary,
            border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: alpha(theme.palette.background.paper, 0.2),
              transform: "scale(1.05)",
            },
          }}
        >
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Tooltip>

      <Slide in={true} direction="up" timeout={800}>
        <Card
          sx={{
            maxWidth: 450,
            width: "100%",
            backdropFilter: "blur(20px)",
            backgroundColor: alpha(theme.palette.background.paper, 0.9),
            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
            borderRadius: 4,
            boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.1)}`,
            overflow: "visible",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Fade in={true} timeout={1000}>
              <Box textAlign="center" mb={4}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    margin: "0 auto 16px",
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    fontSize: "2rem",
                  }}
                >
                  <LoginIcon fontSize="large" />
                </Avatar>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 1,
                  }}
                >
                  Ticket Management
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  sx={{ fontWeight: 300 }}
                >
                  Welcome back! Please sign in to continue
                </Typography>
              </Box>
            </Fade>

            <Box component="form" onSubmit={handleSubmit}>
              <Box sx={{ position: "relative", mb: 2 }}>
                <MyTextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  disabled={loading}
                  startIcon={
                    <EmailIcon sx={{ color: "action.active", mr: 1 }} />
                  }
                />
              </Box>

              <Box sx={{ position: "relative", mb: 3 }}>
                <MyTextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  startIcon={
                    <LockIcon sx={{ color: "action.active", mr: 1 }} />
                  }
                  showPasswordToggle={true}
                />
              </Box>

              {error && (
                <Fade in={!!error}>
                  <Alert
                    severity="error"
                    sx={{
                      mb: 2,
                      borderRadius: 2,
                      "& .MuiAlert-icon": {
                        fontSize: "1.2rem",
                      },
                    }}
                  >
                    {error}
                  </Alert>
                </Fade>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 2,
                  mb: 3,
                  borderRadius: 2,
                  height: 56,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                    transform: "translateY(-2px)",
                    boxShadow: `0 8px 16px ${alpha(
                      theme.palette.primary.main,
                      0.4
                    )}`,
                  },
                  "&:disabled": {
                    background: theme.palette.action.disabledBackground,
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  <>
                    <LoginIcon sx={{ mr: 1 }} />
                    Sign In
                  </>
                )}
              </Button>
            </Box>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="textSecondary">
                Quick Access
              </Typography>
            </Divider>

            <Paper
              sx={{
                p: 3,
                backgroundColor: alpha(theme.palette.background.default, 0.5),
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                borderRadius: 2,
                backdropFilter: "blur(10px)",
              }}
              elevation={0}
            >
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  mb: 2,
                }}
              >
                Demo Accounts
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Button
                  variant="outlined"
                  size="medium"
                  onClick={() =>
                    handleDemoLogin("admin@company.com", "admin123")
                  }
                  disabled={loading}
                  sx={{
                    borderRadius: 2,
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    color: theme.palette.primary.main,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  <AdminIcon sx={{ mr: 1, fontSize: "1.1rem" }} />
                  <Box textAlign="left">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Admin Account
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      admin@company.com
                    </Typography>
                  </Box>
                </Button>
                <Button
                  variant="outlined"
                  size="medium"
                  onClick={() =>
                    handleDemoLogin("john@company.com", "employee123")
                  }
                  disabled={loading}
                  sx={{
                    borderRadius: 2,
                    borderColor: alpha(theme.palette.secondary.main, 0.3),
                    color: theme.palette.secondary.main,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: theme.palette.secondary.main,
                      backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  <PersonIcon sx={{ mr: 1, fontSize: "1.1rem" }} />
                  <Box textAlign="left">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Employee Account
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      john@company.com
                    </Typography>
                  </Box>
                </Button>
              </Box>
            </Paper>
          </CardContent>
        </Card>
      </Slide>
    </Box>
  );
};

export default LoginForm;
