// app/dashboard/barcode-generator/page.js
'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Barcode,
  QrCode,
  Scan,
  Download,
  Printer,
  Copy,
  RefreshCw,
  Plus,
  Trash2,
  Edit,
  Save,
  Settings,
  Grid,
  List,
  Search,
  Filter,
  Eye,
  Share2,
  Upload,
  FileText,
  FileSpreadsheet,
  Mail,
  Check,
  X,
  AlertCircle,
  Info,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Minus,
  Plus as PlusIcon,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Type,
  Palette,
  Maximize,
  Minimize,
  Layers,
  Tag,
  Package,
  Box,
  ShoppingCart,
  Truck,
  Warehouse,
  Store,
  Users,
  Calendar,
  Clock,
  DollarSign,
  Percent,
  MapPin,
  Phone,
  Mail as MailIcon,
  Globe,
  Link,
  Settings as SettingsIcon,
  DownloadCloud,
  Printer as PrinterIcon,
  Copy as CopyIcon,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Mock QR/Barcode generation library (in real app, use jsbarcode, qrcode.react, etc.)
const generateBarcode = (value, format = 'CODE128', width = 2, height = 100) => {
  // Mock barcode generation - returns a data URL
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${value.length * width * 2 + 40} ${height + 20}'%3E%3Crect width='100%25' height='100%25' fill='white'/%3E%3Ctext x='50%25' y='${height + 15}' text-anchor='middle' font-family='monospace' font-size='12' fill='black'%3E${value}%3C/text%3E%3C/svg%3E`;
};

const generateQRCode = (value, size = 200) => {
  // Mock QR code generation
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${size} ${size}'%3E%3Crect width='100%25' height='100%25' fill='white'/%3E%3Crect x='20' y='20' width='${size - 40}' height='${size - 40}' fill='black' fill-opacity='0.1'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='monospace' font-size='14' fill='black'%3E${value.substring(0, 20)}%3C/text%3E%3C/svg%3E`;
};

const BarcodeGeneratorPage = () => {
  const [activeTab, setActiveTab] = useState('barcode');
  const [inputValue, setInputValue] = useState('');
  const [generatedCodes, setGeneratedCodes] = useState([]);
  const [selectedCodes, setSelectedCodes] = useState([]);
  const [barcodeFormat, setBarcodeFormat] = useState('CODE128');
  const [qrSize, setQrSize] = useState(200);
  const [barcodeWidth, setBarcodeWidth] = useState(2);
  const [barcodeHeight, setBarcodeHeight] = useState(100);
  const [showText, setShowText] = useState(true);
  const [textPosition, setTextPosition] = useState('bottom');
  const [fontSize, setFontSize] = useState(12);
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [showBorder, setShowBorder] = useState(false);
  const [borderRadius, setBorderRadius] = useState(0);
  const [margin, setMargin] = useState(10);
  const [batchSize, setBatchSize] = useState(1);
  const [batchCount, setBatchCount] = useState(1);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [showBatchDialog, setShowBatchDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [previewCode, setPreviewCode] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [printSize, setPrintSize] = useState('label');
  const [printQuantity, setPrintQuantity] = useState(1);
  const [generateStatus, setGenerateStatus] = useState('idle');

  // Sample saved codes (in real app, fetch from API)
  const savedCodes = [
    { id: 'BC-001', value: 'SKU-001-ELECTRONICS', type: 'barcode', format: 'CODE128', createdAt: '2024-12-20', used: 45 },
    { id: 'BC-002', value: 'PROD-1001-HIGHVALUE', type: 'barcode', format: 'CODE128', createdAt: '2024-12-19', used: 32 },
    { id: 'QR-001', value: 'https://accucount.com/track/INV-001', type: 'qrcode', format: 'QR', createdAt: '2024-12-18', used: 128 },
    { id: 'QR-002', value: 'https://accucount.com/stocktake/ST-2024-001', type: 'qrcode', format: 'QR', createdAt: '2024-12-17', used: 56 },
    { id: 'BC-003', value: 'BATCH-005-EXP-202412', type: 'barcode', format: 'CODE128', createdAt: '2024-12-16', used: 23 },
    { id: 'QR-003', value: 'https://accucount.com/location/LOC-001', type: 'qrcode', format: 'QR', createdAt: '2024-12-15', used: 89 },
  ];

  // Barcode formats
  const barcodeFormats = [
    { id: 'CODE128', name: 'Code 128', description: 'High-density alphanumeric' },
    { id: 'CODE39', name: 'Code 39', description: 'Alphanumeric, variable length' },
    { id: 'EAN13', name: 'EAN-13', description: '13-digit product code' },
    { id: 'EAN8', name: 'EAN-8', description: '8-digit product code' },
    { id: 'UPC', name: 'UPC-A', description: '12-digit product code' },
    { id: 'ITF', name: 'ITF-14', description: '14-digit carton code' },
    { id: 'CODABAR', name: 'Codabar', description: 'Libraries, blood banks' },
    { id: 'PDF417', name: 'PDF417', description: '2D stacked barcode' },
  ];

  const handleGenerate = () => {
    if (!inputValue.trim()) {
      return;
    }

    setGenerateStatus('generating');
    
    setTimeout(() => {
      let newCodes = [];
      
      if (activeTab === 'barcode') {
        for (let i = 0; i < batchCount; i++) {
          const value = batchCount > 1 ? `${inputValue}-${String(i + 1).padStart(3, '0')}` : inputValue;
          newCodes.push({
            id: `${Date.now()}-${i}`,
            value: value,
            type: 'barcode',
            format: barcodeFormat,
            image: generateBarcode(value, barcodeFormat, barcodeWidth, barcodeHeight),
            createdAt: new Date().toISOString(),
          });
        }
      } else {
        for (let i = 0; i < batchCount; i++) {
          const value = batchCount > 1 ? `${inputValue}-${String(i + 1).padStart(3, '0')}` : inputValue;
          newCodes.push({
            id: `${Date.now()}-${i}`,
            value: value,
            type: 'qrcode',
            format: 'QR',
            image: generateQRCode(value, qrSize),
            createdAt: new Date().toISOString(),
          });
        }
      }
      
      setGeneratedCodes([...newCodes, ...generatedCodes]);
      setGenerateStatus('completed');
      setTimeout(() => setGenerateStatus('idle'), 2000);
    }, 500);
  };

  const handleDownload = (code) => {
    // In real app, trigger download
    const link = document.createElement('a');
    link.download = `${code.value}.png`;
    link.href = code.image;
    link.click();
  };

  const handleDownloadAll = () => {
    // In real app, download as ZIP
    console.log('Download all codes');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = async (value) => {
    await navigator.clipboard.writeText(value);
    // Show success toast
  };

  const handleDelete = (id) => {
    setGeneratedCodes(generatedCodes.filter(code => code.id !== id));
    setSelectedCodes(selectedCodes.filter(codeId => codeId !== id));
  };

  const handleClearAll = () => {
    setGeneratedCodes([]);
    setSelectedCodes([]);
  };

  const handleSelectAll = () => {
    if (selectedCodes.length === generatedCodes.length) {
      setSelectedCodes([]);
    } else {
      setSelectedCodes(generatedCodes.map(code => code.id));
    }
  };

  const handleSelectCode = (id) => {
    if (selectedCodes.includes(id)) {
      setSelectedCodes(selectedCodes.filter(codeId => codeId !== id));
    } else {
      setSelectedCodes([...selectedCodes, id]);
    }
  };

  const handlePreview = (code) => {
    setPreviewCode(code);
    setShowPreviewDialog(true);
  };

  const filteredCodes = generatedCodes.filter(code => {
    const matchesSearch = code.value.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat = selectedFormat === 'all' || code.type === selectedFormat;
    return matchesSearch && matchesFormat;
  });

  const stats = {
    totalGenerated: generatedCodes.length,
    barcodes: generatedCodes.filter(c => c.type === 'barcode').length,
    qrcodes: generatedCodes.filter(c => c.type === 'qrcode').length,
    uniqueValues: new Set(generatedCodes.map(c => c.value)).size,
  };

  // Batch generation options
  const batchOptions = [
    { value: 1, label: 'Single' },
    { value: 5, label: '5 Codes' },
    { value: 10, label: '10 Codes' },
    { value: 25, label: '25 Codes' },
    { value: 50, label: '50 Codes' },
    { value: 100, label: '100 Codes' },
  ];

  return (
    <div className="min-h-screen bg-white rounded-md">
      {/* Header */}
      <div className="border-b border-[#F5EEE9] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Barcode & QR Code Generator</h1>
            <p className="text-black/50 text-sm mt-1">
              Create, customize, and print barcodes and QR codes for inventory items
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-[#F5EEE9] gap-2"
              onClick={() => setShowImportDialog(true)}
            >
              <Upload size={16} />
              Import List
            </Button>
            <Button
              variant="outline"
              className="border-[#F5EEE9] gap-2"
              onClick={() => setShowSettingsDialog(true)}
            >
              <Settings size={16} />
              Settings
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white gap-2"
              onClick={handlePrint}
            >
              <Printer size={16} />
              Print Labels
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Total Generated</p>
                  <p className="text-xl font-bold text-black">{stats.totalGenerated}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-full">
                  <QrCode size={16} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Barcodes</p>
                  <p className="text-xl font-bold text-blue-600">{stats.barcodes}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Barcode size={16} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">QR Codes</p>
                  <p className="text-xl font-bold text-green-600">{stats.qrcodes}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-full">
                  <QrCode size={16} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#F5EEE9]">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/50">Unique Values</p>
                  <p className="text-xl font-bold text-purple-600">{stats.uniqueValues}</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full">
                  <Tag size={16} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-6">
        {/* Generator Section */}
        <Card className="border-[#F5EEE9] mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Code Generator</CardTitle>
                <CardDescription>Enter data to generate barcodes or QR codes</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowBatchDialog(true)}
                      >
                        <Layers size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Batch Generation</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowSettingsDialog(true)}
                      >
                        <Settings size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Advanced Settings</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-[300px] grid-cols-2 mb-4 bg-[#F5EEE9]">
                <TabsTrigger value="barcode" className="data-[state=active]:bg-white">
                  <Barcode size={14} className="mr-2" />
                  Barcode
                </TabsTrigger>
                <TabsTrigger value="qrcode" className="data-[state=active]:bg-white">
                  <QrCode size={14} className="mr-2" />
                  QR Code
                </TabsTrigger>
              </TabsList>

              <TabsContent value="barcode" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Data to Encode</Label>
                    <Textarea
                      placeholder="Enter product SKU, serial number, or any data..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      rows={3}
                    />
                    <p className="text-xs text-black/50">
                      Examples: SKU-001, BATCH-2024-001, PROD-12345
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Barcode Format</Label>
                    <Select value={barcodeFormat} onValueChange={setBarcodeFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {barcodeFormats.map(format => (
                          <SelectItem key={format.id} value={format.id}>
                            {format.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-black/50">
                      {barcodeFormats.find(f => f.id === barcodeFormat)?.description}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="qrcode" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Data to Encode</Label>
                    <Textarea
                      placeholder="Enter URL, text, product ID, or any data..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      rows={3}
                    />
                    <p className="text-xs text-black/50">
                      Examples: https://accucount.com/product/123, INV-001, Stocktake ID
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>QR Code Size (px)</Label>
                    <div className="flex items-center gap-3">
                      <Slider
                        value={[qrSize]}
                        onValueChange={(val) => setQrSize(val[0])}
                        min={100}
                        max={400}
                        step={10}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-12">{qrSize}px</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="qrShowText"
                          checked={showText}
                          onCheckedChange={setShowText}
                        />
                        <Label htmlFor="qrShowText" className="text-xs">Show text below</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#F5EEE9]">
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Batch Count:</Label>
                  <Select value={batchCount.toString()} onValueChange={(v) => setBatchCount(parseInt(v))}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {batchOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value.toString()}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1" />
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white gap-2"
                  onClick={handleGenerate}
                  disabled={!inputValue.trim() || generateStatus === 'generating'}
                >
                  {generateStatus === 'generating' ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Generate {batchCount > 1 ? `${batchCount} Codes` : 'Code'}
                    </>
                  )}
                </Button>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Generated Codes Section */}
        {generatedCodes.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-black">Generated Codes</h2>
                <p className="text-sm text-black/50">Recently generated barcodes and QR codes</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-[#F5EEE9] rounded-lg p-0.5">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={cn("h-8 px-3", viewMode === 'grid' && "bg-red-600 text-white hover:bg-red-700")}
                  >
                    <Grid size={14} className="mr-1" />
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={cn("h-8 px-3", viewMode === 'list' && "bg-red-600 text-white hover:bg-red-700")}
                  >
                    <List size={14} className="mr-1" />
                    List
                  </Button>
                </div>
                <Button variant="outline" size="sm" onClick={handleSelectAll}>
                  {selectedCodes.length === generatedCodes.length ? 'Deselect All' : 'Select All'}
                </Button>
                <Button variant="outline" size="sm" onClick={handleClearAll}>
                  <Trash2 size={14} className="mr-1" />
                  Clear All
                </Button>
                {selectedCodes.length > 0 && (
                  <Button variant="outline" size="sm" className="bg-green-50">
                    <DownloadCloud size={14} className="mr-1" />
                    Download ({selectedCodes.length})
                  </Button>
                )}
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" size={14} />
                <Input
                  placeholder="Search by code value..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 border-[#F5EEE9]"
                />
              </div>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger className="w-[130px] border-[#F5EEE9]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="barcode">Barcodes</SelectItem>
                  <SelectItem value="qrcode">QR Codes</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="border-[#F5EEE9]">
                <RefreshCw size={14} />
              </Button>
            </div>

            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-4 gap-4">
                {filteredCodes.map((code) => (
                  <Card
                    key={code.id}
                    className={cn(
                      "border-[#F5EEE9] cursor-pointer transition-all hover:shadow-md",
                      selectedCodes.includes(code.id) && "ring-2 ring-red-600"
                    )}
                    onClick={() => handleSelectCode(code.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className={code.type === 'barcode' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}>
                          {code.type === 'barcode' ? <Barcode size={10} className="mr-1" /> : <QrCode size={10} className="mr-1" />}
                          {code.type === 'barcode' ? 'Barcode' : 'QR Code'}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreVertical size={14} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handlePreview(code)}>
                              <Eye size={14} className="mr-2" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownload(code)}>
                              <Download size={14} className="mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCopy(code.value)}>
                              <Copy size={14} className="mr-2" />
                              Copy Value
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(code.id)}>
                              <Trash2 size={14} className="mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex justify-center items-center p-4 bg-[#F5EEE9]/30 rounded-lg mb-3">
                        <img
                          src={code.image}
                          alt={code.value}
                          className={code.type === 'barcode' ? 'max-w-full h-auto' : 'w-32 h-32 object-contain'}
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-mono text-black/70 truncate">{code.value}</p>
                        <p className="text-xs text-black/40 mt-1">
                          {new Date(code.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <Card className="border-[#F5EEE9]">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#F5EEE9]/30 border-b border-[#F5EEE9]">
                        <tr>
                          <th className="w-8 py-3 px-4">
                            <Checkbox checked={selectedCodes.length === filteredCodes.length} onCheckedChange={handleSelectAll} />
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-black/50">Preview</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-black/50">Value</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-black/50">Type</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-black/50">Format</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-black/50">Created</th>
                          <th className="text-right py-3 px-4 text-xs font-medium text-black/50">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCodes.map((code) => (
                          <tr key={code.id} className="border-b border-[#F5EEE9] hover:bg-[#F5EEE9]/30">
                            <td className="py-3 px-4">
                              <Checkbox
                                checked={selectedCodes.includes(code.id)}
                                onCheckedChange={() => handleSelectCode(code.id)}
                              />
                            </td>
                            <td className="py-3 px-4">
                              <div className="w-12 h-12 bg-[#F5EEE9]/30 rounded flex items-center justify-center">
                                <img
                                  src={code.image}
                                  alt={code.value}
                                  className={code.type === 'barcode' ? 'max-h-8' : 'w-8 h-8'}
                                />
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <p className="text-sm font-mono max-w-[200px] truncate">{code.value}</p>
                            </td>
                            <td className="py-3 px-4">
                              <Badge variant="outline" className={code.type === 'barcode' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}>
                                {code.type === 'barcode' ? 'Barcode' : 'QR Code'}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-sm">{code.format}</td>
                            <td className="py-3 px-4 text-sm text-black/50">
                              {new Date(code.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handlePreview(code)}>
                                        <Eye size={14} />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Preview</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDownload(code)}>
                                        <Download size={14} />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Download</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(code.value)}>
                                        <Copy size={14} />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Copy</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-red-600" onClick={() => handleDelete(code.id)}>
                                  <Trash2 size={14} />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {filteredCodes.length === 0 && (
              <Card className="border-[#F5EEE9]">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <QrCode size={48} className="text-black/20 mb-3" />
                  <p className="text-black/50">No codes found</p>
                  <p className="text-xs text-black/40 mt-1">Try adjusting your search</p>
                </CardContent>
              </Card>
            )}

            {/* Bulk Actions Bar */}
            {selectedCodes.length > 0 && (
              <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white rounded-lg shadow-lg px-4 py-2 flex items-center gap-3 z-50">
                <span className="text-sm">{selectedCodes.length} items selected</span>
                <Separator orientation="vertical" className="h-4 bg-white/30" />
                <Button variant="ghost" size="sm" className="text-white hover:text-white/80 hover:bg-white/20" onClick={handleDownloadAll}>
                  <Download size={14} className="mr-1" />
                  Download All
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:text-white/80 hover:bg-white/20" onClick={handlePrint}>
                  <Printer size={14} className="mr-1" />
                  Print
                </Button>
                <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-white/20" onClick={() => {
                  selectedCodes.forEach(id => handleDelete(id));
                }}>
                  <Trash2 size={14} className="mr-1" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Saved Codes Section */}
        {savedCodes.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-black mb-4">Saved Codes</h2>
            <div className="grid grid-cols-5 gap-3">
              {savedCodes.slice(0, 5).map((code) => (
                <Card key={code.id} className="border-[#F5EEE9] hover:shadow-md cursor-pointer">
                  <CardContent className="p-3">
                    <div className="flex justify-center items-center p-2 bg-[#F5EEE9]/30 rounded mb-2">
                      <img
                        src={code.type === 'barcode' ? generateBarcode(code.value) : generateQRCode(code.value)}
                        alt={code.value}
                        className={code.type === 'barcode' ? 'max-h-10' : 'w-12 h-12'}
                      />
                    </div>
                    <p className="text-xs font-mono text-center truncate">{code.value}</p>
                    <p className="text-xs text-center text-black/40 mt-1">Used {code.used} times</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="sm:max-w-[500px]">
          {previewCode && (
            <>
              <DialogHeader>
                <DialogTitle>Code Preview</DialogTitle>
                <DialogDescription>
                  {previewCode.type === 'barcode' ? 'Barcode' : 'QR Code'} for {previewCode.value}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center justify-center py-6">
                <div className="p-8 bg-white border border-[#F5EEE9] rounded-lg shadow-lg">
                  <img
                    src={previewCode.image}
                    alt={previewCode.value}
                    className={previewCode.type === 'barcode' ? 'max-w-full h-auto' : 'w-64 h-64'}
                  />
                </div>
                <p className="text-sm font-mono mt-4 bg-[#F5EEE9] px-3 py-1 rounded">{previewCode.value}</p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowPreviewDialog(false)}>
                  Close
                </Button>
                <Button className="bg-red-600 hover:bg-red-700" onClick={() => {
                  handleDownload(previewCode);
                  setShowPreviewDialog(false);
                }}>
                  <Download size={14} className="mr-2" />
                  Download
                </Button>
                <Button variant="outline" onClick={() => handlePrint()}>
                  <Printer size={14} className="mr-2" />
                  Print
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Batch Generation Dialog */}
      <Dialog open={showBatchDialog} onOpenChange={setShowBatchDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Batch Code Generation</DialogTitle>
            <DialogDescription>
              Generate multiple codes with sequential numbering
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Base Value</Label>
              <Input placeholder="e.g., SKU-2024-" />
              <p className="text-xs text-black/50">Codes will be generated as: Base-001, Base-002, etc.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Number</Label>
                <Input type="number" defaultValue="1" />
              </div>
              <div className="space-y-2">
                <Label>End Number</Label>
                <Input type="number" defaultValue="50" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Padding</Label>
              <Select defaultValue="3">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 (1,2,3...)</SelectItem>
                  <SelectItem value="2">2 (01,02,03...)</SelectItem>
                  <SelectItem value="3">3 (001,002,003...)</SelectItem>
                  <SelectItem value="4">4 (0001,0002...)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">Preview: SKU-2024-001, SKU-2024-002, ... SKU-2024-050</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBatchDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Generate {50} Codes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Generator Settings</DialogTitle>
            <DialogDescription>
              Customize barcode and QR code appearance
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Foreground Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    className="w-10 h-10 rounded border border-[#F5EEE9] cursor-pointer"
                  />
                  <Input value={foregroundColor} onChange={(e) => setForegroundColor(e.target.value)} className="flex-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Background Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-10 h-10 rounded border border-[#F5EEE9] cursor-pointer"
                  />
                  <Input value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="flex-1" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Show Text Below Code</Label>
              <Switch checked={showText} onCheckedChange={setShowText} />
            </div>
            {showText && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Text Position</Label>
                  <Select value={textPosition} onValueChange={setTextPosition}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Font Size (px)</Label>
                  <Slider
                    value={[fontSize]}
                    onValueChange={(val) => setFontSize(val[0])}
                    min={8}
                    max={24}
                    step={1}
                  />
                  <span className="text-xs">{fontSize}px</span>
                </div>
              </div>
            )}
            <Separator />
            <div className="space-y-2">
              <Label>Border</Label>
              <Switch checked={showBorder} onCheckedChange={setShowBorder} />
            </div>
            {showBorder && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Border Radius (px)</Label>
                  <Slider
                    value={[borderRadius]}
                    onValueChange={(val) => setBorderRadius(val[0])}
                    min={0}
                    max={20}
                    step={1}
                  />
                  <span className="text-xs">{borderRadius}px</span>
                </div>
                <div className="space-y-2">
                  <Label>Margin (px)</Label>
                  <Slider
                    value={[margin]}
                    onValueChange={(val) => setMargin(val[0])}
                    min={0}
                    max={50}
                    step={5}
                  />
                  <span className="text-xs">{margin}px</span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettingsDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Apply Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Import Data List</DialogTitle>
            <DialogDescription>
              Import a list of values to generate codes in bulk
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed border-[#F5EEE9] rounded-lg p-8 text-center">
              <Upload size={32} className="mx-auto text-black/30 mb-2" />
              <p className="text-sm text-black/70">Drag and drop or click to upload</p>
              <p className="text-xs text-black/40 mt-1">Supported: CSV, Excel, TXT</p>
              <Button variant="outline" size="sm" className="mt-3">
                Browse Files
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Or paste values (one per line)</Label>
              <Textarea placeholder="SKU-001&#10;SKU-002&#10;SKU-003" rows={5} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImportDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Import & Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Additional icon component
const MoreVertical = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

export default BarcodeGeneratorPage;