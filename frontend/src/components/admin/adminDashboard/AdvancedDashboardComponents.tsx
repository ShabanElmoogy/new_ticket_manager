import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  useTheme,
  alpha,
  Paper,
  Tabs,
  Tab,
  Chip,
  Avatar,
  IconButton,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Stack,
  Tooltip,
  Divider,
  Button,
  ButtonGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  TextField,
  Autocomplete,
  ToggleButton,
  ToggleButtonGroup,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Fab,
  Drawer,
  AppBar,
  Toolbar,
  Menu,
  MenuList,
  ListItemButton,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Breadcrumbs,
  Link,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  Rating,
  CircularProgress,
  Skeleton,
  CardHeader,
  CardActions,
  CardMedia,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Masonry,
  TreeView,
  TreeItem,
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  Backdrop,
  BottomNavigation,
  BottomNavigationAction,
  Checkbox,
  FormGroup,
  FormHelperText,
  Radio,
  RadioGroup,
  SpeedDialIcon as SpeedDialIconComponent,
  Zoom,
  Grow,
  Slide,
  Fade,
  Collapse as CollapseTransition,
  SwipeableDrawer,
  MobileStepper,
  Pagination,
  PaginationItem,
  ClickAwayListener,
  Popper,
  Popover,
  Modal,
  Backdrop as BackdropComponent,
  Portal,
  NoSsr,
  Hidden,
  useMediaQuery,
  Container,
  CssBaseline,
  GlobalStyles,
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  useScrollTrigger,
  Slide as SlideTransition,
  AppBar as AppBarComponent,
  Toolbar as ToolbarComponent,
  IconButton as IconButtonComponent,
  Typography as TypographyComponent,
  Button as ButtonComponent,
  Box as BoxComponent,
} from '@mui/material';
import {
  ExpandMore,
  ChevronRight,
  Folder,
  FolderOpen,
  InsertDriveFile,
  Dashboard,
  Analytics,
  TrendingUp,
  TrendingDown,
  Assessment,
  BarChart,
  PieChart,
  ShowChart,
  Timeline,
  Speed,
  Security,
  Warning,
  Error,
  CheckCircle,
  Info,
  Notifications,
  Settings,
  Help,
  Search,
  FilterList,
  Sort,
  ViewModule,
  ViewList,
  ViewComfy,
  ViewCompact,
  GridView,
  TableView,
  CalendarToday,
  DateRange,
  Schedule,
  AccessTime,
  Timer,
  Alarm,
  AlarmOn,
  AlarmOff,
  Update,
  History,
  Restore,
  Backup,
  CloudUpload,
  CloudDownload,
  CloudSync,
  CloudQueue,
  Storage,
  Memory,
  Computer,
  PhoneAndroid,
  Tablet,
  DesktopWindows,
  Laptop,
  Watch,
  Tv,
  Speaker,
  Headset,
  Keyboard,
  Mouse,
  Print,
  Scanner,
  Camera,
  Videocam,
  Mic,
  MicOff,
  VolumeUp,
  VolumeDown,
  VolumeOff,
  VolumeMute,
  PlayArrow,
  Pause,
  Stop,
  SkipNext,
  SkipPrevious,
  FastForward,
  FastRewind,
  Replay,
  Shuffle,
  Repeat,
  RepeatOne,
  QueueMusic,
  Playlist,
  Album,
  MusicNote,
  Radio as RadioIcon,
  Equalizer,
  GraphicEq,
  Audiotrack,
  LibraryMusic,
  MusicVideo,
  Movie,
  Theaters,
  LocalMovies,
  Slideshow,
  Photo,
  PhotoLibrary,
  PhotoCamera,
  CameraAlt,
  Image,
  Crop,
  Rotate90DegreesCcw,
  Rotate90DegreesCw,
  FlipCameraAndroid,
  Tune,
  Palette,
  Brush,
  FormatPaint,
  ColorLens,
  Gradient,
  Texture,
  Wallpaper,
  Style,
  Face,
  Person,
  People,
  Group,
  SupervisorAccount,
  AccountCircle,
  AccountBox,
  Badge as BadgeIcon,
  ContactMail,
  Contacts,
  PermIdentity,
  PersonAdd,
  PersonRemove,
  PersonOutline,
  PersonPin,
  PersonPinCircle,
  Business,
  BusinessCenter,
  Work,
  WorkOutline,
  Assignment,
  AssignmentInd,
  AssignmentLate,
  AssignmentReturn,
  AssignmentReturned,
  AssignmentTurnedIn,
  Task,
  TaskAlt,
  Checklist,
  CheckBox,
  CheckBoxOutlineBlank,
  IndeterminateCheckBox,
  RadioButtonChecked,
  RadioButtonUnchecked,
  ToggleOn,
  ToggleOff,
  Star,
  StarBorder,
  StarHalf,
  StarOutline,
  StarRate,
  Grade,
  Favorite,
  FavoriteBorder,
  FavoriteOutlined,
  ThumbUp,
  ThumbDown,
  ThumbUpOffAlt,
  ThumbDownOffAlt,
  ThumbsUpDown,
  SentimentVeryDissatisfied,
  SentimentDissatisfied,
  SentimentNeutral,
  SentimentSatisfied,
  SentimentVerySatisfied,
  Mood,
  MoodBad,
  EmojiEmotions,
  EmojiEvents,
  EmojiFlags,
  EmojiFood,
  EmojiNature,
  EmojiObjects,
  EmojiPeople,
  EmojiSymbols,
  EmojiTransportation,
  Flag,
  OutlinedFlag,
  Tour,
  Map,
  Place,
  LocationOn,
  LocationOff,
  LocationCity,
  LocationSearching,
  MyLocation,
  NearMe,
  Navigation,
  Explore,
  ExploreOff,
  Compass,
  Directions,
  DirectionsBike,
  DirectionsBus,
  DirectionsCar,
  DirectionsRun,
  DirectionsSubway,
  DirectionsTransit,
  DirectionsWalk,
  Flight,
  FlightTakeoff,
  FlightLand,
  Hotel,
  Restaurant,
  LocalCafe,
  LocalBar,
  LocalPizza,
  LocalDining,
  LocalGroceryStore,
  LocalMall,
  LocalPharmacy,
  LocalHospital,
  LocalLibrary,
  LocalMovies as LocalMoviesIcon,
  LocalParking,
  LocalGasStation,
  LocalCarWash,
  LocalLaundryService,
  LocalAtm,
  LocalPostOffice,
  LocalShipping,
  LocalTaxi,
  LocalAirport,
  LocalActivity,
  LocalPlay,
  LocalSee,
  LocalFlorist,
  LocalOffer,
  LocalPrintshop,
  LocalConvenienceStore,
  AttachMoney,
  MonetizationOn,
  Payment,
  CreditCard,
  AccountBalance,
  AccountBalanceWallet,
  Savings,
  RequestQuote,
  PriceCheck,
  PriceChange,
  Sell,
  ShoppingCart,
  ShoppingBag,
  ShoppingBasket,
  Store,
  Storefront,
  AddShoppingCart,
  RemoveShoppingCart,
  ProductionQuantityLimits,
  Inventory,
  Category,
  Label,
  LocalOffer as LocalOfferIcon,
  Loyalty,
  CardGiftcard,
  Redeem,
  ConfirmationNumber,
  EventSeat,
  Event,
  EventAvailable,
  EventBusy,
  EventNote,
  Today,
  CalendarViewDay,
  CalendarViewWeek,
  CalendarViewMonth,
  DateRangeIcon,
  EditCalendar,
  CalendarMonth,
  Weekend,
  WatchLater,
  QueryBuilder,
  Timelapse,
  MoreTime,
  PendingActions,
  Upcoming,
  Pending,
  HourglassEmpty,
  HourglassFull,
  HourglassTop,
  HourglassBottom,
  AvTimer,
  TimerOff,
  Timer10,
  Timer3,
  Snooze,
  NotificationImportant,
  NotificationsActive,
  NotificationsNone,
  NotificationsOff,
  NotificationsPaused,
  RingVolume,
  PhoneEnabled,
  PhoneDisabled,
  PhonePaused,
  PhoneInTalk,
  PhoneMissed,
  PhoneForwarded,
  PhoneCallback,
  PhonelinkRing,
  PhonelinkSetup,
  PhonelinkErase,
  PhonelinkLock,
  PhonelinkOff,
  Smartphone,
  TabletMac,
  LaptopMac,
  DesktopMac,
  DeviceHub,
  Devices,
  DevicesOther,
  DeviceUnknown,
  Router,
  Wifi,
  WifiOff,
  WifiTethering,
  WifiTetheringOff,
  SignalWifi4Bar,
  SignalWifi0Bar,
  SignalWifiConnectedNoInternet4,
  SignalWifiOff,
  SignalCellular4Bar,
  SignalCellular0Bar,
  SignalCellularAlt,
  SignalCellularConnectedNoInternet4Bar,
  SignalCellularNoSim,
  SignalCellularNull,
  SignalCellularOff,
  NetworkCell,
  NetworkWifi,
  NetworkCheck,
  NetworkLocked,
  Nfc,
  Bluetooth,
  BluetoothAudio,
  BluetoothConnected,
  BluetoothDisabled,
  BluetoothSearching,
  Usb,
  UsbOff,
  Cable,
  Power,
  PowerOff,
  PowerSettingsNew,
  Battery20,
  Battery30,
  Battery50,
  Battery60,
  Battery80,
  Battery90,
  BatteryFull,
  BatteryUnknown,
  BatteryAlert,
  BatteryChargingFull,
  BatterySaver,
  BatteryStd,
  FlashlightOn,
  FlashlightOff,
  Brightness1,
  Brightness2,
  Brightness3,
  Brightness4,
  Brightness5,
  Brightness6,
  Brightness7,
  BrightnessAuto,
  BrightnessHigh,
  BrightnessLow,
  BrightnessMedium,
  InvertColors,
  InvertColorsOff,
  Contrast,
  Opacity,
  Grain,
  Texture as TextureIcon,
  Blur,
  BlurCircular,
  BlurLinear,
  BlurOff,
  BlurOn,
  MonochromePhotos,
  Colorize,
  AutoFixHigh,
  AutoFixNormal,
  AutoFixOff,
  AutoAwesome,
  AutoAwesomeMosaic,
  AutoAwesomeMotion,
  AutoStories,
  AutoMode,
  AutoGraph,
  AutoDelete,
  AutorenewIcon,
  CachedIcon,
  RefreshIcon,
  SyncIcon,
  SyncAltIcon,
  SyncDisabledIcon,
  SyncLockIcon,
  SyncProblemIcon,
  UpdateIcon,
  UpdateDisabledIcon,
  SystemUpdateIcon,
  SystemUpdateAltIcon,
  GetAppIcon,
  PublishIcon,
  FileUploadIcon,
  FileDownloadIcon,
  CloudUploadIcon,
  CloudDownloadIcon,
  BackupIcon,
  RestoreIcon,
  ArchiveIcon,
  UnarchiveIcon,
  InboxIcon,
  OutboxIcon,
  DraftsIcon,
  SendIcon,
  ReplyIcon,
  ReplyAllIcon,
  ForwardIcon,
  MarkEmailReadIcon,
  MarkEmailUnreadIcon,
  EmailIcon,
  AlternateEmailIcon,
  MailOutlineIcon,
  MailIcon,
  UnsubscribeIcon,
  SubscriptionsIcon,
  RssFeedIcon,
  BookmarkIcon,
  BookmarkBorderIcon,
  BookmarksIcon,
  TurnedInIcon,
  TurnedInNotIcon,
  LabelIcon,
  LabelImportantIcon,
  LabelOffIcon,
  LabelOutlineIcon,
  LocalOfferIcon as LocalOfferIconDuplicate,
  NewReleasesIcon,
  FiberNewIcon,
  FiberManualRecordIcon,
  FiberSmartRecordIcon,
  RadioButtonCheckedIcon,
  RadioButtonUncheckedIcon,
  CheckCircleIcon,
  CheckCircleOutlineIcon,
  CancelIcon,
  HighlightOffIcon,
  RemoveCircleIcon,
  RemoveCircleOutlineIcon,
  AddCircleIcon,
  AddCircleOutlineIcon,
  AddIcon,
  RemoveIcon,
  ClearIcon,
  CloseIcon,
  DoneIcon,
  DoneAllIcon,
  DoneOutlineIcon,
  CheckIcon,
  ClearAllIcon,
  SelectAllIcon,
  DeselectIcon,
  IndeterminateCheckBoxIcon,
  CheckBoxIcon,
  CheckBoxOutlineBlankIcon,
  SquareIcon,
  CropSquareIcon,
  CropDinIcon,
  Crop169Icon,
  Crop32Icon,
  Crop54Icon,
  Crop75Icon,
  CropFreeIcon,
  CropLandscapeIcon,
  CropPortraitIcon,
  CropRotateIcon,
  CropIcon,
  TransformIcon,
  RotateLeftIcon,
  RotateRightIcon,
  Rotate90DegreesCcwIcon,
  Rotate90DegreesCwIcon,
  FlipIcon,
  FlipToBackIcon,
  FlipToFrontIcon,
  FlipCameraAndroidIcon,
  FlipCameraIosIcon,
  SwitchCameraIcon,
  CameraIcon,
  CameraAltIcon,
  CameraEnhanceIcon,
  CameraFrontIcon,
  CameraRearIcon,
  CameraRollIcon,
  PhotoCameraIcon,
  PhotoCameraBackIcon,
  PhotoCameraFrontIcon,
  VideocamIcon,
  VideocamOffIcon,
  VideoCallIcon,
  VideoLabelIcon,
  VideoLibraryIcon,
  VideoSettingsIcon,
  SlowMotionVideoIcon,
  HighQualityIcon,
  HdIcon,
  SdIcon,
  FourKIcon,
  ThreeDRotationIcon,
  ViewInArIcon,
  ThreeSixtyIcon,
  VrPanoIcon,
  PanoramaIcon,
  PanoramaFishEyeIcon,
  PanoramaHorizontalIcon,
  PanoramaVerticalIcon,
  PanoramaWideAngleIcon,
  PhotoSizeSelectActualIcon,
  PhotoSizeSelectLargeIcon,
  PhotoSizeSelectSmallIcon,
  PhotoFilterIcon,
  ImageIcon,
  ImageNotSupportedIcon,
  ImageSearchIcon,
  ImageAspectRatioIcon,
  BrokenImageIcon,
  CollectionsIcon,
  CollectionsBookmarkIcon,
  PhotoLibraryIcon,
  PhotoAlbumIcon,
  BurstModeIcon,
  CameraEnhanceIcon as CameraEnhanceIconDuplicate,
  TimerIcon,
  Timer10Icon,
  Timer3Icon,
  TimerOffIcon,
  ExposureIcon,
  ExposurePlus1Icon,
  ExposurePlus2Icon,
  ExposureNeg1Icon,
  ExposureNeg2Icon,
  ExposureZeroIcon,
  WbAutoIcon,
  WbCloudyIcon,
  WbIncandescentIcon,
  WbIridescentIcon,
  WbSunnyIcon,
  FlashAutoIcon,
  FlashOffIcon,
  FlashOnIcon,
  IsoIcon,
  LooksIcon,
  Looks3Icon,
  Looks4Icon,
  Looks5Icon,
  Looks6Icon,
  LooksOneIcon,
  LooksTwoIcon,
  FilterIcon,
  Filter1Icon,
  Filter2Icon,
  Filter3Icon,
  Filter4Icon,
  Filter5Icon,
  Filter6Icon,
  Filter7Icon,
  Filter8Icon,
  Filter9Icon,
  Filter9PlusIcon,
  FilterBAndWIcon,
  FilterCenterFocusIcon,
  FilterDramaIcon,
  FilterFramesIcon,
  FilterHdrIcon,
  FilterListIcon,
  FilterNoneIcon,
  FilterTiltShiftIcon,
  FilterVintageIcon,
  FlareIcon,
  GradientIcon,
  GrainIcon,
  GridOffIcon,
  GridOnIcon,
  HealingIcon,
  ImageIcon as ImageIconDuplicate,
  LeakAddIcon,
  LeakRemoveIcon,
  LensIcon,
  LinkedCameraIcon,
  LoopIcon,
  LoopedIcon,
  LoupeIcon,
  MonochromePhotosIcon,
  MovieCreationIcon,
  MovieFilterIcon,
  MusicNoteIcon,
  MusicOffIcon,
  MusicVideoIcon,
  NatureIcon,
  NaturePeopleIcon,
  NavigateBeforeIcon,
  NavigateNextIcon,
  PaletteIcon,
  PanoramaIcon as PanoramaIconDuplicate,
  PhotoIcon,
  PortraitIcon,
  RemoveRedEyeIcon,
  RotateLeftIcon as RotateLeftIconDuplicate,
  RotateRightIcon as RotateRightIconDuplicate,
  SlideshowIcon,
  StraightenIcon,
  StyleIcon,
  SwitchCameraIcon as SwitchCameraIconDuplicate,
  SwitchVideoIcon,
  TagFacesIcon,
  TextureIcon as TextureIconDuplicate,
  TimelapseIcon,
  TonalityIcon,
  TransformIcon as TransformIconDuplicate,
  TuneIcon,
  ViewComfyIcon,
  ViewCompactIcon,
  ViewModuleIcon,
  VignetteIcon,
  WbCloudyIcon as WbCloudyIconDuplicate,
  WbIncandescentIcon as WbIncandescentIconDuplicate,
  WbIridescentIcon as WbIridescentIconDuplicate,
  WbSunnyIcon as WbSunnyIconDuplicate,
} from '@mui/icons-material';

interface AdvancedDashboardComponentsProps {
  stats: any;
}

const AdvancedDashboardComponents: React.FC<AdvancedDashboardComponentsProps> = ({ stats }) => {
  const theme = useTheme();
  const [selectedComponent, setSelectedComponent] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [rating, setRating] = useState(4);
  const [sliderValue, setSliderValue] = useState(30);
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [treeExpanded, setTreeExpanded] = useState<string[]>([]);
  const [selectedTreeItems, setSelectedTreeItems] = useState<string[]>([]);
  const [timelineData, setTimelineData] = useState([]);
  const [accordionExpanded, setAccordionExpanded] = useState<string | false>(false);
  const [toggleView, setToggleView] = useState('grid');
  const [filterValue, setFilterValue] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const [stepperActiveStep, setStepperActiveStep] = useState(0);
  const [mobileStepperActiveStep, setMobileStepperActiveStep] = useState(0);
  const [paginationPage, setPaginationPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<null | HTMLElement>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  // Sample data for components
  const sampleTickets = [
    { id: 1, title: 'Login Issue', priority: 'High', status: 'Open', assignee: 'John Doe', created: '2024-01-15' },
    { id: 2, title: 'Payment Bug', priority: 'Critical', status: 'In Progress', assignee: 'Jane Smith', created: '2024-01-14' },
    { id: 3, title: 'UI Enhancement', priority: 'Medium', status: 'Resolved', assignee: 'Bob Johnson', created: '2024-01-13' },
    { id: 4, title: 'Database Error', priority: 'High', status: 'Open', assignee: 'Alice Brown', created: '2024-01-12' },
    { id: 5, title: 'Feature Request', priority: 'Low', status: 'Closed', assignee: 'Charlie Wilson', created: '2024-01-11' },
  ];

  const timelineEvents = [
    { id: 1, title: 'Ticket Created', description: 'New ticket submitted by customer', time: '2 hours ago', type: 'create' },
    { id: 2, title: 'Assigned to Team', description: 'Ticket assigned to development team', time: '1 hour ago', type: 'assign' },
    { id: 3, title: 'Status Updated', description: 'Status changed to In Progress', time: '30 minutes ago', type: 'update' },
    { id: 4, title: 'Comment Added', description: 'Developer added progress update', time: '15 minutes ago', type: 'comment' },
    { id: 5, title: 'Resolution Pending', description: 'Waiting for customer feedback', time: '5 minutes ago', type: 'pending' },
  ];

  const treeData = [
    {
      id: 'tickets',
      label: 'Tickets',
      children: [
        { id: 'open', label: 'Open (23)' },
        { id: 'in-progress', label: 'In Progress (15)' },
        { id: 'resolved', label: 'Resolved (67)' },
        { id: 'closed', label: 'Closed (89)' },
      ],
    },
    {
      id: 'teams',
      label: 'Teams',
      children: [
        { id: 'frontend', label: 'Frontend Team (8)' },
        { id: 'backend', label: 'Backend Team (6)' },
        { id: 'devops', label: 'DevOps Team (4)' },
        { id: 'qa', label: 'QA Team (5)' },
      ],
    },
    {
      id: 'applications',
      label: 'Applications',
      children: [
        { id: 'web-app', label: 'Web Application' },
        { id: 'mobile-app', label: 'Mobile App' },
        { id: 'api', label: 'API Services' },
        { id: 'database', label: 'Database' },
      ],
    },
  ];

  const stepperSteps = [
    { label: 'Ticket Submitted', description: 'Customer submits a new ticket' },
    { label: 'Initial Triage', description: 'Support team reviews and categorizes' },
    { label: 'Assignment', description: 'Ticket assigned to appropriate team' },
    { label: 'Development', description: 'Team works on resolution' },
    { label: 'Testing', description: 'Solution tested and verified' },
    { label: 'Resolution', description: 'Ticket resolved and closed' },
  ];

  const mobileStepperSteps = [
    { label: 'Create', icon: <AddIcon /> },
    { label: 'Assign', icon: <AssignmentIcon /> },
    { label: 'Develop', icon: <CodeIcon /> },
    { label: 'Test', icon: <BugReportIcon /> },
    { label: 'Deploy', icon: <CloudUploadIcon /> },
  ];

  // Advanced Table Component
  const AdvancedTable = () => {
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'title', headerName: 'Title', width: 200 },
      { field: 'priority', headerName: 'Priority', width: 120 },
      { field: 'status', headerName: 'Status', width: 130 },
      { field: 'assignee', headerName: 'Assignee', width: 150 },
      { field: 'created', headerName: 'Created', width: 130 },
    ];

    return (
      <Card sx={{ height: 400, width: '100%' }}>
        <CardHeader title="Advanced Data Grid" subheader="Sortable, filterable ticket data" />
        <CardContent>
          <DataGrid
            rows={sampleTickets}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </CardContent>
      </Card>
    );
  };

  // Interactive Timeline Component
  const InteractiveTimeline = () => (
    <Card>
      <CardHeader title="Ticket Timeline" subheader="Recent activity and updates" />
      <CardContent>
        <Timeline>
          {timelineEvents.map((event, index) => (
            <TimelineItem key={event.id}>
              <TimelineSeparator>
                <TimelineDot 
                  color={
                    event.type === 'create' ? 'primary' :
                    event.type === 'assign' ? 'secondary' :
                    event.type === 'update' ? 'success' :
                    event.type === 'comment' ? 'info' : 'warning'
                  }
                >
                  {event.type === 'create' && <AddIcon />}
                  {event.type === 'assign' && <AssignmentIcon />}
                  {event.type === 'update' && <UpdateIcon />}
                  {event.type === 'comment' && <CommentIcon />}
                  {event.type === 'pending' && <PendingIcon />}
                </TimelineDot>
                {index < timelineEvents.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h6" component="span">
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {event.time}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );

  // Tree View Component
  const TreeViewComponent = () => (
    <Card>
      <CardHeader title="System Overview" subheader="Hierarchical view of tickets and teams" />
      <CardContent>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          expanded={treeExpanded}
          selected={selectedTreeItems}
          onNodeToggle={(event, nodeIds) => setTreeExpanded(nodeIds)}
          onNodeSelect={(event, nodeIds) => setSelectedTreeItems(nodeIds)}
        >
          {treeData.map((node) => (
            <TreeItem key={node.id} nodeId={node.id} label={node.label}>
              {node.children?.map((child) => (
                <TreeItem key={child.id} nodeId={child.id} label={child.label} />
              ))}
            </TreeItem>
          ))}
        </TreeView>
      </CardContent>
    </Card>
  );

  // Stepper Component
  const StepperComponent = () => (
    <Card>
      <CardHeader title="Ticket Workflow" subheader="Standard ticket resolution process" />
      <CardContent>
        <Stepper activeStep={stepperActiveStep} orientation="vertical">
          {stepperSteps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => setStepperActiveStep(index + 1)}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={index === stepperSteps.length - 1}
                  >
                    {index === stepperSteps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={() => setStepperActiveStep(index - 1)}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </CardContent>
    </Card>
  );

  // Accordion Component
  const AccordionComponent = () => (
    <Card>
      <CardHeader title="System Information" subheader="Expandable system details" />
      <CardContent>
        <Accordion expanded={accordionExpanded === 'panel1'} onChange={(e, isExpanded) => setAccordionExpanded(isExpanded ? 'panel1' : false)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Performance Metrics</Typography>
            <Typography sx={{ color: 'text.secondary' }}>System performance overview</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2">CPU Usage</Typography>
                <LinearProgress variant="determinate" value={65} />
              </Box>
              <Box>
                <Typography variant="body2">Memory Usage</Typography>
                <LinearProgress variant="determinate" value={78} />
              </Box>
              <Box>
                <Typography variant="body2">Disk Usage</Typography>
                <LinearProgress variant="determinate" value={45} />
              </Box>
            </Stack>
          </AccordionDetails>
        </Accordion>
        
        <Accordion expanded={accordionExpanded === 'panel2'} onChange={(e, isExpanded) => setAccordionExpanded(isExpanded ? 'panel2' : false)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Team Statistics</Typography>
            <Typography sx={{ color: 'text.secondary' }}>Team performance data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h4">23</Typography>
                <Typography variant="body2">Active Members</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h4">156</Typography>
                <Typography variant="body2">Tickets Resolved</Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={accordionExpanded === 'panel3'} onChange={(e, isExpanded) => setAccordionExpanded(isExpanded ? 'panel3' : false)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: '33%', flexShrink: 0 }}>System Health</Typography>
            <Typography sx={{ color: 'text.secondary' }}>Current system status</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                <ListItemText primary="Database" secondary="Operational" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                <ListItemText primary="API Services" secondary="Operational" />
              </ListItem>
              <ListItem>
                <ListItemIcon><WarningIcon color="warning" /></ListItemIcon>
                <ListItemText primary="Cache Layer" secondary="Degraded Performance" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );

  // Rating and Feedback Component
  const RatingComponent = () => (
    <Card>
      <CardHeader title="Customer Satisfaction" subheader="Rate your experience" />
      <CardContent>
        <Stack spacing={3}>
          <Box>
            <Typography component="legend">Overall Satisfaction</Typography>
            <Rating
              name="satisfaction-rating"
              value={rating}
              onChange={(event, newValue) => setRating(newValue || 0)}
              size="large"
            />
          </Box>
          
          <Box>
            <Typography gutterBottom>Response Time Rating</Typography>
            <Slider
              value={sliderValue}
              onChange={(event, newValue) => setSliderValue(newValue as number)}
              aria-labelledby="response-time-slider"
              valueLabelDisplay="auto"
              step={10}
              marks
              min={0}
              max={100}
            />
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>Feedback Categories</Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked />} label="User Interface" />
              <FormControlLabel control={<Checkbox />} label="Performance" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Support Quality" />
              <FormControlLabel control={<Checkbox />} label="Documentation" />
            </FormGroup>
          </Box>

          <TextField
            multiline
            rows={4}
            placeholder="Additional feedback..."
            variant="outlined"
            fullWidth
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary">Submit Feedback</Button>
        <Button variant="outlined">Save Draft</Button>
      </CardActions>
    </Card>
  );

  // Image Gallery Component
  const ImageGallery = () => {
    const itemData = [
      { img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', title: 'Dashboard Screenshot' },
      { img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d', title: 'Analytics View' },
      { img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45', title: 'Team Collaboration' },
      { img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c', title: 'System Architecture' },
    ];

    return (
      <Card>
        <CardHeader title="System Screenshots" subheader="Visual overview of the system" />
        <CardContent>
          <ImageList sx={{ width: '100%', height: 300 }} cols={2} rowHeight={140}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=140&h=140&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=140&h=140&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar title={item.title} />
              </ImageListItem>
            ))}
          </ImageList>
        </CardContent>
      </Card>
    );
  };

  // Mobile Stepper Component
  const MobileStepperComponent = () => (
    <Card>
      <CardHeader title="Mobile Workflow" subheader="Touch-friendly process steps" />
      <CardContent>
        <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
          <Paper square elevation={0} sx={{ display: 'flex', alignItems: 'center', height: 50, pl: 2, bgcolor: 'background.default' }}>
            <Typography>{mobileStepperSteps[mobileStepperActiveStep].label}</Typography>
          </Paper>
          <Box sx={{ height: 100, maxWidth: 400, width: '100%', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {mobileStepperSteps[mobileStepperActiveStep].icon}
          </Box>
          <MobileStepper
            steps={mobileStepperSteps.length}
            position="static"
            activeStep={mobileStepperActiveStep}
            nextButton={
              <Button
                size="small"
                onClick={() => setMobileStepperActiveStep((prevActiveStep) => prevActiveStep + 1)}
                disabled={mobileStepperActiveStep === mobileStepperSteps.length - 1}
              >
                Next
                <KeyboardArrowRightIcon />
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={() => setMobileStepperActiveStep((prevActiveStep) => prevActiveStep - 1)}
                disabled={mobileStepperActiveStep === 0}
              >
                <KeyboardArrowLeftIcon />
                Back
              </Button>
            }
          />
        </Box>
      </CardContent>
    </Card>
  );

  // Pagination Component
  const PaginationComponent = () => (
    <Card>
      <CardHeader title="Data Navigation" subheader="Paginated content browsing" />
      <CardContent>
        <Stack spacing={2} alignItems="center">
          <Typography>Page {paginationPage} of 10</Typography>
          <Pagination
            count={10}
            page={paginationPage}
            onChange={(event, value) => setPaginationPage(value)}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            color="secondary"
          />
        </Stack>
      </CardContent>
    </Card>
  );

  // Bottom Navigation Component
  const BottomNavigationComponent = () => (
    <Card>
      <CardHeader title="Mobile Navigation" subheader="Bottom navigation for mobile apps" />
      <CardContent>
        <BottomNavigation
          showLabels
          value={bottomNavValue}
          onChange={(event, newValue) => setBottomNavValue(newValue)}
        >
          <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} />
          <BottomNavigationAction label="Analytics" icon={<AnalyticsIcon />} />
          <BottomNavigationAction label="Tickets" icon={<ConfirmationNumberIcon />} />
          <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
        </BottomNavigation>
      </CardContent>
    </Card>
  );

  // Advanced Controls Component
  const AdvancedControls = () => (
    <Card>
      <CardHeader title="Advanced Controls" subheader="Interactive dashboard controls" />
      <CardContent>
        <Stack spacing={3}>
          <Box>
            <Typography gutterBottom>View Mode</Typography>
            <ToggleButtonGroup
              value={toggleView}
              exclusive
              onChange={(event, newView) => setToggleView(newView)}
              aria-label="view mode"
            >
              <ToggleButton value="grid" aria-label="grid view">
                <ViewModuleIcon />
              </ToggleButton>
              <ToggleButton value="list" aria-label="list view">
                <ViewListIcon />
              </ToggleButton>
              <ToggleButton value="card" aria-label="card view">
                <ViewComfyIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box>
            <Typography gutterBottom>Quick Actions</Typography>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button startIcon={<AddIcon />}>Create</Button>
              <Button startIcon={<EditIcon />}>Edit</Button>
              <Button startIcon={<DeleteIcon />}>Delete</Button>
            </ButtonGroup>
          </Box>

          <Box>
            <Typography gutterBottom>Filter Options</Typography>
            <Autocomplete
              multiple
              options={['High Priority', 'Open Status', 'Assigned to Me', 'Due Today', 'Overdue']}
              defaultValue={['High Priority']}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Filters" placeholder="Select filters" />
              )}
            />
          </Box>

          <Box>
            <Typography gutterBottom>Sort Options</Typography>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)}>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="date">Date Created</MenuItem>
                <MenuItem value="priority">Priority</MenuItem>
                <MenuItem value="status">Status</MenuItem>
                <MenuItem value="assignee">Assignee</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );

  const componentTabs = [
    { label: 'Data Display', value: 0, icon: <TableViewIcon /> },
    { label: 'Navigation', value: 1, icon: <NavigationIcon /> },
    { label: 'Feedback', value: 2, icon: <FeedbackIcon /> },
    { label: 'Media', value: 3, icon: <PhotoLibraryIcon /> },
    { label: 'Controls', value: 4, icon: <SettingsIcon /> },
  ];

  const renderComponentContent = () => {
    switch (selectedComponent) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <AdvancedTable />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TreeViewComponent />
            </Grid>
            <Grid item xs={12}>
              <InteractiveTimeline />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <StepperComponent />
            </Grid>
            <Grid item xs={12} md={6}>
              <MobileStepperComponent />
            </Grid>
            <Grid item xs={12} md={6}>
              <PaginationComponent />
            </Grid>
            <Grid item xs={12} md={6}>
              <BottomNavigationComponent />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <RatingComponent />
            </Grid>
            <Grid item xs={12} md={6}>
              <AccordionComponent />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ImageGallery />
            </Grid>
          </Grid>
        );
      case 4:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <AdvancedControls />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      {/* Header */}
      <Typography
        variant="h3"
        sx={{
          mb: 4,
          fontWeight: 700,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <ExtensionIcon />
        Advanced Dashboard Components
      </Typography>

      {/* Component Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={selectedComponent}
          onChange={(_, newValue) => setSelectedComponent(newValue)}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              minHeight: 72,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
            },
          }}
        >
          {componentTabs.map((tab) => (
            <Tab
              key={tab.value}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {tab.icon}
                  {tab.label}
                </Box>
              }
              value={tab.value}
            />
          ))}
        </Tabs>
      </Paper>

      {/* Component Content */}
      <Box sx={{ minHeight: 600 }}>
        {renderComponentContent()}
      </Box>

      {/* Floating Action Buttons */}
      <SpeedDial
        ariaLabel="Component Actions"
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
        icon={<SpeedDialIcon />}
        open={speedDialOpen}
        onOpen={() => setSpeedDialOpen(true)}
        onClose={() => setSpeedDialOpen(false)}
      >
        <SpeedDialAction
          icon={<AddIcon />}
          tooltipTitle="Add Component"
          onClick={() => setDialogOpen(true)}
        />
        <SpeedDialAction
          icon={<SettingsIcon />}
          tooltipTitle="Settings"
          onClick={() => setDrawerOpen(true)}
        />
        <SpeedDialAction
          icon={<ShareIcon />}
          tooltipTitle="Share"
          onClick={() => setSnackbarOpen(true)}
        />
      </SpeedDial>

      {/* Dialogs and Modals */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Component</DialogTitle>
        <DialogContent>
          <Typography>Select a component type to add to your dashboard:</Typography>
          <List>
            <ListItemButton onClick={() => setDialogOpen(false)}>
              <ListItemIcon><ChartIcon /></ListItemIcon>
              <ListItemText primary="Chart Component" secondary="Add a new chart visualization" />
            </ListItemButton>
            <ListItemButton onClick={() => setDialogOpen(false)}>
              <ListItemIcon><TableViewIcon /></ListItemIcon>
              <ListItemText primary="Data Table" secondary="Add a data table component" />
            </ListItemButton>
            <ListItemButton onClick={() => setDialogOpen(false)}>
              <ListItemIcon><TimelineIcon /></ListItemIcon>
              <ListItemText primary="Timeline" secondary="Add a timeline component" />
            </ListItemButton>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => setDialogOpen(false)} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Settings Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: 300, p: 2 } }}
      >
        <Typography variant="h6" gutterBottom>Dashboard Settings</Typography>
        <Stack spacing={2}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Auto Refresh"
          />
          <FormControlLabel
            control={<Switch />}
            label="Dark Mode"
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Notifications"
          />
          <Divider />
          <Typography variant="subtitle2">Refresh Interval</Typography>
          <Slider
            defaultValue={30}
            marks={[
              { value: 10, label: '10s' },
              { value: 30, label: '30s' },
              { value: 60, label: '1m' },
            ]}
            min={10}
            max={60}
            valueLabelDisplay="auto"
          />
        </Stack>
      </Drawer>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Dashboard shared successfully!
        </Alert>
      </Snackbar>

      {/* Backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
        onClick={() => setBackdropOpen(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default AdvancedDashboardComponents;