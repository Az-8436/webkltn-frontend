

//=====================================================================================================================

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function MedicalRecords() {
//   const [records, setRecords] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/get-records")
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.status === "success") setRecords(data.data);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="p-4 md:p-6 min-h-screen bg-gray-50">
//       <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg mb-8">
//         <h2 className="text-2xl font-bold">📁 Hồ sơ bệnh án điện tử</h2>
//         <p className="text-blue-100 mt-1">Danh sách bệnh nhân đã được lưu trữ từ MongoDB.</p>
//       </div>

//       <div className="bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col">
//         {/* 👇 THÊM DIV NÀY ĐỂ BẢNG CUỘN NGANG KHI MÀN HÌNH NHỎ 👇 */}
//         <div className="overflow-x-auto w-full"> 
//           <table className="w-full text-left border-collapse min-w-[800px]"> 
//             <thead className="bg-gray-100 border-b-2 border-gray-200">
//               <tr>
//                 <th className="p-4 text-sm font-bold text-gray-600 uppercase tracking-wider">Ngày khám</th>
//                 <th className="p-4 text-sm font-bold text-gray-600 uppercase tracking-wider">Tên bệnh nhân</th>
//                 <th className="p-4 text-sm font-bold text-gray-600 uppercase tracking-wider">AI Chẩn đoán</th>
//                 <th className="p-4 text-sm font-bold text-gray-600 uppercase tracking-wider">Bác sĩ Nhận xét</th>
//                 <th className="p-4 text-sm font-bold text-gray-600 uppercase tracking-wider text-center">Hành động</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {records.length > 0 ? (
//                 records.map((rec) => (
//                   <tr key={rec.id} className="hover:bg-blue-50 transition duration-150 ease-in-out">
//                     <td className="p-4 text-sm text-gray-500 font-medium">
//                       {rec.created_at}
//                     </td>
//                     <td className="p-4 font-bold text-gray-800">
//                       {rec.patient_info?.name || "Ẩn danh"}
//                     </td>
//                     <td className="p-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                         rec.ai_diagnosis?.includes("Không bị") 
//                           ? "bg-green-100 text-green-700" 
//                           : "bg-red-100 text-red-700"
//                       }`}>
//                         {rec.ai_diagnosis}
//                       </span>
//                     </td>
//                     <td className="p-4 text-sm text-gray-600 italic">
//                         {rec.doctor_diagnosis ? (
//                           <span className="text-green-700 font-medium">✔ Đã nhận xét</span>
//                         ) : (
//                           <span className="text-gray-400">Chưa có</span>
//                         )}
//                     </td>
                    
//                     <td className="p-4 text-center">
//                       <button 
//                         onClick={() => navigate(`/chi-tiet-ho-so`, { state: { record: rec } })}
//                         className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 hover:shadow-md transition transform active:scale-95 whitespace-nowrap"
//                       >
//                         👁️ Xem chi tiết
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="p-8 text-center text-gray-500">
//                     Chưa có hồ sơ nào được lưu.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

//=========================================THEM QUYEN XEM BENH AN ==================================================

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://webkltn-backend.onrender.com/api/get-records")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          let fetchedRecords = data.data; // 1. Lấy toàn bộ dữ liệu về

          // ----------------------------------------------------
          // ĐOẠN CODE XỬ LÝ PHÂN QUYỀN (THÊM MỚI)
          // ----------------------------------------------------
          const role = localStorage.getItem("role");
          const myId = localStorage.getItem("patientId");

          // Nếu là admin (bệnh nhân) thì chỉ giữ lại hồ sơ trùng khớp ID
          if (role === "admin" && myId) {
             fetchedRecords = fetchedRecords.filter(
                (rec) => rec.patient_info?.id === myId
             );
          }
          // Nếu là doctor thì giữ nguyên (xem hết)
          // ----------------------------------------------------

          setRecords(fetchedRecords);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold">📁 Hồ sơ bệnh án điện tử</h2>
        <p className="text-blue-100 mt-1">
            {localStorage.getItem("role") === "admin" 
              ? "Danh sách hồ sơ khám bệnh của bạn." 
              : "Quản lý toàn bộ hồ sơ bệnh nhân từ MongoDB."}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col">
        {/* 👇 THÊM DIV NÀY ĐỂ BẢNG CUỘN NGANG KHI MÀN HÌNH NHỎ 👇 */}
        <div className="overflow-x-auto w-full"> 
          <table className="w-full text-left border-collapse min-w-[800px]"> 
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="p-4 text-sm font-bold text-gray-600 uppercase tracking-wider">Ngày khám</th>
                <th className="p-4 text-sm font-bold text-gray-600 uppercase tracking-wider">Tên bệnh nhân</th>
                <th className="p-4 text-sm font-bold text-gray-600 uppercase tracking-wider">AI Chẩn đoán</th>
                <th className="p-4 text-sm font-bold text-gray-600 uppercase tracking-wider">Bác sĩ Nhận xét</th>
                <th className="p-4 text-sm font-bold text-gray-600 uppercase tracking-wider text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {records.length > 0 ? (
                records.map((rec) => (
                  <tr key={rec.id} className="hover:bg-blue-50 transition duration-150 ease-in-out">
                    <td className="p-4 text-sm text-gray-500 font-medium">
                      {(() => {
                        const utcDate = new Date(rec.created_at + "Z");

                        return (
                          <>
                            <div>
                              {utcDate.toLocaleTimeString("vi-VN", {
                                timeZone: "Asia/Ho_Chi_Minh",
                              })}
                            </div>
                            <div>
                              {utcDate.toLocaleDateString("vi-VN", {
                                timeZone: "Asia/Ho_Chi_Minh",
                              })}
                            </div>
                          </>
                        );
                      })()}
                    </td>
                    <td className="p-4 font-bold text-gray-800">
                      {rec.patient_info?.name || "Ẩn danh"}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        rec.ai_diagnosis?.includes("Không bị") 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      }`}>
                        {rec.ai_diagnosis}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600 italic">
                        {rec.doctor_diagnosis ? (
                          <span className="text-green-700 font-medium">✔ Đã nhận xét</span>
                        ) : (
                          <span className="text-gray-400">Chưa có</span>
                        )}
                    </td>
                    
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => navigate(`/chi-tiet-ho-so`, { state: { record: rec } })}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 hover:shadow-md transition transform active:scale-95 whitespace-nowrap"
                      >
                        👁️ Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    {localStorage.getItem("role") === "admin" 
                        ? "Bạn chưa có hồ sơ khám bệnh nào." 
                        : "Chưa có dữ liệu trong hệ thống."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}