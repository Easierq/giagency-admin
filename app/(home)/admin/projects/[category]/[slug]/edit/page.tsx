"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { fetchProjectBySlug } from "@/lib/api/services";
import { parseProjectForForm } from "@/lib/utils/form-helpers";
import { ServiceCategory } from "@/types/api";
import { Loader2 } from "lucide-react";

export default function EditProjectPage() {
  const params = useParams();
  const category = params.category as ServiceCategory;
  const slug = params.slug as string;

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProject();
  }, [category, slug]);

  async function loadProject() {
    try {
      setLoading(true);
      const response = await fetchProjectBySlug(category, slug);

      if (response.success && response.data) {
        const formData = parseProjectForForm(response.data);
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

  const categoryName = category
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50/50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-cyan-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading project...</p>
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
            href={`/admin/${category}`}
            className="text-cyan-600 hover:underline"
          >
            Back to projects
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-[3%] lg:px-[7%] py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Edit {categoryName} Project
          </h1>
          <p className="text-gray-600">Update the project details below</p>
        </div>

        {/* Form */}
        <ProjectForm category={category} initialData={project} mode="edit" />
      </div>
    </div>
  );
}
