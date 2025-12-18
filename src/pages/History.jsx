// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { patientList } from "../data/patients";

// const filterByMode = (patients, mode) => {
//   const now = new Date();
//   return patients.filter((p) => {
//     const [day, month, year] = p.date.split("/");
//     const visit = new Date(`${year}-${month}-${day}`);
//     if (isNaN(visit)) return false;

//     switch (mode) {
//       case "day":
//         return (
//           visit.getDate() === now.getDate() &&
//           visit.getMonth() === now.getMonth() &&
//           visit.getFullYear() === now.getFullYear()
//         );
//       case "week": {
//         const dayOfWeek = now.getDay() === 0 ? 6 : now.getDay() - 1;
//         const startOfWeek = new Date(now);
//         startOfWeek.setDate(now.getDate() - dayOfWeek);
//         startOfWeek.setHours(0, 0, 0, 0);

//         const endOfWeek = new Date(startOfWeek);
//         endOfWeek.setDate(startOfWeek.getDate() + 6);
//         endOfWeek.setHours(23, 59, 59, 999);

//         return visit >= startOfWeek && visit <= endOfWeek;
//       }
//       case "month":
//         return (
//           visit.getMonth() === now.getMonth() &&
//           visit.getFullYear() === now.getFullYear()
//         );
//       default:
//         return true;
//     }
//   });
// };

// export default function History() {
//   const navigate = useNavigate();
//   const [mode, setMode] = useState("day");
//   const [search, setSearch] = useState("");
//   const [filterType, setFilterType] = useState("all");

//   const filtered = filterByMode(patientList, mode)
//     .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
//     .filter((p) => (filterType === "all" ? true : p.type === filterType));

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//         <div className="flex gap-2 flex-wrap">
//           <button
//             className={`px-4 py-2 rounded-lg text-sm font-semibold ${
//               mode === "day" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
//             }`}
//             onClick={() => setMode("day")}
//           >
//             Trong ngày
//           </button>
//           <button
//             className={`px-4 py-2 rounded-lg text-sm font-semibold ${
//               mode === "week" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
//             }`}
//             onClick={() => setMode("week")}
//           >
//             Trong tuần
//           </button>
//           <button
//             className={`px-4 py-2 rounded-lg text-sm font-semibold ${
//               mode === "month" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
//             }`}
//             onClick={() => setMode("month")}
//           >
//             Trong tháng
//           </button>

//           <select
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             className="text-sm p-2 border rounded-md bg-white"
//           >
//             <option value="all">Tất cả</option>
//             <option value="Tiểu đường">Tiểu đường</option>
//             <option value="Tăng huyết áp">Tăng huyết áp</option>
//           </select>
//         </div>

//         <input
//           type="text"
//           placeholder="Tìm tên bệnh nhân..."
//           className="border border-gray-300 px-3 py-2 rounded-md text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
//         <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
//           Danh sách bệnh nhân đã khám
//         </h2>
//         <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
//           Tổng: {filtered.length} bệnh nhân
//         </p>
//         {filtered.length === 0 ? (
//           <p className="text-gray-500 dark:text-gray-300 text-sm">
//             Không tìm thấy bệnh nhân nào.
//           </p>
//         ) : (
//           <table className="w-full text-left border-collapse text-sm">
//             <thead>
//               <tr className="border-b border-gray-300 dark:border-gray-600">
//                 <th className="p-2">Họ tên</th>
//                 <th className="p-2">Ngày khám</th>
//                 <th className="p-2">Loại bệnh</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((p) => (
//                 <tr
//                   key={p.id}
//                   className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
//                   onClick={() => navigate(`/benh-nhan/${p.id}`)}
//                 >
//                   <td className="p-2 text-blue-600 hover:underline">{p.name}</td>
//                   <td className="p-2">{p.date}</td>
//                   <td className="p-2">{p.type}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// // --- HÀM LỌC NGÀY THÁNG (Đã sửa để đọc được dữ liệu MongoDB) ---
// const filterByMode = (records, mode) => {
//   const now = new Date();
  
//   return records.filter((rec) => {
//     // MongoDB lưu dạng: "2025-11-24 10:30:00" hoặc "2025-11-24"
//     // Ta chuyển nó thành đối tượng Date của Javascript
//     const visitDate = new Date(rec.created_at);
    
//     if (isNaN(visitDate)) return false; // Nếu lỗi ngày tháng thì bỏ qua

//     switch (mode) {
//       case "day":
//         return (
//           visitDate.getDate() === now.getDate() &&
//           visitDate.getMonth() === now.getMonth() &&
//           visitDate.getFullYear() === now.getFullYear()
//         );
//       case "week": {
//         const dayOfWeek = now.getDay() === 0 ? 6 : now.getDay() - 1; // 0 là Chủ nhật
        
//         // Tìm ngày đầu tuần (Thứ 2)
//         const startOfWeek = new Date(now);
//         startOfWeek.setDate(now.getDate() - dayOfWeek);
//         startOfWeek.setHours(0, 0, 0, 0);

//         // Tìm ngày cuối tuần (Chủ nhật)
//         const endOfWeek = new Date(startOfWeek);
//         endOfWeek.setDate(startOfWeek.getDate() + 6);
//         endOfWeek.setHours(23, 59, 59, 999);

//         return visitDate >= startOfWeek && visitDate <= endOfWeek;
//       }
//       case "month":
//         return (
//           visitDate.getMonth() === now.getMonth() &&
//           visitDate.getFullYear() === now.getFullYear()
//         );
//       default:
//         return true; // "all"
//     }
//   });
// };

// export default function History() {
//   const navigate = useNavigate();
  
//   // 1. State chứa dữ liệu thật từ DB
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // State bộ lọc
//   const [mode, setMode] = useState("all"); // Mặc định hiện tất cả cho dễ nhìn
//   const [search, setSearch] = useState("");
//   const [filterType, setFilterType] = useState("all");

//   // 2. Gọi API lấy dữ liệu thật
//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/get-records")
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.status === "success") {
//           setRecords(data.data);
//         }
//       })
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   }, []);

//   // 3. Áp dụng bộ lọc
//   const filtered = filterByMode(records, mode)
//     .filter((r) => {
//         // Lọc theo tên (Kiểm tra null trước cho an toàn)
//         const name = r.patient_info?.name || ""; 
//         return name.toLowerCase().includes(search.toLowerCase());
//     })
//     .filter((r) => {
//         // Lọc theo loại bệnh (AI chẩn đoán)
//         if (filterType === "all") return true;
//         // Kiểm tra xem kết quả chẩn đoán có chứa từ khóa không
//         // Ví dụ: filterType="Tiểu đường" thì chuỗi "Có nguy cơ tiểu đường" vẫn nhận
//         return r.ai_diagnosis?.includes(filterType);
//     });

//   return (
//     <div className="p-6 space-y-6 min-h-screen bg-gray-50">
      
//       {/* Tiêu đề */}
//       <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-indigo-600">
//           <h1 className="text-2xl font-bold text-gray-800">📅 Lịch sử khám bệnh</h1>
//           <p className="text-gray-500 text-sm">Thống kê và tra cứu lịch sử khám theo thời gian thực.</p>
//       </div>

//       {/* Bộ lọc */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm">
//         <div className="flex gap-2 flex-wrap">
//            {/* Nút lọc thời gian */}
//            {["all", "day", "week", "month"].map((m) => (
//              <button
//                key={m}
//                onClick={() => setMode(m)}
//                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
//                  mode === m ? "bg-indigo-600 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                }`}
//              >
//                {m === "all" ? "Tất cả" : m === "day" ? "Hôm nay" : m === "week" ? "Tuần này" : "Tháng này"}
//              </button>
//            ))}

//            {/* Select loại bệnh */}
//           <select
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             className="text-sm p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
//           >
//             <option value="all">Tất cả bệnh</option>
//             <option value="Tiểu đường">Tiểu đường</option>
//             <option value="Không bị">Sức khỏe tốt</option>
//             {/* Thêm các loại khác nếu muốn */}
//           </select>
//         </div>

//         {/* Ô tìm kiếm */}
//         <input
//           type="text"
//           placeholder="🔍 Tìm tên bệnh nhân..."
//           className="border border-gray-300 px-4 py-2 rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Danh sách kết quả */}
//       <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md overflow-hidden">
//         <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-bold text-gray-800 dark:text-white">
//             Danh sách bệnh nhân
//             </h2>
//             <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
//                 Tổng: {filtered.length}
//             </span>
//         </div>
        
//         {loading ? (
//              <p className="text-center py-10 text-gray-500">⏳ Đang tải dữ liệu...</p>
//         ) : filtered.length === 0 ? (
//           <div className="text-center py-10">
//             <p className="text-gray-400 text-5xl mb-3">📭</p>
//             <p className="text-gray-500">Không tìm thấy hồ sơ nào phù hợp.</p>
//           </div>
//         ) : (
//           <table className="w-full text-left border-collapse text-sm">
//             <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
//               <tr>
//                 <th className="p-3">Họ tên</th>
//                 <th className="p-3">Ngày khám</th>
//                 <th className="p-3">Kết quả chẩn đoán</th>
//                 <th className="p-3 text-right">Chi tiết</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {filtered.map((r) => (
//                 <tr
//                   key={r.id}
//                   className="hover:bg-indigo-50 transition cursor-pointer group"
//                   onClick={() => navigate(`/chi-tiet-ho-so`, { state: { record: r } })}
//                 >
//                   <td className="p-3 font-bold text-gray-700 group-hover:text-indigo-600">
//                     {r.patient_info?.name || "Ẩn danh"}
//                   </td>
//                   <td className="p-3 text-gray-500">{r.created_at}</td>
//                   <td className="p-3">
//                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
//                         r.ai_diagnosis?.includes("Không bị") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//                      }`}>
//                         {r.ai_diagnosis}
//                      </span>
//                   </td>
//                   <td className="p-3 text-right">
//                     <button className="text-indigo-500 hover:text-indigo-700 font-medium text-xs border border-indigo-200 px-3 py-1 rounded hover:bg-indigo-100 transition">
//                         Xem ➝
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }



//======================================================THEM PHAN DANG NHAP VOI QUYEN USER VA DOCTOR=====================================

// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// const filterByMode = (records, mode) => {
//   const now = new Date();

//   return records.filter((rec) => {
//     const visitDate = new Date(rec.created_at);
//     if (isNaN(visitDate)) return false;

//     switch (mode) {
//       case "day":
//         return (
//           visitDate.getDate() === now.getDate() &&
//           visitDate.getMonth() === now.getMonth() &&
//           visitDate.getFullYear() === now.getFullYear()
//         );
//       case "week": {
//         const dayOfWeek = now.getDay() === 0 ? 6 : now.getDay() - 1;

//         const startOfWeek = new Date(now);
//         startOfWeek.setDate(now.getDate() - dayOfWeek);
//         startOfWeek.setHours(0, 0, 0, 0);

//         const endOfWeek = new Date(startOfWeek);
//         endOfWeek.setDate(startOfWeek.getDate() + 6);
//         endOfWeek.setHours(23, 59, 59, 999);

//         return visitDate >= startOfWeek && visitDate <= endOfWeek;
//       }
//       case "month":
//         return (
//           visitDate.getMonth() === now.getMonth() &&
//           visitDate.getFullYear() === now.getFullYear()
//         );
//       default:
//         return true;
//     }
//   });
// };

// export default function History() {
//   const navigate = useNavigate();
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [mode, setMode] = useState("all");
//   const [search, setSearch] = useState("");
//   const [filterType, setFilterType] = useState("all");

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/get-records")
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.status === "success") {
//           setRecords(data.data);
//         }
//       })
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   }, []);

//   const filtered = filterByMode(records, mode)
//     .filter((r) => {
//       const name = r.patient_info?.name || "";
//       return name.toLowerCase().includes(search.toLowerCase());
//     })
//     .filter((r) => {
//       if (filterType === "all") return true;
//       return r.ai_diagnosis?.includes(filterType);
//     });

//   return (
//     <div className="p-6 space-y-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

//       {/* Header */}
//       <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between border border-gray-200">
//         <div>
//           <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
//             📅 Lịch sử khám bệnh
//           </h1>
//           <p className="text-gray-500 text-sm">Lưu trữ – Tra cứu – Theo dõi bệnh nhân</p>
//         </div>

//         <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs border border-indigo-200">
//           Tổng hồ sơ: {filtered.length}
//         </span>
//       </div>

//       {/* Filters */}
//       <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 flex flex-col gap-4">

//         <div className="flex gap-2 flex-wrap">
//           {["all", "day", "week", "month"].map((m) => (
//             <button key={m}
//               onClick={() => setMode(m)}
//               className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
//                 ${mode === m
//                   ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
//                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                 }`}>
//               {m === "all" ? "Tất cả"
//                 : m === "day" ? "Hôm nay"
//                   : m === "week" ? "Tuần này"
//                     : "Tháng này"}
//             </button>
//           ))}

//           <select
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             className="text-sm p-2 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
//           >
//             <option value="all">Tất cả bệnh</option>
//             <option value="Tiểu đường">Tiểu đường</option>
//             <option value="Không bị">Sức khỏe tốt</option>
//           </select>
//         </div>

//         {/* Search */}
//         <input
//           type="text"
//           placeholder="🔍 Tìm theo tên bệnh nhân..."
//           className="border px-4 py-2 rounded-xl text-sm w-full focus:ring-2 border-gray-300 focus:ring-indigo-500"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//         {loading ? (
//           <p className="text-center py-12 text-gray-500">⏳ Đang tải dữ liệu...</p>
//         ) : filtered.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-400 text-6xl mb-2">📭</p>
//             <p className="text-gray-500 text-lg font-medium">
//               Không có hồ sơ phù hợp
//             </p>
//           </div>
//         ) : (
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
//               <tr>
//                 <th className="p-3">Họ tên</th>
//                 <th className="p-3">Ngày khám</th>
//                 <th className="p-3">Kết quả AI</th>
//                 <th className="p-3 text-right">Chi tiết</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-100">
//               {filtered.map((r) => (
//                 <tr key={r.id}
//                   onClick={() => navigate(`/chi-tiet-ho-so`, { state: { record: r } })}
//                   className="cursor-pointer hover:bg-indigo-50 transition group"
//                 >
//                   <td className="p-3 font-bold text-gray-800 group-hover:text-indigo-600">
//                     {r.patient_info?.name}
//                   </td>
//                   <td className="p-3 text-gray-500">{r.created_at}</td>
//                   <td className="p-3">
//                     <span className={`px-2 py-1 rounded-lg text-xs font-bold
//                       ${r.ai_diagnosis?.includes("Không bị")
//                         ? "bg-green-100 text-green-700 border border-green-200"
//                         : "bg-red-100 text-red-700 border border-red-200"}`}>
//                       {r.ai_diagnosis}
//                     </span>
//                   </td>
//                   <td className="p-3 text-right">
//                     <button className="text-indigo-600 font-semibold hover:text-indigo-800 hover:underline">
//                       Xem ➝
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const filterByMode = (records, mode) => {
  const now = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
    })
  );
  return records.filter((rec) => {
    const visitDate = new Date(
      new Date(rec.created_at).toLocaleString("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
      })
    );    
    if (isNaN(visitDate)) return false;

    switch (mode) {
      case "day":
        return (
          visitDate.getDate() === now.getDate() &&
          visitDate.getMonth() === now.getMonth() &&
          visitDate.getFullYear() === now.getFullYear()
        );
      case "week": {
        const dayOfWeek = now.getDay() === 0 ? 6 : now.getDay() - 1;
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - dayOfWeek);
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        return visitDate >= startOfWeek && visitDate <= endOfWeek;
      }
      case "month":
        return (
          visitDate.getMonth() === now.getMonth() &&
          visitDate.getFullYear() === now.getFullYear()
        );
      default:
        return true;
    }
  });
};

export default function History() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("all");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    fetch("https://webkltn-backend.onrender.com/api/get-records")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          let fetchedRecords = data.data;

          // --- ĐOẠN CODE XỬ LÝ QUYỀN ---
          const role = localStorage.getItem("role");
          const myId = localStorage.getItem("patientId"); // ID lấy lúc đăng nhập

          // Nếu là admin (bệnh nhân) thì chỉ giữ lại hồ sơ của chính mình
          if (role === "admin" && myId) {
             fetchedRecords = fetchedRecords.filter(
                (rec) => rec.patient_info?.id === myId
             );
          }
          // Nếu là doctor thì không filter gì cả, xem hết
          // -----------------------------

          setRecords(fetchedRecords);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filterByMode(records, mode)
    .filter((r) => {
      const name = r.patient_info?.name || "";
      return name.toLowerCase().includes(search.toLowerCase());
    })
    .filter((r) => {
      if (filterType === "all") return true;
      return r.ai_diagnosis?.includes(filterType);
    });

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between border border-gray-200">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            📅 Lịch sử khám bệnh
          </h1>
          <p className="text-gray-500 text-sm">
            {localStorage.getItem("role") === "admin" 
              ? "Hồ sơ sức khỏe cá nhân" 
              : "Lưu trữ – Tra cứu – Theo dõi bệnh nhân"}
          </p>
        </div>

        <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs border border-indigo-200">
          Tổng hồ sơ: {filtered.length}
        </span>
      </div>

      {/* Filters */}
      <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 flex flex-col gap-4">
        <div className="flex gap-2 flex-wrap">
          {["all", "day", "week", "month"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                ${
                  mode === m
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {m === "all"
                ? "Tất cả"
                : m === "day"
                ? "Hôm nay"
                : m === "week"
                ? "Tuần này"
                : "Tháng này"}
            </button>
          ))}

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-sm p-2 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="all">Tất cả bệnh</option>
            <option value="Tiểu đường">Tiểu đường</option>
            <option value="Không bị">Sức khỏe tốt</option>
          </select>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Tìm theo tên bệnh nhân..."
          className="border px-4 py-2 rounded-xl text-sm w-full focus:ring-2 border-gray-300 focus:ring-indigo-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <p className="text-center py-12 text-gray-500">
            ⏳ Đang tải dữ liệu...
          </p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-6xl mb-2">📭</p>
            <p className="text-gray-500 text-lg font-medium">
              Không tìm thấy hồ sơ nào
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
                <tr>
                  <th className="p-3">Họ tên</th>
                  <th className="p-3">Mã HS</th> {/* Thêm cột Mã HS cho dễ nhìn */}
                  <th className="p-3">Ngày khám</th>
                  <th className="p-3">Kết quả AI</th>
                  <th className="p-3 text-right">Chi tiết</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() =>
                      navigate(`/chi-tiet-ho-so`, { state: { record: r } })
                    }
                    className="cursor-pointer hover:bg-indigo-50 transition group"
                  >
                    <td className="p-3 font-bold text-gray-800 group-hover:text-indigo-600">
                      {r.patient_info?.name}
                    </td>
                    <td className="p-3 text-gray-500 italic">
                      {r.patient_info?.id}
                    </td>
                    <td className="p-3 text-gray-500">
                      <div>
                        {new Date(r.created_at).toLocaleTimeString("vi-VN", {
                          timeZone: "Asia/Ho_Chi_Minh",
                        })}
                      </div>
                      <div>
                        {new Date(r.created_at).toLocaleDateString("vi-VN", {
                          timeZone: "Asia/Ho_Chi_Minh",
                        })}
                      </div>
                    </td>                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-bold
                        ${
                          r.ai_diagnosis?.includes("Không bị")
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-red-100 text-red-700 border border-red-200"
                        }`}
                      >
                        {r.ai_diagnosis}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button className="text-indigo-600 font-semibold hover:text-indigo-800 hover:underline">
                        Xem ➝
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}