export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] w-full">
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-12 h-12 rounded-full border-4 border-slate-200"></div>
        {/* Inner Spinner */}
        <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
      <span className="ml-3 text-slate-500 font-medium animate-pulse">
        Memuat data...
      </span>
    </div>
  );
}
