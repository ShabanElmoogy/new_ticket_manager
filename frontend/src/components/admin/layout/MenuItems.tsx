import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Apps as AppsIcon,
  ConfirmationNumber as TicketIcon,
  Assignment as TaskIcon,
  SupervisorAccount as UsersIcon,
} from "@mui/icons-material";

export const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { id: "users", label: "Users", icon: <UsersIcon /> },
  { id: "customers", label: "Customers", icon: <PeopleIcon /> },
  { id: "applications", label: "Applications", icon: <AppsIcon /> },
  { id: "tickets", label: "Tickets", icon: <TicketIcon /> },
  { id: "tasks", label: "Tasks", icon: <TaskIcon /> },
];
