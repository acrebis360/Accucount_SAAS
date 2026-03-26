// app/dashboard/pricing/page.js
'use client';

import { useState } from 'react';
import {
  DollarSign,
  Crown,
  Zap,
  Rocket,
  Sparkles,
  Check,
  X,
  Info,
  HelpCircle,
  ArrowRight,
  CreditCard,
  Calendar,
  Clock,
  Users,
  Database,
  Package,
  ClipboardList,
  BarChart3,
  Shield,
  Headphones,
  Globe,
  Cloud,
  Wifi,
  Smartphone,
  Laptop,
  Mail,
  Bell,
  FileText,
  TrendingUp,
  Award,
  Star,
  StarOff,
  Heart,
  Gift,
  Percent,
  Tag,
  ShoppingCart,
  CreditCard as CreditCardIcon,
  Wallet,
  Banknote,
  Coins,
  Gem,
  Diamond,
  Medal,
  Trophy,
  Target,
  Rocket as RocketIcon,
  Zap as ZapIcon,
  Sparkles as SparklesIcon,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Settings,
  RefreshCw,
  Download,
  Upload,
  Printer,
  Share2,
  Copy,
  ExternalLink,
  MessageSquare,
  Phone,
  Video,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Users as UsersIcon,
  Building2,
  MapPin,
  Link2,
  Globe2,
  CloudSun,
  CloudMoon,
  Sun,
  Moon,
  Laptop2,
  Tablet,
  Watch,
  Smartphone as SmartphoneIcon,
  Cpu,
  HardDrive,
  Server,
  Network,
  Wifi as WifiIcon,
  Bluetooth,
  Radio,
  Scan,
  QrCode,
  Barcode,
  Fingerprint,
  Key,
  Lock,
  Unlock,
  Shield as ShieldIcon,
  ShieldCheck,
  ShieldAlert,
  ShieldOff,
  BadgeCheck,
  BadgeAlert,
  BadgeHelp,
  BadgeInfo,
  BadgeWarning,
  BadgeX,
  BadgeCheck as BadgeCheckIcon,
  Send,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';


const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showSubscribeDialog, setShowSubscribeDialog] = useState(false);
  const [showEnterpriseDialog, setShowEnterpriseDialog] = useState(false);
  const [showCompareDialog, setShowCompareDialog] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState(null);

  // Pricing Plans Data
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      icon: Rocket,
      description: 'Perfect for small businesses getting started with inventory management',
      monthlyPrice: 49,
      yearlyPrice: 490,
      popular: false,
      features: [
        { name: 'Up to 1,000 SKUs', included: true },
        { name: 'Basic Inventory Tracking', included: true },
        { name: 'Monthly Stocktakes', included: true },
        { name: 'Basic Reports', included: true },
        { name: 'Email Support', included: true },
        { name: 'API Access', included: false },
        { name: 'ERP Integration', included: false },
        { name: 'IoT Device Support', included: false },
        { name: 'Custom Reports', included: false },
        { name: '24/7 Priority Support', included: false },
        { name: 'Advanced Analytics', included: false },
        { name: 'Multiple Locations', included: false },
      ],
      limitations: [
        '1 user included',
        '1 location',
        'Basic support (48h response)',
      ],
      buttonText: 'Get Started',
      buttonVariant: 'outline',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      id: 'professional',
      name: 'Professional',
      icon: Zap,
      description: 'Ideal for growing businesses with advanced inventory needs',
      monthlyPrice: 99,
      yearlyPrice: 990,
      popular: true,
      features: [
        { name: 'Up to 10,000 SKUs', included: true },
        { name: 'Advanced Inventory Tracking', included: true },
        { name: 'Weekly Stocktakes', included: true },
        { name: 'Advanced Reports & Analytics', included: true },
        { name: 'Priority Email & Chat Support', included: true },
        { name: 'API Access', included: true },
        { name: 'ERP Integration', included: true },
        { name: 'Basic IoT Device Support', included: true },
        { name: 'Custom Reports', included: true },
        { name: '24/7 Priority Support', included: false },
        { name: 'Advanced Analytics', included: false },
        { name: 'Multiple Locations', included: true },
      ],
      limitations: [
        '5 users included',
        '3 locations',
        'Priority support (4h response)',
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'default',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    },
    {
      id: 'business',
      name: 'Business',
      icon: Crown,
      description: 'For enterprises requiring comprehensive inventory management',
      monthlyPrice: 199,
      yearlyPrice: 1990,
      popular: false,
      features: [
        { name: 'Unlimited SKUs', included: true },
        { name: 'Enterprise Inventory Tracking', included: true },
        { name: 'Daily Stocktakes', included: true },
        { name: 'Custom Reports & Dashboards', included: true },
        { name: '24/7 Priority Support', included: true },
        { name: 'Full API Access', included: true },
        { name: 'Advanced ERP Integration', included: true },
        { name: 'Full IoT Device Support', included: true },
        { name: 'Custom Report Builder', included: true },
        { name: '24/7 Priority Support', included: true },
        { name: 'Advanced Analytics & AI Insights', included: true },
        { name: 'Unlimited Locations', included: true },
      ],
      limitations: [
        '20 users included',
        'Unlimited locations',
        '24/7 priority support (1h response)',
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'outline',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: Diamond,
      description: 'Custom solutions for large organizations with specific needs',
      monthlyPrice: null,
      yearlyPrice: null,
      popular: false,
      features: [
        { name: 'Unlimited SKUs', included: true },
        { name: 'Custom Development', included: true },
        { name: 'Dedicated Account Manager', included: true },
        { name: 'SLA Guarantee', included: true },
        { name: 'On-premise Deployment', included: true },
        { name: 'Custom Integrations', included: true },
        { name: 'White-label Solution', included: true },
        { name: 'Advanced Security & Compliance', included: true },
        { name: 'Custom Training', included: true },
        { name: '24/7 Dedicated Support', included: true },
        { name: 'Custom Analytics & AI', included: true },
        { name: 'Global Infrastructure', included: true },
      ],
      limitations: [
        'Unlimited users',
        'Unlimited locations',
        'Custom SLA',
      ],
      buttonText: 'Contact Us',
      buttonVariant: 'outline',
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
  ];

  // Add-ons and features
  const addOns = [
    { name: 'Additional Users', price: '$10/user/month', description: 'Add more team members beyond plan limits' },
    { name: 'Additional Locations', price: '$50/location/month', description: 'Add more warehouse/store locations' },
    { name: 'API Calls Pack', price: '$100/100k calls', description: 'Additional API call quota' },
    { name: 'Data Export', price: '$50/month', description: 'Automated data exports to S3/Blob storage' },
    { name: 'Priority Support SLA', price: '$200/month', description: 'Guaranteed 1-hour response time' },
    { name: 'Custom Training', price: '$500/session', description: 'On-site or virtual training sessions' },
  ];

  // Feature comparison table data
  const featureComparison = [
    { feature: 'SKU Limit', starter: '1,000', professional: '10,000', business: 'Unlimited', enterprise: 'Unlimited' },
    { feature: 'User Limit', starter: '1', professional: '5', business: '20', enterprise: 'Unlimited' },
    { feature: 'Location Limit', starter: '1', professional: '3', business: 'Unlimited', enterprise: 'Unlimited' },
    { feature: 'Stocktake Frequency', starter: 'Monthly', professional: 'Weekly', business: 'Daily', enterprise: 'Custom' },
    { feature: 'API Access', starter: false, professional: true, business: true, enterprise: true },
    { feature: 'ERP Integration', starter: false, professional: true, business: true, enterprise: true },
    { feature: 'IoT Device Support', starter: false, professional: 'Basic', business: 'Advanced', enterprise: 'Full' },
    { feature: 'Custom Reports', starter: false, professional: true, business: true, enterprise: true },
    { feature: 'Advanced Analytics', starter: false, professional: false, business: true, enterprise: true },
    { feature: 'AI Insights', starter: false, professional: false, business: true, enterprise: true },
    { feature: 'Priority Support', starter: false, professional: 'Email/Chat', business: '24/7', enterprise: 'Dedicated' },
    { feature: 'SLA Guarantee', starter: false, professional: false, business: false, enterprise: true },
    { feature: 'Custom Development', starter: false, professional: false, business: false, enterprise: true },
    { feature: 'White-label Solution', starter: false, professional: false, business: false, enterprise: true },
    { feature: 'On-premise Deployment', starter: false, professional: false, business: false, enterprise: true },
  ];

  // FAQ Data
  const faqs = [
    {
      question: 'Can I switch plans later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated for the current billing period.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, all paid plans come with a 14-day free trial. No credit card required to start your trial.'
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'You can cancel anytime from your account settings. No cancellation fees. Your data will be available for 30 days after cancellation.'
    },
    {
      question: 'Do you offer discounts for non-profits?',
      answer: 'Yes, we offer a 25% discount for registered non-profit organizations. Contact our sales team for verification.'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We offer email, chat, and phone support depending on your plan. Enterprise plans include a dedicated account manager.'
    },
  ];

  const formatPrice = (price) => {
    if (price === null) return 'Custom';
    return `$${price.toLocaleString()}`;
  };

  const getAnnualSavings = (monthlyPrice, yearlyPrice) => {
    if (!monthlyPrice || !yearlyPrice) return null;
    const monthlyTotal = monthlyPrice * 12;
    const savings = monthlyTotal - yearlyPrice;
    const savingsPercent = Math.round((savings / monthlyTotal) * 100);
    return { amount: savings, percent: savingsPercent };
  };

  return (
    <div className="min-h-screen bg-white rounded-md">
      {/* Header */}
      <div className="border-b border-[#F5EEE9] bg-gradient-to-r from-red-50 to-transparent px-6 py-12 text-center">
        <h1 className="text-4xl font-bold text-black mb-3">Simple, Transparent Pricing</h1>
        <p className="text-lg text-black/60 max-w-2xl mx-auto">
          Choose the perfect plan for your business. All plans include a 14-day free trial.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className={cn(
            "text-sm font-medium transition-colors",
            billingCycle === 'monthly' ? "text-black" : "text-black/50"
          )}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className={cn(
              "relative w-14 h-7 rounded-full transition-all duration-300",
              billingCycle === 'yearly' ? "bg-red-600" : "bg-gray-300"
            )}
          >
            <div className={cn(
              "absolute top-1 w-5 h-5 rounded-full bg-white transition-all duration-300",
              billingCycle === 'yearly' ? "left-8" : "left-1"
            )} />
          </button>
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-sm font-medium transition-colors",
              billingCycle === 'yearly' ? "text-black" : "text-black/50"
            )}>
              Yearly
            </span>
            <Badge className="bg-green-100 text-green-700">Save 20%</Badge>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="px-6 py-12">
        <div className="grid grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isPopular = plan.popular;
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
            const savings = getAnnualSavings(plan.monthlyPrice, plan.yearlyPrice);
            const isHovered = hoveredPlan === plan.id;

            return (
              <Card
                key={plan.id}
                className={cn(
                  "relative border-2 transition-all duration-300 hover:shadow-xl",
                  isPopular ? "border-red-600 shadow-lg" : "border-[#F5EEE9]",
                  plan.borderColor,
                  isHovered && "transform -translate-y-1"
                )}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-red-600 text-white px-3 py-1 text-sm">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <div className={cn(
                    "w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4",
                    plan.bgColor
                  )}>
                    <Icon size={32} className={cn(
                      "text-red-600",
                      isHovered && "animate-pulse"
                    )} />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-sm mt-2">{plan.description}</CardDescription>
                  <div className="mt-4">
                    {price ? (
                      <>
                        <span className="text-4xl font-bold">{formatPrice(price)}</span>
                        <span className="text-black/50">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                        {billingCycle === 'yearly' && savings && (
                          <div className="text-sm text-green-600 mt-1">
                            Save ${savings.amount} (20%)
                          </div>
                        )}
                      </>
                    ) : (
                      <span className="text-3xl font-bold">Custom</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    className={cn(
                      "w-full",
                      plan.buttonVariant === 'default' 
                        ? "bg-red-600 hover:bg-red-700 text-white" 
                        : "border-red-600 text-red-600 hover:bg-red-50"
                    )}
                    variant={plan.buttonVariant === 'default' ? 'default' : 'outline'}
                    onClick={() => {
                      if (plan.id === 'enterprise') {
                        setShowEnterpriseDialog(true);
                      } else {
                        setSelectedPlan(plan);
                        setShowSubscribeDialog(true);
                      }
                    }}
                  >
                    {plan.buttonText}
                    <ArrowRight size={14} className="ml-2" />
                  </Button>

                  <Separator />

                  <div className="space-y-3">
                    {plan.features.slice(0, 6).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        {feature.included ? (
                          <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? "text-black/70" : "text-black/40"}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                    {plan.features.length > 6 && (
                      <button
                        onClick={() => setShowCompareDialog(true)}
                        className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1 mt-2"
                      >
                        View all features
                        <ChevronRight size={12} />
                      </button>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-1">
                    <p className="text-xs font-medium text-black/50">What's included:</p>
                    {plan.limitations.map((limitation, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-black/60">
                        <Check size={12} className="text-green-600" />
                        <span>{limitation}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Add-ons Section */}
      <div className="bg-[#F5EEE9]/50 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-black">Optional Add-ons</h2>
            <p className="text-black/60 mt-2">Enhance your plan with additional features and capacity</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {addOns.map((addon, idx) => (
              <Card key={idx} className="border-[#F5EEE9] hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-black">{addon.name}</h3>
                    <Badge variant="outline" className="text-red-600 border-red-200">
                      {addon.price}
                    </Badge>
                  </div>
                  <p className="text-sm text-black/60">{addon.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Comparison Table */}
      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-black">Compare All Features</h2>
            <p className="text-black/60 mt-2">Detailed breakdown of what each plan includes</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#F5EEE9]">
                  <th className="p-3 text-left font-semibold text-black">Feature</th>
                  {plans.map(plan => (
                    <th key={plan.id} className="p-3 text-center font-semibold text-black">
                      {plan.name}
                      {plan.popular && <Badge className="ml-2 bg-red-600 text-white">Popular</Badge>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((row, idx) => (
                  <tr key={idx} className={cn(
                    "border-b border-[#F5EEE9]",
                    idx % 2 === 0 ? "bg-white" : "bg-[#F5EEE9]/30"
                  )}>
                    <td className="p-3 font-medium text-black">{row.feature}</td>
                    <td className="p-3 text-center text-black/70">{row.starter}</td>
                    <td className="p-3 text-center text-black/70">{row.professional}</td>
                    <td className="p-3 text-center text-black/70">{row.business}</td>
                    <td className="p-3 text-center text-black/70">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-[#F5EEE9]/30 px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-black">Frequently Asked Questions</h2>
            <p className="text-black/60 mt-2">Find answers to common questions about our pricing and plans</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="border-[#F5EEE9]">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-black mb-2">{faq.question}</h3>
                  <p className="text-sm text-black/60">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-12">
        <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white max-w-4xl mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-3">Ready to get started?</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join thousands of businesses that trust AccuCount for their inventory management needs.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="secondary" size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </div>
            <p className="text-white/70 text-sm mt-4">No credit card required. 14-day free trial on all plans.</p>
          </CardContent>
        </Card>
      </div>

      {/* Subscribe Dialog */}
      <Dialog open={showSubscribeDialog} onOpenChange={setShowSubscribeDialog}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedPlan && (
            <>
              <DialogHeader>
                <DialogTitle>Subscribe to {selectedPlan.name} Plan</DialogTitle>
                <DialogDescription>
                  {billingCycle === 'monthly' 
                    ? `$${selectedPlan.monthlyPrice}/month` 
                    : `$${selectedPlan.yearlyPrice}/year (Save 20%)`}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Number of Users</Label>
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 user (included)</SelectItem>
                      <SelectItem value="2">2 users (+$10/mo)</SelectItem>
                      <SelectItem value="3">3 users (+$20/mo)</SelectItem>
                      <SelectItem value="4">4 users (+$30/mo)</SelectItem>
                      <SelectItem value="5">5 users (+$40/mo)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Billing Cycle</Label>
                  <RadioGroup defaultValue={billingCycle} onValueChange={setBillingCycle}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly">Monthly - ${selectedPlan.monthlyPrice}/month</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yearly" id="yearly" />
                      <Label htmlFor="yearly">Yearly - ${selectedPlan.yearlyPrice}/year (Save 20%)</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="p-3 bg-[#F5EEE9] rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span>Plan Price</span>
                    <span>${billingCycle === 'monthly' ? selectedPlan.monthlyPrice : selectedPlan.yearlyPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm text-black/50">
                    <span>Additional Users</span>
                    <span>+$0</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${billingCycle === 'monthly' ? selectedPlan.monthlyPrice : selectedPlan.yearlyPrice}</span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="text-xs text-green-600 mt-2">You save ${(selectedPlan.monthlyPrice * 12) - selectedPlan.yearlyPrice} annually</p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowSubscribeDialog(false)}>
                  Cancel
                </Button>
                <Button className="bg-red-600 hover:bg-red-700">
                  <CreditCardIcon size={14} className="mr-2" />
                  Proceed to Checkout
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Enterprise Dialog */}
      <Dialog open={showEnterpriseDialog} onOpenChange={setShowEnterpriseDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Contact Enterprise Sales</DialogTitle>
            <DialogDescription>
              Get a custom solution tailored to your business needs
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input placeholder="Enter your company name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label>Work Email</Label>
                <Input type="email" placeholder="email@company.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Phone Number (Optional)</Label>
              <Input placeholder="+1 (555) 000-0000" />
            </div>
            <div className="space-y-2">
              <Label>Expected Users</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select number of users" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20-50">20-50 users</SelectItem>
                  <SelectItem value="50-100">50-100 users</SelectItem>
                  <SelectItem value="100-500">100-500 users</SelectItem>
                  <SelectItem value="500+">500+ users</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea placeholder="Tell us about your requirements..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEnterpriseDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Send size={14} className="mr-2" />
              Contact Sales
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Compare Features Dialog */}
      <Dialog open={showCompareDialog} onOpenChange={setShowCompareDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete Feature Comparison</DialogTitle>
            <DialogDescription>
              Detailed breakdown of all features across plans
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#F5EEE9] sticky top-0">
                    <th className="p-3 text-left font-semibold text-black">Feature</th>
                    {plans.map(plan => (
                      <th key={plan.id} className="p-3 text-center font-semibold text-black">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plans[0].features.map((feature, idx) => (
                    <tr key={idx} className="border-b border-[#F5EEE9]">
                      <td className="p-3 font-medium text-black">{feature.name}</td>
                      {plans.map(plan => {
                        const planFeature = plan.features.find(f => f.name === feature.name);
                        return (
                          <td key={plan.id} className="p-3 text-center">
                            {planFeature?.included ? (
                              <CheckCircle size={18} className="text-green-600 mx-auto" />
                            ) : (
                              <XCircle size={18} className="text-gray-400 mx-auto" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCompareDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PricingPage;