import React from 'react';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-lg font-bold">DocHub</h1>
      </header>
      <main className="flex-1 p-4">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} DocHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;