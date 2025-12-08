
// import { useState } from "react";
// import { useLocation, Link, useNavigate } from "react-router-dom";

// // Map tên biến sang tiếng Việt
// const labelMap = {
//   name: "Họ tên",
//   age: "Tuổi",
//   gender: "Giới tính",
//   cholesterol: "Cholesterol",
//   hba1c: "HbA1c",
//   ure: "Urea",
//   bmi: "BMI",
//   systolicBloodPressure: "Huyết áp tâm thu",
//   diastolicBloodPressure: "Huyết áp tâm trương",
//   heartRate: "Nhịp tim",
//   hdl: "HDL",
//   ldl: "LDL",
//   triglycerides: "Triglycerides",
//   triglycerid: "Triglycerides",
//   creatinin: "Creatinin",
//   vldl: "VLDL"
// };

// export default function DiagnosisResult() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { result, input } = location.state || {}; // Nhận hàng từ trang trước

//   const [doctorNote, setDoctorNote] = useState("");
//   const [isSaving, setIsSaving] = useState(false);

//   // --- 1. KHAI BÁO CÁC BIẾN CẦN THIẾT (Bé bị thiếu đoạn này) ---
//   const patientInfo = input?.patient_info || {};
//   const bloodTests = input?.blood_tests || {};

//   // Hàm kiểm tra có dữ liệu hay không
//   const hasData = (obj) => obj && Object.keys(obj).length > 0;

//   // Nếu không có dữ liệu input thì hiện lỗi
//   if (!input) return <p className="text-center mt-10 text-red-500">❌ Không có dữ liệu!</p>;

//   const handleSaveToDB = async () => {
//     setIsSaving(true);
//     try {
//       // 1. Gom tất cả dữ liệu lại
//       const finalPayload = {
//         patient_info: patientInfo,
//         blood_tests: bloodTests,
//         ai_diagnosis: result,        // Kết quả AI
//         doctor_diagnosis: doctorNote // Kết quả Bác sĩ nhập tay
//       };

//       // 2. Gửi về Backend
//       const res = await fetch("https://webkltn-backend.onrender.com/api/save-record", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(finalPayload)
//       });
      
//       const data = await res.json();
      
//       if (data.status === "success") {
//         alert("✅ Lưu hồ sơ thành công!");
//         navigate("/ho-so-benh-an"); 
//       } else {
//         alert("⚠️ Lưu thất bại: " + data.message);
//       }

//     } catch (err) {
//       alert("❌ Lỗi kết nối: " + err.message);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold text-center text-blue-800">🔍 Kết quả & Đối chiếu</h1>

//       {/* --- KHỐI 1: CHẨN ĐOÁN (AI & Bác sĩ) --- */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
//         {/* CỘT TRÁI: AI CHẨN ĐOÁN */}
//         <div className="bg-white shadow-xl rounded-xl p-6 border-l-8 border-blue-600">
//           <h2 className="text-xl font-bold mb-3 text-blue-700">🤖 AI Chẩn đoán</h2>
//           <p className="text-gray-800 text-lg font-medium">{result}</p>
//         </div>

//         {/* CỘT PHẢI: BÁC SĨ NHẬP LIỆU */}
//         <div className="bg-white shadow-xl rounded-xl p-6 border-l-8 border-green-600 flex flex-col">
//           <h2 className="text-xl font-bold mb-3 text-green-700">👨‍⚕️ Bác sĩ nhận xét</h2>
//           <textarea
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none flex-grow"
//             rows="4"
//             placeholder="Nhập kết luận chuyên môn tại đây..."
//             value={doctorNote}
//             onChange={(e) => setDoctorNote(e.target.value)}
//           ></textarea>
//         </div>
//       </div>

//       {/* --- KHỐI 2: THÔNG TIN BỆNH NHÂN --- */}
//       {hasData(patientInfo) && (
//         <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
//           <h3 className="font-bold text-lg mb-4 text-gray-700 border-b pb-2 flex items-center gap-2">
//             🧑‍⚕️ Thông tin Hành chính & Sinh hiệu
//           </h3>
//           <table className="w-full text-sm">
//             <tbody>
//               {Object.entries(patientInfo).map(([key, value]) => (
//                 <tr key={key} className="border-b last:border-0 hover:bg-gray-50 transition">
//                   <td className="py-3 font-medium text-gray-600 w-1/2">
//                     {labelMap[key] || key}
//                   </td>
//                   <td className="py-3 text-gray-900 font-semibold">{value}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* --- KHỐI 3: KẾT QUẢ TỪ PHIẾU KHÁM --- */}
//       {hasData(bloodTests) && (
//         <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
//           <h3 className="font-bold text-lg mb-4 text-teal-700 border-b pb-2 flex items-center gap-2">
//             🧪 Chỉ số từ Phiếu Xét Nghiệm (OCR)
//           </h3>
//           <table className="w-full text-sm">
//             <tbody>
//               {Object.entries(bloodTests).map(([key, value]) => (
//                 <tr key={key} className="border-b last:border-0 hover:bg-gray-50 transition">
//                   <td className="py-3 font-medium text-gray-600 w-1/2">
//                     {labelMap[key] || key}
//                   </td>
//                   <td className="py-3 text-teal-700 font-bold">{value}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* --- NÚT BẤM CUỐI TRANG --- */}
//       <div className="text-center mt-8 space-x-4 pb-10">
//         <Link to="/" className="bg-gray-500 text-white px-6 py-3 rounded-lg">⬅ Hủy</Link>
//         <button 
//           onClick={handleSaveToDB} 
//           disabled={isSaving}
//           className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 shadow-lg"
//         >
//           {isSaving ? "⏳ Đang lưu..." : "💾 LƯU HỒ SƠ VÀO MONGODB"}
//         </button>
//       </div>

//     </div>
//   );
// }

// 

import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

// Map tên biến => tiếng Việt
const labelMap = {
  name: "Họ tên",
  age: "Tuổi",
  gender: "Giới tính",
  height: "Chiều cao",
  weight: "Cân nặng",
  cholesterol: "Cholesterol",
  hba1c: "HbA1c",
  ure: "Urea",
  bmi: "BMI",
  systolicBloodPressure: "Huyết áp tâm thu",
  diastolicBloodPressure: "Huyết áp tâm trương",
  heartRate: "Nhịp tim",
  hdl: "HDL",
  ldl: "LDL",
  triglycerides: "Triglycerides",
  triglycerid: "Triglycerides",
  creatinin: "Creatinin",
  vldl: "VLDL",
};

export default function DiagnosisResult() {
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy data từ trang trước
  const { result, input } = location.state || {};

  const [doctorNote, setDoctorNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const patientInfo = input?.patient_info || {};
  const bloodTests = input?.blood_tests || {};
  const units = input?.units || {};

  const hasData = (obj) => obj && Object.keys(obj).length > 0;

  if (!input) {
    return (
      <p className="text-center mt-10 text-red-500">
        ❌ Không có dữ liệu từ trang trước!
      </p>
    );
  }

  const handleSaveToDB = async () => {
    setIsSaving(true);

    try {
      const finalPayload = {
        patient_info: patientInfo,
        blood_tests: bloodTests,
        units: units,
        ai_diagnosis: result,
        doctor_diagnosis: doctorNote,
      };

      const res = await fetch("http://127.0.0.1:8000/api/save-record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      });

      const data = await res.json();

      if (data.status === "success") {
        alert("✅ Lưu hồ sơ thành công!");
        navigate("/ho-so-benh-an");
      } else {
        alert("⚠️ Lưu thất bại: " + data.message);
      }
    } catch (err) {
      alert("❌ Lỗi server: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-800">
        🔍 Kết quả & Đối chiếu
      </h1>

      {/* ---------- KHỐI CHẨN ĐOÁN (Grid đổi thành 1 cột trên mobile) ------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-xl rounded-xl p-6 border-l-8 border-blue-600">
          <h2 className="text-xl font-bold mb-3 text-blue-700">
            🤖 AI Chẩn đoán
          </h2>
          <p className="text-gray-800 text-lg font-medium">{result}</p>
        </div>

        <div className="bg-white shadow-xl rounded-xl p-6 border-l-8 border-green-600 flex flex-col">
          <h2 className="text-xl font-bold mb-3 text-green-700">
            👨‍⚕️ Bác sĩ nhận xét
          </h2>
          <textarea
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 flex-grow"
            rows="4"
            placeholder="Nhập kết luận vào đây..."
            value={doctorNote}
            onChange={(e) => setDoctorNote(e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* ---------- THÔNG TIN BỆNH NHÂN ------------ */}
      {hasData(patientInfo) && (
        <div className="bg-white shadow-md rounded-lg p-5 border">
          <h3 className="font-bold text-lg mb-4 text-gray-700 border-b pb-2">
            🧑‍⚕️ Thông tin bệnh nhân
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[300px]">
              <tbody>
                {Object.entries(patientInfo).map(([key, value]) => (
                  <tr key={key} className="border-b last:border-0">
                    <td className="py-3 font-medium text-gray-600 w-1/2">
                      {labelMap[key] || key}
                    </td>
                    <td className="py-3 font-semibold">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------- CHỈ SỐ XÉT NGHIỆM OCR ------------ */}
      {hasData(bloodTests) && (
        <div className="bg-white shadow-md rounded-lg p-5 border">
          <h3 className="font-bold text-lg mb-4 text-teal-700 border-b pb-2">
            🧪 Chỉ số Xét nghiệm (OCR)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[300px]">
              <tbody>
                {Object.entries(bloodTests).map(([key, value]) => (
                  <tr key={key} className="border-b last:border-0">
                    <td className="py-3 font-medium text-gray-600 w-1/2">
                      {labelMap[key] || key}
                    </td>
                    <td className="py-3 text-teal-700 font-bold whitespace-nowrap">
                      {value} 
                      <span className="text-gray-500 text-xs font-normal ml-1">
                        {units[key] || ""}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------- BUTTON ------------ */}
      <div className="text-center mt-8 space-x-4 pb-10 flex flex-col md:flex-row justify-center gap-4 md:gap-0">
        <Link to="/" className="bg-gray-500 text-white px-6 py-3 rounded-lg w-full md:w-auto">
          ⬅ Hủy
        </Link>

        <button
          onClick={handleSaveToDB}
          disabled={isSaving}
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 w-full md:w-auto"
        >
          {isSaving ? "⏳ Đang lưu..." : "💾 Lưu vào MongoDB"}
        </button>
      </div>
    </div>
  );
}