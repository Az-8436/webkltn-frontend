
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import cái này để chuyển trang

export default function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate(); // 2. Khai báo hàm navigate

  useEffect(() => {
    fetch("https://webkltn-backend.onrender.com/api/get-records")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") setRecords(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold">📁 Hồ sơ bệnh án điện tử</h2>
        <p className="text-blue-100 mt-1">Danh sách bệnh nhân đã được lưu trữ từ MongoDB.</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto"> 
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="p-4 text-sm font-bold text-gray-600 uppercase tracking-wider">Ngày khám</th>
                <th className="p-4 text-sm font-bold text-gray-600 uppercase tracking-wider">Tên bệnh nhân</th>
                <th className="p-4 text-sm font-bold text-gray-600 uppercase tracking-wider">AI Chẩn đoán</th>
                <th className="p-4 text-sm font-bold text-gray-600 uppercase tracking-wider">Bác sĩ Nhận xét</th>
                <th className="p-4 text-sm font-bold text-gray-600 uppercase tracking-wider text-center">Hành động</th> {/* 3. Thêm cột Hành động */}
              </tr>
            </thead>
          <tbody className="divide-y divide-gray-100">
            {records.length > 0 ? (
              records.map((rec) => (
                <tr key={rec.id} className="hover:bg-blue-50 transition duration-150 ease-in-out">
                  <td className="p-4 text-sm text-gray-500 font-medium">
                    {rec.created_at}
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
                  
                  {/* 4. Thêm nút Xem chi tiết */}
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => navigate(`/chi-tiet-ho-so`, { state: { record: rec } })} // Gửi toàn bộ dữ liệu (rec) sang
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 hover:shadow-md transition transform active:scale-95"
                    >
                      👁️ Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  Chưa có hồ sơ nào được lưu.
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