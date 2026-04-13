import AdminFooter from "@/components/layout/AdminFooter";
import AdminNavbar from "@/components/layout/AdminNavbar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      <main className="flex-grow">{children}</main>
      <AdminFooter />
    </div>
  );
}
