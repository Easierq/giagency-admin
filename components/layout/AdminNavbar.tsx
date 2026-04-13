import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "./logo";

export default function AdminNavbar() {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-[3%] lg:px-[7%]">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          {/* <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl md:text-3xl font-bold text-green-700">
              iBetaAgency
            </span>
          </Link> */}
          <Logo />
          {/* CTA Button */}
          <Link
            href="/admin"
            className="bg-green-600 hover:bg-green-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-sm md:rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
