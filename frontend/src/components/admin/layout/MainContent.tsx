import { Box, Toolbar } from "@mui/material";
import CustomersManagement from "./../CustomersManagement";
import ApplicationsManagement from "./../ApplicationsManagement";
import TicketsManagement from "./../TicketsManagement";
import TasksManagement from "./../TasksManagement";
import UserManagement from "./../UserManagement";
import AdminDashboard from "./../adminDashboard/AdminDashboard";

interface MainContentProps {
  drawerWidth: number;
  selectedView: string;
}

const MainContent: React.FC<MainContentProps> = ({
  drawerWidth,
  selectedView,
}) => {
  const renderContent = () => {
    switch (selectedView) {
      case "users":
        return <UserManagement />;
      case "customers":
        return <CustomersManagement />;
      case "applications":
        return <ApplicationsManagement />;
      case "tickets":
        return <TicketsManagement />;
      case "tasks":
        return <TasksManagement />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { md: `calc(100% - ${drawerWidth}px)` },
        mt: -8,
      }}
    >
      <Toolbar />
      {renderContent()}
    </Box>
  );
};

export default MainContent;
