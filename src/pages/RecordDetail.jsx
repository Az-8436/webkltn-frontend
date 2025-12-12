// import { useLocation, Link } from "react-router-dom";

// // Map tên biến sang tiếng Việt
// const labelMap = {
//   id: "Mã hồ sơ",
//   name: "Họ và tên",
//   birthDate: "Ngày sinh",
//   age: "Tuổi",
//   gender: "Giới tính",
//   phone: "Số điện thoại",
//   address: "Địa chỉ",
//   height: "Chiều cao (cm)",
//   weight: "Cân nặng (kg)",
//   bmi: "BMI",
//   systolicBloodPressure: "Huyết áp tâm thu (mmHg)",
//   diastolicBloodPressure: "Huyết áp tâm trương (mmHg)",
//   heartRate: "Nhịp tim (lần/phút)",
//   cholesterol: "Cholesterol (mmol/L)",
//   hdl: "HDL (mmol/L)",
//   ldl: "LDL (mmol/L)",
//   triglycerid: "Triglycerid (mmol/L)",
//   triglycerides: "Triglycerid (mmol/L)", // Map cả 2 tên cho chắc
//   creatinin: "Creatinin (µmol/L)",
//   hba1c: "HbA1c (%)",
//   ure: "Urea (mmol/L)",
//   vldl: "VLDL (mmol/L)"
// };

// export default function RecordDetail() {
//   const location = useLocation();
//   // Lấy dữ liệu hồ sơ được gửi từ trang danh sách
//   const { record } = location.state || {};

//   // Nếu lỡ người dùng vào thẳng link mà không có dữ liệu
//   if (!record) {
//     return (
//       <div className="text-center mt-10">
//         <p className="text-red-500 font-bold mb-4">⚠️ Không tìm thấy hồ sơ này!</p>
//         <Link to="/ho-so-benh-an" className="text-blue-600 underline">Quay lại danh sách</Link>
//       </div>
//     );
//   }

//   const { patient_info, blood_tests, ai_diagnosis, doctor_diagnosis, created_at } = record;

//   return (
//     <div className="max-w-5xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
      
//       {/* Header */}
//       <div className="flex justify-between items-center border-b pb-4">
//         <div>
//           <h1 className="text-2xl font-bold text-blue-800">📄 Chi tiết Hồ sơ bệnh án</h1>
//           <p className="text-gray-500 text-sm">Ngày khám: {created_at}</p>
//         </div>
//         <Link to="/ho-so-benh-an" className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition text-sm font-medium">
//           ⬅ Quay lại
//         </Link>
//       </div>

//       {/* KHỐI 1: KẾT QUẢ CHẨN ĐOÁN (Quan trọng nhất để lên đầu) */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* AI */}
//         <div className="bg-white shadow-lg rounded-xl p-6 border-l-8 border-blue-500">
//           <h2 className="text-lg font-bold text-blue-700 mb-2">🤖 AI Chẩn đoán</h2>
//           <p className="text-gray-800 font-medium text-lg">{ai_diagnosis}</p>
//         </div>
        
//         {/* Bác sĩ */}
//         <div className="bg-white shadow-lg rounded-xl p-6 border-l-8 border-green-500">
//           <h2 className="text-lg font-bold text-green-700 mb-2">👨‍⚕️ Bác sĩ Kết luận</h2>
//           <p className="text-gray-800 italic">
//             {doctor_diagnosis || "Chưa có nhận xét chi tiết."}
//           </p>
//         </div>
//       </div>

//       {/* KHỐI 2: THÔNG TIN CHI TIẾT */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
//         {/* Cột trái: Thông tin bệnh nhân */}
//         <div className="bg-white rounded-lg shadow p-5">
//            <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">🧑‍⚕️ Thông tin Bệnh nhân</h3>
//            <table className="w-full text-sm">
//              <tbody>
//                {patient_info && Object.entries(patient_info).map(([key, value]) => (
//                  <tr key={key} className="border-b last:border-0 hover:bg-gray-50">
//                    <td className="py-2 text-gray-500 w-1/2">{labelMap[key] || key}</td>
//                    <td className="py-2 font-medium">{value}</td>
//                  </tr>
//                ))}
//              </tbody>
//            </table>
//         </div>

//         {/* Cột phải: Chỉ số xét nghiệm */}
//         <div className="bg-white rounded-lg shadow p-5">
//            <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">🧪 Chỉ số Xét nghiệm / Sinh hiệu</h3>
//            <table className="w-full text-sm">
//              <tbody>
//                {blood_tests && Object.entries(blood_tests).map(([key, value]) => (
//                  <tr key={key} className="border-b last:border-0 hover:bg-gray-50">
//                    <td className="py-2 text-gray-500 w-1/2">{labelMap[key] || key}</td>
//                    <td className="py-2 font-bold text-teal-600">{value}</td>
//                  </tr>
//                ))}
//              </tbody>
//            </table>
//         </div>

//       </div>
//     </div>
//   );
// }




import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

// Map tên biến sang tiếng Việt
const labelMap = {
  id: "Mã hồ sơ",
  name: "Họ và tên",
  birthDate: "Ngày sinh",
  age: "Tuổi",
  gender: "Giới tính",
  phone: "Số điện thoại",
  address: "Địa chỉ",
  height: "Chiều cao (cm)",
  weight: "Cân nặng (kg)",
  bmi: "BMI",
  systolicBloodPressure: "Huyết áp tâm thu (mmHg)",
  diastolicBloodPressure: "Huyết áp tâm trương (mmHg)",
  heartRate: "Nhịp tim (lần/phút)",
  cholesterol: "Cholesterol (mmol/L)",
  hdl: "HDL (mmol/L)",
  ldl: "LDL (mmol/L)",
  triglycerid: "Triglycerid (mmol/L)",
  triglycerides: "Triglycerid (mmol/L)",
  creatinin: "Creatinin (µmol/L)",
  hba1c: "HbA1c (%)",
  ure: "Urea (mmol/L)",
  vldl: "VLDL (mmol/L)"
};

export default function RecordDetail() {
  const location = useLocation();
  const { record } = location.state || {};
  
  // State để lưu dữ liệu biểu đồ
  const [glucoseHistory, setGlucoseHistory] = useState([]);
  const [loadingChart, setLoadingChart] = useState(false);

  // Lấy role từ localStorage
  const role = localStorage.getItem("role");
  const isDoctor = role === "doctor"; 

  // Nếu không có record
  if (!record) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 font-bold mb-4">⚠️ Không tìm thấy hồ sơ này!</p>
        <Link to="/ho-so-benh-an" className="text-blue-600 underline">Quay lại danh sách</Link>
      </div>
    );
  }

  const { patient_info, blood_tests, ai_diagnosis, doctor_diagnosis, created_at } = record;

  // --- EFFECT: LẤY DỮ LIỆU BIỂU ĐỒ (CHỈ KHI LÀ DOCTOR) ---
  useEffect(() => {
    if (isDoctor && patient_info?.id) {
        setLoadingChart(true);
        fetch(`https://webkltn-backend.onrender.com/api/glucose/history/${patient_info.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    // Format lại dữ liệu cho đẹp (chỉ lấy ngày tháng)
                    const formattedData = data.data.map(item => ({
                        ...item,
                        displayDate: item.created_at.split(" ")[0], // Lấy YYYY-MM-DD
                        fullTime: item.created_at
                    }));
                    setGlucoseHistory(formattedData);
                }
            })
            .catch(err => console.error("Lỗi tải biểu đồ:", err))
            .finally(() => setLoadingChart(false));
    }
  }, [isDoctor, patient_info?.id]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-800">📄 Chi tiết Hồ sơ bệnh án</h1>
          <p className="text-gray-500 text-sm">Ngày khám: {created_at}</p>
        </div>
        <Link to="/ho-so-benh-an" className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition text-sm font-medium">
          ⬅ Quay lại
        </Link>
      </div>

      {/* KHỐI 1: KẾT QUẢ CHẨN ĐOÁN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-l-8 border-blue-500">
          <h2 className="text-lg font-bold text-blue-700 mb-2">🤖 AI Chẩn đoán</h2>
          <p className="text-gray-800 font-medium text-lg">{ai_diagnosis}</p>
        </div>
        
        {/* Bác sĩ */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-l-8 border-green-500">
          <h2 className="text-lg font-bold text-green-700 mb-2">👨‍⚕️ Bác sĩ Kết luận</h2>
          <p className="text-gray-800 italic">
            {doctor_diagnosis || "Chưa có nhận xét chi tiết."}
          </p>
        </div>
      </div>

      {/* --- KHỐI MỚI: BIỂU ĐỒ ĐƯỜNG HUYẾT (CHỈ HIỆN CHO DOCTOR) --- */}
      {isDoctor && (
        <div className="bg-white shadow-lg rounded-xl p-6 border border-indigo-100">
            <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
                📈 Biểu đồ theo dõi Đường huyết (Dành cho Bác sĩ)
            </h2>
            
            {loadingChart ? (
                <p className="text-center text-gray-500 py-10">⏳ Đang tải dữ liệu biểu đồ...</p>
            ) : glucoseHistory.length > 0 ? (
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={glucoseHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3"/>
                            <XAxis dataKey="displayDate" tick={{fontSize: 12}} />
                            <YAxis />
                            <Tooltip 
                                labelStyle={{color: '#333', fontWeight: 'bold'}}
                                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="value" name="Đường huyết (mg/dL)" stroke="#4f46e5" strokeWidth={3} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                    <p className="text-center text-xs text-gray-400 mt-2">* Biểu đồ hiển thị lịch sử đo đường huyết của bệnh nhân này.</p>
                </div>
            ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500">📭 Bệnh nhân này chưa có dữ liệu đo đường huyết nào.</p>
                </div>
            )}
        </div>
      )}
      {/* ----------------------------------------------------------- */}

      {/* KHỐI 2: THÔNG TIN CHI TIẾT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Cột trái: Thông tin bệnh nhân */}
        <div className="bg-white rounded-lg shadow p-5">
           <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">🧑‍⚕️ Thông tin Bệnh nhân</h3>
           <table className="w-full text-sm">
             <tbody>
               {patient_info && Object.entries(patient_info).map(([key, value]) => (
                 <tr key={key} className="border-b last:border-0 hover:bg-gray-50">
                   <td className="py-2 text-gray-500 w-1/2">{labelMap[key] || key}</td>
                   <td className="py-2 font-medium">{value}</td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>

        {/* Cột phải: Chỉ số xét nghiệm */}
        <div className="bg-white rounded-lg shadow p-5">
           <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">🧪 Chỉ số Xét nghiệm / Sinh hiệu</h3>
           <table className="w-full text-sm">
             <tbody>
               {blood_tests && Object.entries(blood_tests).map(([key, value]) => (
                 <tr key={key} className="border-b last:border-0 hover:bg-gray-50">
                   <td className="py-2 text-gray-500 w-1/2">{labelMap[key] || key}</td>
                   <td className="py-2 font-bold text-teal-600">{value}</td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>

      </div>
    </div>
  );
}