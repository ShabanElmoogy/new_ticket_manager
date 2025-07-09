import React from "react";
import {
  Box,
  Button,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
  Typography,
  Chip,
  InputAdornment,
  alpha,
} from "@mui/material";
import {
  Clear as ClearIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Apps as AppsIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTranslation } from "../../../hooks/useTranslation";

interface BoardFiltersProps {
  filtersOpen: boolean;
  hasActiveFilters: boolean;
  searchFilter: string;
  dueDateFrom: Date | null;
  dueDateTo: Date | null;
  priorityFilter: string;
  assigneeFilter: string;
  customerFilter: string;
  applicationFilter: string;
  createdByFilter: string;
  estimatedHoursMin: number | "";
  estimatedHoursMax: number | "";
  uniqueAssignees: any[];
  uniqueCustomers: any[];
  uniqueApplications: any[];
  uniqueCreators: any[];
  onSearchChange: (value: string) => void;
  onDueDateFromChange: (date: Date | null) => void;
  onDueDateToChange: (date: Date | null) => void;
  onPriorityChange: (value: string) => void;
  onAssigneeChange: (value: string) => void;
  onCustomerChange: (value: string) => void;
  onApplicationChange: (value: string) => void;
  onCreatedByChange: (value: string) => void;
  onEstimatedHoursMinChange: (value: number | "") => void;
  onEstimatedHoursMaxChange: (value: number | "") => void;
  onClearFilters: () => void;
}

const BoardFilters: React.FC<BoardFiltersProps> = ({
  filtersOpen,
  hasActiveFilters,
  searchFilter,
  dueDateFrom,
  dueDateTo,
  priorityFilter,
  assigneeFilter,
  customerFilter,
  applicationFilter,
  createdByFilter,
  estimatedHoursMin,
  estimatedHoursMax,
  uniqueAssignees,
  uniqueCustomers,
  uniqueApplications,
  uniqueCreators,
  onSearchChange,
  onDueDateFromChange,
  onDueDateToChange,
  onPriorityChange,
  onAssigneeChange,
  onCustomerChange,
  onApplicationChange,
  onCreatedByChange,
  onEstimatedHoursMinChange,
  onEstimatedHoursMaxChange,
  onClearFilters,
}) => {
  const { tf, tp, tc } = useTranslation();

  // Count active filters
  const activeFiltersCount = [
    searchFilter,
    dueDateFrom,
    dueDateTo,
    priorityFilter,
    assigneeFilter,
    customerFilter,
    applicationFilter,
    createdByFilter,
    estimatedHoursMin,
    estimatedHoursMax,
  ].filter(Boolean).length;

  return (
    <Collapse in={filtersOpen}>
      <Box
        sx={{
          mt: 1,
          backgroundColor: (theme) =>
            alpha(theme.palette.background.paper, 0.6),
          borderRadius: 2,
          border: 1,
          borderColor: "divider",
          maxWidth: "100%",
          width: "100%",
          boxSizing: "border-box",
          maxHeight: { xs: "25vh", sm: "30vh", md: "none" },
          overflowY: "scroll",
          position: "relative",
          // Simple, visible scrollbar for mobile
          "&::-webkit-scrollbar": {
            width: "16px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#555",
            },
          },
          // Firefox scrollbar
          scrollbarWidth: "thick",
          scrollbarColor: "#888 #f1f1f1",
        }}
      >
        {/* Compact Header - Sticky */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: (theme) =>
              alpha(theme.palette.background.paper, 0.95),
            backdropFilter: "blur(8px)",
            zIndex: 1,
            borderBottom: 1,
            borderColor: "divider",
            p: { xs: 1, sm: 1.5 },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" gap={1}>
              <FilterListIcon
                sx={{ fontSize: "1rem", color: "primary.main" }}
              />
              <Typography variant="subtitle2" fontWeight={600}>
                {tf('filters')}
              </Typography>
              {activeFiltersCount > 0 && (
                <Chip
                  label={activeFiltersCount}
                  size="small"
                  color="primary"
                  sx={{ height: 18, fontSize: "0.65rem", minWidth: 18 }}
                />
              )}
            </Box>

            {hasActiveFilters && (
              <Button
                startIcon={<ClearIcon sx={{ fontSize: "0.8rem" }} />}
                onClick={onClearFilters}
                size="small"
                variant="text"
                color="error"
                sx={{
                  fontSize: "0.7rem",
                  textTransform: "none",
                  minWidth: "auto",
                  px: 0.5,
                  py: 0.25,
                }}
              >
                {tf('clearFilters')}
              </Button>
            )}
          </Box>

          {/* Active Filters Summary - Under Header */}
          {activeFiltersCount > 0 && (
            <Box
              mt={1}
              display="flex"
              flexWrap="wrap"
              gap={0.5}
              sx={{ maxWidth: "100%" }}
            >
              {searchFilter && (
                <Chip
                  label={`"${
                    searchFilter.length > 8
                      ? searchFilter.substring(0, 8) + "..."
                      : searchFilter
                  }"`}
                  size="small"
                  onDelete={() => onSearchChange("")}
                  color="primary"
                  variant="outlined"
                  sx={{ fontSize: "0.6rem", height: 20 }}
                />
              )}
              {priorityFilter && (
                <Chip
                  label={tp(priorityFilter.toLowerCase())}
                  size="small"
                  onDelete={() => onPriorityChange("")}
                  color="warning"
                  variant="outlined"
                  sx={{ fontSize: "0.6rem", height: 20 }}
                />
              )}
              {assigneeFilter && (
                <Chip
                  label={
                    assigneeFilter === "unassigned"
                      ? tf('unassigned')
                      : (
                          uniqueAssignees.find((a) => a.id === assigneeFilter)
                            ?.name || assigneeFilter
                        ).substring(0, 8) + "..."
                  }
                  size="small"
                  onDelete={() => onAssigneeChange("")}
                  color="secondary"
                  variant="outlined"
                  sx={{ fontSize: "0.6rem", height: 20 }}
                />
              )}
              {(dueDateFrom || dueDateTo) && (
                <Chip
                  label={tc('dates')}
                  size="small"
                  onDelete={() => {
                    onDueDateFromChange(null);
                    onDueDateToChange(null);
                  }}
                  color="info"
                  variant="outlined"
                  sx={{ fontSize: "0.6rem", height: 20 }}
                />
              )}
              {(estimatedHoursMin || estimatedHoursMax) && (
                <Chip
                  label={tc('hours')}
                  size="small"
                  onDelete={() => {
                    onEstimatedHoursMinChange("");
                    onEstimatedHoursMaxChange("");
                  }}
                  color="warning"
                  variant="outlined"
                  sx={{ fontSize: "0.6rem", height: 20 }}
                />
              )}
            </Box>
          )}
        </Box>

        {/* Scrollable Content */}
        <Box sx={{ p: { xs: 1, sm: 1.5 } }}>
          <Grid container spacing={{ xs: 1, sm: 1.5 }}>
            {/* Search */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                label={tf('search')}
                placeholder={tf('search')}
                value={searchFilter}
                onChange={(e) => onSearchChange(e.target.value)}
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: "0.9rem" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Priority */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>{tf('priority')}</InputLabel>
                <Select
                  value={priorityFilter}
                  label={tf('priority')}
                  onChange={(e) => onPriorityChange(e.target.value)}
                >
                  <MenuItem value="">{tf('all')}</MenuItem>
                  <MenuItem value="LOW">🟢 {tp('low')}</MenuItem>
                  <MenuItem value="MEDIUM">🟡 {tp('medium')}</MenuItem>
                  <MenuItem value="HIGH">🟠 {tp('high')}</MenuItem>
                  <MenuItem value="URGENT">🔴 {tp('urgent')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Assignee */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>{tf('assignee')}</InputLabel>
                <Select
                  value={assigneeFilter}
                  label={tf('assignee')}
                  onChange={(e) => onAssigneeChange(e.target.value)}
                >
                  <MenuItem value="">{tf('all')}</MenuItem>
                  <MenuItem value="unassigned">
                    <Box display="flex" alignItems="center" gap={1}>
                      <PersonIcon
                        sx={{ fontSize: "0.9rem" }}
                        color="disabled"
                      />
                      {tf('unassigned')}
                    </Box>
                  </MenuItem>
                  {uniqueAssignees.map((assignee) => (
                    <MenuItem key={assignee.id} value={assignee.id}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <PersonIcon
                          sx={{ fontSize: "0.9rem" }}
                          color="primary"
                        />
                        <Box
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: { xs: "100px", sm: "150px" },
                          }}
                        >
                          {assignee.name}
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Due Date From */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <DatePicker
                label={tf('dueDateFrom')}
                value={dueDateFrom}
                onChange={onDueDateFromChange}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                  },
                }}
              />
            </Grid>

            {/* Due Date To */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <DatePicker
                label={tf('dueDateTo')}
                value={dueDateTo}
                onChange={onDueDateToChange}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                  },
                }}
              />
            </Grid>

            {/* Customer */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>{tf('customer')}</InputLabel>
                <Select
                  value={customerFilter}
                  label={tf('customer')}
                  onChange={(e) => onCustomerChange(e.target.value)}
                >
                  <MenuItem value="">{tf('all')}</MenuItem>
                  <MenuItem value="no-customer">
                    <Box display="flex" alignItems="center" gap={1}>
                      <BusinessIcon
                        sx={{ fontSize: "0.9rem" }}
                        color="disabled"
                      />
                      {tf('none')}
                    </Box>
                  </MenuItem>
                  {uniqueCustomers.map((customer) => (
                    <MenuItem key={customer.id} value={customer.id}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <BusinessIcon
                          sx={{ fontSize: "0.9rem" }}
                          color="info"
                        />
                        <Box
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: { xs: "100px", sm: "150px" },
                          }}
                        >
                          {customer.name}
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Application */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>{tf('application')}</InputLabel>
                <Select
                  value={applicationFilter}
                  label={tf('application')}
                  onChange={(e) => onApplicationChange(e.target.value)}
                >
                  <MenuItem value="">{tf('all')}</MenuItem>
                  <MenuItem value="no-application">
                    <Box display="flex" alignItems="center" gap={1}>
                      <AppsIcon sx={{ fontSize: "0.9rem" }} color="disabled" />
                      {tf('none')}
                    </Box>
                  </MenuItem>
                  {uniqueApplications.map((application) => (
                    <MenuItem key={application.id} value={application.id}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <AppsIcon sx={{ fontSize: "0.9rem" }} color="success" />
                        <Box
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: { xs: "100px", sm: "150px" },
                          }}
                        >
                          {application.name}
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Created By */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>{tf('creator')}</InputLabel>
                <Select
                  value={createdByFilter}
                  label={tf('creator')}
                  onChange={(e) => onCreatedByChange(e.target.value)}
                >
                  <MenuItem value="">{tf('all')}</MenuItem>
                  {uniqueCreators.map((creator) => (
                    <MenuItem key={creator.id} value={creator.id}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <PersonIcon
                          sx={{ fontSize: "0.9rem" }}
                          color="secondary"
                        />
                        <Box
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: { xs: "100px", sm: "150px" },
                          }}
                        >
                          {creator.name}
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Hours Min */}
            <Grid size={{ xs: 6, sm: 6, md: 3, lg: 2 }}>
              <TextField
                label={tf('minHours')}
                type="number"
                value={estimatedHoursMin}
                onChange={(e) =>
                  onEstimatedHoursMinChange(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                size="small"
                fullWidth
                inputProps={{ min: 0, step: 0.5 }}
              />
            </Grid>

            {/* Hours Max */}
            <Grid size={{ xs: 6, sm: 6, md: 3, lg: 2 }}>
              <TextField
                label={tf('maxHours')}
                type="number"
                value={estimatedHoursMax}
                onChange={(e) =>
                  onEstimatedHoursMaxChange(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                size="small"
                fullWidth
                inputProps={{ min: 0, step: 0.5 }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Collapse>
  );
};

export default BoardFilters;