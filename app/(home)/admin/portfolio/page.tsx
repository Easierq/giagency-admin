// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useParams, useRouter } from "next/navigation";
// import {
//   Plus,
//   Edit,
//   Trash2,
//   Eye,
//   Search,
//   Filter,
//   MoreVertical,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { showToast } from "@/store/uiStore";
// import { fetchProjects, deleteProject } from "@/lib/api/services";
// import { ServiceCategory } from "@/types/api";

// export default function CategoryProjectsPage() {
//   const params = useParams();
//   const router = useRouter();
//   const category = params.category as ServiceCategory;

//   const [projects, setProjects] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   useEffect(() => {
//     loadProjects();
//   }, [category, statusFilter]);

//   // async function loadProjects() {
//   //   try {
//   //     setLoading(true);
//   //     const options: any = {};
//   //     if (statusFilter !== "all") {
//   //       options.status = statusFilter;
//   //     }

//   //     const response = await fetchProjects(category, options);
//   //     if (response.success && response.data) {
//   //       setProjects([response.data]);
//   //     }
//   //   } catch (error) {
//   //     showToast.error("Failed to load projects");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // }
//   async function loadProjects() {
//     try {
//       setLoading(true);

//       const options: any = {};
//       if (statusFilter !== "all") {
//         options.status = statusFilter;
//       }

//       const response = await fetchProjects(category, options);

//       if (response.success && Array.isArray(response.data)) {
//         setProjects(response.data);
//       } else {
//         setProjects([]);
//       }
//     } catch (error) {
//       showToast.error("Failed to load projects");
//       setProjects([]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleDelete(slug: string) {
//     if (!confirm("Are you sure you want to delete this project?")) {
//       return;
//     }

//     try {
//       await deleteProject(category, slug);
//       showToast.success("Project deleted successfully");
//       loadProjects();
//     } catch (error) {
//       showToast.error("Failed to delete project");
//     }
//   }

//   const filteredProjects = projects.filter((project) =>
//     project.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const categoryName = category
//     .split("-")
//     .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");

//   return (
//     <div className="min-h-screen bg-green-50/50">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex flex-wrap gap-y-4 items-center justify-between mb-8">
//           <div>
//             <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">
//               {categoryName} Projects
//             </h1>
//             <p className="text-gray-600">
//               Manage your {categoryName.toLowerCase()} service
//             </p>
//           </div>
//           <Link href={`/admin/${category}/new`}>
//             <Button size="lg">
//               <Plus className="w-5 h-5 mr-2" />
//               Add New Project
//             </Button>
//           </Link>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-lg border p-4 mb-6">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <Input
//                 placeholder="Search projects..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-full md:w-48">
//                 <Filter className="w-4 h-4 mr-2" />
//                 <SelectValue placeholder="Filter by status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="PUBLISHED">Published</SelectItem>
//                 <SelectItem value="DRAFT">Draft</SelectItem>
//                 <SelectItem value="ARCHIVED">Archived</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* Projects Table */}
//         <div className="bg-white rounded-lg border overflow-hidden">
//           {loading ? (
//             <div className="p-8 text-center text-gray-500">Loading...</div>
//           ) : filteredProjects.length === 0 ? (
//             <div className="p-8 text-center text-gray-500">
//               No projects found. Create your first project!
//             </div>
//           ) : (
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Project</TableHead>
//                   <TableHead>Client</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Featured</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredProjects.map((project) => (
//                   <TableRow key={project.id}>
//                     <TableCell>
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={project.image}
//                           alt={project.name}
//                           className="w-12 h-12 rounded object-cover"
//                         />
//                         <div>
//                           <p className="font-semibold">{project.name}</p>
//                           <p className="text-sm text-gray-500">
//                             {project.slug}
//                           </p>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       {project.clientName || (
//                         <span className="text-gray-400">—</span>
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       <Badge
//                         variant={
//                           project.status === "PUBLISHED"
//                             ? "default"
//                             : project.status === "DRAFT"
//                             ? "secondary"
//                             : "outline"
//                         }
//                       >
//                         {project.status}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       {project.featured && (
//                         <Badge variant="outline" className="bg-yellow-50">
//                           ⭐ Featured
//                         </Badge>
//                       )}
//                     </TableCell>
//                     <TableCell className="text-sm text-gray-500">
//                       {new Date(project.createdAt).toLocaleDateString()}
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon">
//                             <MoreVertical className="w-4 h-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem
//                             onClick={() =>
//                               window.open(
//                                 `/services/${category}/${project.slug}`,
//                                 "_blank"
//                               )
//                             }
//                           >
//                             <Eye className="w-4 h-4 mr-2" />
//                             View
//                           </DropdownMenuItem>
//                           <DropdownMenuItem
//                             onClick={() =>
//                               router.push(
//                                 `/admin/${category}/${project.slug}/edit`
//                               )
//                             }
//                           >
//                             <Edit className="w-4 h-4 mr-2" />
//                             Edit
//                           </DropdownMenuItem>
//                           <DropdownMenuItem
//                             onClick={() => handleDelete(project.slug)}
//                             className="text-destructive"
//                           >
//                             <Trash2 className="w-4 h-4 mr-2" />
//                             Delete
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

//Card format

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { showToast } from "@/store/uiStore";
import {
  deletePortfolioProject,
  fetchPortfolioProjects,
} from "@/lib/api/portfolio";

export default function CategoryProjectsPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadProjects();
  }, [statusFilter]);

  // async function loadProjects() {
  //   try {
  //     setLoading(true);
  //     const options: any = {};
  //     if (statusFilter !== "all") {
  //       options.status = statusFilter;
  //     }

  //     const response = await fetchProjects(category, options);
  //     if (response.success && response.data) {
  //       setProjects(response.data);
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to load projects",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  async function loadProjects() {
    try {
      setLoading(true);

      const options: any = {};
      if (statusFilter !== "all") {
        options.status = statusFilter;
      }

      const response = await fetchPortfolioProjects(options);

      if (response.success && Array.isArray(response.data)) {
        setProjects(response.data);
      } else {
        setProjects([]);
      }
    } catch (error) {
      showToast.error("Failed to load projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      await deletePortfolioProject(slug);
      showToast.success("Project deleted successfully");

      loadProjects();
    } catch (error) {
      showToast.error("Failed to delete project");
    }
  }

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-green-50/50">
      <div className="container mx-auto px-[3%] lg:px-[7%] py-8">
        {/* Header */}
        <div className="flex flex-wrap gap-y-4 items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-2">
              Portfolio Projects
            </h1>
            <p className="text-gray-600">Manage your portfolio</p>
          </div>
          <Link href={`/admin/portfolio/new`}>
            <Button size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Add New Project
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-white rounded-lg border p-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? "Try adjusting your search query"
                : "Create your first project to get started!"}
            </p>
            {!searchQuery && (
              <Link href={`/admin/portfolio/new`}>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Project
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden group transition-all duration-300 transform"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {project.badge && (
                      <Badge className="bg-blue-600 text-white w-max">
                        {project.badge}
                      </Badge>
                    )}
                    {project.featured && (
                      <Badge
                        variant="outline"
                        className="bg-yellow-400 text-gray-800 border-yellow-400"
                      >
                        ⭐ Featured
                      </Badge>
                    )}
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge
                      variant={
                        project.status === "PUBLISHED"
                          ? "default"
                          : project.status === "DRAFT"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>

                  {/* Bottom Hover Actions */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          window.open(
                            `https://giagency.vercel.app/services/portfolio/${project.slug}`,
                            "_blank"
                          )
                        }
                        className="flex-1 bg-white hover:bg-gray-100 text-gray-800 py-2 px-3 rounded-lg font-semibold transition-colors text-sm flex items-center justify-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/admin/portfolio/${project.slug}/edit`)
                        }
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg font-semibold transition-colors text-sm flex items-center justify-center gap-1"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
                    {project.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    {project.clientName ? (
                      <span className="truncate">
                        Client: {project.clientName}
                      </span>
                    ) : (
                      <span className="text-gray-400">No client</span>
                    )}
                    {/* {process.env.NEXT_PUBLIC_CLIENT_APP} */}
                    <span className="flex-shrink-0">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() =>
                        router.push(`/admin/portfolio/${project.slug}/edit`)
                      }
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            window.open(
                              `https://ibetaagency.vercel.app/services/portfolio/${project.slug}`,
                              "_blank"
                            )
                          }
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Live
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(project.slug)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
