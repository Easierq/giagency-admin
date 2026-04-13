import Link from "next/link";
import {
  Shield,
  BarChart3,
  Users,
  Settings,
  FileText,
  ArrowRight,
} from "lucide-react";

export default function AdminLandingPage() {
  return (
    <div className="min-h-screen bg-green-50/50">
      {/* Hero Section */}
      <section className="container mx-auto px-[3%] lg:px-[7%] py-20 pt-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Manage Your Portfolio
            <span className="text-green-600"> With Ease</span>
          </h1>

          <p className="text-xl text-slate-600 mb-10">
            Powerful content management system to handle all your projects,
            services, and portfolio content in one place.
          </p>

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Access Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-[3%] lg:px-[7%] py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: FileText,
              title: "Content Management",
              description: "Manage all your portfolio projects easily",
              color: "bg-blue-100 text-blue-600",
            },
            {
              icon: BarChart3,
              title: "Analytics Dashboard",
              description: "Track performance and engagement",
              color: "bg-green-100 text-green-600",
            },
            {
              icon: Users,
              title: "User Management",
              description: "Control access and permissions",
              color: "bg-purple-100 text-purple-600",
            },
            {
              icon: Settings,
              title: "Easy Configuration",
              description: "Customize settings to your needs",
              color: "bg-orange-100 text-orange-600",
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-slate-200"
              >
                <div
                  className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-[3%] lg:px-[7%] py-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Access your admin dashboard and start managing your content
          </p>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
          >
            Open Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
