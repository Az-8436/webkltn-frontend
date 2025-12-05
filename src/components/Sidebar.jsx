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

import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Icon({ name, className = "w-5 h-5" }) {
  const icons = {
    dashboard: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M3 13h8V3H3v10zM3 21h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    // Icon mới cho Chẩn đoán: Nhịp tim
    pulse: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    // Icon mới cho Hồ sơ: Tập tài liệu có dấu cộng
    fileMedical: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 14h4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12v4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    records: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M8 7V3h8v4M4 21h16V7H4v14z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    logout: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <path d="M16 17l5-5-5-5" />
        <path d="M21 12H9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };

  return icons[name] || null;
}

export default function Sidebar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("role");
    setRole(stored);
  }, []);

  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-[#07263a] via-[#0c3b52] to-[#07263a] text-white p-5 flex flex-col border-r border-white/5 shadow-xl">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5">
          <span className="text-cyan-300 font-extrabold text-lg">🏥</span>
          <span className="text-sm font-semibold tracking-wide text-cyan-100">HealthAI</span>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {/* <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
              isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
            }`
          }
        >
          <Icon name="dashboard" />
          <span className="text-sm font-medium">Dashboard</span>
        </NavLink> */}

        {/* 👇 Đã đổi icon thành 'pulse' (Nhịp tim) */}
        {/* <NavLink
          to="/chan-doan"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
              isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
            }`
          }
        >
          <Icon name="pulse" />
          <span className="text-sm font-medium">Chẩn đoán</span>
        </NavLink> */}

        {role === "admin" && (
          <>
            {/* 👇 Đã đổi icon thành 'fileMedical' (Hồ sơ) */}
            <NavLink
              to="/dashboard-chatbot"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
                  isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
                }`
              }
            >
              <Icon name="dashboard" />
              <span className="text-sm font-medium">Dashboard</span>
            </NavLink>

          <NavLink
          to="/chan-doan"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
              isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
            }`
          }
        >
          <Icon name="pulse" />
          <span className="text-sm font-medium">Chẩn đoán</span>
        </NavLink>
            <NavLink
              to="/ho-so-benh-an"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
                  isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
                }`
              }
            >
              <Icon name="fileMedical" />
              <span className="text-sm font-medium">Hồ sơ bệnh án</span>
            </NavLink>
            
          </>
        )}
{role === "doctor" && (
          <>
            {/* 👇 Đã đổi icon thành 'fileMedical' (Hồ sơ) */}
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
                  isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
                }`
              }
            >
              <Icon name="dashboard" />
              <span className="text-sm font-medium">Dashboard</span>
            </NavLink>

          <NavLink
          to="/chan-doan"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
              isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
            }`
          }
        >
          <Icon name="pulse" />
          <span className="text-sm font-medium">Chẩn đoán</span>
        </NavLink>
            <NavLink
              to="/ho-so-benh-an"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
                  isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
                }`
              }
            >
              <Icon name="fileMedical" />
              <span className="text-sm font-medium">Hồ sơ bệnh án</span>
            </NavLink>
          </>
        )}
        <NavLink
          to="/lich-su-kham"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
              isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
            }`
          }
        >
          <Icon name="records" />
          <span className="text-sm font-medium">Lịch sử khám</span>
        </NavLink>

      </nav>

      <div className="mt-auto">
        <button
          onClick={() => {
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("role");
            navigate("/login");
          }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-300 hover:bg-white/5 transition-colors"
        >
          <Icon name="logout" />
          <span className="text-sm font-medium">Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}

// import { NavLink, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// function Icon({ name, className = "w-5 h-5" }) {
//   const icons = {
//     dashboard: (
//       <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <path d="M3 13h8V3H3v10zM3 21h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     ),
//     pulse: (
//       <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     ),
//     fileMedical: (
//       <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//         <path d="M14 2v6h6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//         <path d="M10 14h4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//         <path d="M12 12v4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
//         {/* --- 1. DASHBOARD CHUNG (Tự đổi tên theo Role) --- */}
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
//               isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
//             }`
//           }
//         >
//           <Icon name="dashboard" />
//           <span className="text-sm font-medium">
//             {/* Nếu là admin thì hiện tên khác, còn lại hiện Dashboard */}
//             {role === "admin" ? "Dashboard & Chatbot" : "Dashboard"}
//           </span>
//         </NavLink>

//         {/* --- 2. CHẨN ĐOÁN --- */}
//         <NavLink
//           to="/chan-doan"
//           className={({ isActive }) =>
//             `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
//               isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
//             }`
//           }
//         >
//           <Icon name="pulse" />
//           <span className="text-sm font-medium">Chẩn đoán</span>
//         </NavLink>

//         {/* --- 3. HỒ SƠ BỆNH ÁN (Đã bỏ chặn Admin để Doctor cũng thấy) --- */}
//         <NavLink
//           to="/ho-so-benh-an"
//           className={({ isActive }) =>
//             `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
//               isActive ? "bg-white/10 text-cyan-200" : "hover:bg-white/5"
//             }`
//           }
//         >
//           <Icon name="fileMedical" />
//           <span className="text-sm font-medium">Hồ sơ bệnh án</span>
//         </NavLink>

//         {/* --- 4. LỊCH SỬ KHÁM --- */}
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

//         {/* --- ĐÃ XÓA MỤC "Dashboard With Chatbot" RIÊNG LẺ --- */}
//         {/* Vì App.js đã tự chuyển hướng ở link "/" rồi nên không cần link riêng nữa */}
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