// import { PortfolioForm } from "@/components/admin/PortfolioForm";
// import { notFound } from "next/navigation";

// async function getProject(slug: string) {
//   const res = await fetch(`/api/portfolio/${slug}`, { cache: "no-store" });

//   if (!res.ok) return null;
//   const data = await res.json();
//   return data.data;
// }

// export default async function EditPortfolioProjectPage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const project = await getProject(params.slug);

//   if (!project) {
//     notFound();
//   }

//   // Format data for form
//   const formattedProject = {
//     ...project,
//     completionDate: project.completionDate
//       ? new Date(project.completionDate).toISOString().split("T")[0]
//       : "",
//     images: project.images || [],
//     techStack: project.techStack || [],
//     features: project.features || [],
//     tools: project.tools || [],
//     platforms: project.platforms || [],
//   };

//   return (
//     <div className="min-h-screen bg-green-50/50">
//       <div className="container mx-auto px-4 py-8 max-w-5xl">
//         <div className="mb-8">
//           <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">
//             Edit Portfolio Project
//           </h1>
//           <p className="text-gray-600">Update project details</p>
//         </div>

//         <PortfolioForm mode="edit" initialData={formattedProject} />
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { PortfolioForm } from "@/components/admin/PortfolioForm";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { fetchPortfolioBySlug } from "@/lib/api/services";
import { parsePortfolioForForm } from "@/lib/utils/form-helpers";

// async function getProject(slug: string) {
//   const res = await fetch(`/api/portfolio/${slug}`, { cache: "no-store" });

//   if (!res.ok) return null;
//   const data = await res.json();
//   return data.data;
// }

export default function EditPortfolioProjectPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProject();
  }, [slug]);

  async function loadProject() {
    try {
      setLoading(true);
      const response = await fetchPortfolioBySlug(slug);

      if (response.success && response.data) {
        const formData = parsePortfolioForForm(response.data);
        setProject(formData);
      } else {
        setError("Project not found");
      }
    } catch (err) {
      setError("Failed to load project");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50/50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-cyan-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">
            {error || "Project not found"}
          </p>
          <a
            href={`/admin/portfolio`}
            className="text-cyan-600 hover:underline"
          >
            Back to projects
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50/50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">
            Edit Portfolio Project
          </h1>
          <p className="text-gray-600">Update project details</p>
        </div>

        <PortfolioForm mode="edit" initialData={project} />
      </div>
    </div>
  );
}
