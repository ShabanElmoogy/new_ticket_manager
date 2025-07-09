// types/BoardSettings.ts
import React from "react";
import type { KanbanBoard, KanbanColumn } from "./kanban";

export interface BoardSettingsDialogProps {
  open: boolean;
  onClose: () => void;
  board: KanbanBoard;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
  trend?: number;
}

export interface ColumnCardProps {
  column: KanbanColumn;
  onEdit: (column: KanbanColumn) => void;
  onDelete: (columnId: string) => void;
  isLoading?: boolean;
  cardCount?: number;
}

export interface UserCardProps {
  permission: any;
  onRemove?: (id: string) => void;
}

export interface ColumnForm {
  name: string;
  description: string;
  color: string;
  darkColor: string;
  wipLimit: string;
}

export interface TabConfig {
  label: string;
  icon: React.ReactNode;
  description: string;
}
