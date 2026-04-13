import { PortfolioForm } from "@/components/admin/PortfolioForm";
import { notFound } from "next/navigation";

async function getProject(slug: string) {
  const res = await fetch(`/api/portfolio/${slug}`, { cache: "no-store" });

  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
}

export default async function EditPortfolioProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  // Format data for form
  const formattedProject = {
    ...project,
    completionDate: project.completionDate
      ? new Date(project.completionDate).toISOString().split("T")[0]
      : "",
    images: project.images || [],
    techStack: project.techStack || [],
    features: project.features || [],
    tools: project.tools || [],
    platforms: project.platforms || [],
  };

  return (
    <div className="min-h-screen bg-green-50/50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">
            Edit Portfolio Project
          </h1>
          <p className="text-gray-600">Update project details</p>
        </div>

        <PortfolioForm mode="edit" initialData={formattedProject} />
      </div>
    </div>
  );
}
