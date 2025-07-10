import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Paper,
  Collapse,
  Fade,
  Box,
  useTheme,
  alpha,
} from "@mui/material";
import { useAuthStore } from "../../../stores/authStore";
import { useKanbanStore } from "../../../stores/kanbanStore";
import type {
  User,
  Customer,
  Application,
  CreateTicketData,
} from "../../../services/api";
import type { Label } from "../../../types/kanban";

// Import all section components
import TicketHeaderSection from "./TicketHeaderSection";
import TicketDescriptionSection from "./TicketDescriptionSection";
import TicketStatusChipsSection from "./TicketStatusChipsSection";
import TicketAdvancedConfigSection from "./TicketAdvancedConfigSection";
import TicketLabelsSection from "./TicketLabelsSection";
import TicketSubmitSection from "./TicketSubmitSection";

interface CreateTicketPostProps {
  onSubmit: (data: CreateTicketData) => void;
  employees: User[];
  customers?: Customer[];
  applications?: Application[];
}

const CreateTicketPost: React.FC<CreateTicketPostProps> = ({
  onSubmit,
  employees,
  customers = [],
  applications = [],
}) => {
  const theme = useTheme();
  const { user } = useAuthStore();
  const { labels, fetchLabels, createLabel } = useKanbanStore();

  // State variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<
    "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  >("MEDIUM");
  const [assignedTo, setAssignedTo] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [estimatedHours, setEstimatedHours] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<Label[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [labelsLoading, setLabelsLoading] = useState(false);
  const [showLabelSelector, setShowLabelSelector] = useState(false);

  // Create default labels if none exist  // Fetch labels when component mounts
  useEffect(() => {
    const loadLabels = async () => {
      setLabelsLoading(true);
      try {
        await fetchLabels();
        if (labels.length === 0) {
          await fetchLabels();
        }
      } catch (error) {
        console.error("Failed to fetch labels:", error);
      } finally {
        setLabelsLoading(false);
      }
    };
    loadLabels();
  }, [fetchLabels, createLabel, labels]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsPosting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        priority,
        assignedToId: assignedTo || undefined,
        customerId: customerId || undefined,
        applicationId: applicationId || undefined,
        dueDate: dueDate?.toISOString(),
        estimatedHours: estimatedHours ? parseFloat(estimatedHours) : undefined,
        labelIds: selectedLabels.map((label) => label.id),
      });

      // Reset form
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setAssignedTo("");
      setCustomerId("");
      setApplicationId("");
      setDueDate(null);
      setEstimatedHours("");
      setSelectedLabels([]);
      setShowAdvanced(false);
      setShowLabelSelector(false);
    } finally {
      setIsPosting(false);
    }
  };

  const handleLabelToggle = (label: Label) => {
    const isSelected = selectedLabels.some((l) => l.id === label.id);
    if (isSelected) {
      setSelectedLabels(selectedLabels.filter((l) => l.id !== label.id));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 4,
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.02
        )} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        boxShadow: theme.shadows[4],
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: theme.shadows[8],
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        {/* Header Section */}
        <TicketHeaderSection
          user={user}
          title={title}
          onTitleChange={setTitle}
        />

        {/* Description Section */}
        <TicketDescriptionSection
          title={title}
          description={description}
          onDescriptionChange={setDescription}
        />

        {/* Quick Actions & Status */}
        <Collapse in={title.length > 0}>
          <Fade in={title.length > 0}>
            <Box sx={{ ml: 8 }}>
              {/* Quick Status Bar */}
              <TicketStatusChipsSection
                showAdvanced={showAdvanced}
                onToggleAdvanced={() => setShowAdvanced(!showAdvanced)}
                priority={priority}
                assignedTo={assignedTo}
                dueDate={dueDate}
                estimatedHours={estimatedHours}
                selectedLabels={selectedLabels}
                employees={employees}
              />

              {/* Advanced Options */}
              <TicketAdvancedConfigSection
                showAdvanced={showAdvanced}
                priority={priority}
                onPriorityChange={setPriority}
                assignedTo={assignedTo}
                onAssignedToChange={setAssignedTo}
                customerId={customerId}
                onCustomerChange={setCustomerId}
                applicationId={applicationId}
                onApplicationChange={setApplicationId}
                dueDate={dueDate}
                onDueDateChange={setDueDate}
                estimatedHours={estimatedHours}
                onEstimatedHoursChange={setEstimatedHours}
                employees={employees}
                customers={customers}
                applications={applications}
              />

              {/* Labels Section */}
              <Collapse in={showAdvanced}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 3,
                    backgroundColor: alpha(theme.palette.background.paper, 0.8),
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  }}
                >
                  <TicketLabelsSection
                    selectedLabels={selectedLabels}
                    labels={labels}
                    labelsLoading={labelsLoading}
                    showLabelSelector={showLabelSelector}
                    onToggleLabelSelector={() =>
                      setShowLabelSelector(!showLabelSelector)
                    }
                    onLabelToggle={handleLabelToggle}
                  />
                </Paper>
              </Collapse>

              {/* Submit Section */}
              <TicketSubmitSection
                title={title}
                description={description}
                isPosting={isPosting}
                onSubmit={handleSubmit}
              />
            </Box>
          </Fade>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default CreateTicketPost;
