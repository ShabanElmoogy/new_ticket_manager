import { Grid } from "@mui/material";
import DashboardCard from "../../common/DashboardCard";
import {
  People as PeopleIcon,
  Apps as AppsIcon,
  ConfirmationNumber as TicketIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";

interface DashboardStats {
  totalCustomers: number;
  activeCustomers: number;
  totalApplications: number;
  activeApplications: number;
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  resolvedTickets: number;
}

interface DashboardCardsProps {
  stats: DashboardStats;
}

export default function DashboardCards({ stats }: DashboardCardsProps) {
  return (
    <Grid container spacing={3}>
      {/* Customer Stats */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <DashboardCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={<PeopleIcon />}
          color="#1976d2"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <DashboardCard
          title="Active Customers"
          value={stats.activeCustomers}
          icon={<PeopleIcon />}
          color="#2e7d32"
        />
      </Grid>

      {/* Application Stats */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <DashboardCard
          title="Total Applications"
          value={stats.totalApplications}
          icon={<AppsIcon />}
          color="#7b1fa2"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <DashboardCard
          title="Active Applications"
          value={stats.activeApplications}
          icon={<AppsIcon />}
          color="#388e3c"
        />
      </Grid>

      {/* Ticket Stats */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <DashboardCard
          title="Total Tickets"
          value={stats.totalTickets}
          icon={<TicketIcon />}
          color="#f57c00"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <DashboardCard
          title="Open Tickets"
          value={stats.openTickets}
          icon={<TicketIcon />}
          color="#d32f2f"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <DashboardCard
          title="In Progress"
          value={stats.inProgressTickets}
          icon={<TrendingUpIcon />}
          color="#f9a825"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <DashboardCard
          title="Resolved"
          value={stats.resolvedTickets}
          icon={<TicketIcon />}
          color="#388e3c"
        />
      </Grid>
    </Grid>
  );
}