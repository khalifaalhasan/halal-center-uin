export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full space-y-4">
      <div className="flex items-center space-x-2">
        {/* Dot 1 */}
        <div className="h-4 w-4 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        {/* Dot 2 */}
        <div className="h-4 w-4 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        {/* Dot 3 */}
        <div className="h-4 w-4 bg-indigo-400 rounded-full animate-bounce"></div>
      </div>

      <span className="text-sm font-medium text-slate-500">
        Menyiapkan halaman...
      </span>
    </div>
  );
}
