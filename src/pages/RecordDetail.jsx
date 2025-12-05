import { useLocation, Link } from "react-router-dom";

// Map tên biến sang tiếng Việt
const labelMap = {
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
  triglycerides: "Triglycerid (mmol/L)", // Map cả 2 tên cho chắc
  creatinin: "Creatinin (µmol/L)",
  hba1c: "HbA1c (%)",
  ure: "Urea (mmol/L)",
  vldl: "VLDL (mmol/L)"
};

export default function RecordDetail() {
  const location = useLocation();
  // Lấy dữ liệu hồ sơ được gửi từ trang danh sách
  const { record } = location.state || {};

  // Nếu lỡ người dùng vào thẳng link mà không có dữ liệu
  if (!record) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 font-bold mb-4">⚠️ Không tìm thấy hồ sơ này!</p>
        <Link to="/ho-so-benh-an" className="text-blue-600 underline">Quay lại danh sách</Link>
      </div>
    );
  }

  const { patient_info, blood_tests, ai_diagnosis, doctor_diagnosis, created_at } = record;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
      
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

      {/* KHỐI 1: KẾT QUẢ CHẨN ĐOÁN (Quan trọng nhất để lên đầu) */}
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