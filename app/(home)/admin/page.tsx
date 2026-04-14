// import Link from "next/link";
// import {
//   Code,
//   Palette,
//   Video,
//   PenTool,
//   FileText,
//   Share2,
//   Plus,
//   BarChart3,
//   Eye,
//   Star,
//   Sparkles,
//   Smartphone,
//   Image,
//   Code2,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default function AdminDashboard() {
//   const services = [
//     {
//       id: "web-development",
//       name: "Web Development",
//       icon: Code,
//       color: "text-cyan-600 bg-cyan-100",
//       count: 12,
//       published: 10,
//       draft: 2,
//     },
//     {
//       id: "graphics-design",
//       name: "Graphic Design",
//       icon: Palette,
//       color: "text-yellow-600 bg-yellow-100",
//       count: 18,
//       published: 15,
//       draft: 3,
//     },
//     {
//       id: "ai-agent-building",
//       name: "Ai Agent Building",
//       icon: Code,
//       color: "text-red-600 bg-red-100",
//       count: 10,
//       published: 8,
//       draft: 2,
//     },
//     {
//       id: "vibe-coding",
//       name: "Vibe Coding",
//       icon: Code2,
//       color: "text-blue-600 bg-blue-100",
//       count: 15,
//       published: 12,
//       draft: 3,
//     },

//     {
//       id: "ai-automation",
//       name: "Ai Automation",
//       icon: Sparkles,
//       color: "text-purple-600 bg-purple-100",
//       count: 14,
//       published: 11,
//       draft: 3,
//     },
//     {
//       id: "mobile-app-development",
//       name: "Mobile App Development",
//       icon: Smartphone,
//       color: "text-indigo-600 bg-indigo-100",
//       count: 14,
//       published: 11,
//       draft: 3,
//     },
//   ];

//   const stats = [
//     {
//       label: "Total Projects",
//       value: "89",
//       icon: BarChart3,
//       color: "text-cyan-600",
//     },
//     { label: "Published", value: "74", icon: Eye, color: "text-green-600" },
//     { label: "Featured", value: "12", icon: Star, color: "text-yellow-500" },
//     { label: "Draft", value: "15", icon: FileText, color: "text-gray-600" },
//   ];

//   return (
//     <div className="min-h-screen bg-green-50/50">
//       <div className="container mx-auto px-[3%] lg:px-[7%] py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-semibold text-gray-900 mb-2">
//             Admin Dashboard
//           </h1>
//           <p className="text-gray-600">Manage your portfolio projects</p>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
//           {stats.map((stat, index) => {
//             const Icon = stat.icon;
//             return (
//               <Card key={index}>
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
//                       <p className="text-3xl font-bold text-gray-900">
//                         {stat.value}
//                       </p>
//                     </div>
//                     <Icon className={`w-12 h-12 ${stat.color}`} />
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//         {/* Services Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <Card className="hover:shadow-sm transition-shadow border border-green-300">
//             <CardHeader>
//               <div className="flex items-center gap-3 mb-4">
//                 <div className={`p-3 rounded-lg text-green-600 bg-green-100`}>
//                   <Image className="w-6 h-6" />
//                 </div>
//                 <CardTitle className="text-xl">My Portfolio</CardTitle>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3 mb-6">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Total Projects:</span>
//                   <span className="font-semibold">4</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Published:</span>
//                   <span className="font-semibold text-green-600">8</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Draft:</span>
//                   <span className="font-semibold text-gray-500">9</span>
//                 </div>
//               </div>

//               <div className="flex gap-2">
//                 <Link href={`/admin/portfolio`} className="flex-1">
//                   <Button variant="outline" className="w-full">
//                     Manage
//                   </Button>
//                 </Link>
//                 <Link href={`/admin/portfolio/new`} className="flex-1">
//                   <Button className="w-full">
//                     <Plus className="w-4 h-4 mr-1 text-white" />
//                     New
//                   </Button>
//                 </Link>
//               </div>
//             </CardContent>
//           </Card>
//           {services.map((service) => {
//             const Icon = service.icon;
//             return (
//               <Card
//                 key={service.id}
//                 className="hover:shadow-lg transition-shadow"
//               >
//                 <CardHeader>
//                   <div className="flex items-center gap-3 mb-4">
//                     <div className={`p-3 rounded-lg ${service.color}`}>
//                       <Icon className="w-6 h-6" />
//                     </div>
//                     <CardTitle className="text-xl">{service.name}</CardTitle>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3 mb-6">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-600">Total Projects:</span>
//                       <span className="font-semibold">{service.count}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-600">Published:</span>
//                       <span className="font-semibold text-green-600">
//                         {service.published}
//                       </span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-600">Draft:</span>
//                       <span className="font-semibold text-gray-500">
//                         {service.draft}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="flex gap-2">
//                     <Link
//                       href={`/admin/projects/${service.id}`}
//                       className="flex-1"
//                     >
//                       <Button variant="outline" className="w-full">
//                         Manage
//                       </Button>
//                     </Link>
//                     <Link
//                       href={`/admin/projects/${service.id}/new`}
//                       className="flex-1"
//                     >
//                       <Button className="w-full">
//                         <Plus className="w-4 h-4 mr-1 text-white" />
//                         New
//                       </Button>
//                     </Link>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

//new code

import Link from "next/link";
import {
  Code,
  Palette,
  FileText,
  Plus,
  BarChart3,
  Eye,
  Star,
  Sparkles,
  Smartphone,
  Image,
  Code2,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboard() {
  // ============================
  // FETCH DATA FROM DATABASE
  // ============================
  const [
    // Web Dev
    webTotal,
    webPublished,
    webDraft,

    // Graphic Design
    designTotal,
    designPublished,
    designDraft,

    // AI Agent
    aiAgentTotal,
    aiAgentPublished,
    aiAgentDraft,

    // Vibe Coding
    vibeTotal,
    vibePublished,
    vibeDraft,

    // AI Automation
    aiAutoTotal,
    aiAutoPublished,
    aiAutoDraft,

    // Mobile
    mobileTotal,
    mobilePublished,
    mobileDraft,

    // Portfolio (optional card)
    portfolioTotal,
    portfolioPublished,
    portfolioDraft,
  ] = await Promise.all([
    // Web Dev
    prisma.webDevelopmentProject.count(),
    prisma.webDevelopmentProject.count({ where: { status: "PUBLISHED" } }),
    prisma.webDevelopmentProject.count({ where: { status: "DRAFT" } }),

    // Graphic Design
    prisma.graphicDesignProject.count(),
    prisma.graphicDesignProject.count({ where: { status: "PUBLISHED" } }),
    prisma.graphicDesignProject.count({ where: { status: "DRAFT" } }),

    // AI Agent
    prisma.aIAgentBuildingProject.count(),
    prisma.aIAgentBuildingProject.count({ where: { status: "PUBLISHED" } }),
    prisma.aIAgentBuildingProject.count({ where: { status: "DRAFT" } }),

    // Vibe Coding
    prisma.vibeCodingProject.count(),
    prisma.vibeCodingProject.count({ where: { status: "PUBLISHED" } }),
    prisma.vibeCodingProject.count({ where: { status: "DRAFT" } }),

    // AI Automation
    prisma.aIAutomationProject.count(),
    prisma.aIAutomationProject.count({ where: { status: "PUBLISHED" } }),
    prisma.aIAutomationProject.count({ where: { status: "DRAFT" } }),

    // Mobile
    prisma.mobileAppProject.count(),
    prisma.mobileAppProject.count({ where: { status: "PUBLISHED" } }),
    prisma.mobileAppProject.count({ where: { status: "DRAFT" } }),

    // Portfolio
    prisma.portfolioProject.count(),
    prisma.portfolioProject.count({ where: { status: "PUBLISHED" } }),
    prisma.portfolioProject.count({ where: { status: "DRAFT" } }),
  ]);

  // ============================
  // GLOBAL STATS
  // ============================
  const totalProjects =
    webTotal +
    designTotal +
    aiAgentTotal +
    vibeTotal +
    aiAutoTotal +
    mobileTotal;

  const totalPublished =
    webPublished +
    designPublished +
    aiAgentPublished +
    vibePublished +
    aiAutoPublished +
    mobilePublished;

  const totalDraft =
    webDraft +
    designDraft +
    aiAgentDraft +
    vibeDraft +
    aiAutoDraft +
    mobileDraft;

  // Featured count (example from multiple models)
  const featuredCount =
    (await prisma.webDevelopmentProject.count({
      where: { featured: true },
    })) +
    (await prisma.graphicDesignProject.count({
      where: { featured: true },
    }));

  const stats = [
    {
      label: "Total Projects",
      value: totalProjects.toString(),
      icon: BarChart3,
      color: "text-cyan-700",
      bg: "bg-cyan-100",
    },
    {
      label: "Published",
      value: totalPublished.toString(),
      icon: Eye,
      color: "text-green-700",
      bg: "bg-green-100",
    },
    {
      label: "Featured",
      value: featuredCount.toString(),
      icon: Star,
      color: "text-pink-700",
      bg: "bg-pink-100",
    },
    {
      label: "Draft",
      value: totalDraft.toString(),
      icon: FileText,
      color: "text-purple-700",
      bg: "bg-purple-100",
    },
  ];

  // ============================
  // SERVICES DATA
  // ============================
  const services = [
    {
      id: "web-development",
      name: "Web Development",
      icon: Code,
      color: "text-cyan-600 bg-cyan-100",
      count: webTotal,
      published: webPublished,
      draft: webDraft,
    },
    {
      id: "graphics-design",
      name: "Graphic Design",
      icon: Palette,
      color: "text-yellow-600 bg-yellow-100",
      count: designTotal,
      published: designPublished,
      draft: designDraft,
    },
    {
      id: "ai-agent-building",
      name: "Ai Agent Building",
      icon: Code,
      color: "text-red-600 bg-red-100",
      count: aiAgentTotal,
      published: aiAgentPublished,
      draft: aiAgentDraft,
    },
    {
      id: "vibe-coding",
      name: "Vibe Coding",
      icon: Code2,
      color: "text-blue-600 bg-blue-100",
      count: vibeTotal,
      published: vibePublished,
      draft: vibeDraft,
    },
    {
      id: "ai-automation",
      name: "Ai Automation",
      icon: Sparkles,
      color: "text-purple-600 bg-purple-100",
      count: aiAutoTotal,
      published: aiAutoPublished,
      draft: aiAutoDraft,
    },
    {
      id: "mobile-app-development",
      name: "Mobile App Development",
      icon: Smartphone,
      color: "text-indigo-600 bg-indigo-100",
      count: mobileTotal,
      published: mobilePublished,
      draft: mobileDraft,
    },
  ];

  // ============================
  // UI
  // ============================
  return (
    <div className="min-h-screen bg-green-50/30">
      <div className="container mx-auto px-[3%] lg:px-[7%] py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage your portfolio projects</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                className={`${stat.bg} shadow-none border-none ${stat.color} rounded-lg`}
                key={index}
              >
                <div className={`p-6`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <Icon className={`w-12 h-12`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Portfolio Card */}
          <Card className="hover:shadow-sm transition-shadow border border-green-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg text-green-600 bg-green-100">
                  <Image className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">My Portfolio</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Projects:</span>
                  <span className="font-semibold">{portfolioTotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Published:</span>
                  <span className="font-semibold text-green-600">
                    {portfolioPublished}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Draft:</span>
                  <span className="font-semibold text-gray-500">
                    {portfolioDraft}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/admin/portfolio`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    Manage
                  </Button>
                </Link>
                <Link href={`/admin/portfolio/new`} className="flex-1">
                  <Button className="w-full">
                    <Plus className="w-4 h-4 mr-1 text-white" />
                    New
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Dynamic Services */}
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-lg ${service.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Projects:</span>
                      <span className="font-semibold">{service.count}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Published:</span>
                      <span className="font-semibold text-green-600">
                        {service.published}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Draft:</span>
                      <span className="font-semibold text-gray-500">
                        {service.draft}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/admin/projects/${service.id}`}
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full">
                        Manage
                      </Button>
                    </Link>
                    <Link
                      href={`/admin/projects/${service.id}/new`}
                      className="flex-1"
                    >
                      <Button className="w-full">
                        <Plus className="w-4 h-4 mr-1 text-white" />
                        New
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
