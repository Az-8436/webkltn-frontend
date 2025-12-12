
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function Dashboard() {
  const [chartData, setChartData] = useState([]); // Dữ liệu biểu đồ
  const [stats, setStats] = useState({ total: 0, diabetes: 0, hypertension: 0 }); // Số liệu tổng
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState("");

  // 🔹 Hàm gọi API thật từ Backend
  const fetchData = async () => {
    try {
      const res = await fetch("https://webkltn-backend.onrender.com/api/dashboard");
      const data = await res.json();

      if (data.status === "success") {
        setStats(data.summary);       // Lưu số liệu tổng
        setChartData(data.chart_data); // Lưu dữ liệu biểu đồ
        setLastUpdate(new Date().toLocaleString("vi-VN"));
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6 p-6 min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-extrabold mb-2">
          🏥 Dashboard Quản Lý Bệnh Án
        </h1>
        <p className="text-white/80 text-sm">
          Hệ thống AI hỗ trợ chẩn đoán bệnh tiểu đường và tăng huyết áp
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
           <p className="text-gray-500 font-medium animate-pulse">⏳ Đang tải thống kê từ MongoDB...</p>
        </div>
      ) : (
        <>
          {/* Thống kê nhanh (Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
                title="Tổng số ca khám" 
                value={stats.total} 
                icon="📋" 
                bg="bg-blue-50" 
                textColor="text-blue-700" 
            />
            <StatCard 
                title="Phát hiện Tiểu đường" 
                value={stats.diabetes} 
                icon="🩸" 
                bg="bg-red-50" 
                textColor="text-red-600" 
            />
            {/* Nếu bé chưa có model huyết áp thì số này sẽ là 0, sau này có model thì nó tự nhảy số nhé */}
            <StatCard 
                title="Phát hiện Huyết áp cao" 
                value={stats.hypertension} 
                icon="❤️" 
                bg="bg-orange-50" 
                textColor="text-orange-600" 
            />
          </div>

          {/* Biểu đồ */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  📊 Xu hướng bệnh theo ngày
                </h2>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                   Cập nhật: {lastUpdate}
                </span>
            </div>
            
            {chartData.length > 0 ? (
                <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                        cursor={{ fill: '#f3f4f6' }}
                    />
                    <Legend />
                    <Bar dataKey="diabetes" name="Tiểu đường" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
                    <Bar dataKey="hypertension" name="Huyết áp cao" fill="#f97316" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
                </div>
            ) : (
                <div className="text-center py-10 text-gray-400">
                    Chưa có dữ liệu để vẽ biểu đồ
                </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// 🧩 Component thẻ thống kê đẹp hơn
function StatCard({ title, value, icon, bg, textColor }) {
  return (
    <div className={`${bg} rounded-xl p-6 shadow-sm border border-transparent hover:border-gray-200 transition duration-300 flex items-center justify-between`}>
      <div>
        <p className="text-gray-500 font-medium text-sm mb-1">{title}</p>
        <p className={`text-4xl font-extrabold ${textColor}`}>{value}</p>
      </div>
      <div className="text-4xl opacity-80 grayscale group-hover:grayscale-0 transition">
        {icon}
      </div>
    </div>
  );
}
//===============================================================================================================================
// import { useState, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// export default function Dashboard() {
//   const [chartData, setChartData] = useState([]);
//   const [stats, setStats] = useState({ total: 0, diabetes: 0, hypertension: 0 });
//   const [loading, setLoading] = useState(true);
//   const [lastUpdate, setLastUpdate] = useState("");

//   const fetchData = async () => {
//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/dashboard");
//       const data = await res.json();

//       if (data.status === "success") {
//         setStats(data.summary);
//         setChartData(data.chart_data);
//         setLastUpdate(new Date().toLocaleString("vi-VN"));
//       }
//     } catch (error) {
//       console.error("Lỗi:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="space-y-8 p-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
//       {/* HEADER */}
//       <div className="bg-white mb-6 p-8 rounded-3xl shadow-xl border border-gray-100">
//         <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
//           🏥 Dashboard Quản lý bệnh án AI
//         </h1>
//         <p className="text-gray-500 mt-2">
//           Hệ thống thống kê bệnh nhân theo thời gian thực
//         </p>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-52">
//           <div className="rounded-full border-4 border-gray-300 border-t-indigo-500 w-12 h-12 animate-spin"></div>
//         </div>
//       ) : (
//         <>
//           {/* CARDS */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <StatCard title="Tổng số ca khám" value={stats.total} icon="🧾" color="blue" />
//             <StatCard title="Phát hiện Tiểu đường" value={stats.diabetes} icon="🩸" color="rose" />
//             <StatCard title="Huyết áp cao" value={stats.hypertension} icon="❤️" color="orange" />
//           </div>

//           {/* BIỂU ĐỒ */}
//           <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-bold flex gap-2 items-center text-gray-700">
//                 📊 Xu hướng bệnh theo ngày
//               </h2>
//               <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
//                 Cập nhật: {lastUpdate}
//               </span>
//             </div>

//             {chartData.length > 0 ? (
//               <div className="w-full h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={chartData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="diabetes" fill="#ef4444" radius={[6, 6, 0, 0]} barSize={40} />
//                     <Bar dataKey="hypertension" fill="#fb923c" radius={[6, 6, 0, 0]} barSize={40} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             ) : (
//               <p className="text-gray-400 text-center py-10">
//                 Chưa có dữ liệu
//               </p>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// function StatCard({ title, value, icon, color }) {
//   const cls = {
//     blue: "from-blue-500 to-blue-600",
//     rose: "from-rose-500 to-rose-600",
//     orange: "from-orange-500 to-orange-600",
//   };

//   return (
//     <div className="group relative bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition duration-300">
//       <div className="text-4xl absolute -top-3 right-3 opacity-30 group-hover:opacity-40">
//         {icon}
//       </div>
//       <p className="text-gray-500 text-sm mb-2">{title}</p>
//       <p className={`text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${cls[color]}`}>
//         {value}
//       </p>
//     </div>
//   );
// }

// import { NavLink, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// function Icon({ name, className = "w-5 h-5" }) {
//   const icons = {
//     dashboard: (
//       <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <path d="M3 13h8V3H3v10zM3 21h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     ),
//     patient: (
//       <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM6 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     ),
//     camera: (
//       <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <path d="M4 7h3l2-3h6l2 3h3a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//         <circle cx="12" cy="13" r="4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     ),
//     stats: (
//       <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <path d="M12 20V10M18 20V4M6 20v-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     ),
//     stetho: (
//       <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <path d="M8 7a4 4 0 1 1 8 0v6a4 4 0 1 1-8 0V7z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     ),
//     records: (
//       <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <path d="M8 7V3h8v4M4 21h16V7H4v14z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     ),
//     logout: (
//       <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//         <path d="M16 17l5-5-5-5" />
//         <path d="M21 12H9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     ),
//   };

//   return icons[name] || null;
// }

// export default function Sidebar() {
//   const navigate = useNavigate();
//   const [role, setRole] = useState(null);

//   useEffect(() => {
//     const stored = localStorage.getItem("role");
//     setRole(stored);
//   }, []);

//   return (
//     <aside className="h-screen w-64 bg-gradient-to-b from-[#07263a] via-[#0c3b52] to-[#07263a] text-white p-5 flex flex-col border-r border-white/5 shadow-xl">
//       <div className="mb-6 text-center">
//         <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5">
//           <span className="text-cyan-300 font-extrabold text-lg">🏥</span>
//           <span className="text-sm font-semibold tracking-wide text-cyan-100">HealthAI</span>
//         </div>
//       </div>

//       <nav className="flex-1 space-y-2">

//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
//               isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
//             }`
//           }
//         >
//           <Icon name="dashboard" />
//           <span className="text-sm font-medium">Dashboard</span>
//         </NavLink>

//         {/* <NavLink
//           to="/benh-nhan"
//           className={({ isActive }) =>
//             `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
//               isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
//             }`
//           }
//         >
//           <Icon name="patient" />
//           <span className="text-sm font-medium">Quản lý bệnh nhân</span>
//         </NavLink> */}

//         {/* 🔥 Trang CHẨN ĐOÁN mới */}
//         <NavLink
//           to="/chan-doan"
//           className={({ isActive }) =>
//             `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
//               isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
//             }`
//           }
//         >
//           <Icon name="stetho" />
//           <span className="text-sm font-medium">Chẩn đoán</span>
//         </NavLink>

//         {/* <NavLink
//           to="/phan-tich-anh"
//           className={({ isActive }) =>
//             `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
//               isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
//             }`
//           }
//         >
//           <Icon name="camera" />
//           <span className="text-sm font-medium">Phân tích ảnh (AI)</span>
//         </NavLink> */}

//         {role === "admin" && (
//           <>
//             <NavLink
//               to="/thong-ke-nang-cao"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
//                   isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
//                 }`
//               }
//             >
//               <Icon name="stats" />
//               <span className="text-sm font-medium">Thống kê nâng cao</span>
//             </NavLink>

//             <NavLink
//               to="/ho-so-benh-an"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
//                   isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
//                 }`
//               }
//             >
//               <Icon name="stetho" />
//               <span className="text-sm font-medium">Hồ sơ bệnh án</span>
//             </NavLink>
//           </>
//         )}

//         <NavLink
//           to="/lich-su-kham"
//           className={({ isActive }) =>
//             `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
//               isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
//             }`
//           }
//         >
//           <Icon name="records" />
//           <span className="text-sm font-medium">Lịch sử khám</span>
//         </NavLink>
//       </nav>

//       <div className="mt-auto">
//         <button
//           onClick={() => {
//             localStorage.removeItem("loggedIn");
//             localStorage.removeItem("role");
//             navigate("/login");
//           }}
//           className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-300 hover:bg-white/5 transition-colors"
//         >
//           <Icon name="logout" />
//           <span className="text-sm font-medium">Đăng xuất</span>
//         </button>
//       </div>
//     </aside>
//   );
// }
// import { NavLink, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// function Icon({ name, className = "w-5 h-5" }) {
//   const icons = {
//     dashboard: (
//       <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <path d="M3 13h8V3H3v10zM3 21h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     ),
//     patient: (
//       <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM6 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     ),
//     camera: (
//       <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <path d="M4 7h3l2-3h6l2 3h3a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//         <circle cx="12" cy="13" r="4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     ),
//     stats: (
//       <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <path d="M12 20V10M18 20V4M6 20v-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     ),
//     stetho: (
//       <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <path d="M8 7a4 4 0 1 1 8 0v6a4 4 0 1 1-8 0V7z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     ),
//     records: (
//       <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <path d="M8 7V3h8v4M4 21h16V7H4v14z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     ),
//     logout: (
//       <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//         <path d="M16 17l5-5-5-5" />
//         <path d="M21 12H9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     ),
//   };

//   return icons[name] || null;
// }

// export default function Sidebar() {
//   const navigate = useNavigate();
//   const [role, setRole] = useState(null);

//   useEffect(() => {
//     const stored = localStorage.getItem("role");
//     setRole(stored);
//   }, []);

//   return (
//     <aside className="h-screen w-64 bg-gradient-to-b from-[#07263a] via-[#0c3b52] to-[#07263a] text-white p-5 flex flex-col border-r border-white/5 shadow-xl">
//       <div className="mb-6 text-center">
//         <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5">
//           <span className="text-cyan-300 font-extrabold text-lg">🏥</span>
//           <span className="text-sm font-semibold tracking-wide text-cyan-100">HealthAI</span>
//         </div>
//       </div>

//       <nav className="flex-1 space-y-2">

//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
//               isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
//             }`
//           }
//         >
//           <Icon name="dashboard" />
//           <span className="text-sm font-medium">Dashboard</span>
//         </NavLink>

//         {/* 🔥 Trang CHẨN ĐOÁN mới */}
//         <NavLink
//           to="/chan-doan"
//           className={({ isActive }) =>
//             `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
//               isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
//             }`
//           }
//         >
//           <Icon name="stetho" />
//           <span className="text-sm font-medium">Chẩn đoán</span>
//         </NavLink>

//         {role === "admin" && (
//           <>
//             {/* Đã xóa Thống kê nâng cao ở đây */}
            
//             <NavLink
//               to="/ho-so-benh-an"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
//                   isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
//                 }`
//               }
//             >
//               <Icon name="stetho" />
//               <span className="text-sm font-medium">Hồ sơ bệnh án</span>
//             </NavLink>
//           </>
//         )}

//         <NavLink
//           to="/lich-su-kham"
//           className={({ isActive }) =>
//             `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
//               isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
//             }`
//           }
//         >
//           <Icon name="records" />
//           <span className="text-sm font-medium">Lịch sử khám</span>
//         </NavLink>
//       </nav>

//       <div className="mt-auto">
//         <button
//           onClick={() => {
//             localStorage.removeItem("loggedIn");
//             localStorage.removeItem("role");
//             navigate("/login");
//           }}
//           className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-300 hover:bg-white/5 transition-colors"
//         >
//           <Icon name="logout" />
//           <span className="text-sm font-medium">Đăng xuất</span>
//         </button>
//       </div>
//     </aside>
//   );
// }

// import { useState, useEffect, useRef } from "react";
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend
// } from "recharts";
// import { MessageCircle, X, Send, Bot } from "lucide-react"; // Icon đẹp

// export default function GlucoseHealth() {
//   // --- STATE QUẢN LÝ DỮ LIỆU ---
//   const [history, setHistory] = useState([]);
//   const [inputData, setInputData] = useState({
//     value: "",
//     type: "fasting", // Mặc định là 'fasting' (Lúc đói)
//     note: ""
//   });
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // --- LOGIC 1: ĐÁNH GIÁ SỨC KHỎE ---
//   const analyzeGlucose = (val, type) => {
//     const value = parseInt(val);
//     if (!value) return null;
//     let result = { status: "", msg: "", color: "" };

//     if (type === "fasting") {
//       if (value < 70) result = { status: "HẠ ĐƯỜNG HUYẾT", msg: "Cần nạp đường ngay! Quá thấp.", color: "bg-red-100 text-red-700 border-red-500" };
//       else if (value <= 130) result = { status: "AN TOÀN", msg: "Đường huyết kiểm soát tốt.", color: "bg-green-100 text-green-700 border-green-500" };
//       else result = { status: "CAO", msg: "Cảnh báo! Cao hơn mức an toàn lúc đói.", color: "bg-orange-100 text-orange-700 border-orange-500" };
//     } else {
//       if (value < 140) result = { status: "TỐT", msg: "Cơ thể dung nạp tốt.", color: "bg-green-100 text-green-700 border-green-500" };
//       else if (value <= 180) result = { status: "CHẤP NHẬN ĐƯỢC", msg: "Cần chú ý giảm tinh bột.", color: "bg-yellow-100 text-yellow-700 border-yellow-500" };
//       else result = { status: "NGUY HIỂM", msg: "Đường huyết sau ăn tăng quá cao.", color: "bg-red-100 text-red-700 border-red-500" };
//     }
//     return result;
//   };

//   // --- LOGIC 2: GỌI API ---
//   const fetchHistory = async () => {
//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/glucose/history");
//       const data = await res.json();
//       setHistory(data.data);
//     } catch (error) { console.error("Lỗi tải lịch sử:", error); }
//   };

//   useEffect(() => { fetchHistory(); }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!inputData.value) return;

//     const result = analyzeGlucose(inputData.value, inputData.type);
//     setAnalysisResult(result);
//     setLoading(true);

//     try {
//       await fetch("http://127.0.0.1:8000/api/glucose/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           value: parseInt(inputData.value),
//           measure_type: inputData.type,
//           note: inputData.note,
//           created_at: new Date().toLocaleString("vi-VN")
//         }),
//       });
//       await fetchHistory();
//       setInputData({ ...inputData, value: "", note: "" }); 
//     } catch (error) { alert("Lỗi khi lưu dữ liệu!"); } 
//     finally { setLoading(false); }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 font-sans relative">
//       {/* Header */}
//       <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">🩸 Sổ Tay Đường Huyết Thông Minh</h1>
//           <p className="text-gray-500 text-sm">Theo dõi & Hỏi đáp cùng bác sĩ AI</p>
//         </div>
//         <div className="text-right hidden sm:block">
//           <div className="flex gap-4 text-xs font-bold mt-1">
//             <span className="text-green-600 bg-green-50 px-2 py-1 rounded">Đói: 70-130</span>
//             <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded">Sau ăn: &lt;180</span>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 pb-24"> {/* Thêm padding bottom để không bị chat che */}
        
//         {/* CỘT TRÁI: NHẬP LIỆU */}
//         <div className="space-y-6">
//           <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-50">
//             <h2 className="text-lg font-bold text-indigo-900 mb-4">📝 Nhập kết quả mới</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Chọn thời điểm */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Thời điểm đo</label>
//                 <div className="grid grid-cols-2 gap-3">
//                   <button type="button" onClick={() => setInputData({...inputData, type: 'fasting'})}
//                     className={`p-3 rounded-lg border text-sm font-bold transition ${inputData.type === 'fasting' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-500 hover:bg-gray-50'}`}>
//                     🌙 Lúc đói
//                   </button>
//                   <button type="button" onClick={() => setInputData({...inputData, type: 'after_meal'})}
//                     className={`p-3 rounded-lg border text-sm font-bold transition ${inputData.type === 'after_meal' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-500 hover:bg-gray-50'}`}>
//                     🍜 Sau ăn 2h
//                   </button>
//                 </div>
//               </div>

//               {/* Nhập số */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">Chỉ số (mg/dL)</label>
//                 <div className="relative">
//                   <input type="number" value={inputData.value} onChange={(e) => setInputData({...inputData, value: e.target.value})}
//                     className="w-full p-4 text-3xl font-bold text-center text-gray-800 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none" placeholder="---" required />
//                   <span className="absolute right-4 top-6 text-gray-400 font-medium">mg/dL</span>
//                 </div>
//               </div>

//               <button type="submit" disabled={loading} className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-bold shadow-lg transition transform active:scale-95">
//                 {loading ? "Đang lưu..." : "KIỂM TRA NGAY"}
//               </button>
//             </form>
//           </div>

//           {/* KẾT QUẢ PHÂN TÍCH */}
//           {analysisResult && (
//             <div className={`p-6 rounded-2xl border-l-8 shadow-md animate-bounce-in ${analysisResult.color}`}>
//               <h3 className="text-xs font-bold opacity-70 uppercase">Kết quả phân tích</h3>
//               <div className="text-2xl font-extrabold mt-1">{analysisResult.status}</div>
//               <p className="font-medium">{analysisResult.msg}</p>
//             </div>
//           )}
//         </div>

//         {/* CỘT PHẢI: BIỂU ĐỒ */}
//         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col h-[500px]">
//           <h2 className="text-lg font-bold text-gray-800 mb-4">📈 Xu hướng gần đây</h2>
//           <div className="flex-1">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={history} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
//                 <CartesianGrid stroke="#f5f5f5" vertical={false} />
//                 <XAxis dataKey="created_at" tick={{fontSize: 10}} tickFormatter={(tick) => tick.split(" ")[0]} />
//                 <YAxis domain={[0, 'auto']} tick={{fontSize: 10}} />
//                 <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
//                 <ReferenceLine y={130} stroke="green" strokeDasharray="3 3" />
//                 <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: "#4f46e5", strokeWidth: 2, stroke: "#fff" }} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
          
//           <div className="mt-4 pt-4 border-t h-32 overflow-y-auto custom-scrollbar">
//               {history.slice().reverse().map((item, idx) => (
//                   <div key={idx} className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded mb-1">
//                       <span className="font-bold text-gray-700">{item.value} <span className="text-xs font-normal text-gray-400">mg/dL</span></span>
//                       <span className={`text-xs px-2 py-0.5 rounded ${item.measure_type === 'fasting' ? 'bg-indigo-100 text-indigo-700' : 'bg-purple-100 text-purple-700'}`}>
//                           {item.measure_type === 'fasting' ? 'Đói' : 'Sau ăn'}
//                       </span>
//                   </div>
//               ))}
//           </div>
//         </div>
//       </div>

//       {/* --- WIDGET CHATBOT (TÍCH HỢP SẴN) --- */}
//       <AIChatWidget currentGlucose={parseInt(inputData.value)} measureType={inputData.type} />
//     </div>
//   );
// }

// // --- SUB-COMPONENT: CHATBOT ---
// function AIChatWidget({ currentGlucose, measureType }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Xin chào! Mình là trợ lý AI. Bạn cần tư vấn thực đơn không? 🥗" }
//   ]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);

//   useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

//   const handleSend = async () => {
//     if (!input.trim()) return;
//     const userMsg = input;
//     setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
//     setInput("");
//     setIsTyping(true);

//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/chat/advice", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           question: userMsg,
//           glucose_value: currentGlucose || 0,
//           measure_type: measureType || "fasting"
//         }),
//       });
//       const data = await res.json();
//       setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
//     } catch (error) {
//       setMessages(prev => [...prev, { sender: "bot", text: "Lỗi kết nối server rồi ạ! 😢" }]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
//       {/* Cửa sổ Chat */}
//       {isOpen && (
//         <div className="bg-white w-80 sm:w-96 h-[450px] rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden mb-4 animate-fade-in-up">
//           <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex justify-between items-center shadow-md">
//             <div className="flex items-center gap-2">
//               <Bot size={24} />
//               <div>
//                 <h3 className="font-bold text-sm">Trợ lý Dinh Dưỡng AI</h3>
//                 {currentGlucose > 0 && <p className="text-[10px] text-indigo-100 bg-white/20 px-2 py-0.5 rounded-full inline-block">Đang xem xét mức: {currentGlucose}</p>}
//               </div>
//             </div>
//             <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition"><X size={18} /></button>
//           </div>

//           <div className="flex-1 p-3 overflow-y-auto bg-slate-50 space-y-3">
//             {messages.map((msg, i) => (
//               <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
//                 <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === "user" ? "bg-indigo-600 text-white rounded-br-none" : "bg-white border text-gray-700 rounded-bl-none shadow-sm"}`}>
//                   {msg.text}
//                 </div>
//               </div>
//             ))}
//             {isTyping && (
//                <div className="flex justify-start">
//                  <div className="bg-gray-200 p-3 rounded-2xl rounded-bl-none text-xs text-gray-500 italic flex items-center gap-1">
//                    AI đang nhập <span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span>
//                  </div>
//                </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           <div className="p-3 bg-white border-t flex gap-2">
//             <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()}
//               placeholder="Hỏi về món ăn..." className="flex-1 p-2 bg-gray-100 rounded-lg outline-none text-sm focus:ring-1 focus:ring-indigo-500" />
//             <button onClick={handleSend} disabled={isTyping} className="bg-indigo-600 text-white p-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
//               <Send size={18} />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Nút Mở Chat */}
//       <button onClick={() => setIsOpen(!isOpen)} 
//         className={`${isOpen ? 'rotate-90 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'} transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 group`}>
//         <MessageCircle size={28} />
//         <span className="font-bold pr-1 max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap">Hỏi Bác sĩ</span>
//       </button>
//     </div>
//   );
// }


