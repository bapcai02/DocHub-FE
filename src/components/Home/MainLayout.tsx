import Header from './Header';
import Footer from './Footer';
import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      <main className="flex-1 flex flex-col sm:flex-row overflow-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
}