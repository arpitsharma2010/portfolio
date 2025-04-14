import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/header/Header.tsx"; // Corrected import

interface LayoutProps {
  children: React.ReactNode;
  url: string;
}

const MainLayout: React.FC<LayoutProps> = ({ children, url }) => {
  return (
    <div className="flex min-h-screen lg:flex-row flex-col overflow-hidden bg-[#0f172a] text-white">
      <Header url={url} />
      <div className="flex flex-col flex-grow w-full lg:ml-[280px] overflow-y-auto transition-colors duration-300">
        <main className="w-full flex-grow text-center">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;