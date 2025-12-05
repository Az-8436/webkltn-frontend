// // pages/Diagnosis.jsx
// import PatientInfoForm from "./PatientInfoForm";
// import UploadImage from "./UploadImage";

// export default function Diagnosis() {
//   return (
//     <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 p-6">

//       {/* Cột trái: Thông tin bệnh nhân */}
//       <div className="bg-white rounded-xl shadow-xl p-6">
//         <h2 className="text-xl font-bold mb-4 text-indigo-700">
//           🧑‍⚕️ Thông tin bệnh nhân
//         </h2>
//         <PatientInfoForm />
//       </div>

//       {/* Cột phải: Phân tích ảnh */}
//       <div className="bg-white rounded-xl shadow-xl p-6">
//         <h2 className="text-xl font-bold mb-4 text-indigo-700">
//           📷 Phân tích ảnh AI
//         </h2>
//         <UploadImage />
//       </div>
//     </div>
//   );
// }

// pages/Diagnosis.jsx
import UploadImage from "./UploadImage"; 
// Bỏ dòng import PatientInfoForm vì mình không dùng nữa

export default function Diagnosis() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center pt-10">
      
      {/* Tiêu đề lớn của trang */}
      <h1 className="text-3xl font-bold text-indigo-800 mb-2">
        Hệ thống Chẩn đoán AI
      </h1>
      <p className="text-gray-500 mb-8">Tự động phân tích chỉ số sức khỏe từ hình ảnh</p>

      {/* Container chính: Giờ chỉ còn 1 khối duy nhất nằm giữa */}
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl border border-indigo-50">
        
        {/* Header của khối chức năng */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">
            📷 Phân tích ảnh xét nghiệm
          </h2>
          <p className="text-sm text-gray-500">
            Hệ thống hỗ trợ đọc phiếu xét nghiệm máu, phiếu đo huyết áp và đưa ra dự đoán bệnh lý.
          </p>
        </div>

        {/* Component UploadImage (Logic mới đã cập nhật) */}
        <UploadImage />
        
      </div>
    </div>
  );
}