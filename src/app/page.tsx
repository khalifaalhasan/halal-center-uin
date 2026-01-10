// app/page.tsx
import { getServices } from "@/data/services";


export default async function Home() {
  // 1. Fetch data langsung di sini (Server Side)
  const services = await getServices();

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Layanan Halal Center</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service.id} className="border p-4 rounded-lg shadow hover:shadow-md transition">
              <div className="text-4xl mb-2">{service.icon}</div> {/* Asumsi icon emoji/string */}
              <h2 className="text-xl font-semibold">{service.title}</h2>
              <p className="text-gray-600 mt-2">{service.description}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            Belum ada layanan yang tersedia.
          </p>
        )}
      </div>
    </main>
  );
}