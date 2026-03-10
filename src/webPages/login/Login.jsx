// app/login/page.js or components/LoginPage.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Check, Sparkles, Shield, Zap, Users, BarChart3, Globe, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import loginImage from '@/assets/images/login.jpg';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    // Simulate API call
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 2000);
    router.push('/dashboard');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const features = [
    { icon: Shield, text: 'Enterprise Security', color: 'text-red-600' },
    { icon: Zap, text: 'Real-time Sync', color: 'text-black' },
    { icon: Users, text: 'Team Collaboration', color: 'text-red-600' },
    { icon: BarChart3, text: 'Advanced Analytics', color: 'text-black' },
    { icon: Globe, text: 'Multi-location', color: 'text-red-600' },
    { icon: Clock, text: '24/7 Support', color: 'text-black' },
  ];

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Left Side - Full Image (60%) */}
      <div className="hidden lg:block lg:w-3/5 relative overflow-hidden bg-[#F5EEE9]">
        {/* Full Image */}
        <div className="absolute inset-0">
          <Image
            src={loginImage} // Replace with your actual image path
            alt="Inventory Management"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>

        {/* Content Overlay on Image */}
        <div className="absolute inset-0 flex flex-col justify-end p-12 xl:p-16 text-white">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
              <Sparkles size={16} className="text-red-600" />
              <span className="text-sm font-medium text-white">Enterprise Inventory Management</span>
            </div>
            
            <h2 className="text-5xl xl:text-6xl font-bold mb-4 leading-tight">
              Streamline Your
              <span className="text-red-600 block mt-2">Inventory Operations</span>
            </h2>
            
            <p className="text-lg xl:text-xl text-white/80 max-w-2xl mb-8">
              Powerful stocktake solutions with real-time tracking, advanced reporting, 
              and seamless multi-location support
            </p>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3">
              {features.slice(0, 3).map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20"
                  >
                    <Icon size={14} className="text-red-600" />
                    <span className="text-sm text-white">{feature.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              {[
                { value: '10K+', label: 'Active Users' },
                { value: '1M+', label: 'Items Tracked' },
                { value: '99.9%', label: 'Uptime' },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl xl:text-3xl font-bold text-red-600">{stat.value}</div>
                  <div className="text-xs xl:text-sm text-white/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form (40%) */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-6 lg:p-8 xl:p-12">
        <div className="max-w-md w-full space-y-8">
          {/* Logo */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="text-red-600">ACCU</span>
              <span className="text-black">COUNT</span>
            </h1>
            <p className="mt-3 text-sm text-black/60">
              Welcome back! Please sign in to continue
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-1.5">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-600 group-focus-within:text-red-600 transition-colors" size={18} />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="pl-10 border-[#F5EEE9] focus:border-red-600 focus:ring-red-600/20 text-black placeholder:text-black/40 h-12"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-black mb-1.5">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-600 group-focus-within:text-red-600 transition-colors" size={18} />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="pl-10 pr-12 border-[#F5EEE9] focus:border-red-600 focus:ring-red-600/20 text-black placeholder:text-black/40 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black/40 hover:text-red-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, rememberMe: checked }))
                  }
                  className="border-[#F5EEE9] data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 h-4 w-4"
                />
                <label 
                  htmlFor="rememberMe" 
                  className="text-sm text-black/70 cursor-pointer hover:text-red-600 transition-colors"
                >
                  Remember me
                </label>
              </div>
              <Link 
                href="/forgot-password" 
                className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full bg-black text-white hover:bg-red-600 transition-all duration-300",
                "transform hover:scale-[1.01] active:scale-[0.99]",
                "font-semibold h-12 text-base relative overflow-hidden group"
              )}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-red-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-black/60">
              Don't have an account?{' '}
              <Link 
                href="/signup" 
                className="text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </form>

          {/* Demo Credentials */}
          <div className="pt-6 border-t border-[#F5EEE9]">
            <p className="text-xs text-center text-black/50">
              Demo credentials: demo@accucount.com / password123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;