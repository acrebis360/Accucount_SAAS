"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Package,
  Tags,
  MapPin,
  ClipboardCheck,
  UsersIcon,
  UserCheck,
  ArrowUpRight,
  Zap,
  Gauge,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GaugeComponent from "react-gauge-component";

import { useRouter } from "next/navigation";

import CreateZoneDialog from "@/components/ui/customeComponent/CreateZoneDialog";
import CreateTagDialog from "@/components/ui/customeComponent/CreateTagDialog";
import UserAssignmentDialog from "@/components/ui/customeComponent/UserAssignmentDialog";
import useToast from "@/components/ui/toast/useToast";

// Dummy Profile Data
const DUMMY_PROFILE = {
  data: {
    eventRole: {
      role: { name: "Admin" }
    }
  }
};

// Dummy Event Data
const DUMMY_EVENT_DATA = {
  totalQuantity: 8450,
  totalSkus: 15000,
  completedTags: 98,
  totalTags: 156,
  completedZones: 6,
  totalZones: 8,
  completedAudits: 45,
  totalAudits: 156,
  countedTags: 112,
  totalFinalQuantity: 8450,
  data: {
    efficiency: 78
  },
  efficiency: 78,
  teamEfficiency: 78
};

// Dummy Zone Creation Response
const DUMMY_ZONE_CREATION = {
  success: true,
  message: "Zone created successfully"
};

// Dummy Bulk Zone Upload Response
const DUMMY_BULK_UPLOAD = {
  success: true,
  message: "Zones uploaded successfully",
  count: 5
};

// Vertical Bar Chart Component for Quantity (Full Width)
function QuantityBarChart({ completed, total }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const loadChart = async () => {
      const Chart = (await import("chart.js/auto")).default;

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      if (chartRef.current) {
        const ctx = chartRef.current.getContext("2d");
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Quantity"],
            datasets: [
              {
                label: "Completed",
                data: [completed],
                backgroundColor: "#2563eb",
                borderRadius: 4,
              },
            ],
          },
          options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  padding: 8,
                  font: { size: 9 },
                },
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const label = context.dataset.label || "";
                    const value = context.parsed.x;
                    return `${label}: ${value.toLocaleString()} of ${total.toLocaleString()}`;
                  },
                },
              },
            },
            scales: {
              x: {
                beginAtZero: true,
                max: total,
                ticks: {
                  font: { size: 9 },
                  callback: function (value) {
                    return value / 1000 + "k";
                  },
                },
                grid: { display: false },
              },
              y: {
                ticks: { font: { size: 10 } },
                grid: { display: false },
              },
            },
          },
        });
      }
    };

    loadChart();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [completed, total]);

  return (
    <div className="h-20">
      <canvas ref={chartRef} />
    </div>
  );
}

export default function EventDashboard() {
  const router = useRouter();
  const toast = useToast();
  
  // Use dummy profile data
  const profileData = DUMMY_PROFILE;

  useEffect(() => {
    const userRole = profileData?.data?.eventRole?.role?.name?.toLowerCase();
    if (userRole === "customer") {
      router.push("/accucount/customer");
    }
  }, [profileData, router]);

  const [eventProgress, setEventProgress] = useState({
    completedSKUs: 0,
    totalSKUs: 0,
    completedTags: 0,
    totalTags: 0,
    completedZones: 0,
    totalZones: 0,
    completedAudits: 0,
    totalAudits: 0,
    countedTags: 0,
    teamEfficiency: 0,
    totalFinalQuantity: 0,
  });

  const [isZoneDialogOpen, setIsZoneDialogOpen] = useState(false);
  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const [userAssignDialogOpen, setUserAssignDialogOpen] = useState(false);
  const [isNoAudit, setIsNoAudit] = useState(false);
  
  // Use dummy event data
  const eventData = DUMMY_EVENT_DATA;

  const showZoneDialog = () => {
    setIsZoneDialogOpen(true);
  };

  const showTagDialog = () => {
    setTagDialogOpen(true);
  };

  const showUserAssignDialog = () => {
    setUserAssignDialogOpen(true);
  };

  useEffect(() => {
    if (eventData) {
      setEventProgress({
        completedSKUs: eventData.totalQuantity || 0,
        totalSKUs: eventData.totalSkus || 15000,
        completedTags: eventData.completedTags || 0,
        totalTags: eventData.totalTags || 0,
        completedZones: eventData.completedZones || 0,
        totalZones: eventData.totalZones || 0,
        completedAudits: eventData.completedAudits || 0,
        totalAudits: eventData.totalAudits || 0,
        countedTags: eventData.countedTags || 0,
        totalFinalQuantity: eventData.totalFinalQuantity || eventData.totalQuantity || 0,
        teamEfficiency: Math.floor(eventData.data?.efficiency || eventData.efficiency || eventData.teamEfficiency || 78),
      });
    }
  }, [eventData]);

  const calculatePercentage = (completed, total) => {
    return total > 0 ? (completed / total) * 100 : 0;
  };

  const handleSaveZone = async (zoneData) => {
    try {
      if (zoneData.zones) {
        // Bulk/Multi upload - simulate API call
        toast.info(`Uploading ${zoneData.zones.length} zones...`);
        setTimeout(() => {
          toast.success(`Successfully uploaded ${zoneData.zones.length} zones`);
        }, 1000);
      } else {
        // Single zone creation - simulate API call
        toast.info("Creating zone...");
        setTimeout(() => {
          toast.success("Zone created successfully");
        }, 1000);
      }
      setIsZoneDialogOpen(false);
    } catch (error) {
      console.error("Error saving zone:", error);
      toast.error("Failed to create zone");
      throw error;
    }
  };

  const quickLinks = [
    {
      title: "Add Zone",
      description: "Add new counting zones",
      icon: MapPin,
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      hoverColor:
        "hover:bg-gradient-to-br hover:from-purple-100 hover:to-purple-200",
      borderColor: "border-purple-200",
      onClick: showZoneDialog,
      isAction: true,
    },
    {
      title: "Add Tags",
      description: "Generate counting tags",
      icon: Tags,
      color: "text-emerald-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      hoverColor:
        "hover:bg-gradient-to-br hover:from-emerald-100 hover:to-emerald-200",
      borderColor: "border-emerald-200",
      onClick: showTagDialog,
      isAction: true,
    },
    {
      title: "Assign User",
      description: "Assign users to zones",
      icon: UserCheck,
      color: "text-amber-600",
      bgColor: "bg-gradient-to-br from-amber-50 to-amber-100",
      hoverColor:
        "hover:bg-gradient-to-br hover:from-amber-100 hover:to-amber-200",
      borderColor: "border-amber-200",
      onClick: showUserAssignDialog,
      isAction: true,
    },
  ];

  const progressCharts = [
    {
      title: "Counted Tags",
      completed: eventProgress.countedTags,
      total: eventProgress.totalTags,
      colors: ["#ea580c", "#ffedd5"], // Orange
      icon: ClipboardCheck,
      isPercentage: false,
    },
    ...(isNoAudit
      ? [
          {
            title: "Completed Tags",
            completed: eventProgress.completedTags,
            total: eventProgress.totalTags,
            colors: ["#16a34a", "#dcfce7"], // Green
            icon: Tags,
            isPercentage: false,
          },
          {
            title: "Completed Zones",
            completed: eventProgress.completedZones,
            total: eventProgress.totalZones,
            colors: ["#9333ea", "#f3e8ff"], // Purple
            icon: MapPin,
            isPercentage: false,
          },
        ]
      : [
          {
            title: "Audited Tags",
            completed: eventProgress.totalAudits,
            total: eventProgress.totalTags,
            colors: ["#9333ea", "#f3e8ff"], // Purple
            icon: MapPin,
            isPercentage: false,
          },
          {
            title: "Completed Tags",
            completed: eventProgress.completedTags,
            total: eventProgress.totalTags,
            colors: ["#16a34a", "#dcfce7"], // Green
            icon: Tags,
            isPercentage: false,
          },
        ]),
    {
      title: "Team Productivity",
      completed: eventProgress.teamEfficiency,
      total: 100,
      colors: ["#0891b2", "#e0f2fe"], // Cyan
      icon: UsersIcon,
      isPercentage: true,
    },
  ];

  return (
    <div className="min-h-screen pb-10">
      <main className="max-w-full">
        {/* Row 1: Inventory Event Progress */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full flex flex-col mb-4"
        >
          <div className="mb-2">
            <div className="flex items-center space-x-3">
              <Gauge className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold theme-text-primary">
                Inventory Event Progress
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {progressCharts.map((chart, index) => (
              <Card key={index} className="border-2 border-blue-200 shadow-lg duration-200 h-full flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <chart.icon className="h-4 w-4" style={{ color: chart.colors[0] }} />
                      <CardTitle className="theme-text-primary text-md font-semibold capitalize">{chart.title}</CardTitle>
                    </div>
                    <div className="px-2 py-0.5 bg-gray-100 rounded text-md font-medium theme-text-primary">
                      {chart.isPercentage ? `${Math.floor(chart.completed)}%` : `${chart.completed} / ${chart.total}`}
                    </div>
                  </div>
                  <CardDescription className="theme-text-secondary text-md">
                    {chart.isPercentage ? "Overall Team Efficiency" : `Progress: ${Math.round(calculatePercentage(chart.completed, chart.total))}%`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2 flex-grow">
                  <div className="w-full h-32 flex items-center justify-center">
                    <GaugeComponent
                      type="semicircle"
                      value={chart.isPercentage ? chart.completed : calculatePercentage(chart.completed, chart.total)}
                      minValue={0}
                      maxValue={100}
                      arc={{
                        width: 0.2,
                        padding: 0.005,
                        cornerRadius: 1,
                        subArcs: [
                          { limit: 20, color: "#EA4228", showTick: true },
                          { limit: 40, color: "#F58B19", showTick: true },
                          { limit: 60, color: "#F5CD19", showTick: true },
                          { limit: 80, color: "#5BE12C", showTick: true },
                          { color: chart.colors[0] },
                        ],
                      }}
                      pointer={{
                        type: "needle",
                        elastic: true,
                        color: chart.colors[0],
                        length: 0.68,
                        width: 8,
                        animationDuration: 3000,
                        animationDelay: 0,
                      }}
                      labels={{
                        valueLabel: { formatTextValue: () => "", style: { display: "none" } },
                        tickLabels: {
                          type: "outer",
                          defaultTickValueConfig: {
                            formatTextValue: (v) => `${Math.round(v)}%`,
                            style: { fontSize: 11, fill: "#666" },
                          },
                        },
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:w-1/2 flex flex-col"
          >
            <div className="">
              <div className="mb-2">
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-blue-600" />
                  <h1 className="text-2xl font-bold theme-text-primary">Quick Actions</h1>
                </div>
              </div>
            </div>
            <Card className="border-2 border-blue-200 shadow-lg overflow-hidden flex-grow flex flex-col">
              <CardContent className="p-3 flex-grow">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
                  {quickLinks.map((link, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.97 }} className="relative h-full">
                      {link.isAction ? (
                        <Button
                          variant="ghost"
                          className={`w-full h-full min-h-[60px] flex flex-col items-center justify-center p-2 ${link.bgColor} ${link.hoverColor} border ${link.borderColor} rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group`}
                          onClick={link.onClick}
                        >
                          <div className={`mb-1 p-2 rounded-full ${link.bgColor} border ${link.borderColor} group-hover:scale-110 transition-transform`}>
                            <link.icon className={`h-4 w-4 ${link.color}`} />
                          </div>
                          <div className="font-semibold theme-text-primary text-xs">{link.title}</div>
                        </Button>
                      ) : (
                        <Link href={link.href} className="w-full h-full block">
                          <Button
                            variant="ghost"
                            className={`w-full h-full min-h-[80px] flex flex-col items-center justify-center p-2 ${link.bgColor} ${link.hoverColor} border ${link.borderColor} rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group`}
                          >
                            <div className={`mb-1 p-2 rounded-full ${link.bgColor} border ${link.borderColor} group-hover:scale-110 transition-transform`}>
                              <link.icon className={`h-4 w-4 ${link.color}`} />
                            </div>
                            <div className="font-semibold theme-text-primary text-xs">{link.title}</div>
                            <ArrowUpRight className="absolute top-1 right-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Button>
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quantity Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:w-1/2 flex flex-col"
          >
            <div className="">
              <div className="mb-2">
                <div className="flex items-center space-x-3">
                  <Package className="h-6 w-6 text-blue-600" />
                  <h1 className="text-2xl font-bold theme-text-primary">Quantity Progress</h1>
                </div>
              </div>
            </div>
            <Card className="border-2 border-blue-200 shadow-lg flex-grow flex flex-col h-full">
              <CardHeader className="py-2 px-4">
                <div className="flex items-center">
                  <div className="px-2 py-0.5 bg-gray-100 rounded text-md font-medium theme-text-primary">
                    <span className="theme-text-primary mr-2">
                      Final Quantity :
                    </span>
                    {eventProgress.totalFinalQuantity.toLocaleString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-3 flex-grow">
                <QuantityBarChart completed={eventProgress.totalFinalQuantity} total={eventProgress.totalSKUs} />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <CreateZoneDialog
        open={isZoneDialogOpen}
        onOpenChange={setIsZoneDialogOpen}
        eventData={eventData}
        onSave={handleSaveZone}
      />
      <CreateTagDialog
        open={tagDialogOpen}
        onOpenChange={setTagDialogOpen}
        eventData={eventData}
      />
      <UserAssignmentDialog
        open={userAssignDialogOpen}
        onOpenChange={setUserAssignDialogOpen}
        eventData={eventData}
      />
    </div>
  );
}