import { PortfolioForm } from "@/components/admin/PortfolioForm";

export default function NewPortfolioProjectPage() {
  return (
    <div className="min-h-screen bg-green-50/50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">
            Create New Portfolio Project
          </h1>
          <p className="text-gray-600">
            Add a new project to your portfolio showcase
          </p>
        </div>

        <PortfolioForm mode="create" />
      </div>
    </div>
  );
}
