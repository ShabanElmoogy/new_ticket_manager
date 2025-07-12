import { apiService } from "../../services/api";

// Define all types locally to avoid import issues
type ReportType = 
  | "ticket-summary"
  | "performance-analytics" 
  | "team-productivity"
  | "customer-report"
  | "sla-compliance"
  | "monthly-summary";

interface User {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "EMPLOYEE";
  phone?: string;
  whatsappNotifications?: boolean;
  createdAt: string;
  updatedAt?: string;
}

interface Ticket {
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

interface ReportData {
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

interface GenerateReportParams {
  type: ReportType;
  dateFrom: Date;
  dateTo: Date;
  user: User;
}

// Fetch report data
const fetchReportData = async (params: GenerateReportParams): Promise<ReportData> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  try {
    const [tickets, users, customers, applications] = await Promise.all([
      apiService.getTickets(token, {}),
      params.user.role === "ADMIN" ? apiService.getUsers(token) : Promise.resolve([]),
      params.user.role === "ADMIN" ? apiService.getCustomers(token) : Promise.resolve([]),
      params.user.role === "ADMIN" ? apiService.getApplications(token) : Promise.resolve([]),
    ]);

    // Filter tickets by date range
    const filteredTickets = tickets.filter(ticket => {
      const ticketDate = new Date(ticket.createdAt);
      return ticketDate >= params.dateFrom && ticketDate <= params.dateTo;
    });

    // Calculate stats
    const stats = {
      total: filteredTickets.length,
      open: filteredTickets.filter(t => t.status === "OPEN").length,
      inProgress: filteredTickets.filter(t => t.status === "IN_PROGRESS").length,
      resolved: filteredTickets.filter(t => t.status === "RESOLVED").length,
      closed: filteredTickets.filter(t => t.status === "CLOSED").length,
    };

    return {
      tickets: filteredTickets,
      users,
      customers,
      applications,
      stats,
      dateRange: {
        from: params.dateFrom,
        to: params.dateTo,
      },
    };
  } catch (error) {
    console.error("Error fetching report data:", error);
    throw error;
  }
};

// Report type configurations
const getReportTitle = (type: ReportType): string => {
  const titles: Record<ReportType, string> = {
    "ticket-summary": "Ticket Summary Report",
    "performance-analytics": "Performance Analytics Report",
    "team-productivity": "Team Productivity Report",
    "customer-report": "Customer Activity Report",
    "sla-compliance": "SLA Compliance Report",
    "monthly-summary": "Monthly Summary Report",
  };
  return titles[type];
};

// Generate HTML content for the report
const generateHTMLReport = (data: ReportData, title: string, user: User): string => {
  const { stats, tickets, dateRange } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f5f5f5;
          color: #333;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          border-bottom: 3px solid #1976d2;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .title {
          font-size: 28px;
          font-weight: bold;
          color: #1976d2;
          margin: 0 0 10px 0;
        }
        .subtitle {
          font-size: 14px;
          color: #666;
          margin: 5px 0;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          margin: 30px 0;
        }
        .stat-card {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          border-left: 4px solid #1976d2;
        }
        .stat-value {
          font-size: 32px;
          font-weight: bold;
          color: #1976d2;
          margin-bottom: 5px;
        }
        .stat-label {
          font-size: 12px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .section {
          margin: 30px 0;
        }
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 15px;
          border-bottom: 1px solid #e0e0e0;
          padding-bottom: 8px;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
        }
        .table th,
        .table td {
          padding: 12px 8px;
          text-align: left;
          border-bottom: 1px solid #e0e0e0;
          font-size: 12px;
        }
        .table th {
          background-color: #f5f5f5;
          font-weight: 600;
          color: #333;
        }
        .table tr:hover {
          background-color: #f9f9f9;
        }
        .status {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .status-open { background: #e3f2fd; color: #1976d2; }
        .status-in_progress { background: #fff3e0; color: #f57c00; }
        .status-resolved { background: #e8f5e8; color: #2e7d32; }
        .status-closed { background: #f3e5f5; color: #7b1fa2; }
        .priority {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .priority-low { background: #e8f5e8; color: #2e7d32; }
        .priority-medium { background: #fff3e0; color: #f57c00; }
        .priority-high { background: #ffebee; color: #d32f2f; }
        .priority-urgent { background: #fce4ec; color: #c2185b; }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
          text-align: center;
          font-size: 12px;
          color: #999;
        }
        @media print {
          body { background: white; }
          .container { box-shadow: none; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="title">${title}</h1>
          <div class="subtitle">Generated on ${new Date().toLocaleDateString()} by ${user.name}</div>
          <div class="subtitle">Period: ${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}</div>
        </div>

        <div class="section">
          <h2 class="section-title">Overview Statistics</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value">${stats.total}</div>
              <div class="stat-label">Total Tickets</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.open}</div>
              <div class="stat-label">Open</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.inProgress}</div>
              <div class="stat-label">In Progress</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.resolved}</div>
              <div class="stat-label">Resolved</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Tickets Details</h2>
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Created</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              ${tickets.slice(0, 50).map(ticket => `
                <tr>
                  <td>${ticket.id.slice(0, 8)}...</td>
                  <td>${ticket.title.length > 30 ? ticket.title.slice(0, 30) + '...' : ticket.title}</td>
                  <td><span class="status status-${ticket.status.toLowerCase()}">${ticket.status}</span></td>
                  <td><span class="priority priority-${ticket.priority.toLowerCase()}">${ticket.priority}</span></td>
                  <td>${new Date(ticket.createdAt).toLocaleDateString()}</td>
                  <td>${ticket.assignedTo?.name || 'Unassigned'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          ${tickets.length > 50 ? `<p style="margin-top: 15px; font-size: 12px; color: #666;">Showing first 50 tickets of ${tickets.length} total tickets</p>` : ''}
        </div>

        <div class="footer">
          Generated by Ticket Management System - ${new Date().toLocaleString()}
        </div>
      </div>
    </body>
    </html>
  `;
};

// Simple download function without external dependencies
const downloadHTMLReport = (htmlContent: string, fileName: string) => {
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Main export function - Simple HTML download
export const generatePDFReport = async (params: GenerateReportParams): Promise<void> => {
  try {
    console.log("Starting report generation...", params);
    
    // Fetch data
    const data = await fetchReportData(params);
    console.log("Data fetched successfully:", data);
    
    // Get report title
    const title = getReportTitle(params.type);
    
    // Generate HTML content
    const htmlContent = generateHTMLReport(data, title, params.user);
    
    // Download file
    const fileName = `${params.type}-report-${params.dateFrom.toISOString().split('T')[0]}-to-${params.dateTo.toISOString().split('T')[0]}.html`;
    
    downloadHTMLReport(htmlContent, fileName);
    
    console.log("Report generated successfully!");
    
  } catch (error) {
    console.error("Error generating PDF report:", error);
    throw new Error(`Failed to generate report: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};