import { ProjectForm } from "@/components/admin/ProjectForm";
import { ServiceCategory } from "@/types/api";

export default function NewProjectPage({
  params,
}: {
  params: { category: ServiceCategory };
}) {
  const categoryName = params.category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen bg-green-50/50">
      <div className="container mx-auto px-[3%] lg:px-[7%] py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">
            Create New {categoryName} Project
          </h1>
          <p className="text-gray-600">
            Fill in the details below to add a new project to your portfolio
          </p>
        </div>

        {/* Form */}
        <ProjectForm category={params.category} mode="create" />
      </div>
    </div>
  );
}
