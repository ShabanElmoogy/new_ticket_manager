import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Stack,
} from '@mui/material';
import { useTranslation } from '../../hooks/useTranslation';
import LanguageSwitcher from '../common/LanguageSwitcher';

const I18nDemo: React.FC = () => {
  const { t, tc, tn, tk, tf, tp, ts, tm, tv, isRTL, formatDate, formatNumber, formatCurrency } = useTranslation();

  const currentDate = new Date();
  const sampleNumber = 1234567.89;
  const sampleCurrency = 1234.56;

  return (
    <Box sx={{ p: 3, direction: isRTL() ? 'rtl' : 'ltr' }}>
      <Paper sx={{ p: 3 }}>
        <Stack spacing={3}>
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" component="h1">
              {t('common.loading')} - i18n Demo
            </Typography>
            <LanguageSwitcher variant="full" />
          </Box>

          <Divider />

          {/* Common Translations */}
          <Box>
            <Typography variant="h6" gutterBottom>
              {tc('common')} Translations
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Button variant="contained" fullWidth>
                  {tc('save')}
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button variant="outlined" fullWidth>
                  {tc('cancel')}
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button variant="contained" color="error" fullWidth>
                  {tc('delete')}
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button variant="outlined" fullWidth>
                  {tc('edit')}
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Navigation Translations */}
          <Box>
            <Typography variant="h6" gutterBottom>
              {tn('navigation')} Translations
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Typography variant="body1">• {tn('dashboard')}</Typography>
              <Typography variant="body1">• {tn('tickets')}</Typography>
              <Typography variant="body1">• {tn('kanban')}</Typography>
              <Typography variant="body1">• {tn('reports')}</Typography>
              <Typography variant="body1">• {tn('settings')}</Typography>
            </Stack>
          </Box>

          {/* Kanban Translations */}
          <Box>
            <Typography variant="h6" gutterBottom>
              {tk('kanban')} Translations
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Typography variant="body1">• {tk('board')}</Typography>
              <Typography variant="body1">• {tk('ticket')}</Typography>
              <Typography variant="body1">• {tk('createTicket')}</Typography>
              <Typography variant="body1">• {tk('assignee')}</Typography>
              <Typography variant="body1">• {tk('priority')}</Typography>
            </Stack>
          </Box>

          {/* Filter Translations */}
          <Box>
            <Typography variant="h6" gutterBottom>
              {tf('filters')} Translations
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Typography variant="body1">• {tf('search')}</Typography>
              <Typography variant="body1">• {tf('priority')}</Typography>
              <Typography variant="body1">• {tf('assignee')}</Typography>
              <Typography variant="body1">• {tf('all')}</Typography>
              <Typography variant="body1">• {tf('none')}</Typography>
            </Stack>
          </Box>

          {/* Priority Translations */}
          <Box>
            <Typography variant="h6" gutterBottom>
              {tp('priority')} Levels
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Typography variant="body1" color="success.main">🟢 {tp('low')}</Typography>
              <Typography variant="body1" color="warning.main">🟡 {tp('medium')}</Typography>
              <Typography variant="body1" color="error.main">🟠 {tp('high')}</Typography>
              <Typography variant="body1" color="error.dark">🔴 {tp('urgent')}</Typography>
            </Stack>
          </Box>

          {/* Status Translations */}
          <Box>
            <Typography variant="h6" gutterBottom>
              {ts('status')} Types
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Typography variant="body1">• {ts('open')}</Typography>
              <Typography variant="body1">• {ts('inProgress')}</Typography>
              <Typography variant="body1">• {ts('resolved')}</Typography>
              <Typography variant="body1">• {ts('closed')}</Typography>
            </Stack>
          </Box>

          {/* Formatting Examples */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Formatting Examples
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body1">
                <strong>Date:</strong> {formatDate(currentDate)}
              </Typography>
              <Typography variant="body1">
                <strong>Number:</strong> {formatNumber(sampleNumber)}
              </Typography>
              <Typography variant="body1">
                <strong>Currency:</strong> {formatCurrency(sampleCurrency)}
              </Typography>
              <Typography variant="body1">
                <strong>RTL Mode:</strong> {isRTL() ? 'Yes' : 'No'}
              </Typography>
            </Stack>
          </Box>

          {/* Messages */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Sample Messages
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" color="success.main">
                ✅ {tm('ticketCreated')}
              </Typography>
              <Typography variant="body2" color="error.main">
                ❌ {tm('errorOccurred')}
              </Typography>
              <Typography variant="body2" color="warning.main">
                ⚠️ {tm('unsavedChanges')}
              </Typography>
            </Stack>
          </Box>

          {/* Validation Examples */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Validation Messages
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" color="error.main">
                • {tv('required')}
              </Typography>
              <Typography variant="body2" color="error.main">
                • {tv('invalidEmail')}
              </Typography>
              <Typography variant="body2" color="error.main">
                • {tv('minLength', { min: 5 })}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default I18nDemo;