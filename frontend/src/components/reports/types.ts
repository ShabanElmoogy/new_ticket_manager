// Report Types
export type ReportType = 
  | "ticket-summary"
  | "performance-analytics" 
  | "team-productivity"
  | "customer-report"
  | "sla-compliance"
  | "monthly-summary";

export interface ReportConfig {
  type: ReportType;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  adminOnly?: boolean;
}

// Local type definitions to avoid import issues
export interface User {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "EMPLOYEE";
  phone?: string;
  whatsappNotifications?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  createdAt: string;
  updatedAt: string;
  assignedTo?: User;
  createdBy: User;
  customer?: any;
  application?: any;
  assignedToId?: string;
  createdById: string;
  customerId?: string;
  applicationId?: string;
}

export interface ReportData {
  tickets: Ticket[];
  users: User[];
  customers: any[];
  applications: any[];
  stats: {
    total: number;
    open: number;
    inProgress: number;
    resolved: number;
    closed: number;
  };
  dateRange: {
    from: Date;
    to: Date;
  };
}