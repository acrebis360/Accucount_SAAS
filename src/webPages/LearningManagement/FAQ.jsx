// app/dashboard/ai-bot/page.js
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bot,
  Send,
  MessageSquare,
  HelpCircle,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  ExternalLink,
  FileText,
  FileSpreadsheet,
  FilePdf,
  Video,
  Image,
  Link as LinkIcon,
  Clock,
  Calendar,
  User,
  Users,
  Building,
  Package,
  Truck,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Info,
  Settings,
  History,
  Star,
  Award,
  BookOpen,
  GraduationCap,
  Wrench,
  Cpu,
  Server,
  Database,
  Shield,
  Lock,
  Unlock,
  Key,
  Mail,
  Phone,
  MessageCircle,
  Sparkles,
  Zap,
  RefreshCw,
  Download,
  Upload,
  Printer,
  Share2,
  Bookmark,
  Flag,
  Filter,
  Grid,
  List,
  MoreVertical,
  Edit,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ArrowLeftRight,
  ArrowUpDown,
  Maximize2,
  Minimize2,
  BotIcon,
  SendIcon,
  MessageSquareIcon,
  HelpCircleIcon,
  SearchIcon,
  XIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  CopyIcon,
  CheckIcon,
  ExternalLinkIcon,
  FileTextIcon,
  FileSpreadsheetIcon,
  FilePdfIcon,
  VideoIcon,
  ImageIcon,
  LinkIcon as LinkIconCustom,
  ClockIcon,
  CalendarIcon,
  UserIcon,
  UsersIcon,
  BuildingIcon,
  PackageIcon,
  TruckIcon,
  ShoppingCartIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  InfoIcon,
  SettingsIcon,
  HistoryIcon,
  StarIcon,
  AwardIcon,
  BookOpenIcon,
  GraduationCapIcon,
  WrenchIcon,
  CpuIcon,
  ServerIcon,
  DatabaseIcon,
  ShieldIcon,
  LockIcon,
  UnlockIcon,
  KeyIcon,
  MailIcon,
  PhoneIcon,
  MessageCircleIcon,
  SparklesIcon,
  ZapIcon,
  RefreshCwIcon,
  DownloadIcon,
  UploadIcon,
  PrinterIcon,
  Share2Icon,
  BookmarkIcon,
  FlagIcon,
  FilterIcon,
  GridIcon,
  ListIcon,
  MoreVerticalIcon,
  EditIcon,
  Trash2Icon,
  PlusIcon,
  MinusIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowLeftRightIcon,
  ArrowUpDownIcon,
  Maximize2Icon,
  Minimize2Icon,
  Brain,
  BrainIcon,
  Network,
  NetworkIcon,
  GitBranch,
  GitBranchIcon,
  Workflow,
  WorkflowIcon,
  Code,
  CodeIcon,
  Terminal,
  TerminalIcon,
  Command,
  CommandIcon,
  Cloud,
  CloudIcon,
  CloudLightning,
  CloudLightningIcon,
  CloudRain,
  CloudRainIcon,
  CloudSnow,
  CloudSnowIcon,
  CloudFog,
  CloudFogIcon,
  CloudCog,
  CloudCogIcon,
  CloudOff,
  CloudOffIcon,
  HardDrive,
  HardDriveIcon,
  Microchip,
  MicrochipIcon,
  Cpu as CpuIconCustom,
  Server as ServerIconCustom,
  Database as DatabaseIconCustom,
  Shield as ShieldIconCustom,
  Lock as LockIconCustom,
  Unlock as UnlockIconCustom,
  Key as KeyIconCustom,
  Mail as MailIconCustom,
  Phone as PhoneIconCustom,
  MessageCircle as MessageCircleIconCustom,
  Sparkles as SparklesIconCustom,
  Zap as ZapIconCustom,
  RefreshCw as RefreshCwIconCustom,
  Download as DownloadIconCustom,
  Upload as UploadIconCustom,
  Printer as PrinterIconCustom,
  Share2 as Share2IconCustom,
  Bookmark as BookmarkIconCustom,
  Flag as FlagIconCustom,
  Filter as FilterIconCustom,
  Grid as GridIconCustom,
  List as ListIconCustom,
  MoreVertical as MoreVerticalIconCustom,
  Edit as EditIconCustom,
  Trash2 as Trash2IconCustom,
  Plus as PlusIconCustom,
  Minus as MinusIconCustom,
  ArrowRight as ArrowRightIconCustom,
  ArrowLeft as ArrowLeftIconCustom,
  ArrowUp as ArrowUpIconCustom,
  ArrowDown as ArrowDownIconCustom,
  ArrowLeftRight as ArrowLeftRightIconCustom,
  ArrowUpDown as ArrowUpDownIconCustom,
  Maximize2 as Maximize2IconCustom,
  Minimize2 as Minimize2IconCustom,
  BrainIcon as BrainIconCustom,
  NetworkIcon as NetworkIconCustom,
  GitBranchIcon as GitBranchIconCustom,
  WorkflowIcon as WorkflowIconCustom,
  CodeIcon as CodeIconCustom,
  TerminalIcon as TerminalIconCustom,
  CommandIcon as CommandIconCustom,
  CloudIcon as CloudIconCustom,
  CloudLightningIcon as CloudLightningIconCustom,
  CloudRainIcon as CloudRainIconCustom,
  CloudSnowIcon as CloudSnowIconCustom,
  CloudFogIcon as CloudFogIconCustom,
  CloudCogIcon as CloudCogIconCustom,
  CloudOffIcon as CloudOffIconCustom,
  HardDriveIcon as HardDriveIconCustom,
  MicrochipIcon as MicrochipIconCustom,
  Robot,
  RobotIcon,
  Headphones,
  HeadphonesIcon,
  Speaker,
  SpeakerIcon,
  Mic,
  MicIcon,
  VideoIcon as VideoIconCustom,
  Camera,
  CameraIcon,
  Play,
  PlayIcon,
  Pause,
  PauseIcon,
  StopCircle,
  StopCircleIcon,
  Volume2,
  Volume2Icon,
  VolumeX,
  VolumeXIcon,
  Maximize2 as Maximize2IconCustom2,
  Minimize2 as Minimize2IconCustom2,
  ExternalLink as ExternalLinkIconCustom,
  Link as LinkIconCustom2,
  Link2,
  Link2Icon,
  QrCode,
  QrCodeIcon,
  Barcode,
  BarcodeIcon,
  Scan,
  ScanIcon,
  ScanLine,
  ScanLineIcon,
  ScanSearch,
  ScanSearchIcon,
  ScanText,
  ScanTextIcon,
  ScanEye,
  ScanEyeIcon,
  ScanFace,
  ScanFaceIcon,
  Fingerprint,
  FingerprintIcon,
  CreditCard,
  CreditCardIcon,
  Wallet,
  WalletIcon,
  Banknote,
  BanknoteIcon,
  Coins,
  CoinsIcon,
  PiggyBank,
  PiggyBankIcon,
  Receipt,
  ReceiptIcon,
  ReceiptText,
  ReceiptTextIcon,
  ReceiptEuro,
  ReceiptEuroIcon,
  ReceiptPound,
  ReceiptPoundIcon,
  ReceiptJapaneseYen,
  ReceiptJapaneseYenIcon,
  ReceiptIndianRupee,
  ReceiptIndianRupeeIcon,
  ReceiptRussianRuble,
  ReceiptRussianRubleIcon,
  ReceiptKoreanWon,
  ReceiptKoreanWonIcon,
  ReceiptSwissFranc,
  ReceiptSwissFrancIcon,
  ReceiptCent,
  ReceiptCentIcon,
  ReceiptPercent,
  ReceiptPercentIcon,
  ReceiptTax,
  ReceiptTaxIcon,
  Calculator,
  CalculatorIcon,
  Sigma,
  SigmaIcon,
  FunctionSquare,
  FunctionSquareIcon,
  Variable,
  VariableIcon,
  Hash,
  HashIcon,
  Percent,
  PercentIcon,
  Divide,
  DivideIcon,
  Equal,
  EqualIcon,
  NotEqual,
  NotEqualIcon,
  Infinity,
  InfinityIcon,
  Pi,
  PiIcon,
  Circle,
  CircleIcon,
  Square,
  SquareIcon,
  Triangle,
  TriangleIcon,
  Hexagon,
  HexagonIcon,
  Octagon,
  OctagonIcon,
  Pentagon,
  PentagonIcon,
  CircleDot,
  CircleDotIcon,
  CircleDashed,
  CircleDashedIcon,
  CircleOff,
  CircleOffIcon,
  CircleSlash,
  CircleSlashIcon,
  CircleSlash2,
  CircleSlash2Icon,
  CircleAlert,
  CircleAlertIcon,
  CircleCheck,
  CircleCheckIcon,
  CircleX,
  CircleXIcon,
  CircleHelp,
  CircleHelpIcon,
  SquareCheck,
  SquareCheckIcon,
  SquareX,
  SquareXIcon,
  SquareAlert,
  SquareAlertIcon,
  SquareHelp,
  SquareHelpIcon,
  SquareEqual,
  SquareEqualIcon,
  SquareSlash,
  SquareSlashIcon,
  SquarePi,
  SquarePiIcon,
  SquareSigma,
  SquareSigmaIcon,
  SquareFunction,
  SquareFunctionIcon,
  SquareRadical,
  SquareRadicalIcon,
  SquareAsterisk,
  SquareAsteriskIcon,
  SquareDot,
  SquareDotIcon,
  SquareDashed,
  SquareDashedIcon,
  SquareDashedBottom,
  SquareDashedBottomIcon,
  SquareDashedBottomCode,
  SquareDashedBottomCodeIcon,
  FolderTree,
  Eye
} from 'lucide-react';

// Shadcn UI imports
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AIBotPage = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your AI assistant. How can I help you today? You can ask me about inventory, policies, procedures, or any other workplace questions.',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [feedbackGiven, setFeedbackGiven] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  // Sample FAQs data
  const faqs = [
    {
      id: 'FAQ-001',
      question: 'How do I perform a cycle count?',
      answer: 'Cycle counting is performed by scanning each item in a designated zone. Use the handheld scanner to scan each item\'s barcode, then verify the quantity matches the system. Report any discrepancies through the inventory adjustment form. Cycle counts should be completed by the end of your shift.',
      category: 'inventory',
      tags: ['cycle-count', 'inventory', 'procedure'],
      views: 1234,
      helpful: 98,
      lastUpdated: '2024-03-15',
      relatedLinks: [
        { title: 'Cycle Count Procedure', url: '/docs/cycle-count' },
        { title: 'Inventory Adjustment Form', url: '/forms/inventory-adjustment' },
      ],
    },
    {
      id: 'FAQ-002',
      question: 'What should I do if I find damaged inventory?',
      answer: 'If you discover damaged inventory: 1. Tag the item with a "Damaged" label immediately. 2. Move it to the designated quarantine area. 3. Report the damage through the quality system or to your supervisor. 4. Complete a damage report form. Do not attempt to sell or use damaged items.',
      category: 'quality',
      tags: ['damaged', 'quality', 'procedure'],
      views: 856,
      helpful: 95,
      lastUpdated: '2024-03-14',
      relatedLinks: [
        { title: 'Damage Reporting Form', url: '/forms/damage-report' },
        { title: 'Quality Control Guidelines', url: '/docs/quality-guidelines' },
      ],
    },
    {
      id: 'FAQ-003',
      question: 'How do I request time off?',
      answer: 'To request time off: 1. Log into the HR portal. 2. Navigate to "Time Off Requests". 3. Select the dates and type of leave. 4. Submit for manager approval. Requests should be submitted at least 2 weeks in advance. Emergency requests should be communicated directly to your supervisor.',
      category: 'hr',
      tags: ['time-off', 'vacation', 'hr'],
      views: 2341,
      helpful: 99,
      lastUpdated: '2024-03-13',
      relatedLinks: [
        { title: 'HR Portal', url: '/hr-portal' },
        { title: 'Leave Policy', url: '/docs/leave-policy' },
      ],
    },
    {
      id: 'FAQ-004',
      question: 'What are the safety procedures for forklift operation?',
      answer: 'Forklift safety procedures: 1. Always wear required PPE (vest, steel-toed boots). 2. Complete pre-operation inspection checklist. 3. Maintain safe speed (max 5 mph). 4. Use horn at intersections. 5. Keep load within capacity limits. 6. Never lift people. 7. Report any issues immediately. Certification required before operation.',
      category: 'safety',
      tags: ['forklift', 'safety', 'equipment'],
      views: 1567,
      helpful: 97,
      lastUpdated: '2024-03-12',
      relatedLinks: [
        { title: 'Forklift Safety Manual', url: '/docs/forklift-safety' },
        { title: 'Equipment Inspection Form', url: '/forms/equipment-inspection' },
      ],
    },
    {
      id: 'FAQ-005',
      question: 'How do I reset my password?',
      answer: 'To reset your password: 1. Go to the login page. 2. Click "Forgot Password". 3. Enter your email address. 4. Check your email for reset link. 5. Follow instructions to create new password. If you don\'t receive the email within 5 minutes, check spam folder or contact IT support.',
      category: 'it',
      tags: ['password', 'login', 'it'],
      views: 3456,
      helpful: 99,
      lastUpdated: '2024-03-11',
      relatedLinks: [
        { title: 'IT Support Portal', url: '/it-support' },
        { title: 'Password Policy', url: '/docs/password-policy' },
      ],
    },
    {
      id: 'FAQ-006',
      question: 'What is the process for receiving new shipments?',
      answer: 'Receiving process: 1. Verify delivery matches ASN/PO. 2. Inspect for damage before accepting. 3. Count all items. 4. Scan receipts into system. 5. Report discrepancies immediately. 6. Move items to receiving zone. 7. Complete receiving report. All steps must be completed before items are put away.',
      category: 'operations',
      tags: ['receiving', 'shipment', 'operations'],
      views: 987,
      helpful: 96,
      lastUpdated: '2024-03-10',
      relatedLinks: [
        { title: 'Receiving Procedures', url: '/docs/receiving' },
        { title: 'Receiving Report Form', url: '/forms/receiving-report' },
      ],
    },
    {
      id: 'FAQ-007',
      question: 'How do I report a safety hazard?',
      answer: 'To report a safety hazard: 1. If immediate danger, evacuate area and call emergency number. 2. Otherwise, use the safety reporting system or app. 3. Describe the hazard and location. 4. Take photos if safe to do so. 5. Notify your supervisor. All reports are investigated within 24 hours.',
      category: 'safety',
      tags: ['safety', 'hazard', 'reporting'],
      views: 678,
      helpful: 100,
      lastUpdated: '2024-03-09',
      relatedLinks: [
        { title: 'Safety Reporting System', url: '/safety/report' },
        { title: 'Emergency Procedures', url: '/docs/emergency' },
      ],
    },
    {
      id: 'FAQ-008',
      question: 'What are the QR code scanning requirements?',
      answer: 'QR code scanning requirements: 1. Ensure good lighting. 2. Hold scanner 4-6 inches from code. 3. Steady hand for 1-2 seconds. 4. Verify scan confirmation beep. 5. If scan fails, try adjusting distance or angle. 6. Clean scanner lens if needed. Report persistent issues to IT.',
      category: 'technology',
      tags: ['qr-code', 'scanning', 'technology'],
      views: 543,
      helpful: 94,
      lastUpdated: '2024-03-08',
      relatedLinks: [
        { title: 'Scanner User Guide', url: '/docs/scanner-guide' },
        { title: 'Troubleshooting Tips', url: '/docs/scanner-troubleshooting' },
      ],
    },
    {
      id: 'FAQ-009',
      question: 'How do I access my pay stubs?',
      answer: 'To access pay stubs: 1. Log into the employee portal. 2. Go to "Payroll" section. 3. Select "Pay Stubs". 4. Choose the pay period. 5. View or download PDF. Pay stubs are typically available by Wednesday morning for the previous week. Contact payroll for issues.',
      category: 'hr',
      tags: ['payroll', 'pay-stubs', 'hr'],
      views: 2345,
      helpful: 98,
      lastUpdated: '2024-03-07',
      relatedLinks: [
        { title: 'Employee Portal', url: '/employee-portal' },
        { title: 'Payroll Contact', url: '/contact/payroll' },
      ],
    },
    {
      id: 'FAQ-010',
      question: 'What is the policy on cell phone use?',
      answer: 'Cell phone policy: Personal phones should be kept in lockers during work hours. Emergency calls can be taken in designated break areas. Headphones/earbuds are not permitted in warehouse areas. Supervisors may authorize phone use for work-related purposes. Violations may result in disciplinary action.',
      category: 'policy',
      tags: ['policy', 'cell-phone', 'rules'],
      views: 1876,
      helpful: 95,
      lastUpdated: '2024-03-06',
      relatedLinks: [
        { title: 'Employee Handbook', url: '/docs/handbook' },
        { title: 'Workplace Policies', url: '/docs/policies' },
      ],
    },
    {
      id: 'FAQ-011',
      question: 'How do I request new equipment?',
      answer: 'To request new equipment: 1. Complete equipment request form. 2. Include justification and specifications. 3. Get supervisor approval. 4. Submit to purchasing department. 5. Track request status in procurement system. Emergency equipment needs should be communicated directly to management.',
      category: 'procurement',
      tags: ['equipment', 'request', 'procurement'],
      views: 765,
      helpful: 93,
      lastUpdated: '2024-03-05',
      relatedLinks: [
        { title: 'Equipment Request Form', url: '/forms/equipment-request' },
        { title: 'Procurement Guide', url: '/docs/procurement' },
      ],
    },
    {
      id: 'FAQ-012',
      question: 'What should I do in case of a fire alarm?',
      answer: 'Fire alarm procedure: 1. Immediately stop work. 2. Proceed to nearest exit. 3. Do not use elevators. 4. Gather at designated assembly point. 5. Wait for all-clear from safety team. 6. Report to your supervisor for headcount. Never re-enter building until authorized.',
      category: 'safety',
      tags: ['fire', 'emergency', 'safety'],
      views: 2143,
      helpful: 100,
      lastUpdated: '2024-03-04',
      relatedLinks: [
        { title: 'Emergency Evacuation Map', url: '/docs/evacuation-map' },
        { title: 'Fire Safety Guide', url: '/docs/fire-safety' },
      ],
    },
  ];

  // Categories for FAQ filtering
  const categories = [
    { id: 'all', name: 'All Categories', count: faqs.length },
    { id: 'inventory', name: 'Inventory', count: faqs.filter(f => f.category === 'inventory').length, icon: Package },
    { id: 'quality', name: 'Quality', count: faqs.filter(f => f.category === 'quality').length, icon: CheckCircle },
    { id: 'hr', name: 'HR', count: faqs.filter(f => f.category === 'hr').length, icon: Users },
    { id: 'safety', name: 'Safety', count: faqs.filter(f => f.category === 'safety').length, icon: AlertTriangle },
    { id: 'it', name: 'IT', count: faqs.filter(f => f.category === 'it').length, icon: Cpu },
    { id: 'operations', name: 'Operations', count: faqs.filter(f => f.category === 'operations').length, icon: Truck },
    { id: 'technology', name: 'Technology', count: faqs.filter(f => f.category === 'technology').length, icon: Cpu },
    { id: 'policy', name: 'Policy', count: faqs.filter(f => f.category === 'policy').length, icon: FileText },
    { id: 'procurement', name: 'Procurement', count: faqs.filter(f => f.category === 'procurement').length, icon: ShoppingCart },
  ];

  // Sample suggested questions
  const suggestedQuestions = [
    'How do I perform a cycle count?',
    'What should I do with damaged inventory?',
    'How do I request time off?',
    'Forklift safety procedures?',
    'How to reset my password?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: getAIResponse(inputValue),
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (query) => {
    // Simple response logic - in real app, this would call an AI API
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('cycle count') || lowerQuery.includes('inventory count')) {
      return 'Cycle counting is performed by scanning each item in a designated zone. Use the handheld scanner to scan each item\'s barcode, then verify the quantity matches the system. Report any discrepancies through the inventory adjustment form. Would you like me to show you the detailed procedure?';
    } else if (lowerQuery.includes('damaged') || lowerQuery.includes('damage')) {
      return 'If you discover damaged inventory: 1. Tag the item with a "Damaged" label immediately. 2. Move it to the designated quarantine area. 3. Report the damage through the quality system or to your supervisor. 4. Complete a damage report form. Do not attempt to sell or use damaged items.';
    } else if (lowerQuery.includes('time off') || lowerQuery.includes('vacation')) {
      return 'To request time off: 1. Log into the HR portal. 2. Navigate to "Time Off Requests". 3. Select the dates and type of leave. 4. Submit for manager approval. Requests should be submitted at least 2 weeks in advance. Emergency requests should be communicated directly to your supervisor.';
    } else if (lowerQuery.includes('forklift') || lowerQuery.includes('safety')) {
      return 'Forklift safety procedures: 1. Always wear required PPE. 2. Complete pre-operation inspection. 3. Maintain safe speed (max 5 mph). 4. Use horn at intersections. 5. Keep load within capacity limits. 6. Never lift people. Certification required before operation.';
    } else if (lowerQuery.includes('password') || lowerQuery.includes('login')) {
      return 'To reset your password: 1. Go to the login page. 2. Click "Forgot Password". 3. Enter your email address. 4. Check your email for reset link. 5. Follow instructions to create new password. If you don\'t receive the email within 5 minutes, check spam folder or contact IT support.';
    } else {
      return 'I found some information that might help. Based on your question, I recommend checking the FAQ section or typing more specific keywords. You can also ask about: cycle counting, damaged inventory, time off requests, forklift safety, or password resets.';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (id, type) => {
    setFeedbackGiven({ ...feedbackGiven, [id]: type });
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const stats = {
    totalFaqs: faqs.length,
    categories: categories.length - 1,
    helpfulPercentage: Math.round(faqs.reduce((sum, f) => sum + f.helpful, 0) / faqs.length),
    totalViews: faqs.reduce((sum, f) => sum + f.views, 0),
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">AI Assistant & FAQ</h1>
            <p className="text-black/50 mt-1">Get instant answers to your questions</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 border-[#F5EEE9]">
              <History size={16} />
              History
            </Button>
            <Button variant="outline" className="gap-2 border-[#F5EEE9]">
              <Settings size={16} />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total FAQs</p>
                  <p className="text-xl font-bold text-black mt-1">{stats.totalFaqs}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <HelpCircle size={18} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Categories</p>
                  <p className="text-xl font-bold text-blue-600 mt-1">{stats.categories}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <FolderTree size={18} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Helpful Rate</p>
                  <p className="text-xl font-bold text-green-600 mt-1">{stats.helpfulPercentage}%</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <ThumbsUp size={18} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Views</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">{stats.totalViews.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Eye size={18} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Left Sidebar - Categories */}
        <div className="w-64 flex-shrink-0">
          <Card className="border-[#F5EEE9] sticky top-20">
            <CardHeader className="pb-3">
              <CardTitle className="text-black text-base">Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 px-3">
                {categories.map((category) => {
                  const Icon = category.icon || HelpCircle;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors",
                        selectedCategory === category.id
                          ? "bg-red-600 text-white"
                          : "text-black hover:bg-[#F5EEE9]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={16} />
                        <span>{category.name}</span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "border-0",
                          selectedCategory === category.id
                            ? "bg-white/20 text-white"
                            : "bg-[#F5EEE9] text-black"
                        )}
                      >
                        {category.count}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </CardContent>

            <Separator className="my-4 bg-[#F5EEE9]" />

            <CardContent>
              <h3 className="text-sm font-medium text-black mb-3">Popular Topics</h3>
              <div className="space-y-2">
                {faqs.slice(0, 5).map((faq) => (
                  <button
                    key={faq.id}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-left hover:bg-[#F5EEE9] transition-colors"
                    onClick={() => {
                      setExpandedFaq(expandedFaq === faq.id ? null : faq.id);
                      setActiveTab('faq');
                    }}
                  >
                    <HelpCircle size={14} className="text-red-600 flex-shrink-0" />
                    <span className="line-clamp-1">{faq.question}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Area */}
        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="bg-[#F5EEE9]">
              <TabsTrigger value="chat" className="data-[state=active]:bg-white">
                <Bot size={16} className="mr-2" />
                AI Chat
              </TabsTrigger>
              <TabsTrigger value="faq" className="data-[state=active]:bg-white">
                <HelpCircle size={16} className="mr-2" />
                FAQ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="mt-4">
              <Card className="border-[#F5EEE9] h-[600px] flex flex-col">
                {/* Chat Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-3",
                          message.type === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        {message.type === 'bot' && (
                          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                            <Bot size={16} className="text-white" />
                          </div>
                        )}
                        <div
                          className={cn(
                            "max-w-[80%] rounded-lg p-3",
                            message.type === 'user'
                              ? 'bg-red-600 text-white'
                              : 'bg-[#F5EEE9] text-black'
                          )}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className={cn(
                            "text-xs mt-1",
                            message.type === 'user' ? 'text-red-100' : 'text-black/50'
                          )}>
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        {message.type === 'user' && (
                          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                            <User size={16} className="text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                          <Bot size={16} className="text-white" />
                        </div>
                        <div className="bg-[#F5EEE9] rounded-lg p-3">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-black/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-black/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-black/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Suggested Questions */}
                <div className="px-4 py-2 border-t border-[#F5EEE9]">
                  <p className="text-xs text-black/50 mb-2">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="border-[#F5EEE9] text-xs"
                        onClick={() => {
                          setInputValue(question);
                        }}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-[#F5EEE9]">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your question here..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="min-h-[60px] resize-none"
                    />
                    <Button
                      className="h-[60px] aspect-square bg-red-600 hover:bg-red-700"
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                    >
                      <Send size={20} />
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="faq" className="mt-4">
              {/* FAQ Search */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={18} />
                  <Input
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-[#F5EEE9] focus:border-red-600"
                  />
                </div>
                <Button variant="outline" size="icon" className="border-[#F5EEE9]">
                  <Filter size={16} />
                </Button>
                <Button variant="outline" size="icon" className="border-[#F5EEE9]">
                  <RefreshCw size={16} />
                </Button>
              </div>

              {/* FAQ List */}
              <div className="space-y-3">
                {filteredFaqs.length === 0 ? (
                  <Card className="border-[#F5EEE9] p-8 text-center">
                    <HelpCircle size={48} className="mx-auto text-black/20 mb-4" />
                    <p className="text-black/50">No FAQs found</p>
                  </Card>
                ) : (
                  filteredFaqs.map((faq) => (
                    <Card key={faq.id} className="border-[#F5EEE9]">
                      <CardContent className="p-0">
                        <div
                          className="p-4 cursor-pointer hover:bg-[#F5EEE9]/30 transition-colors"
                          onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className={cn(
                                  "text-xs",
                                  faq.category === 'inventory' && 'bg-blue-100 text-blue-700',
                                  faq.category === 'quality' && 'bg-purple-100 text-purple-700',
                                  faq.category === 'hr' && 'bg-green-100 text-green-700',
                                  faq.category === 'safety' && 'bg-red-100 text-red-700',
                                  faq.category === 'it' && 'bg-orange-100 text-orange-700',
                                  faq.category === 'operations' && 'bg-yellow-100 text-yellow-700',
                                  faq.category === 'technology' && 'bg-cyan-100 text-cyan-700',
                                  faq.category === 'policy' && 'bg-indigo-100 text-indigo-700',
                                  faq.category === 'procurement' && 'bg-pink-100 text-pink-700',
                                )}>
                                  {faq.category}
                                </Badge>
                                <div className="flex items-center gap-1 text-xs text-black/50">
                                  <Eye size={12} />
                                  <span>{faq.views}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-green-600">
                                  <ThumbsUp size={12} />
                                  <span>{faq.helpful}%</span>
                                </div>
                              </div>
                              <h3 className="font-medium text-black">{faq.question}</h3>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              {expandedFaq === faq.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </Button>
                          </div>

                          {expandedFaq === faq.id && (
                            <div className="mt-4 pt-4 border-t border-[#F5EEE9]">
                              <p className="text-sm text-black/70 mb-4">{faq.answer}</p>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-1 mb-4">
                                {faq.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs border-[#F5EEE9]">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>

                              {/* Related Links */}
                              {faq.relatedLinks && faq.relatedLinks.length > 0 && (
                                <div className="mb-4">
                                  <p className="text-xs text-black/50 mb-2">Related Resources:</p>
                                  <div className="space-y-2">
                                    {faq.relatedLinks.map((link, idx) => (
                                      <a
                                        key={idx}
                                        href={link.url}
                                        className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                                      >
                                        <FileText size={14} />
                                        {link.title}
                                        <ExternalLink size={12} className="ml-auto" />
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Actions */}
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 gap-1"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopy(faq.answer, faq.id);
                                  }}
                                >
                                  {copiedId === faq.id ? (
                                    <>
                                      <Check size={14} className="text-green-600" />
                                      <span className="text-xs">Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy size={14} />
                                      <span className="text-xs">Copy</span>
                                    </>
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={cn(
                                    "h-8 gap-1",
                                    feedbackGiven[faq.id] === 'helpful' && 'text-green-600'
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleFeedback(faq.id, 'helpful');
                                  }}
                                >
                                  <ThumbsUp size={14} />
                                  <span className="text-xs">Helpful</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={cn(
                                    "h-8 gap-1",
                                    feedbackGiven[faq.id] === 'not-helpful' && 'text-red-600'
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleFeedback(faq.id, 'not-helpful');
                                  }}
                                >
                                  <ThumbsDown size={14} />
                                  <span className="text-xs">Not Helpful</span>
                                </Button>
                                <span className="text-xs text-black/50 ml-auto">
                                  Updated: {faq.lastUpdated}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-red-600 hover:bg-red-700 shadow-lg"
                onClick={() => setActiveTab('chat')}
              >
                <Bot size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">AI Chat</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-black hover:bg-black/80 shadow-lg"
                onClick={() => setActiveTab('faq')}
              >
                <HelpCircle size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">FAQ</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="h-12 w-12 rounded-full bg-[#F5EEE9] hover:bg-[#F5EEE9]/80 shadow-lg"
                onClick={() => setSearchQuery('')}
              >
                <Search size={20} className="text-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Search</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default AIBotPage;