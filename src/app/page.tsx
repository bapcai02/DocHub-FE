import MainLayout from '@/components/Home/MainLayout';
import Sidebar from '@/components/Home/Sidebar';
import CardGrid from '@/components/Home/CardGrid';
import Filters from '@/components/Home/Filters';

export default function Home() {
  return (
    <MainLayout>
      <Sidebar />
      <section className="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden text-white">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-extrabold mb-2">Browse all</h1>
          <p className="text-gray-400 text-xs sm:text-sm mb-4">
            Open-Source UI elements made with CSS or Tailwind
          </p>
          <Filters />
        </div>
        <CardGrid />
      </section>
    </MainLayout>
  );
}