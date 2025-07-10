// Common types used across the ticket creation components

export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EMPLOYEE";
  avatar?: string;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  company?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  name: string;
  description?: string;
  version?: string;
  platform?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketData {
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  assignedToId?: string;
  customerId?: string;
  applicationId?: string;
  dueDate?: string;
  estimatedHours?: number;
  labelIds: string[];
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  assignedTo?: User;
  customer?: Customer;
  application?: Application;
  labels: Label[];
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
}
