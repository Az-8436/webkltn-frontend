import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Menu, X } from "lucide-react";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* 1. MOBILE HEADER: Chỉ hiện trên màn hình nhỏ (md:hidden) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#07263a] text-white flex items-center justify-between px-4 z-50 shadow-md">
        <div className="font-bold text-lg flex items-center gap-2">
          <span>🏥</span> HealthAI
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1 rounded-md hover:bg-white/10 transition"
        >
          {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 2. SIDEBAR:
          - Mobile: Fixed full chiều cao, ẩn/hiện bằng translate-x
          - Desktop (md): Static (chiếm chỗ), luôn hiện
      */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out shadow-xl
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:inset-auto md:flex`}
      >
        <Sidebar />
      </div>

      {/* 3. OVERLAY: Làm tối màn hình khi mở menu trên mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* 4. MAIN CONTENT */}
      {/* pt-20 để tránh bị Header che mất nội dung trên mobile */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[url('/nen.png')] bg-no-repeat bg-cover bg-fixed pt-20 md:pt-6">
        {children}
      </main>
    </div>
  );
}