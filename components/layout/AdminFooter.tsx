import Link from "next/link";
// import { Shield } from "lucide-react";

export default function AdminFooter() {
  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200">
      <div className="container mx-auto px-[3%] lg:px-[7%] py-4">
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-base font-bold text-slate-700">GIAGENCY</span>
          </Link>

          <p className="text-sm text-slate-700">
            © {new Date().getFullYear()} Admin Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
