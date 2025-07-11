import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import Appbar from "./layout/Appbar";
import DrawerComponent from "./layout/Drawer";
import MainContent from "./layout/MainContent";

const drawerWidth = 240;

const AdminPanel: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedView, setSelectedView] = useState("dashboard");

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar
        drawerWidth={drawerWidth}
        handleBackToDashboard={handleBackToDashboard}
        handleDrawerToggle={handleDrawerToggle}
        selectedView={selectedView}
        user={user}
        isMobile={isMobile}
      />

      <DrawerComponent
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        selectedView={selectedView}
        setSelectedView={setSelectedView}
        setMobileOpen={setMobileOpen}
        isMobile={isMobile}
      />

      <MainContent drawerWidth={drawerWidth} selectedView={selectedView} />
    </Box>
  );
};

export default AdminPanel;
