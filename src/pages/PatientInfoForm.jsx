
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function PatientInfoForm() {
//   // 1. Khai báo State (tên biến chuẩn camelCase)
//   const [formData, setFormData] = useState({
//     name: "",
//     birthDate: "",
//     age: "",
//     gender: "",
//     phone: "",
//     address: "",
//     height: "",
//     weight: "",
//     bmi: "",
//     systolicBloodPressure: "",
//     diastolicBloodPressure: "",
//     heartRate: "",
//   });

//   const navigate = useNavigate();

//   // 2. Tự động tính BMI khi chiều cao/cân nặng thay đổi
//   useEffect(() => {
//     const { height, weight } = formData;
//     if (height && weight) {
//       const bmiValue = (weight / ((height / 100) ** 2)).toFixed(1);
//       setFormData((prev) => ({ ...prev, bmi: bmiValue }));
//     }
//   }, [formData.height, formData.weight]);

//   // 3. Hàm cập nhật dữ liệu khi nhập
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // 4. HÀM XỬ LÝ KHI BẤM NÚT LƯU (Đã sửa lại để không bị reload)
//   const handleNextStep = () => {
//     // 🛡️ Kiểm tra dữ liệu bắt buộc (Validation thủ công)
//     if (!formData.name || !formData.phone) {
//       alert("⚠️ Vui lòng điền ít nhất Tên và Số điện thoại!");
//       return; // Dừng lại, không chạy tiếp
//     }

//     console.log("📦 Đóng gói hàng gửi đi:", formData);
//     localStorage.setItem("HO_SO_BENH_NHAN", JSON.stringify(formData));

//     console.log("✅ Đã lưu vào kho, đang chuyển trang...");

//     // 🚀 Chuyển trang và mang theo dữ liệu
//     navigate("/upload-image", {
//       state: {
//         patient_info: formData, 
//       },
//     });
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white shadow-xl rounded-xl hover:shadow-2xl transition-shadow duration-300">
//       <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
//         🧾 Thông tin bệnh nhân
//       </h2>

//       {/* 🔴 QUAN TRỌNG: Bỏ onSubmit ở thẻ form đi */}
//       <form className="space-y-5">
        
//         {/* --- Nhóm 1: Hành chính --- */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text" name="name" 
//             value={formData.name} // Thêm value để đồng bộ
//             placeholder="Họ và tên (*)"
//             className="border border-gray-300 p-3 rounded-lg w-full"
//             onChange={handleChange}
//           />
//           <input
//             type="date" name="birthDate"
//             value={formData.birthDate}
//             className="border border-gray-300 p-3 rounded-lg w-full"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="number" name="age" placeholder="Tuổi"
//             value={formData.age}
//             className="border border-gray-300 p-3 rounded-lg w-full"
//             onChange={handleChange}
//           />
//           <select
//             name="gender"
//             value={formData.gender}
//             className="border border-gray-300 p-3 rounded-lg w-full"
//             onChange={handleChange}
//           >
//             <option value="">-- Chọn Giới tính --</option>
//             <option value="Nam">Nam</option>
//             <option value="Nữ">Nữ</option>
//           </select>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="tel" name="phone" placeholder="Số điện thoại (*)"
//             value={formData.phone}
//             className="border border-gray-300 p-3 rounded-lg w-full"
//             onChange={handleChange}
//           />
//           <input
//             type="text" name="address" placeholder="Địa chỉ"
//             value={formData.address}
//             className="border border-gray-300 p-3 rounded-lg w-full"
//             onChange={handleChange}
//           />
//         </div>

//         {/* --- Nhóm 2: Chỉ số cơ thể --- */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <input
//             type="number" name="height" placeholder="Chiều cao (cm)"
//             value={formData.height}
//             className="border border-gray-300 p-3 rounded-lg w-full"
//             onChange={handleChange}
//           />
//           <input
//             type="number" name="weight" placeholder="Cân nặng (kg)"
//             value={formData.weight}
//             className="border border-gray-300 p-3 rounded-lg w-full"
//             onChange={handleChange}
//           />
//           <input
//             type="text" name="bmi" placeholder="BMI"
//             value={formData.bmi || ""} readOnly
//             className="border border-gray-300 bg-gray-100 p-3 rounded-lg w-full text-center font-semibold text-blue-700"
//           />
//         </div>

//         {/* --- Nhóm 3: Huyet ap --- */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <input
//             type="number" 
//             name="heartRate" // Tên đúng
//             value={formData.heartRate} // Đồng bộ value
//             placeholder="Nhịp tim"
//             className="border border-gray-300 p-3 rounded-lg w-full"
//             onChange={handleChange}
//           />
//           <input
//             type="number" 
//             name="systolicBloodPressure" // Tên đúng
//             value={formData.systolicBloodPressure}
//             placeholder="Huyết áp tâm thu"
//             className="border border-gray-300 p-3 rounded-lg w-full"
//             onChange={handleChange}
//           />
//           <input
//             type="number" 
//             name="diastolicBloodPressure" // Tên đúng
//             value={formData.diastolicBloodPressure}
//             placeholder="Huyết áp tâm trương"
//             className="border border-gray-300 p-3 rounded-lg w-full"
//             onChange={handleChange}
//           />
//         </div>

//         {/* --- Nút bấm --- */}
//         <div className="text-center space-x-4">
//           <button
//             // 🔴 QUAN TRỌNG NHẤT: type="button" để KHÔNG load lại trang
//             type="button" 
//             onClick={handleNextStep}
//             className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200"
//           >
//             💾 Lưu và Tiếp tục ➡
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { User, Calendar, Activity, Phone, MapPin, ChevronRight, Upload, ArrowLeft } from "lucide-react";

// --- Components ---

// 1. Component Form Nhập liệu (Màn hình 1)
function PatientInfoForm({ onNext }) {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    height: "",
    weight: "",
    bmi: "",
    systolicBloodPressure: "",
    diastolicBloodPressure: "",
    heartRate: "",
  });

  const [error, setError] = useState("");

  // Tự động tính BMI
  useEffect(() => {
    const { height, weight } = formData;
    if (height && weight) {
      const bmiValue = (weight / ((height / 100) ** 2)).toFixed(1);
      setFormData((prev) => ({ ...prev, bmi: bmiValue }));
    }
  }, [formData.height, formData.weight]);

  // Tự động tính TUỔI
  useEffect(() => {
    if (formData.birthDate) {
      const birthYear = new Date(formData.birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      const calculatedAge = currentYear - birthYear;
      
      setFormData((prev) => ({ 
        ...prev, 
        age: calculatedAge >= 0 ? calculatedAge : 0 
      }));
    }
  }, [formData.birthDate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleNextStep = () => {
    if (!formData.name || !formData.phone) {
      setError("⚠️ Vui lòng điền ít nhất Tên và Số điện thoại!");
      return;
    }

    console.log("📦 Đóng gói hàng gửi đi:", formData);
    localStorage.setItem("HO_SO_BENH_NHAN", JSON.stringify(formData));
    
    // Gọi hàm của cha để chuyển trang
    onNext(formData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
      <div className="bg-blue-600 p-6 text-white text-center">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <User size={28} /> Thông Tin Bệnh Nhân
        </h2>
        <p className="opacity-90 mt-1">Vui lòng nhập đầy đủ thông tin bên dưới</p>
      </div>

      <div className="p-8">
        <form className="space-y-6">
          {/* Nhóm 1: Hành chính */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">Họ và tên <span className="text-red-500">*</span></label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text" name="name" 
                  value={formData.name}
                  placeholder="Nguyễn Văn A"
                  className="pl-10 border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1"><Calendar size={14}/> Ngày sinh</label>
              <input
                type="date" name="birthDate"
                value={formData.birthDate}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Tuổi</label>
              <input
                type="number" name="age" placeholder="Tự động tính"
                value={formData.age}
                className="border border-gray-300 p-3 rounded-lg w-full bg-gray-50 text-gray-600 font-medium"
                readOnly // Để readOnly vì đã tự động tính
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Giới tính</label>
              <select
                name="gender"
                value={formData.gender}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                onChange={handleChange}
              >
                <option value="">-- Chọn --</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">Số điện thoại <span className="text-red-500">*</span></label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="tel" name="phone" placeholder="0901234567"
                  value={formData.phone}
                  className="pl-10 border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">Địa chỉ</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text" name="address" placeholder="Nhập địa chỉ..."
                  value={formData.address}
                  className="pl-10 border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Nhóm 2: Chỉ số cơ thể */}
          <h3 className="font-semibold text-gray-700 flex items-center gap-2"><Activity size={20} className="text-blue-500"/> Chỉ số cơ thể</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number" name="height" placeholder="Chiều cao (cm)"
              value={formData.height}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              onChange={handleChange}
            />
            <input
              type="number" name="weight" placeholder="Cân nặng (kg)"
              value={formData.weight}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              onChange={handleChange}
            />
            <div className="relative">
               <input
                type="text" name="bmi" placeholder="BMI"
                value={formData.bmi || ""} readOnly
                className="border border-blue-200 bg-blue-50 p-3 rounded-lg w-full text-center font-bold text-blue-700"
              />
              <span className="absolute right-3 top-3 text-xs text-blue-400 font-medium">BMI</span>
            </div>
          </div>

          {/* Nhóm 3: Tim mạch */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number" name="heartRate"
              value={formData.heartRate}
              placeholder="Nhịp tim"
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              onChange={handleChange}
            />
            <input
              type="number" name="systolicBloodPressure"
              value={formData.systolicBloodPressure}
              placeholder="Huyết áp tâm thu"
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              onChange={handleChange}
            />
            <input
              type="number" name="diastolicBloodPressure"
              value={formData.diastolicBloodPressure}
              placeholder="Huyết áp tâm trương"
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              onChange={handleChange}
            />
          </div>

          {/* Thông báo lỗi */}
          {error && (
              <div className="text-red-600 bg-red-50 p-3 rounded-lg text-center border border-red-200 animate-pulse">
                  {error}
              </div>
          )}

          {/* Nút bấm */}
          <div className="pt-4 flex justify-center">
            <button
              type="button" 
              onClick={handleNextStep}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Lưu và Tiếp tục <ChevronRight size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 2. Component Upload Ảnh (Màn hình 2 - Demo)
function UploadImage({ data, onBack }) {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden p-8 text-center space-y-6">
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <Upload size={40} />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Tải Lên Hình Ảnh</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-left max-w-md mx-auto">
        <h3 className="font-semibold text-gray-700 mb-2 border-b pb-2">Thông tin đã nhận:</h3>
        <p><span className="font-medium">Bệnh nhân:</span> {data?.name}</p>
        <p><span className="font-medium">Tuổi:</span> {data?.age}</p>
        <p><span className="font-medium">BMI:</span> {data?.bmi}</p>
      </div>

      <p className="text-gray-500">
        (Đây là màn hình demo để thay thế cho route "/upload-image")
      </p>

      <button 
        onClick={onBack}
        className="text-gray-600 hover:text-blue-600 font-medium flex items-center justify-center gap-2 mx-auto mt-6"
      >
        <ArrowLeft size={18} /> Quay lại chỉnh sửa
      </button>
    </div>
  );
}

// 3. Main App Component (Quản lý Router bằng State)
export default function App() {
  // Vì môi trường này không hỗ trợ react-router-dom đầy đủ (gây lỗi useNavigate),
  // chúng ta sử dụng state để chuyển đổi màn hình.
  const [currentStep, setCurrentStep] = useState('info'); // 'info' | 'upload'
  const [patientData, setPatientData] = useState(null);

  const handleNavigateToUpload = (data) => {
    setPatientData(data);
    setCurrentStep('upload');
  };

  const handleBackToInfo = () => {
    setCurrentStep('info');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      {currentStep === 'info' && (
        <PatientInfoForm onNext={handleNavigateToUpload} />
      )}
      
      {/* {currentStep === 'upload' && (
        <UploadImage data={patientData} onBack={handleBackToInfo} />
      )} */}
    </div>
  );
}