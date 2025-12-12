
// import { useState } from "react";
// import { useLocation, Link, useNavigate } from "react-router-dom";

// // Map tên biến => tiếng Việt
// const labelMap = {
//   name: "Họ tên",
//   age: "Tuổi",
//   gender: "Giới tính",
//   height: "Chiều cao",
//   weight: "Cân nặng",
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
//   vldl: "VLDL",
// };

// export default function DiagnosisResult() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Lấy data từ trang trước
//   const { result, input } = location.state || {};

//   const [doctorNote, setDoctorNote] = useState("");
//   const [isSaving, setIsSaving] = useState(false);

//   const patientInfo = input?.patient_info || {};
//   const bloodTests = input?.blood_tests || {};
//   const units = input?.units || {};

//   const hasData = (obj) => obj && Object.keys(obj).length > 0;

//   if (!input) {
//     return (
//       <p className="text-center mt-10 text-red-500">
//         ❌ Không có dữ liệu từ trang trước!
//       </p>
//     );
//   }

//   const handleSaveToDB = async () => {
//     setIsSaving(true);

//     try {
//       const finalPayload = {
//         patient_info: patientInfo,
//         blood_tests: bloodTests,
//         units: units,
//         ai_diagnosis: result,
//         doctor_diagnosis: doctorNote,
//       };

//       const res = await fetch("http://127.0.0.1:8000/api/save-record", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(finalPayload),
//       });

//       const data = await res.json();

//       if (data.status === "success") {
//         alert("✅ Lưu hồ sơ thành công!");
//         navigate("/ho-so-benh-an");
//       } else {
//         alert("⚠️ Lưu thất bại: " + data.message);
//       }
//     } catch (err) {
//       alert("❌ Lỗi server: " + err.message);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-800">
//         🔍 Kết quả & Đối chiếu
//       </h1>

//       {/* ---------- KHỐI CHẨN ĐOÁN (Grid đổi thành 1 cột trên mobile) ------------ */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white shadow-xl rounded-xl p-6 border-l-8 border-blue-600">
//           <h2 className="text-xl font-bold mb-3 text-blue-700">
//             🤖 AI Chẩn đoán
//           </h2>
//           <p className="text-gray-800 text-lg font-medium">{result}</p>
//         </div>

//         <div className="bg-white shadow-xl rounded-xl p-6 border-l-8 border-green-600 flex flex-col">
//           <h2 className="text-xl font-bold mb-3 text-green-700">
//             👨‍⚕️ Bác sĩ nhận xét
//           </h2>
//           <textarea
//             className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 flex-grow"
//             rows="4"
//             placeholder="Nhập kết luận vào đây..."
//             value={doctorNote}
//             onChange={(e) => setDoctorNote(e.target.value)}
//           ></textarea>
//         </div>
//       </div>

//       {/* ---------- THÔNG TIN BỆNH NHÂN ------------ */}
//       {hasData(patientInfo) && (
//         <div className="bg-white shadow-md rounded-lg p-5 border">
//           <h3 className="font-bold text-lg mb-4 text-gray-700 border-b pb-2">
//             🧑‍⚕️ Thông tin bệnh nhân
//           </h3>
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm min-w-[300px]">
//               <tbody>
//                 {Object.entries(patientInfo).map(([key, value]) => (
//                   <tr key={key} className="border-b last:border-0">
//                     <td className="py-3 font-medium text-gray-600 w-1/2">
//                       {labelMap[key] || key}
//                     </td>
//                     <td className="py-3 font-semibold">{value}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* ---------- CHỈ SỐ XÉT NGHIỆM OCR ------------ */}
//       {hasData(bloodTests) && (
//         <div className="bg-white shadow-md rounded-lg p-5 border">
//           <h3 className="font-bold text-lg mb-4 text-teal-700 border-b pb-2">
//             🧪 Chỉ số Xét nghiệm (OCR)
//           </h3>
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm min-w-[300px]">
//               <tbody>
//                 {Object.entries(bloodTests).map(([key, value]) => (
//                   <tr key={key} className="border-b last:border-0">
//                     <td className="py-3 font-medium text-gray-600 w-1/2">
//                       {labelMap[key] || key}
//                     </td>
//                     <td className="py-3 text-teal-700 font-bold whitespace-nowrap">
//                       {value} 
//                       <span className="text-gray-500 text-xs font-normal ml-1">
//                         {units[key] || ""}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* ---------- BUTTON ------------ */}
//       <div className="text-center mt-8 space-x-4 pb-10 flex flex-col md:flex-row justify-center gap-4 md:gap-0">
//         <Link to="/" className="bg-gray-500 text-white px-6 py-3 rounded-lg w-full md:w-auto">
//           ⬅ Hủy
//         </Link>

//         <button
//           onClick={handleSaveToDB}
//           disabled={isSaving}
//           className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 w-full md:w-auto"
//         >
//           {isSaving ? "⏳ Đang lưu..." : "💾 Lưu vào MongoDB"}
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import { useLocation, Link, useNavigate } from "react-router-dom";
// import { ChevronRight, Save, Activity, CheckCircle } from "lucide-react";

// // Map tên biến => tiếng Việt (Giữ nguyên)
// const labelMap = {
//    name: "Họ tên", age: "Tuổi", gender: "Giới tính", height: "Chiều cao", weight: "Cân nặng",
//    cholesterol: "Cholesterol", hba1c: "HbA1c", ure: "Urea", bmi: "BMI",
//    systolicBloodPressure: "Huyết áp tâm thu", diastolicBloodPressure: "Huyết áp tâm trương",
//    heartRate: "Nhịp tim", hdl: "HDL", ldl: "LDL",
//    triglycerides: "Triglycerides", triglycerid: "Triglycerides",
//    creatinin: "Creatinin", vldl: "VLDL",
// };

// export default function DiagnosisResult() {
//    const location = useLocation();
//    const navigate = useNavigate();

//    // --- NHẬN DATA TỪ UPLOAD PAGE ---
//    // dataQueue là mảng chứa thông tin của tất cả các phiếu đã review
//    const { dataQueue } = location.state || {};

//    // --- STATE QUẢN LÝ ---
//    const [currentIndex, setCurrentIndex] = useState(0); // Đang xem phiếu thứ mấy
//    const [aiResult, setAiResult] = useState(""); // Kết quả AI chẩn đoán
//    const [doctorNote, setDoctorNote] = useState(""); // Ghi chú bác sĩ
   
//    const [loadingPredict, setLoadingPredict] = useState(false);
//    const [isSaving, setIsSaving] = useState(false);
//    const [savedIds, setSavedIds] = useState([]); // Lưu ID các phiếu đã save để tránh save lại

//    // Lấy dữ liệu của bệnh nhân hiện tại
//    const currentRecord = dataQueue && dataQueue[currentIndex] ? dataQueue[currentIndex] : null;

//    useEffect(() => {
//       if (!dataQueue || dataQueue.length === 0) return;
//       if (currentRecord) {
//          handlePredictDisease(currentRecord);
//          setDoctorNote(""); // Reset ghi chú khi chuyển bệnh nhân
//       }
//    }, [currentIndex, dataQueue]);

//    // --- HÀM GỌI API CHẨN ĐOÁN BỆNH ---
//    const handlePredictDisease = async (record) => {
//       setLoadingPredict(true);
//       setAiResult("Đang phân tích...");

//       const { patientData, bloodTests, units } = record;
      
//       // Tính lại BMI nếu cần
//       let currentBMI = patientData.bmi;
//       if (!currentBMI && patientData.height && patientData.weight) {
//           const h = parseFloat(patientData.height) / 100;
//           const w = parseFloat(patientData.weight);
//           currentBMI = (w / (h * h)).toFixed(2);
//       }

//       const payload = {
//           patient_info: { ...patientData, bmi: currentBMI },
//           blood_tests: bloodTests,
//           units: units
//       };

//       try {
//           const res = await fetch("http://127.0.0.1:8000/predict-disease", {
//              method: 'POST',
//              body: JSON.stringify(payload),
//              headers: { 'Content-Type': 'application/json' }
//           });
//           const data = await res.json();
//           setAiResult(data.data || "Không có kết quả");
//       } catch (err) {
//           console.error(err);
//           setAiResult("⚠️ Lỗi kết nối AI server.");
//       } finally {
//           setLoadingPredict(false);
//       }
//    };

//    // --- HÀM LƯU VÀO DATABASE ---
//    const handleSaveAndNext = async () => {
//       if (!currentRecord) return;
      
//       setIsSaving(true);
//       try {
//           const finalPayload = {
//              patient_info: currentRecord.patientData,
//              blood_tests: currentRecord.bloodTests,
//              units: currentRecord.units,
//              ai_diagnosis: aiResult,
//              doctor_diagnosis: doctorNote,
//           };

//           const res = await fetch("http://127.0.0.1:8000/api/save-record", {
//              method: "POST",
//              headers: { "Content-Type": "application/json" },
//              body: JSON.stringify(finalPayload),
//           });
//           const data = await res.json();

//           if (data.status === "success") {
//              // Đánh dấu đã lưu
//              setSavedIds([...savedIds, currentIndex]);
             
//              // Chuyển sang phiếu tiếp theo
//              if (currentIndex < dataQueue.length - 1) {
//                  alert(`✅ Đã lưu hồ sơ bệnh nhân ${currentIndex + 1}. Chuyển sang hồ sơ tiếp theo.`);
//                  setCurrentIndex(currentIndex + 1);
//                  window.scrollTo(0, 0);
//              } else {
//                  alert("🎉 Đã hoàn tất lưu toàn bộ hồ sơ!");
//                  navigate("/ho-so-benh-an"); // Quay về danh sách hồ sơ
//              }
//           } else {
//              alert("⚠️ Lưu thất bại: " + data.message);
//           }
//       } catch (err) {
//           alert("❌ Lỗi server: " + err.message);
//       } finally {
//           setIsSaving(false);
//       }
//    };

//    if (!dataQueue || dataQueue.length === 0) {
//       return <div className="p-10 text-center text-red-500">❌ Không có dữ liệu! Vui lòng quay lại upload ảnh.</div>;
//    }

//    return (
//      <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen">
//        {/* HEADER TIẾN ĐỘ */}
//        <div className="flex items-center justify-between">
//            <h1 className="text-2xl md:text-3xl font-bold text-blue-800">🔍 Kết quả Chẩn đoán</h1>
//            <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-bold text-sm">
//                Hồ sơ {currentIndex + 1} / {dataQueue.length}
//            </div>
//        </div>

//        {/* --- KHỐI CHẨN ĐOÁN --- */}
//        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//          {/* CỘT TRÁI: AI */}
//          <div className="bg-white shadow-xl rounded-xl p-6 border-l-8 border-blue-600 flex flex-col h-full">
//             <h2 className="text-xl font-bold mb-3 text-blue-700 flex items-center gap-2">
//                 🤖 AI Phân tích
//                 {loadingPredict && <Activity className="animate-spin text-blue-400" size={20}/>}
//             </h2>
//             <div className="bg-blue-50 p-4 rounded-lg flex-grow overflow-auto min-h-[150px]">
//                 {loadingPredict ? (
//                     <p className="text-gray-500 italic">Đang chạy mô hình dự đoán...</p>
//                 ) : (
//                     <p className="text-gray-800 text-lg font-medium whitespace-pre-wrap">{aiResult}</p>
//                 )}
//             </div>
//          </div>

//          {/* CỘT PHẢI: BÁC SĨ NHẬN XÉT */}
//          <div className="bg-white shadow-xl rounded-xl p-6 border-l-8 border-green-600 flex flex-col h-full">
//             <h2 className="text-xl font-bold mb-3 text-green-700">👨‍⚕️ Bác sĩ kết luận</h2>
//             <textarea
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 flex-grow min-h-[150px]"
//               placeholder="Nhập kết luận chuyên môn..."
//               value={doctorNote}
//               onChange={(e) => setDoctorNote(e.target.value)}
//             ></textarea>
//          </div>
//        </div>

//        {/* --- THÔNG TIN CHI TIẾT BỆNH NHÂN HIỆN TẠI --- */}
//        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//            {/* THÔNG TIN CÁ NHÂN */}
//            <div className="lg:col-span-1 bg-white shadow-md rounded-lg p-5 border h-fit">
//               <h3 className="font-bold text-lg mb-4 text-gray-700 border-b pb-2">🧑‍⚕️ Thông tin bệnh nhân</h3>
//               <table className="w-full text-sm">
//                  <tbody>
//                     {currentRecord.patientData && Object.entries(currentRecord.patientData).map(([key, value]) => (
//                         value && (
//                             <tr key={key} className="border-b last:border-0">
//                                 <td className="py-2 text-gray-600">{labelMap[key] || key}</td>
//                                 <td className="py-2 font-bold text-right">{value}</td>
//                             </tr>
//                         )
//                     ))}
//                  </tbody>
//               </table>
//            </div>

//            {/* KẾT QUẢ XÉT NGHIỆM */}
//            <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-5 border">
//               <h3 className="font-bold text-lg mb-4 text-teal-700 border-b pb-2">🧪 Chỉ số Xét nghiệm</h3>
//               <div className="overflow-x-auto">
//                  <table className="w-full text-sm">
//                     <thead>
//                         <tr className="bg-gray-100 text-gray-600 uppercase text-xs">
//                             <th className="py-2 px-2 text-left">Chỉ số</th>
//                             <th className="py-2 px-2 text-right">Giá trị</th>
//                             <th className="py-2 px-2 text-left">Đơn vị</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {currentRecord.bloodTests && Object.entries(currentRecord.bloodTests).map(([key, value]) => (
//                            <tr key={key} className="border-b last:border-0 hover:bg-gray-50">
//                               <td className="py-3 px-2 font-medium text-gray-700">{labelMap[key] || key}</td>
//                               <td className="py-3 px-2 text-teal-700 font-bold text-right text-base">{value}</td>
//                               <td className="py-3 px-2 text-gray-500 text-xs">{currentRecord.units[key] || ""}</td>
//                            </tr>
//                         ))}
//                     </tbody>
//                  </table>
//               </div>
//            </div>
//        </div>

//        {/* --- BUTTON ĐIỀU HƯỚNG --- */}
//        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg z-50 md:relative md:bg-transparent md:border-0 md:shadow-none md:p-0 mt-8">
//            <div className="max-w-5xl mx-auto flex gap-4 justify-end">
//                 <Link to="/" className="px-6 py-3 rounded-lg bg-gray-500 text-white font-medium hover:bg-gray-600 transition">
//                     Thoát
//                 </Link>

//                 <button
//                    onClick={handleSaveAndNext}
//                    disabled={isSaving || loadingPredict}
//                    className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white shadow-lg transition transform active:scale-95 ${
//                        isSaving ? "bg-green-400 cursor-wait" : "bg-green-600 hover:bg-green-700"
//                    }`}
//                 >
//                    {isSaving ? (
//                        <>⏳ Đang lưu...</>
//                    ) : (
//                        <>
//                            <Save size={20}/> 
//                            {currentIndex < dataQueue.length - 1 ? "Lưu & Tiếp theo" : "Lưu & Hoàn tất"}
//                        </>
//                    )}
//                 </button>
//            </div>
//        </div>
//        {/* Khoảng trống để nút fixed không che nội dung trên mobile */}
//        <div className="h-20 md:h-0"></div>
//      </div>
//    );
// }


import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { ChevronRight, Save, Activity, CheckCircle } from "lucide-react";

// Thêm key 'id' vào Label map
const labelMap = {
   id: "Mã Hồ Sơ", // <--- MỚI
   name: "Họ tên", age: "Tuổi", gender: "Giới tính", height: "Chiều cao", weight: "Cân nặng",
   cholesterol: "Cholesterol", hba1c: "HbA1c", ure: "Urea", bmi: "BMI",
   systolicBloodPressure: "Huyết áp tâm thu", diastolicBloodPressure: "Huyết áp tâm trương",
   heartRate: "Nhịp tim", hdl: "HDL", ldl: "LDL",
   triglycerides: "Triglycerides", triglycerid: "Triglycerides",
   creatinin: "Creatinin", vldl: "VLDL",
};

export default function DiagnosisResult() {
   const location = useLocation();
   const navigate = useNavigate();

   const { dataQueue } = location.state || {};

   const [currentIndex, setCurrentIndex] = useState(0); 
   const [aiResult, setAiResult] = useState(""); 
   const [doctorNote, setDoctorNote] = useState(""); 
   
   const [loadingPredict, setLoadingPredict] = useState(false);
   const [isSaving, setIsSaving] = useState(false);
   const [savedIds, setSavedIds] = useState([]);

   const currentRecord = dataQueue && dataQueue[currentIndex] ? dataQueue[currentIndex] : null;

   useEffect(() => {
      if (!dataQueue || dataQueue.length === 0) return;
      if (currentRecord) {
         handlePredictDisease(currentRecord);
         setDoctorNote(""); 
      }
   }, [currentIndex, dataQueue]);

   const handlePredictDisease = async (record) => {
      setLoadingPredict(true);
      setAiResult("Đang phân tích...");

      const { patientData, bloodTests, units } = record;
      
      let currentBMI = patientData.bmi;
      if (!currentBMI && patientData.height && patientData.weight) {
          const h = parseFloat(patientData.height) / 100;
          const w = parseFloat(patientData.weight);
          currentBMI = (w / (h * h)).toFixed(2);
      }

      const payload = {
          patient_info: { ...patientData, bmi: currentBMI },
          blood_tests: bloodTests,
          units: units
      };

      try {
          const res = await fetch("https://webkltn-backend.onrender.com/predict-disease", {
             method: 'POST',
             body: JSON.stringify(payload),
             headers: { 'Content-Type': 'application/json' }
          });
          const data = await res.json();
          setAiResult(data.data || "Không có kết quả");
      } catch (err) {
          console.error(err);
          setAiResult("⚠️ Lỗi kết nối AI server.");
      } finally {
          setLoadingPredict(false);
      }
   };

   // --- HÀM LƯU VÀO DATABASE ĐÃ CẬP NHẬT ---
   const handleSaveAndNext = async () => {
      if (!currentRecord) return;
      
      setIsSaving(true);
      try {
          const finalPayload = {
             // Lấy ID đã tạo ở trang trước gửi lên Backend
             patient_id: currentRecord.patientData.id, // <--- GỬI ID
             patient_info: currentRecord.patientData,
             blood_tests: currentRecord.bloodTests,
             units: currentRecord.units,
             ai_diagnosis: aiResult,
             doctor_diagnosis: doctorNote,
          };

          const res = await fetch("https://webkltn-backend.onrender.com/api/save-record", {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify(finalPayload),
          });
          const data = await res.json();

          if (data.status === "success") {
             setSavedIds([...savedIds, currentIndex]);
             
             if (currentIndex < dataQueue.length - 1) {
                 alert(`✅ Đã lưu hồ sơ ${currentRecord.patientData.id}. Chuyển tiếp.`);
                 setCurrentIndex(currentIndex + 1);
                 window.scrollTo(0, 0);
             } else {
                 alert("🎉 Đã hoàn tất lưu toàn bộ hồ sơ!");
                 navigate("/ho-so-benh-an"); 
             }
          } else {
             alert("⚠️ Lưu thất bại: " + data.message);
          }
      } catch (err) {
          alert("❌ Lỗi server: " + err.message);
      } finally {
          setIsSaving(false);
      }
   };

   if (!dataQueue || dataQueue.length === 0) {
      return <div className="p-10 text-center text-red-500">❌ Không có dữ liệu! Vui lòng quay lại upload ảnh.</div>;
   }

   return (
     <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen">
       <div className="flex items-center justify-between">
           <h1 className="text-2xl md:text-3xl font-bold text-blue-800">🔍 Kết quả Chẩn đoán</h1>
           <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-bold text-sm">
               Hồ sơ {currentIndex + 1} / {dataQueue.length}
           </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white shadow-xl rounded-xl p-6 border-l-8 border-blue-600 flex flex-col h-full">
            <h2 className="text-xl font-bold mb-3 text-blue-700 flex items-center gap-2">
                🤖 AI Phân tích
                {loadingPredict && <Activity className="animate-spin text-blue-400" size={20}/>}
            </h2>
            <div className="bg-blue-50 p-4 rounded-lg flex-grow overflow-auto min-h-[150px]">
                {loadingPredict ? (
                    <p className="text-gray-500 italic">Đang chạy mô hình dự đoán...</p>
                ) : (
                    <p className="text-gray-800 text-lg font-medium whitespace-pre-wrap">{aiResult}</p>
                )}
            </div>
         </div>

         <div className="bg-white shadow-xl rounded-xl p-6 border-l-8 border-green-600 flex flex-col h-full">
            <h2 className="text-xl font-bold mb-3 text-green-700">👨‍⚕️ Bác sĩ kết luận</h2>
            <textarea
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 flex-grow min-h-[150px]"
              placeholder="Nhập kết luận chuyên môn..."
              value={doctorNote}
              onChange={(e) => setDoctorNote(e.target.value)}
            ></textarea>
         </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-1 bg-white shadow-md rounded-lg p-5 border h-fit">
              <h3 className="font-bold text-lg mb-4 text-gray-700 border-b pb-2">🧑‍⚕️ Thông tin bệnh nhân</h3>
              <table className="w-full text-sm">
                 <tbody>
                    {/* Hiển thị ID đầu tiên nếu có */}
                    {currentRecord.patientData.id && (
                        <tr className="border-b bg-yellow-50">
                            <td className="py-2 text-gray-600 pl-2">Mã Hồ Sơ</td>
                            <td className="py-2 font-bold text-right text-red-600 pr-2">{currentRecord.patientData.id}</td>
                        </tr>
                    )}
                    {currentRecord.patientData && Object.entries(currentRecord.patientData).map(([key, value]) => (
                        key !== 'id' && value && (
                            <tr key={key} className="border-b last:border-0">
                                <td className="py-2 text-gray-600">{labelMap[key] || key}</td>
                                <td className="py-2 font-bold text-right">{value}</td>
                            </tr>
                        )
                    ))}
                 </tbody>
              </table>
           </div>

           <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-5 border">
              <h3 className="font-bold text-lg mb-4 text-teal-700 border-b pb-2">🧪 Chỉ số Xét nghiệm</h3>
              <div className="overflow-x-auto">
                 <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <th className="py-2 px-2 text-left">Chỉ số</th>
                            <th className="py-2 px-2 text-right">Giá trị</th>
                            <th className="py-2 px-2 text-left">Đơn vị</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecord.bloodTests && Object.entries(currentRecord.bloodTests).map(([key, value]) => (
                           <tr key={key} className="border-b last:border-0 hover:bg-gray-50">
                              <td className="py-3 px-2 font-medium text-gray-700">{labelMap[key] || key}</td>
                              <td className="py-3 px-2 text-teal-700 font-bold text-right text-base">{value}</td>
                              <td className="py-3 px-2 text-gray-500 text-xs">{currentRecord.units[key] || ""}</td>
                           </tr>
                        ))}
                    </tbody>
                 </table>
              </div>
           </div>
       </div>

       <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg z-50 md:relative md:bg-transparent md:border-0 md:shadow-none md:p-0 mt-8">
           <div className="max-w-5xl mx-auto flex gap-4 justify-end">
                <Link to="/" className="px-6 py-3 rounded-lg bg-gray-500 text-white font-medium hover:bg-gray-600 transition">
                    Thoát
                </Link>

                <button
                   onClick={handleSaveAndNext}
                   disabled={isSaving || loadingPredict}
                   className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white shadow-lg transition transform active:scale-95 ${
                       isSaving ? "bg-green-400 cursor-wait" : "bg-green-600 hover:bg-green-700"
                   }`}
                >
                   {isSaving ? (
                       <>⏳ Đang lưu...</>
                   ) : (
                       <>
                           <Save size={20}/> 
                           {currentIndex < dataQueue.length - 1 ? "Lưu & Tiếp theo" : "Lưu & Hoàn tất"}
                       </>
                   )}
                </button>
           </div>
       </div>
       <div className="h-20 md:h-0"></div>
     </div>
   );
}