import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { MobileFilter } from "@/components/blog/mobile-filter";
import { PageHeader } from "@/components/ui/page-header";
import { getCategories } from "@/services/post-service";

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  const categories = await getCategories();
  return (
    <>
      <PageHeader
        title="Artikel & Berita"
        description="Update tebaru seputar regulasi dan industri halal"
        breadcrumbs={[{ label: "Blog" }]}
      />

      <div className="bg-slate-50 min-h-screen py-8 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- MOBILE FILTER (Visible on Mobile Only) --- */}
          {/* Kita oper data kategori ke client component ini */}
          <MobileFilter categories={categories} />

          {/* GRID LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* MAIN CONTENT */}
            <main className="lg:col-span-8">{children}</main>

            {/* SIDEBAR DESKTOP (Hidden on Mobile) */}
            <aside className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-24">
                <BlogSidebar />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
