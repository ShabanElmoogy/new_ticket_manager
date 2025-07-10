// ============================================================================
// TYPES AND CONSTANTS
// ============================================================================

import type { BoardType } from '../../../types/kanban';

// types.ts
export interface ColumnData {
  name: string;
  description: string;
  color: string;
  darkColor: string;
  wipLimit: string;
}

export interface ValidationErrors {
  name?: string;
  columns?: { [key: number]: { name?: string; wipLimit?: string } };
}

export interface FormData {
  name: string;
  description: string;
  isDefault: boolean;
  type: BoardType;
}

export interface BoardTemplate {
  name: string;
  description: string;
  columns: Array<{
    name: string;
    description: string;
    color: string;
    wipLimit: string;
  }>;
}

// constants.ts
export const MUI_COLORS = {
  blue: {
    light: "#e3f2fd",
    main: "#2196f3",
    dark: "#0d47a1",
    name: "Ocean Blue",
    gradient: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
  },
  indigo: {
    light: "#e8eaf6",
    main: "#3f51b5",
    dark: "#1a237e",
    name: "Deep Indigo",
    gradient: "linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%)",
  },
  purple: {
    light: "#f3e5f5",
    main: "#9c27b0",
    dark: "#4a148c",
    name: "Royal Purple",
    gradient: "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)",
  },
  deepPurple: {
    light: "#ede7f6",
    main: "#673ab7",
    dark: "#311b92",
    name: "Cosmic Purple",
    gradient: "linear-gradient(135deg, #ede7f6 0%, #d1c4e9 100%)",
  },
  cyan: {
    light: "#e0f2f1",
    main: "#00bcd4",
    dark: "#006064",
    name: "Crystal Cyan",
    gradient: "linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)",
  },
  teal: {
    light: "#e0f2f1",
    main: "#009688",
    dark: "#004d40",
    name: "Emerald Teal",
    gradient: "linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)",
  },
  green: {
    light: "#e8f5e8",
    main: "#4caf50",
    dark: "#1b5e20",
    name: "Nature Green",
    gradient: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
  },
  lightGreen: {
    light: "#f1f8e9",
    main: "#8bc34a",
    dark: "#33691e",
    name: "Fresh Lime",
    gradient: "linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)",
  },
  amber: {
    light: "#fff8e1",
    main: "#ffc107",
    dark: "#ff6f00",
    name: "Golden Amber",
    gradient: "linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)",
  },
  orange: {
    light: "#fff3e0",
    main: "#ff9800",
    dark: "#e65100",
    name: "Sunset Orange",
    gradient: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
  },
  red: {
    light: "#ffebee",
    main: "#f44336",
    dark: "#b71c1c",
    name: "Cherry Red",
    gradient: "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)",
  },
  pink: {
    light: "#fce4ec",
    main: "#e91e63",
    dark: "#880e4f",
    name: "Rose Pink",
    gradient: "linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)",
  },
  grey: {
    light: "#fafafa",
    main: "#9e9e9e",
    dark: "#212121",
    name: "Grey",
  },
};

export const COLOR_KEYS = Object.keys(MUI_COLORS) as Array<
  keyof typeof MUI_COLORS
>;

export const BOARD_TEMPLATES: Record<string, BoardTemplate> = {
  kanban: {
    name: "Classic Kanban",
    description: "Traditional kanban board for workflow management",
    columns: [
      {
        name: "Backlog",
        description: "Ideas and requests",
        color: "blue",
        wipLimit: "",
      },
      {
        name: "To Do",
        description: "Ready to start",
        color: "orange",
        wipLimit: "",
      },
      {
        name: "In Progress",
        description: "Currently working",
        color: "purple",
        wipLimit: "3",
      },
      {
        name: "Done",
        description: "Completed work",
        color: "green",
        wipLimit: "",
      },
    ],
  },
  scrum: {
    name: "Scrum Board",
    description: "Agile development workflow",
    columns: [
      {
        name: "Product Backlog",
        description: "User stories and features",
        color: "indigo",
        wipLimit: "",
      },
      {
        name: "Sprint Backlog",
        description: "Current sprint items",
        color: "cyan",
        wipLimit: "",
      },
      {
        name: "In Development",
        description: "Being developed",
        color: "amber",
        wipLimit: "5",
      },
      {
        name: "Testing",
        description: "Quality assurance",
        color: "orange",
        wipLimit: "3",
      },
      {
        name: "Done",
        description: "Sprint completed",
        color: "green",
        wipLimit: "",
      },
    ],
  },
  support: {
    name: "Support Tickets",
    description: "Customer support and issue tracking",
    columns: [
      {
        name: "New",
        description: "Incoming tickets",
        color: "red",
        wipLimit: "",
      },
      {
        name: "Triaged",
        description: "Prioritized and assigned",
        color: "orange",
        wipLimit: "",
      },
      {
        name: "In Progress",
        description: "Being resolved",
        color: "purple",
        wipLimit: "8",
      },
      {
        name: "Pending",
        description: "Waiting for response",
        color: "amber",
        wipLimit: "",
      },
      {
        name: "Resolved",
        description: "Issue fixed",
        color: "green",
        wipLimit: "",
      },
    ],
  },
};