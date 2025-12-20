
// // import { useState, useEffect } from "react";
// // import {
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   ResponsiveContainer,
// //   Legend
// // } from "recharts";

// // export default function Dashboard() {
// //   const [chartData, setChartData] = useState([]); // Dữ liệu biểu đồ
// //   const [stats, setStats] = useState({ total: 0, diabetes: 0, hypertension: 0 }); // Số liệu tổng
// //   const [loading, setLoading] = useState(true);
// //   const [lastUpdate, setLastUpdate] = useState("");

// //   // 🔹 Hàm gọi API thật từ Backend
// //   const fetchData = async () => {
// //     try {
// //       const res = await fetch("https://webkltn-backend.onrender.com/api/dashboard");
// //       const data = await res.json();

// //       if (data.status === "success") {
// //         setStats(data.summary);       // Lưu số liệu tổng
// //         setChartData(data.chart_data); // Lưu dữ liệu biểu đồ
// //         setLastUpdate(new Date().toLocaleString("vi-VN"));
// //       }
// //     } catch (error) {
// //       console.error("Lỗi khi tải dữ liệu:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   return (
// //     <div className="space-y-6 p-6 min-h-screen bg-gray-50">
// //       {/* Banner */}
// //       <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-2xl shadow-lg p-8 text-center">
// //         <h1 className="text-3xl font-extrabold mb-2">
// //           🏥 Dashboard Quản Lý Bệnh Án
// //         </h1>
// //         <p className="text-white/80 text-sm">
// //           Hệ thống AI hỗ trợ chẩn đoán bệnh tiểu đường và tăng huyết áp
// //         </p>
// //       </div>

// //       {/* Loading */}
// //       {loading ? (
// //         <div className="flex justify-center items-center h-40">
// //            <p className="text-gray-500 font-medium animate-pulse">⏳ Đang tải thống kê từ MongoDB...</p>
// //         </div>
// //       ) : (
// //         <>
// //           {/* Thống kê nhanh (Cards) */}
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //             <StatCard 
// //                 title="Tổng số ca khám" 
// //                 value={stats.total} 
// //                 icon="📋" 
// //                 bg="bg-blue-50" 
// //                 textColor="text-blue-700" 
// //             />
// //             <StatCard 
// //                 title="Phát hiện Tiểu đường" 
// //                 value={stats.diabetes} 
// //                 icon="🩸" 
// //                 bg="bg-red-50" 
// //                 textColor="text-red-600" 
// //             />
// //             {/* Nếu bé chưa có model huyết áp thì số này sẽ là 0, sau này có model thì nó tự nhảy số nhé */}
// //             <StatCard 
// //                 title="Phát hiện Huyết áp cao" 
// //                 value={stats.hypertension} 
// //                 icon="❤️" 
// //                 bg="bg-orange-50" 
// //                 textColor="text-orange-600" 
// //             />
// //           </div>

// //           {/* Biểu đồ */}
// //           <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
// //             <div className="flex justify-between items-center mb-6">
// //                 <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
// //                   📊 Xu hướng bệnh theo ngày
// //                 </h2>
// //                 <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
// //                    Cập nhật: {lastUpdate}
// //                 </span>
// //             </div>
            
// //             {chartData.length > 0 ? (
// //                 <div className="w-full h-80">
// //                 <ResponsiveContainer width="100%" height="100%">
// //                     <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
// //                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
// //                     <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
// //                     <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
// //                     <Tooltip 
// //                         contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
// //                         cursor={{ fill: '#f3f4f6' }}
// //                     />
// //                     <Legend />
// //                     <Bar dataKey="diabetes" name="Tiểu đường" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
// //                     <Bar dataKey="hypertension" name="Huyết áp cao" fill="#f97316" radius={[4, 4, 0, 0]} barSize={40} />
// //                     </BarChart>
// //                 </ResponsiveContainer>
// //                 </div>
// //             ) : (
// //                 <div className="text-center py-10 text-gray-400">
// //                     Chưa có dữ liệu để vẽ biểu đồ
// //                 </div>
// //             )}
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // }

// // // 🧩 Component thẻ thống kê đẹp hơn
// // function StatCard({ title, value, icon, bg, textColor }) {
// //   return (
// //     <div className={`${bg} rounded-xl p-6 shadow-sm border border-transparent hover:border-gray-200 transition duration-300 flex items-center justify-between`}>
// //       <div>
// //         <p className="text-gray-500 font-medium text-sm mb-1">{title}</p>
// //         <p className={`text-4xl font-extrabold ${textColor}`}>{value}</p>
// //       </div>
// //       <div className="text-4xl opacity-80 grayscale group-hover:grayscale-0 transition">
// //         {icon}
// //       </div>
// //     </div>
// //   );
// // }
// //===============================================================================================================================
// import { useState, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend
// } from "recharts";

// export default function Dashboard() {
//   const [chartData, setChartData] = useState([]); // Dữ liệu biểu đồ
//   // 1️⃣ SỬA Ở ĐÂY: Thêm lipid vào state mặc định
//   const [stats, setStats] = useState({ total: 0, diabetes: 0, hypertension: 0, lipid: 0 }); 
//   const [loading, setLoading] = useState(true);
//   const [lastUpdate, setLastUpdate] = useState("");

//   // 🔹 Hàm gọi API thật từ Backend
//   const fetchData = async () => {
//     try {
//       const res = await fetch("https://webkltn-backend.onrender.com/api/dashboard");
//       const data = await res.json();

//       if (data.status === "success") {
//         setStats(data.summary);       // Lưu số liệu tổng
//         setChartData(data.chart_data); // Lưu dữ liệu biểu đồ
//         setLastUpdate(new Date().toLocaleString("vi-VN"));
//       }
//     } catch (error) {
//       console.error("Lỗi khi tải dữ liệu:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="space-y-6 p-6 min-h-screen bg-gray-50">
//       {/* Banner */}
//       <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-2xl shadow-lg p-8 text-center">
//         <h1 className="text-3xl font-extrabold mb-2">
//           🏥 Dashboard Quản Lý Bệnh Án
//         </h1>
//         <p className="text-white/80 text-sm">
//           Hệ thống AI hỗ trợ chẩn đoán bệnh tiểu đường, huyết áp và mỡ máu
//         </p>
//       </div>

//       {/* Loading */}
//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//            <p className="text-gray-500 font-medium animate-pulse">⏳ Đang tải thống kê từ MongoDB...</p>
//         </div>
//       ) : (
//         <>
//           {/* Thống kê nhanh (Cards) */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6"> {/* Sửa grid-cols-3 thành 4 cho đẹp */}
//             <StatCard 
//                 title="Tổng số ca khám" 
//                 value={stats.total} 
//                 icon="📋" 
//                 bg="bg-blue-50" 
//                 textColor="text-blue-700" 
//             />
//             <StatCard 
//                 title="Tiểu đường" 
//                 value={stats.diabetes} 
//                 icon="🩸" 
//                 bg="bg-red-50" 
//                 textColor="text-red-600" 
//             />
//             <StatCard 
//                 title="Huyết áp cao" 
//                 value={stats.hypertension} 
//                 icon="❤️" 
//                 bg="bg-orange-50" 
//                 textColor="text-orange-600" 
//             />
//             {/* 2️⃣ THÊM Ở ĐÂY: Card Lipid máu (Màu vàng) */}
//             <StatCard 
//                 title="Mỡ máu cao" 
//                 value={stats.lipid} 
//                 icon="🫀" 
//                 bg="bg-yellow-50" 
//                 textColor="text-yellow-600" 
//             />
//           </div>

//           {/* Biểu đồ */}
//           <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
//                   📊 Xu hướng bệnh theo ngày
//                 </h2>
//                 <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
//                    Cập nhật: {lastUpdate}
//                 </span>
//             </div>
            
//             {chartData.length > 0 ? (
//                 <div className="w-full h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                     <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
//                     <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
//                     <Tooltip 
//                         contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
//                         cursor={{ fill: '#f3f4f6' }}
//                     />
//                     <Legend />
//                     <Bar dataKey="diabetes" name="Tiểu đường" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
//                     <Bar dataKey="hypertension" name="Huyết áp" fill="#f97316" radius={[4, 4, 0, 0]} barSize={30} />
//                     {/* 3️⃣ THÊM Ở ĐÂY: Cột Lipid (Màu vàng đậm) */}
//                     <Bar dataKey="lipid" name="Mỡ máu" fill="#eab308" radius={[4, 4, 0, 0]} barSize={30} />
//                     </BarChart>
//                 </ResponsiveContainer>
//                 </div>
//             ) : (
//                 <div className="text-center py-10 text-gray-400">
//                     Chưa có dữ liệu để vẽ biểu đồ
//                 </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// // 🧩 Component thẻ thống kê
// function StatCard({ title, value, icon, bg, textColor }) {
//   return (
//     <div className={`${bg} rounded-xl p-6 shadow-sm border border-transparent hover:border-gray-200 transition duration-300 flex items-center justify-between`}>
//       <div>
//         <p className="text-gray-500 font-medium text-sm mb-1">{title}</p>
//         <p className={`text-4xl font-extrabold ${textColor}`}>{value}</p>
//       </div>
//       <div className="text-4xl opacity-80 grayscale group-hover:grayscale-0 transition">
//         {icon}
//       </div>
//     </div>
//   );
// }


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
  // 1️⃣ SỬA Ở ĐÂY: Thêm lipid vào state mặc định
  const [stats, setStats] = useState({ total: 0, diabetes: 0, hypertension: 0, lipid: 0 }); 
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
          Hệ thống AI hỗ trợ chẩn đoán bệnh tiểu đường, huyết áp và mỡ máu
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6"> {/* Sửa grid-cols-3 thành 4 cho đẹp */}
            <StatCard 
                title="Tổng số ca khám" 
                value={stats.total} 
                icon="📋" 
                bg="bg-blue-50" 
                textColor="text-blue-700" 
            />
            <StatCard 
                title="Đái tháo đường" 
                value={stats.diabetes} 
                icon="🩸" 
                bg="bg-red-50" 
                textColor="text-red-600" 
            />
            <StatCard 
                title="Huyết áp cao" 
                value={stats.hypertension} 
                icon="❤️" 
                bg="bg-orange-50" 
                textColor="text-orange-600" 
            />
            {/* 2️⃣ THÊM Ở ĐÂY: Card Lipid máu (Màu vàng) */}
            <StatCard 
                title="Mỡ máu cao" 
                value={stats.lipid} 
                icon="🫀" 
                bg="bg-yellow-50" 
                textColor="text-yellow-600" 
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
                    <Bar dataKey="diabetes" name="Đái tháo đường" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
                    <Bar dataKey="hypertension" name="Huyết áp" fill="#f97316" radius={[4, 4, 0, 0]} barSize={30} />
                    {/* 3️⃣ THÊM Ở ĐÂY: Cột Lipid (Màu vàng đậm) */}
                    <Bar dataKey="lipid" name="Mỡ máu" fill="#eab308" radius={[4, 4, 0, 0]} barSize={30} />
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

// 🧩 Component thẻ thống kê
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