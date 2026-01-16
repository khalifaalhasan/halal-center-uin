export function PostListSkeleton() {
  // Kita buat array dummy isi 4 item biar terlihat ada list loading
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col h-full bg-white border border-slate-100 rounded-2xl overflow-hidden"
        >
          {/* Image Skeleton */}
          <div className="w-full h-48 bg-slate-200 animate-pulse" />

          {/* Content Skeleton */}
          <div className="p-6 flex flex-col flex-1 space-y-3">
            <div className="flex gap-2">
              <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
              <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
            </div>
            <div className="h-6 w-3/4 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
