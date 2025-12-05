
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function UploadImage() {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleAnalyze = async () => {
//     if (!image) return alert("⚠️ Vui lòng chọn ảnh trước!");

//     setLoading(true);

//     try {
//       // --- BƯỚC 1: GỬI ẢNH (OCR) ---
//       const formData = new FormData();
//       formData.append("file", image);

//       const resOCR = await fetch("http://127.0.0.1:8000/ocr", {
//         method: "POST",
//         body: formData,
//       });
//       const dataOCR = await resOCR.json(); // Đặt tên là dataOCR cho dễ hiểu

//       // --- BƯỚC 2: CHUẨN BỊ DỮ LIỆU ---
//       const savedData = localStorage.getItem("HO_SO_BENH_NHAN");
//       const patientInfo = savedData ? JSON.parse(savedData) : {};

//       console.log("📦 Dữ liệu lấy từ kho:", patientInfo);

//       const payload = {
//         gender: patientInfo.gender,
//         age: patientInfo.age,
//         height: patientInfo.height, 
//         weight: patientInfo.weight,
//         systolicBloodPressure: patientInfo.systolicBloodPressure,
//         diastolicBloodPressure: patientInfo.diastolicBloodPressure,
//         heartRate: patientInfo.heartRate,
//         bmi: patientInfo.bmi
//       };

//       const datatopredict = {
//         patient_info: payload,
//         blood_tests: dataOCR.data.blood_tests || {}, 
//       };

//       // --- BƯỚC 3: GỌI AI CHẨN ĐOÁN (PREDICT) ---
//       const resPredictDisease = await fetch("http://127.0.0.1:8000/predict-disease", {
//         method: 'POST',
//         body: JSON.stringify(datatopredict),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       // const resPredictHypertension = await fetch("http://127.0.0.1:8000/predict-hypertension", {
//       //   method: 'POST',
//       //   body: JSON.stringify(datatopredict),
//       //   headers: {
//       //     'Content-Type': 'application/json'
//       //   }
//       // });
//       const predict_result = await resPredictDisease.json();
//       console.log('🚩 Kết quả dự đoán tiểu đường từ backend:', predict_result);
//       // const predict_result_2 = await resPredictHypertension.json();
//       // console.log('🚩 Kết quả dự đoán tiểu đường từ backend:', predict_result_1);



//       setLoading(false);

//       // --- BƯỚC 4: CHUYỂN TRANG ---
//       navigate("/ket-qua-chan-doan", {
//         state: {
//           type: "Phân tích tổng hợp",
//           result: predict_result.data,
//           input: {
//             patient_info: patientInfo,
//             blood_tests: dataOCR.data.blood_tests 
//           },
//         },
//       });

//     } catch (err) {
//       setLoading(false);
//       alert("❌ Lỗi phân tích ảnh hoặc server!");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-xl space-y-4">
//       <h1 className="text-2xl font-bold text-center text-indigo-700">
//         📷 Phân tích ảnh xét nghiệm / đo huyết áp
//       </h1>

//       <div className="border-2 border-dashed border-indigo-300 p-6 rounded-xl text-center">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleUpload}
//           className="hidden"
//           id="upload"
//         />
//         <label
//           htmlFor="upload"
//           className="cursor-pointer text-indigo-600 font-semibold hover:underline"
//         >
//           Tải ảnh lên
//         </label>
//         <p className="text-gray-500 text-sm mt-2">
//           Hỗ trợ định dạng JPG, PNG, JPEG
//         </p>
//       </div>

//       {preview && (
//         <div className="flex justify-center">
//           <img
//             src={preview}
//             alt="preview"
//             className="mt-3 w-64 h-64 object-cover rounded-lg shadow-lg"
//           />
//         </div>
//       )}

//       <button
//         onClick={handleAnalyze}
//         disabled={loading}
//         className={`w-full py-3 rounded-lg text-white transition ${
//           loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
//         }`}
//       >
//         {loading ? "🔍 Đang phân tích ảnh..." : "Phân tích ảnh bằng AI"}
//       </button>
//     </div>
//   );
// }

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function UploadImage() {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // State để lưu dữ liệu sau khi OCR
//   const [ocrData, setOcrData] = useState(null); 
//   // State để hiển thị form nhập thiếu
//   const [showMissingForm, setShowMissingForm] = useState(false);
//   // State lưu thông tin bệnh nhân để chỉnh sửa/bổ sung
//   const [patientInfo, setPatientInfo] = useState({
//     name: "", gender: "", age: "", height: "", weight: "",
//     systolicBloodPressure: "", diastolicBloodPressure: "", heartRate: "", bmi: ""
//   });

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//       // Reset lại các trạng thái cũ khi chọn ảnh mới
//       setOcrData(null);
//       setShowMissingForm(false);
//     }
//   };

//   // --- GIAI ĐOẠN 1: GỬI ẢNH ĐỂ TRÍCH XUẤT DỮ LIỆU ---
//   const handleAnalyzeImage = async () => {
//     if (!image) return alert("⚠️ Vui lòng chọn ảnh trước!");

//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("file", image);

//       // Gọi API OCR (Gemini)
//       const resOCR = await fetch("http://127.0.0.1:8000/ocr", {
//         method: "POST",
//         body: formData,
//       });
//       const result = await resOCR.json();
      
//       if (result.status !== "success") {
//         throw new Error("Không đọc được dữ liệu");
//       }

//       const extractedPatient = result.data.patient_info;
//       const extractedBlood = result.data.blood_tests;

//       // Lưu trữ dữ liệu OCR nhận được
//       setOcrData(result.data);
      
//       // Đổ dữ liệu vào state patientInfo (cái nào null thì để rỗng để nhập)
//       setPatientInfo({
//         name: extractedPatient.name || "",
//         gender: extractedPatient.gender || "",
//         age: extractedPatient.age || "",
//         height: extractedPatient.height || "",
//         weight: extractedPatient.weight || "",
//         systolicBloodPressure: extractedPatient.systolicBloodPressure || "",
//         diastolicBloodPressure: extractedPatient.diastolicBloodPressure || "",
//         heartRate: extractedPatient.heartRate || "",
//         bmi: extractedPatient.bmi || ""
//       });

//       setLoading(false);

//       // --- KIỂM TRA XEM CÓ THIẾU DỮ LIỆU QUAN TRỌNG KHÔNG ---
//       // Các trường bắt buộc cho model dự đoán
//       const requiredFields = ['height', 'weight', 'systolicBloodPressure', 'diastolicBloodPressure', 'heartRate'];
      
//       // Kiểm tra xem có trường nào bị null hoặc rỗng không
//       const isMissingData = requiredFields.some(field => !extractedPatient[field]);

//       if (isMissingData) {
//         // Nếu thiếu -> Hiện form cho nhập
//         setShowMissingForm(true);
//       } else {
//         // Nếu đủ -> Chuyển sang dự đoán luôn
//         handleFinalPredict(extractedPatient, extractedBlood);
//       }

//     } catch (err) {
//       setLoading(false);
//       alert("❌ Lỗi phân tích ảnh hoặc server!");
//       console.error(err);
//     }
//   };

//   // Hàm xử lý thay đổi input khi nhập thông tin thiếu
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPatientInfo(prev => ({ ...prev, [name]: value }));
//   };

//   // --- GIAI ĐOẠN 2: DỰ ĐOÁN BỆNH (Sau khi đã đủ thông tin) ---
//   const handleFinalPredict = async (finalPatientInfo, bloodTests) => {
//     setLoading(true);
//     try {
//       // Tính lại BMI nếu có height/weight mà chưa có BMI
//       let currentBMI = finalPatientInfo.bmi;
//       if (!currentBMI && finalPatientInfo.height && finalPatientInfo.weight) {
//         const h = parseFloat(finalPatientInfo.height) / 100; // Đổi cm ra m
//         const w = parseFloat(finalPatientInfo.weight);
//         currentBMI = (w / (h * h)).toFixed(2);
//       }

//       const payload = {
//         patient_info: {
//           ...finalPatientInfo,
//           bmi: currentBMI
//         },
//         blood_tests: bloodTests || {}
//       };

//       console.log("🚀 Gửi dữ liệu đi dự đoán:", payload);

//       const resPredict = await fetch("http://127.0.0.1:8000/predict-disease", {
//         method: 'POST',
//         body: JSON.stringify(payload),
//         headers: { 'Content-Type': 'application/json' }
//       });
      
//       const predictResult = await resPredict.json();

//       setLoading(false);

//       navigate("/ket-qua-chan-doan", {
//         state: {
//           type: "Phân tích tổng hợp",
//           result: predictResult.data,
//           input: payload
//         },
//       });

//     } catch (err) {
//       setLoading(false);
//       alert("❌ Lỗi khi gửi dữ liệu dự đoán!");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-xl space-y-4">
//       <h1 className="text-2xl font-bold text-center text-indigo-700">
//         📷 Phân tích ảnh xét nghiệm
//       </h1>

//       {/* KHU VỰC UPLOAD ẢNH */}
//       {!showMissingForm && (
//         <>
//           <div className="border-2 border-dashed border-indigo-300 p-6 rounded-xl text-center">
//             <input type="file" accept="image/*" onChange={handleUpload} className="hidden" id="upload" />
//             <label htmlFor="upload" className="cursor-pointer text-indigo-600 font-semibold hover:underline">
//               Tải ảnh lên
//             </label>
//             <p className="text-gray-500 text-sm mt-2">Hỗ trợ định dạng JPG, PNG, JPEG</p>
//           </div>

//           {preview && (
//             <div className="flex justify-center">
//               <img src={preview} alt="preview" className="mt-3 w-64 h-64 object-cover rounded-lg shadow-lg" />
//             </div>
//           )}

//           <button
//             onClick={handleAnalyzeImage}
//             disabled={loading}
//             className={`w-full py-3 rounded-lg text-white transition ${loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}`}
//           >
//             {loading ? "🔍 Đang đọc dữ liệu ảnh..." : "Phân tích ảnh"}
//           </button>
//         </>
//       )}

//       {/* KHU VỰC NHẬP THÔNG TIN CÒN THIẾU */}
//       {showMissingForm && (
//         <div className="animate-fade-in-up">
//           <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
//             <p className="text-yellow-700">
//               ⚠️ Ảnh thiếu một số thông tin cần thiết. Vui lòng nhập bổ sung bên dưới:
//             </p>
//           </div>
          
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Tên bệnh nhân</label>
//               <input 
//                 type="text" name="name" value={patientInfo.name} onChange={handleInputChange}
//                 className="mt-1 block w-full p-2 border rounded-md bg-gray-100" readOnly 
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Tuổi</label>
//               <input 
//                 type="number" name="age" value={patientInfo.age} onChange={handleInputChange}
//                 className="mt-1 block w-full p-2 border rounded-md bg-gray-100" readOnly 
//               />
//             </div>

//             {/* Các trường có thể chỉnh sửa/nhập thêm */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Chiều cao (cm) <span className="text-red-500">*</span></label>
//               <input 
//                 type="number" name="height" value={patientInfo.height} onChange={handleInputChange} placeholder="VD: 165"
//                 className={`mt-1 block w-full p-2 border rounded-md ${!patientInfo.height ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Cân nặng (kg) <span className="text-red-500">*</span></label>
//               <input 
//                 type="number" name="weight" value={patientInfo.weight} onChange={handleInputChange} placeholder="VD: 60"
//                 className={`mt-1 block w-full p-2 border rounded-md ${!patientInfo.weight ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">HA Tâm Thu (mmHg) <span className="text-red-500">*</span></label>
//               <input 
//                 type="number" name="systolicBloodPressure" value={patientInfo.systolicBloodPressure} onChange={handleInputChange} placeholder="VD: 120"
//                 className={`mt-1 block w-full p-2 border rounded-md ${!patientInfo.systolicBloodPressure ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">HA Tâm Trương (mmHg) <span className="text-red-500">*</span></label>
//               <input 
//                 type="number" name="diastolicBloodPressure" value={patientInfo.diastolicBloodPressure} onChange={handleInputChange} placeholder="VD: 80"
//                 className={`mt-1 block w-full p-2 border rounded-md ${!patientInfo.diastolicBloodPressure ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Nhịp tim <span className="text-red-500">*</span></label>
//               <input 
//                 type="number" name="heartRate" value={patientInfo.heartRate} onChange={handleInputChange} placeholder="VD: 75"
//                 className={`mt-1 block w-full p-2 border rounded-md ${!patientInfo.heartRate ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
//               />
//             </div>
//           </div>

//           <button
//             onClick={() => handleFinalPredict(patientInfo, ocrData.blood_tests)}
//             disabled={loading}
//             className="w-full mt-6 py-3 rounded-lg text-white bg-green-600 hover:bg-green-700 font-bold transition"
//           >
//             {loading ? "🏥 Đang chẩn đoán..." : "✅ Hoàn tất & Chẩn đoán"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function UploadImage() {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(false);
  
//   // 1. Thêm state để kiểm soát việc hiện form nhập liệu
//   const [showInputForm, setShowInputForm] = useState(false);
  
//   // 2. State lưu dữ liệu bệnh nhân (để binding vào ô input)
//   const [patientData, setPatientData] = useState({
//     name: "", gender: "", age: "", height: "", weight: "",
//     systolicBloodPressure: "", diastolicBloodPressure: "", heartRate: "", bmi: ""
//   });
  
//   // 3. State lưu chỉ số máu (giữ nguyên từ OCR để gửi đi dự đoán)
//   const [bloodTests, setBloodTests] = useState({});

//   const navigate = useNavigate();

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//       // Reset lại nếu chọn ảnh khác
//       setShowInputForm(false);
//       setPatientData({});
//     }
//   };

//   const handleInputChange = (e) => {
//     setPatientData({ ...patientData, [e.target.name]: e.target.value });
//   };

//   // --- LOGIC MỚI: TÁCH LÀM 2 BƯỚC ---

//   // BƯỚC A: GỌI API OCR VÀ KIỂM TRA DỮ LIỆU
//   const handleAnalyzeOCR = async () => {
//     if (!image) return alert("⚠️ Vui lòng chọn ảnh trước!");
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("file", image);

//       // Gọi API OCR như cũ
//       const resOCR = await fetch("http://127.0.0.1:8000/ocr", {
//         method: "POST",
//         body: formData,
//       });
//       const responseData = await resOCR.json();

//       if (responseData.status === "success") {
//         const pInfo = responseData.data.patient_info;
//         const bTests = responseData.data.blood_tests;

//         // Lưu thông tin máu để dùng sau
//         setBloodTests(bTests);

//         // Đổ dữ liệu vào form (những cái null sẽ thành chuỗi rỗng để nhập)
//         const newPatientData = {
//           name: pInfo.name || "",
//           gender: pInfo.gender || "",
//           age: pInfo.age || "",
//           height: pInfo.height || "",
//           weight: pInfo.weight || "",
//           systolicBloodPressure: pInfo.systolicBloodPressure || "",
//           diastolicBloodPressure: pInfo.diastolicBloodPressure || "",
//           heartRate: pInfo.heartRate || "",
//           bmi: pInfo.bmi || ""
//         };
//         setPatientData(newPatientData);

//         // Kiểm tra xem có thiếu trường quan trọng nào không
//         // (Nếu thiếu chiều cao, cân nặng, huyết áp, nhịp tim -> Hiện form)
//         if (!pInfo.height || !pInfo.weight || !pInfo.systolicBloodPressure || !pInfo.diastolicBloodPressure || !pInfo.heartRate) {
//           setShowInputForm(true); // Hiện form nhập
//           setLoading(false);      // Tắt loading để user nhập
//         } else {
//           // Nếu ĐỦ hết rồi thì dự đoán luôn
//           handlePredictDisease(newPatientData, bTests);
//         }
//       } else {
//         alert("❌ Không đọc được dữ liệu từ ảnh!");
//         setLoading(false);
//       }
//     } catch (err) {
//       setLoading(false);
//       alert("❌ Lỗi server OCR!");
//       console.error(err);
//     }
//   };

//   // BƯỚC B: GỬI DỮ LIỆU ĐI DỰ ĐOÁN (PREDICT)
//   const handlePredictDisease = async (finalPatientData, finalBloodTests) => {
//     if (!loading) setLoading(true); // Bật lại loading nếu đang tắt

//     try {
//       // Logic tự tính BMI nếu user nhập tay chiều cao/cân nặng mà chưa có BMI
//       let currentBMI = finalPatientData.bmi;
//       if (!currentBMI && finalPatientData.height && finalPatientData.weight) {
//         const h = parseFloat(finalPatientData.height) / 100;
//         const w = parseFloat(finalPatientData.weight);
//         currentBMI = (w / (h * h)).toFixed(2);
//       }

//       const payload = {
//         patient_info: { ...finalPatientData, bmi: currentBMI },
//         blood_tests: finalBloodTests || {}
//       };

//       console.log("📦 Payload gửi đi:", payload);

//       const resPredict = await fetch("http://127.0.0.1:8000/predict-disease", {
//         method: 'POST',
//         body: JSON.stringify(payload),
//         headers: { 'Content-Type': 'application/json' }
//       });
//       const predict_result = await resPredict.json();

//       setLoading(false);

//       // Chuyển trang (giữ nguyên logic cũ)
//       navigate("/ket-qua-chan-doan", {
//         state: {
//           type: "Phân tích tổng hợp",
//           result: predict_result.data,
//           input: payload,
//         },
//       });

//     } catch (err) {
//       setLoading(false);
//       alert("❌ Lỗi dự đoán bệnh!");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-xl space-y-4">
//       <h1 className="text-2xl font-bold text-center text-indigo-700">
//         📷 Phân tích ảnh xét nghiệm / đo huyết áp
//       </h1>

//       {/* PHẦN 1: UPLOAD ẢNH (Giữ nguyên giao diện cũ, chỉ ẩn khi đang hiện form nhập) */}
//       {!showInputForm && (
//         <>
//           <div className="border-2 border-dashed border-indigo-300 p-6 rounded-xl text-center">
//             <input
//               type="file" accept="image/*" onChange={handleUpload} className="hidden" id="upload"
//             />
//             <label htmlFor="upload" className="cursor-pointer text-indigo-600 font-semibold hover:underline">
//               Tải ảnh lên
//             </label>
//             <p className="text-gray-500 text-sm mt-2">Hỗ trợ định dạng JPG, PNG, JPEG</p>
//           </div>

//           {preview && (
//             <div className="flex justify-center">
//               <img src={preview} alt="preview" className="mt-3 w-64 h-64 object-cover rounded-lg shadow-lg" />
//             </div>
//           )}

//           <button
//             onClick={handleAnalyzeOCR}
//             disabled={loading}
//             className={`w-full py-3 rounded-lg text-white transition ${
//               loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
//             }`}
//           >
//             {loading ? "🔍 Đang đọc ảnh..." : "Phân tích ảnh bằng AI"}
//           </button>
//         </>
//       )}

//       {/* PHẦN 2: FORM NHẬP THÔNG TIN CÒN THIẾU (Chỉ hiện khi thiếu dữ liệu) */}
//       {showInputForm && (
//         <div className="space-y-4 animate-fade-in">
//           <div className="bg-yellow-50 p-3 rounded text-yellow-800 border border-yellow-200">
//             ⚠️ AI không tìm thấy đủ thông tin trên ảnh. Vui lòng nhập bổ sung các ô trống:
//           </div>
          
//           <div className="grid grid-cols-2 gap-4">
//              {/* Chỉ hiển thị tên/tuổi để check, readonly */}
//              <div className="col-span-2 grid grid-cols-2 gap-4">
//                 <input className="p-2 border rounded bg-gray-100" value={patientData.name} readOnly />
//                 <input className="p-2 border rounded bg-gray-100" value={`Tuổi: ${patientData.age}`} readOnly />
//              </div>

//              {/* Các ô input để nhập thông tin thiếu */}
//              <div>
//                <label className="text-sm font-medium">Chiều cao (cm)</label>
//                <input 
//                  name="height" type="number" placeholder="VD: 165"
//                  value={patientData.height} onChange={handleInputChange}
//                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
//                />
//              </div>
//              <div>
//                <label className="text-sm font-medium">Cân nặng (kg)</label>
//                <input 
//                  name="weight" type="number" placeholder="VD: 60"
//                  value={patientData.weight} onChange={handleInputChange}
//                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
//                />
//              </div>
//              <div>
//                <label className="text-sm font-medium">Huyết áp tâm thu</label>
//                <input 
//                  name="systolicBloodPressure" type="number" placeholder="VD: 120"
//                  value={patientData.systolicBloodPressure} onChange={handleInputChange}
//                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
//                />
//              </div>
//              <div>
//                <label className="text-sm font-medium">Huyết áp tâm trương</label>
//                <input 
//                  name="diastolicBloodPressure" type="number" placeholder="VD: 80"
//                  value={patientData.diastolicBloodPressure} onChange={handleInputChange}
//                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
//                />
//              </div>
//              <div>
//                <label className="text-sm font-medium">Nhịp tim</label>
//                <input 
//                  name="heartRate" type="number" placeholder="VD: 75"
//                  value={patientData.heartRate} onChange={handleInputChange}
//                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
//                />
//              </div>
//           </div>

//           <button
//             onClick={() => handlePredictDisease(patientData, bloodTests)}
//             disabled={loading}
//             className="w-full py-3 rounded-lg text-white bg-green-600 hover:bg-green-700 font-bold"
//           >
//              {loading ? "🏥 Đang chẩn đoán..." : "✅ Hoàn tất & Xem kết quả"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function UploadImage() {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(false);
  
//   // State để kiểm soát việc hiện form nhập liệu khi thiếu thông tin
//   const [showInputForm, setShowInputForm] = useState(false);
  
//   // State lưu dữ liệu bệnh nhân
//   const [patientData, setPatientData] = useState({
//     name: "", gender: "", age: "", height: "", weight: "",
//     systolicBloodPressure: "", diastolicBloodPressure: "", heartRate: "", bmi: ""
//   });
  
//   // State lưu chỉ số máu (giữ nguyên từ OCR)
//   const [bloodTests, setBloodTests] = useState({});

//   const navigate = useNavigate();

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//       // Reset trạng thái
//       setShowInputForm(false);
//       setPatientData({});
//     }
//   };

//   const handleInputChange = (e) => {
//     setPatientData({ ...patientData, [e.target.name]: e.target.value });
//   };

//   // --- BƯỚC A: GỌI API OCR VÀ KIỂM TRA DỮ LIỆU ---
//   const handleAnalyzeOCR = async () => {
//     if (!image) return alert("⚠️ Vui lòng chọn ảnh trước!");
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("file", image);

//       // Gọi API OCR
//       const resOCR = await fetch("http://127.0.0.1:8000/ocr", {
//         method: "POST",
//         body: formData,
//       });
//       const responseData = await resOCR.json();

//       if (responseData.status === "success") {
//         const pInfo = responseData.data.patient_info;
//         const bTests = responseData.data.blood_tests;

//         setBloodTests(bTests);

//         // Đổ dữ liệu vào state
//         const newPatientData = {
//           name: pInfo.name || "",
//           gender: pInfo.gender || "", // Nếu OCR đọc được Nam/Nữ thì điền luôn
//           age: pInfo.age || "",
//           height: pInfo.height || "",
//           weight: pInfo.weight || "",
//           systolicBloodPressure: pInfo.systolicBloodPressure || "",
//           diastolicBloodPressure: pInfo.diastolicBloodPressure || "",
//           heartRate: pInfo.heartRate || "",
//           bmi: pInfo.bmi || ""
//         };
//         setPatientData(newPatientData);

//         // --- KIỂM TRA THIẾU DỮ LIỆU (Đã thêm gender) ---
//         // Nếu thiếu giới tính, chiều cao, cân nặng, hoặc các chỉ số huyết áp/tim
//         if (
//              !pInfo.gender ||                 // <--- Đã thêm check giới tính
//              !pInfo.height || 
//              !pInfo.weight || 
//              !pInfo.systolicBloodPressure || 
//              !pInfo.diastolicBloodPressure || 
//              !pInfo.heartRate
//            ) {
//           setShowInputForm(true); // Hiện form để nhập bổ sung
//           setLoading(false);      
//         } else {
//           // Nếu đủ hết thì dự đoán luôn
//           handlePredictDisease(newPatientData, bTests);
//         }
//       } else {
//         alert("❌ Không đọc được dữ liệu từ ảnh!");
//         setLoading(false);
//       }
//     } catch (err) {
//       setLoading(false);
//       alert("❌ Lỗi server OCR!");
//       console.error(err);
//     }
//   };

//   // --- BƯỚC B: GỬI DỮ LIỆU ĐI DỰ ĐOÁN ---
//   const handlePredictDisease = async (finalPatientData, finalBloodTests) => {
//     if (!loading) setLoading(true);

//     try {
//       // Tính BMI nếu cần
//       let currentBMI = finalPatientData.bmi;
//       if (!currentBMI && finalPatientData.height && finalPatientData.weight) {
//         const h = parseFloat(finalPatientData.height) / 100;
//         const w = parseFloat(finalPatientData.weight);
//         currentBMI = (w / (h * h)).toFixed(2);
//       }

//       const payload = {
//         patient_info: { ...finalPatientData, bmi: currentBMI },
//         blood_tests: finalBloodTests || {}
//       };

//       console.log("📦 Payload gửi đi:", payload);

//       const resPredict = await fetch("http://127.0.0.1:8000/predict-disease", {
//         method: 'POST',
//         body: JSON.stringify(payload),
//         headers: { 'Content-Type': 'application/json' }
//       });
//       const predict_result = await resPredict.json();

//       setLoading(false);

//       navigate("/ket-qua-chan-doan", {
//         state: {
//           type: "Phân tích tổng hợp",
//           result: predict_result.data,
//           input: payload,
//         },
//       });

//     } catch (err) {
//       setLoading(false);
//       alert("❌ Lỗi dự đoán bệnh!");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="w-full"> {/* Container full width */}
      
//       {/* PHẦN 1: GIAO DIỆN UPLOAD */}
//       {!showInputForm && (
//         <div className="space-y-4">
//           <div className="border-2 border-dashed border-indigo-300 p-8 rounded-xl text-center bg-indigo-50 hover:bg-indigo-100 transition cursor-pointer relative">
//              <input
//               type="file" accept="image/*" onChange={handleUpload} 
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
//             />
//             <div className="flex flex-col items-center">
//                <span className="text-4xl mb-2">📸</span>
//                <p className="text-indigo-700 font-bold">Tải ảnh phiếu khám / huyết áp</p>
//                <p className="text-gray-500 text-sm">Hỗ trợ JPG, PNG</p>
//             </div>
//           </div>

//           {preview && (
//             <div className="flex justify-center">
//               <img src={preview} alt="preview" className="h-48 object-contain rounded-lg shadow-md bg-white border" />
//             </div>
//           )}

//           <button
//             onClick={handleAnalyzeOCR}
//             disabled={loading}
//             className={`w-full py-3 rounded-lg text-white font-bold transition ${
//               loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
//             }`}
//           >
//             {loading ? "🔍 Đang phân tích..." : "🚀 Phân tích ảnh ngay"}
//           </button>
//         </div>
//       )}

//       {/* PHẦN 2: FORM NHẬP THÔNG TIN CÒN THIẾU */}
//       {showInputForm && (
//         <div className="animate-fade-in space-y-4">
//           <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 text-yellow-800 text-sm">
//             ⚠️ <b>Thiếu thông tin!</b> AI chưa đọc được một số chỉ số quan trọng. Vui lòng kiểm tra và nhập bổ sung bên dưới:
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//              {/* Readonly info */}
//              <div className="md:col-span-2 flex gap-4">
//                 <input className="w-full p-2 border rounded bg-gray-100 text-gray-500" value={patientData.name || "Tên: Chưa rõ"} readOnly />
//                 <input className="w-1/3 p-2 border rounded bg-gray-100 text-gray-500" value={patientData.age ? `${patientData.age} tuổi` : "Tuổi: ?"} readOnly />
//              </div>

//              {/* 1. GIỚI TÍNH (Mới thêm) */}
//              <div className="md:col-span-2">
//                <label className="text-sm font-semibold text-gray-700">Giới tính <span className="text-red-500">*</span></label>
//                <select 
//                   name="gender" 
//                   value={patientData.gender} 
//                   onChange={handleInputChange}
//                   className={`w-full p-2 border rounded mt-1 ${!patientData.gender ? 'border-red-300 ring-1 ring-red-200' : 'border-gray-300'}`}
//                >
//                  <option value="">-- Chọn giới tính --</option>
//                  <option value="Nam">Nam</option>
//                  <option value="Nữ">Nữ</option>
//                </select>
//              </div>

//              {/* Các chỉ số khác */}
//              <div>
//                <label className="text-sm font-medium">Chiều cao (cm)</label>
//                <input 
//                  name="height" type="number" placeholder="VD: 165"
//                  value={patientData.height} onChange={handleInputChange}
//                  className="w-full p-2 border rounded mt-1"
//                />
//              </div>
//              <div>
//                <label className="text-sm font-medium">Cân nặng (kg)</label>
//                <input 
//                  name="weight" type="number" placeholder="VD: 60"
//                  value={patientData.weight} onChange={handleInputChange}
//                  className="w-full p-2 border rounded mt-1"
//                />
//              </div>
//              <div>
//                <label className="text-sm font-medium">Huyết áp Tâm Thu</label>
//                <input 
//                  name="systolicBloodPressure" type="number" placeholder="VD: 120"
//                  value={patientData.systolicBloodPressure} onChange={handleInputChange}
//                  className="w-full p-2 border rounded mt-1"
//                />
//              </div>
//              <div>
//                <label className="text-sm font-medium">Huyết áp Tâm Trương</label>
//                <input 
//                  name="diastolicBloodPressure" type="number" placeholder="VD: 80"
//                  value={patientData.diastolicBloodPressure} onChange={handleInputChange}
//                  className="w-full p-2 border rounded mt-1"
//                />
//              </div>
//              <div className="md:col-span-2">
//                <label className="text-sm font-medium">Nhịp tim</label>
//                <input 
//                  name="heartRate" type="number" placeholder="VD: 75"
//                  value={patientData.heartRate} onChange={handleInputChange}
//                  className="w-full p-2 border rounded mt-1"
//                />
//              </div>
//           </div>

//           <button
//             onClick={() => handlePredictDisease(patientData, bloodTests)}
//             disabled={loading}
//             className="w-full py-3 rounded-lg text-white bg-green-600 hover:bg-green-700 font-bold shadow-lg transition"
//           >
//              {loading ? "🏥 Đang chẩn đoán..." : "✅ Hoàn tất & Xem kết quả"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function UploadImage() {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(false);
  
//   const [showInputForm, setShowInputForm] = useState(false);
  
//   // State lưu dữ liệu bệnh nhân
//   const [patientData, setPatientData] = useState({
//     name: "", gender: "", age: "", height: "", weight: "",
//     systolicBloodPressure: "", diastolicBloodPressure: "", heartRate: "", bmi: ""
//   });
  
//   // State lưu chỉ số máu (Giờ sẽ quản lý chặt chẽ hơn để binding vào input)
//   const [bloodTests, setBloodTests] = useState({
//     cholesterol: "", hdl: "", ldl: "", triglycerid: "", 
//     creatinin: "", hba1c: "", ure: "", vldl: ""
//   });

//   const navigate = useNavigate();

//   // Map tên tiếng Anh sang tiếng Việt để hiển thị label cho dễ hiểu
//   const bloodLabelMap = {
//     cholesterol: "Cholesterol",
//     hdl: "HDL-C",
//     ldl: "LDL-C",
//     triglycerid: "Triglycerid",
//     creatinin: "Creatinin",
//     hba1c: "HbA1c",
//     ure: "Ure",
//     vldl: "VLDL"
//   };

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//       setShowInputForm(false);
//       setPatientData({});
//       setBloodTests({}); // Reset chỉ số máu
//     }
//   };

//   const handlePatientChange = (e) => {
//     setPatientData({ ...patientData, [e.target.name]: e.target.value });
//   };

//   // Hàm mới để xử lý nhập liệu chỉ số máu
//   const handleBloodChange = (e) => {
//     setBloodTests({ ...bloodTests, [e.target.name]: e.target.value });
//   };

//   // --- BƯỚC A: GỌI API OCR VÀ KIỂM TRA DỮ LIỆU ---
//   const handleAnalyzeOCR = async () => {
//     if (!image) return alert("⚠️ Vui lòng chọn ảnh trước!");
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("file", image);

//       const resOCR = await fetch("http://127.0.0.1:8000/ocr", {
//         method: "POST",
//         body: formData,
//       });
//       const responseData = await resOCR.json();

//       if (responseData.status === "success") {
//         const pInfo = responseData.data.patient_info;
//         const bTests = responseData.data.blood_tests || {};

//         // 1. Setup dữ liệu Bệnh nhân
//         const newPatientData = {
//           name: pInfo.name || "",
//           gender: pInfo.gender || "",
//           age: pInfo.age || "",
//           height: pInfo.height || "",
//           weight: pInfo.weight || "",
//           systolicBloodPressure: pInfo.systolicBloodPressure || "",
//           diastolicBloodPressure: pInfo.diastolicBloodPressure || "",
//           heartRate: pInfo.heartRate || "",
//           bmi: pInfo.bmi || ""
//         };
//         setPatientData(newPatientData);

//         // 2. Setup dữ liệu Máu (Cái nào null thì để rỗng để nhập)
//         const newBloodTests = {
//           cholesterol: bTests.cholesterol || "",
//           hdl: bTests.hdl || "",
//           ldl: bTests.ldl || "",
//           triglycerid: bTests.triglycerid || "",
//           creatinin: bTests.creatinin || "",
//           hba1c: bTests.hba1c || "",
//           ure: bTests.ure || "",
//           vldl: bTests.vldl || ""
//         };
//         setBloodTests(newBloodTests);

//         // --- KIỂM TRA THIẾU DỮ LIỆU ---
        
//         // Kiểm tra thông tin cá nhân
//         const isPatientInfoMissing = 
//           !pInfo.gender || !pInfo.height || !pInfo.weight || 
//           !pInfo.systolicBloodPressure || !pInfo.diastolicBloodPressure || !pInfo.heartRate;

//         // Kiểm tra chỉ số máu (Bé có thể bỏ bớt trường khỏi mảng này nếu không bắt buộc)
//         const requiredBloodKeys = ['cholesterol', 'hdl', 'ldl', 'triglycerid', 'creatinin', 'hba1c'];
//         const isBloodTestMissing = requiredBloodKeys.some(key => !bTests[key]);

//         if (isPatientInfoMissing || isBloodTestMissing) {
//           setShowInputForm(true); // Hiện form nếu thiếu 1 trong 2 loại dữ liệu
//           setLoading(false);      
//         } else {
//           // Đủ hết thì chạy tiếp
//           handlePredictDisease(newPatientData, newBloodTests);
//         }
//       } else {
//         alert("❌ Không đọc được dữ liệu từ ảnh!");
//         setLoading(false);
//       }
//     } catch (err) {
//       setLoading(false);
//       alert("❌ Lỗi server OCR!");
//       console.error(err);
//     }
//   };

//   // --- BƯỚC B: GỬI DỮ LIỆU ĐI DỰ ĐOÁN ---
//   const handlePredictDisease = async (finalPatientData, finalBloodTests) => {
//     if (!loading) setLoading(true);

//     try {
//       let currentBMI = finalPatientData.bmi;
//       if (!currentBMI && finalPatientData.height && finalPatientData.weight) {
//         const h = parseFloat(finalPatientData.height) / 100;
//         const w = parseFloat(finalPatientData.weight);
//         currentBMI = (w / (h * h)).toFixed(2);
//       }

//       const payload = {
//         patient_info: { ...finalPatientData, bmi: currentBMI },
//         blood_tests: finalBloodTests || {}
//       };

//       console.log("📦 Payload gửi đi:", payload);

//       const resPredict = await fetch("http://127.0.0.1:8000/predict-disease", {
//         method: 'POST',
//         body: JSON.stringify(payload),
//         headers: { 'Content-Type': 'application/json' }
//       });
//       const predict_result = await resPredict.json();

//       setLoading(false);

//       navigate("/ket-qua-chan-doan", {
//         state: {
//           type: "Phân tích tổng hợp",
//           result: predict_result.data,
//           input: payload,
//         },
//       });

//     } catch (err) {
//       setLoading(false);
//       alert("❌ Lỗi dự đoán bệnh!");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="w-full">
      
//       {/* PHẦN 1: GIAO DIỆN UPLOAD (Giữ nguyên) */}
//       {!showInputForm && (
//         <div className="space-y-4">
//           <div className="border-2 border-dashed border-indigo-300 p-8 rounded-xl text-center bg-indigo-50 hover:bg-indigo-100 transition cursor-pointer relative">
//              <input
//               type="file" accept="image/*" onChange={handleUpload} 
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
//             />
//             <div className="flex flex-col items-center">
//                <span className="text-4xl mb-2">📸</span>
//                <p className="text-indigo-700 font-bold">Tải ảnh phiếu khám / huyết áp</p>
//                <p className="text-gray-500 text-sm">Hỗ trợ JPG, PNG</p>
//             </div>
//           </div>

//           {preview && (
//             <div className="flex justify-center">
//               <img src={preview} alt="preview" className="h-48 object-contain rounded-lg shadow-md bg-white border" />
//             </div>
//           )}

//           <button
//             onClick={handleAnalyzeOCR}
//             disabled={loading}
//             className={`w-full py-3 rounded-lg text-white font-bold transition ${
//               loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
//             }`}
//           >
//             {loading ? "🔍 Đang phân tích..." : "🚀 Phân tích ảnh ngay"}
//           </button>
//         </div>
//       )}

//       {/* PHẦN 2: FORM NHẬP THÔNG TIN CÒN THIẾU */}
//       {showInputForm && (
//         <div className="animate-fade-in space-y-6">
//           <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 text-yellow-800 text-sm">
//             ⚠️ <b>Thiếu thông tin!</b> AI chưa đọc được một số chỉ số. Vui lòng kiểm tra và nhập bổ sung:
//           </div>
          
//           {/* --- KHU VỰC 1: THÔNG TIN CÁ NHÂN & SINH HIỆU --- */}
//           <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
//             <h3 className="text-indigo-700 font-bold mb-3 flex items-center gap-2">
//               🧑‍⚕️ Thông tin & Sinh hiệu
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                {/* Readonly info */}
//                <div className="md:col-span-2 flex gap-4">
//                   <input className="w-full p-2 border rounded bg-gray-100 text-gray-500" value={patientData.name || "Tên: Chưa rõ"} readOnly />
//                   <input className="w-1/3 p-2 border rounded bg-gray-100 text-gray-500" value={patientData.age ? `${patientData.age} tuổi` : "Tuổi: ?"} readOnly />
//                </div>

//                {/* Giới tính */}
//                <div className="md:col-span-2">
//                  <label className="text-sm font-semibold text-gray-700">Giới tính <span className="text-red-500">*</span></label>
//                  <select 
//                     name="gender" 
//                     value={patientData.gender} 
//                     onChange={handlePatientChange}
//                     className={`w-full p-2 border rounded mt-1 ${!patientData.gender ? 'border-red-300 ring-1 ring-red-200' : 'border-gray-300'}`}
//                  >
//                    <option value="">-- Chọn giới tính --</option>
//                    <option value="Nam">Nam</option>
//                    <option value="Nữ">Nữ</option>
//                  </select>
//                </div>

//                <div className="grid grid-cols-2 gap-4 md:col-span-2">
//                  <div>
//                    <label className="text-xs font-bold text-gray-500 uppercase">Chiều cao (cm)</label>
//                    <input name="height" type="number" placeholder="VD: 165" value={patientData.height} onChange={handlePatientChange} className="w-full p-2 border rounded mt-1"/>
//                  </div>
//                  <div>
//                    <label className="text-xs font-bold text-gray-500 uppercase">Cân nặng (kg)</label>
//                    <input name="weight" type="number" placeholder="VD: 60" value={patientData.weight} onChange={handlePatientChange} className="w-full p-2 border rounded mt-1"/>
//                  </div>
//                  <div>
//                    <label className="text-xs font-bold text-gray-500 uppercase">Huyết áp Tâm Thu</label>
//                    <input name="systolicBloodPressure" type="number" placeholder="120" value={patientData.systolicBloodPressure} onChange={handlePatientChange} className="w-full p-2 border rounded mt-1"/>
//                  </div>
//                  <div>
//                    <label className="text-xs font-bold text-gray-500 uppercase">Huyết áp Tâm Trương</label>
//                    <input name="diastolicBloodPressure" type="number" placeholder="80" value={patientData.diastolicBloodPressure} onChange={handlePatientChange} className="w-full p-2 border rounded mt-1"/>
//                  </div>
//                  <div className="col-span-2">
//                    <label className="text-xs font-bold text-gray-500 uppercase">Nhịp tim</label>
//                    <input name="heartRate" type="number" placeholder="75" value={patientData.heartRate} onChange={handlePatientChange} className="w-full p-2 border rounded mt-1"/>
//                  </div>
//                </div>
//             </div>
//           </div>

//           {/* --- KHU VỰC 2: CHỈ SỐ XÉT NGHIỆM (MỚI THÊM) --- */}
//           <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
//             <h3 className="text-indigo-700 font-bold mb-3 flex items-center gap-2">
//               🧪 Chỉ số xét nghiệm (Máu/Nước tiểu)
//             </h3>
//             <div className="grid grid-cols-2 gap-4">
//               {Object.keys(bloodLabelMap).map((key) => (
//                 <div key={key}>
//                   <label className="text-xs font-bold text-gray-500 uppercase">
//                     {bloodLabelMap[key]} { !bloodTests[key] && <span className="text-red-400 text-[10px]">(Thiếu)</span> }
//                   </label>
//                   <input 
//                     name={key} 
//                     type="number" 
//                     step="0.01"
//                     placeholder="Nhập số..."
//                     value={bloodTests[key]} 
//                     onChange={handleBloodChange} 
//                     className={`w-full p-2 border rounded mt-1 ${!bloodTests[key] ? 'border-yellow-300 bg-yellow-50' : 'border-gray-300'}`}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button
//             onClick={() => handlePredictDisease(patientData, bloodTests)}
//             disabled={loading}
//             className="w-full py-3 rounded-lg text-white bg-green-600 hover:bg-green-700 font-bold shadow-lg transition"
//           >
//              {loading ? "🏥 Đang chẩn đoán..." : "✅ Hoàn tất & Xem kết quả"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }




// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function UploadImage() {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(false);
  
//   const [showInputForm, setShowInputForm] = useState(false);
  
//   // State lưu dữ liệu bệnh nhân
//   const [patientData, setPatientData] = useState({
//     name: "", gender: "", age: "", height: "", weight: "",
//     systolicBloodPressure: "", diastolicBloodPressure: "", heartRate: "", bmi: ""
//   });
  
//   // State lưu chỉ số máu
//   const [bloodTests, setBloodTests] = useState({
//     cholesterol: "", hdl: "", ldl: "", triglycerid: "", 
//     creatinin: "", hba1c: "", ure: "", vldl: ""
//   });

//   const navigate = useNavigate();

//   const bloodLabelMap = {
//     cholesterol: "Cholesterol",
//     hdl: "HDL-C",
//     ldl: "LDL-C",
//     triglycerid: "Triglycerid",
//     creatinin: "Creatinin",
//     hba1c: "HbA1c",
//     ure: "Ure",
//     vldl: "VLDL"
//   };

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//       setShowInputForm(false);
//       setPatientData({});
//       setBloodTests({});
//     }
//   };

//   const handlePatientChange = (e) => {
//     setPatientData({ ...patientData, [e.target.name]: e.target.value });
//   };

//   const handleBloodChange = (e) => {
//     setBloodTests({ ...bloodTests, [e.target.name]: e.target.value });
//   };

//   // --- BƯỚC A: GỌI API OCR ---
//   const handleAnalyzeOCR = async () => {
//     if (!image) return alert("⚠️ Vui lòng chọn ảnh trước!");
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("file", image);

//       const resOCR = await fetch("http://127.0.0.1:8000/ocr", {
//         method: "POST",
//         body: formData,
//       });
//       const responseData = await resOCR.json();

//       if (responseData.status === "success") {
//         const pInfo = responseData.data.patient_info;
//         const bTests = responseData.data.blood_tests || {};

//         const newPatientData = {
//           name: pInfo.name || "",
//           gender: pInfo.gender || "",
//           age: pInfo.age || "",
//           height: pInfo.height || "",
//           weight: pInfo.weight || "",
//           systolicBloodPressure: pInfo.systolicBloodPressure || "",
//           diastolicBloodPressure: pInfo.diastolicBloodPressure || "",
//           heartRate: pInfo.heartRate || "",
//           bmi: pInfo.bmi || ""
//         };
//         setPatientData(newPatientData);

//         const newBloodTests = {
//           cholesterol: bTests.cholesterol || "",
//           hdl: bTests.hdl || "",
//           ldl: bTests.ldl || "",
//           triglycerid: bTests.triglycerid || "",
//           creatinin: bTests.creatinin || "",
//           hba1c: bTests.hba1c || "",
//           ure: bTests.ure || "",
//           vldl: bTests.vldl || ""
//         };
//         setBloodTests(newBloodTests);

//         // --- KIỂM TRA THIẾU DỮ LIỆU ---
//         const isPatientInfoMissing = 
//           !pInfo.name || !pInfo.age || 
//           !pInfo.gender || !pInfo.height || !pInfo.weight || 
//           !pInfo.systolicBloodPressure || !pInfo.diastolicBloodPressure || !pInfo.heartRate;

//         const requiredBloodKeys = ['cholesterol', 'hdl', 'ldl', 'triglycerid', 'creatinin', 'hba1c'];
//         const isBloodTestMissing = requiredBloodKeys.some(key => !bTests[key]);

//         if (isPatientInfoMissing || isBloodTestMissing) {
//           setShowInputForm(true);
//           setLoading(false);      
//         } else {
//           handlePredictDisease(newPatientData, newBloodTests);
//         }
//       } else {
//         alert("❌ Không đọc được dữ liệu từ ảnh!");
//         setLoading(false);
//       }
//     } catch (err) {
//       setLoading(false);
//       alert("❌ Lỗi server OCR!");
//       console.error(err);
//     }
//   };

//   // --- BƯỚC B: PREDICT ---
//   const handlePredictDisease = async (finalPatientData, finalBloodTests) => {
//     if (!loading) setLoading(true);

//     try {
//       // Vẫn tự động tính BMI để gửi đi (dù không hiện ô nhập)
//       let currentBMI = finalPatientData.bmi;
//       if (!currentBMI && finalPatientData.height && finalPatientData.weight) {
//         const h = parseFloat(finalPatientData.height) / 100;
//         const w = parseFloat(finalPatientData.weight);
//         currentBMI = (w / (h * h)).toFixed(2);
//       }

//       const payload = {
//         patient_info: { ...finalPatientData, bmi: currentBMI },
//         blood_tests: finalBloodTests || {}
//       };

//       console.log("📦 Payload gửi đi:", payload);

//       const resPredict = await fetch("http://127.0.0.1:8000/predict-disease", {
//         method: 'POST',
//         body: JSON.stringify(payload),
//         headers: { 'Content-Type': 'application/json' }
//       });
//       const predict_result = await resPredict.json();

//       setLoading(false);

//       navigate("/ket-qua-chan-doan", {
//         state: {
//           type: "Phân tích tổng hợp",
//           result: predict_result.data,
//           input: payload,
//         },
//       });

//     } catch (err) {
//       setLoading(false);
//       alert("❌ Lỗi dự đoán bệnh!");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="w-full">
      
//       {!showInputForm && (
//         <div className="space-y-4">
//           <div className="border-2 border-dashed border-indigo-300 p-8 rounded-xl text-center bg-indigo-50 hover:bg-indigo-100 transition cursor-pointer relative">
//              <input
//               type="file" accept="image/*" onChange={handleUpload} 
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
//             />
//             <div className="flex flex-col items-center">
//                <span className="text-4xl mb-2">📸</span>
//                <p className="text-indigo-700 font-bold">Tải ảnh phiếu khám / huyết áp</p>
//                <p className="text-gray-500 text-sm">Hỗ trợ JPG, PNG</p>
//             </div>
//           </div>

//           {preview && (
//             <div className="flex justify-center">
//               <img src={preview} alt="preview" className="h-48 object-contain rounded-lg shadow-md bg-white border" />
//             </div>
//           )}

//           <button
//             onClick={handleAnalyzeOCR}
//             disabled={loading}
//             className={`w-full py-3 rounded-lg text-white font-bold transition ${
//               loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
//             }`}
//           >
//             {loading ? "🔍 Đang phân tích..." : "🚀 Phân tích ảnh ngay"}
//           </button>
//         </div>
//       )}

//       {showInputForm && (
//         <div className="animate-fade-in space-y-6">
//           <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 text-yellow-800 text-sm">
//             ⚠️ <b>Thiếu thông tin!</b> AI chưa đọc được một số chỉ số. Vui lòng kiểm tra và nhập bổ sung:
//           </div>
          
//           {/* --- KHU VỰC 1: THÔNG TIN CÁ NHÂN & SINH HIỆU --- */}
//           <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
//             <h3 className="text-indigo-700 font-bold mb-3 flex items-center gap-2">
//               🧑‍⚕️ Thông tin & Sinh hiệu
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               
//                {/* 1. HỌ TÊN & TUỔI */}
//                <div className="md:col-span-2 grid grid-cols-3 gap-4">
//                   <div className="col-span-2">
//                     <label className="text-sm font-semibold text-gray-700">Họ và tên</label>
//                     <input 
//                       name="name" 
//                       type="text"
//                       placeholder="Nhập họ và tên..."
//                       value={patientData.name} 
//                       onChange={handlePatientChange}
//                       className={`w-full p-2 border rounded mt-1 ${!patientData.name ? 'border-yellow-300 bg-yellow-50' : 'border-gray-300'}`} 
//                     />
//                   </div>
//                   <div>
//                     <label className="text-sm font-semibold text-gray-700">Tuổi</label>
//                     <input 
//                       name="age"
//                       type="number"
//                       placeholder="Tuổi..."
//                       value={patientData.age} 
//                       onChange={handlePatientChange}
//                       className={`w-full p-2 border rounded mt-1 ${!patientData.age ? 'border-yellow-300 bg-yellow-50' : 'border-gray-300'}`} 
//                     />
//                   </div>
//                </div>

//                {/* 2. GIỚI TÍNH */}
//                <div className="md:col-span-2">
//                  <label className="text-sm font-semibold text-gray-700">Giới tính <span className="text-red-500">*</span></label>
//                  <select 
//                     name="gender" 
//                     value={patientData.gender} 
//                     onChange={handlePatientChange}
//                     className={`w-full p-2 border rounded mt-1 ${!patientData.gender ? 'border-red-300 ring-1 ring-red-200' : 'border-gray-300'}`}
//                  >
//                    <option value="">-- Chọn giới tính --</option>
//                    <option value="Nam">Nam</option>
//                    <option value="Nữ">Nữ</option>
//                  </select>
//                </div>

//                {/* 3. CÁC CHỈ SỐ SINH HIỆU KHÁC */}
//                <div className="grid grid-cols-2 gap-4 md:col-span-2">
//                  <div>
//                    <label className="text-xs font-bold text-gray-500 uppercase">Chiều cao (cm)</label>
//                    <input name="height" type="number" placeholder="VD: 165" value={patientData.height} onChange={handlePatientChange} className="w-full p-2 border rounded mt-1"/>
//                  </div>
//                  <div>
//                    <label className="text-xs font-bold text-gray-500 uppercase">Cân nặng (kg)</label>
//                    <input name="weight" type="number" placeholder="VD: 60" value={patientData.weight} onChange={handlePatientChange} className="w-full p-2 border rounded mt-1"/>
//                  </div>
                 
//                  <div>
//                    <label className="text-xs font-bold text-gray-500 uppercase">HA Tâm Thu</label>
//                    <input name="systolicBloodPressure" type="number" placeholder="120" value={patientData.systolicBloodPressure} onChange={handlePatientChange} className="w-full p-2 border rounded mt-1"/>
//                  </div>
//                  <div>
//                    <label className="text-xs font-bold text-gray-500 uppercase">HA Tâm Trương</label>
//                    <input name="diastolicBloodPressure" type="number" placeholder="80" value={patientData.diastolicBloodPressure} onChange={handlePatientChange} className="w-full p-2 border rounded mt-1"/>
//                  </div>
                 
//                  {/* Nhịp tim full width cho đẹp */}
//                  <div className="col-span-2">
//                    <label className="text-xs font-bold text-gray-500 uppercase">Nhịp tim</label>
//                    <input name="heartRate" type="number" placeholder="75" value={patientData.heartRate} onChange={handlePatientChange} className="w-full p-2 border rounded mt-1"/>
//                  </div>
//                </div>
//             </div>
//           </div>

//           {/* --- KHU VỰC 2: CHỈ SỐ XÉT NGHIỆM --- */}
//           <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
//             <h3 className="text-indigo-700 font-bold mb-3 flex items-center gap-2">
//               🧪 Chỉ số xét nghiệm (Máu/Nước tiểu)
//             </h3>
//             <div className="grid grid-cols-2 gap-4">
//               {Object.keys(bloodLabelMap).map((key) => (
//                 <div key={key}>
//                   <label className="text-xs font-bold text-gray-500 uppercase">
//                     {bloodLabelMap[key]} { !bloodTests[key] && <span className="text-red-400 text-[10px]">(Thiếu)</span> }
//                   </label>
//                   <input 
//                     name={key} 
//                     type="number" 
//                     step="0.01"
//                     placeholder="Nhập số..."
//                     value={bloodTests[key]} 
//                     onChange={handleBloodChange} 
//                     className={`w-full p-2 border rounded mt-1 ${!bloodTests[key] ? 'border-yellow-300 bg-yellow-50' : 'border-gray-300'}`}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button
//             onClick={() => handlePredictDisease(patientData, bloodTests)}
//             disabled={loading}
//             className="w-full py-3 rounded-lg text-white bg-green-600 hover:bg-green-700 font-bold shadow-lg transition"
//           >
//              {loading ? "🏥 Đang chẩn đoán..." : "✅ Hoàn tất & Xem kết quả"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Đang xử lý..."); // State cho text loading
  
  const [showInputForm, setShowInputForm] = useState(false);
  
  // State lưu dữ liệu bệnh nhân
  const [patientData, setPatientData] = useState({
    name: "", gender: "", age: "", height: "", weight: "",
    systolicBloodPressure: "", diastolicBloodPressure: "", heartRate: "", bmi: ""
  });
  
  // State lưu chỉ số máu
  const [bloodTests, setBloodTests] = useState({
    cholesterol: "", hdl: "", ldl: "", triglycerid: "", 
    creatinin: "", hba1c: "", ure: "", vldl: ""
  });

  const navigate = useNavigate();
  // Dùng useRef để quản lý timer, tránh lỗi khi component unmount
  const timerRef1 = useRef(null);
  const timerRef2 = useRef(null);

  const bloodLabelMap = {
    cholesterol: "Cholesterol",
    hdl: "HDL-C",
    ldl: "LDL-C",
    triglycerid: "Triglycerid",
    creatinin: "Creatinin",
    hba1c: "HbA1c",
    ure: "Ure",
    vldl: "VLDL"
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setShowInputForm(false);
      setPatientData({});
      setBloodTests({});
    }
  };

  const handlePatientChange = (e) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  const handleBloodChange = (e) => {
    setBloodTests({ ...bloodTests, [e.target.name]: e.target.value });
  };

  // --- BƯỚC A: GỌI API OCR ---
  const handleAnalyzeOCR = async () => {
    if (!image) return alert("⚠️ Vui lòng chọn ảnh trước!");
    
    setLoading(true);
    setLoadingText("☁️ Đang gửi ảnh lên server...");

    // Tạo hiệu ứng loading text thay đổi để người dùng đỡ sốt ruột
    timerRef1.current = setTimeout(() => setLoadingText("🤖 AI đang đọc dữ liệu phiếu khám..."), 2500);
    timerRef2.current = setTimeout(() => setLoadingText("🏥 Đang tổng hợp hồ sơ bệnh án..."), 5500);

    try {
      const formData = new FormData();
      formData.append("file", image);

      const resOCR = await fetch("http://127.0.0.1:8000/ocr", {
        method: "POST",
        body: formData,
      });
      const responseData = await resOCR.json();

      // Xóa timer nếu API trả về sớm hơn dự kiến
      clearTimeout(timerRef1.current);
      clearTimeout(timerRef2.current);

      if (responseData.status === "success") {
        const pInfo = responseData.data.patient_info;
        const bTests = responseData.data.blood_tests || {};

        const newPatientData = {
          name: pInfo.name || "",
          gender: pInfo.gender || "",
          age: pInfo.age || "",
          height: pInfo.height || "",
          weight: pInfo.weight || "",
          systolicBloodPressure: pInfo.systolicBloodPressure || "",
          diastolicBloodPressure: pInfo.diastolicBloodPressure || "",
          heartRate: pInfo.heartRate || "",
          bmi: pInfo.bmi || ""
        };
        setPatientData(newPatientData);

        const newBloodTests = {
          cholesterol: bTests.cholesterol || "",
          hdl: bTests.hdl || "",
          ldl: bTests.ldl || "",
          triglycerid: bTests.triglycerid || "",
          creatinin: bTests.creatinin || "",
          hba1c: bTests.hba1c || "",
          ure: bTests.ure || "",
          vldl: bTests.vldl || ""
        };
        setBloodTests(newBloodTests);

        // --- KIỂM TRA THIẾU DỮ LIỆU ---
        const isPatientInfoMissing = 
          !pInfo.name || !pInfo.age || 
          !pInfo.gender || !pInfo.height || !pInfo.weight || 
          !pInfo.systolicBloodPressure || !pInfo.diastolicBloodPressure || !pInfo.heartRate;

        const requiredBloodKeys = ['cholesterol', 'hdl', 'ldl', 'triglycerid', 'creatinin', 'hba1c'];
        const isBloodTestMissing = requiredBloodKeys.some(key => !bTests[key]);

        if (isPatientInfoMissing || isBloodTestMissing) {
          setShowInputForm(true);
          setLoading(false);      
        } else {
          // Đủ dữ liệu -> Chuyển sang dự đoán luôn
          handlePredictDisease(newPatientData, newBloodTests);
        }
      } else {
        alert("❌ Không đọc được dữ liệu từ ảnh!");
        setLoading(false);
      }
    } catch (err) {
      clearTimeout(timerRef1.current);
      clearTimeout(timerRef2.current);
      setLoading(false);
      alert("❌ Lỗi server OCR!");
      console.error(err);
    }
  };

  // --- BƯỚC B: PREDICT ---
  const handlePredictDisease = async (finalPatientData, finalBloodTests) => {
    if (!loading) {
        setLoading(true);
        setLoadingText("🧠 AI đang chẩn đoán bệnh...");
    }

    try {
      // Tự động tính BMI ngầm (Weight / Height^2)
      let currentBMI = finalPatientData.bmi;
      if (!currentBMI && finalPatientData.height && finalPatientData.weight) {
        const h = parseFloat(finalPatientData.height) / 100;
        const w = parseFloat(finalPatientData.weight);
        currentBMI = (w / (h * h)).toFixed(2);
      }

      const payload = {
        patient_info: { ...finalPatientData, bmi: currentBMI },
        blood_tests: finalBloodTests || {}
      };

      console.log("📦 Payload gửi đi:", payload);

      const resPredict = await fetch("http://127.0.0.1:8000/predict-disease", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      });
      const predict_result = await resPredict.json();

      setLoading(false);

      navigate("/ket-qua-chan-doan", {
        state: {
          type: "Phân tích tổng hợp",
          result: predict_result.data,
          input: payload,
        },
      });

    } catch (err) {
      setLoading(false);
      alert("❌ Lỗi dự đoán bệnh!");
      console.error(err);
    }
  };

  return (
    <div className="w-full">
      
      {/* 1. KHU VỰC UPLOAD */}
      {!showInputForm && (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-indigo-300 p-8 rounded-xl text-center bg-indigo-50 hover:bg-indigo-100 transition cursor-pointer relative">
             <input
              type="file" accept="image/*" onChange={handleUpload} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            />
            <div className="flex flex-col items-center">
               <span className="text-4xl mb-2">📸</span>
               <p className="text-indigo-700 font-bold">Tải ảnh phiếu khám / huyết áp</p>
               <p className="text-gray-500 text-sm">Hỗ trợ JPG, PNG</p>
            </div>
          </div>

          {preview && (
            <div className="flex justify-center">
              <img src={preview} alt="preview" className="h-48 object-contain rounded-lg shadow-md bg-white border" />
            </div>
          )}

          <button
            onClick={handleAnalyzeOCR}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-bold transition flex justify-center items-center gap-2 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-lg"
            }`}
          >
            {loading ? (
                <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{loadingText}</span>
                </>
            ) : (
                "🚀 Phân tích ảnh ngay"
            )}
          </button>
        </div>
      )}

      {/* 2. KHU VỰC FORM NHẬP THIẾU */}
      {showInputForm && (
        <div className="animate-fade-in space-y-6">
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 text-yellow-800 text-sm">
            ⚠️ <b>Thiếu thông tin!</b> AI chưa đọc được một số chỉ số. Vui lòng kiểm tra và nhập bổ sung:
          </div>
          
          {/* --- A. THÔNG TIN CÁ NHÂN & SINH HIỆU --- */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-indigo-700 font-bold mb-3 flex items-center gap-2">
              🧑‍⚕️ Thông tin & Sinh hiệu
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               
               {/* Tên & Tuổi */}
               <div className="md:col-span-2 grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="text-sm font-semibold text-gray-700">Họ và tên</label>
                    <input 
                      name="name" type="text" placeholder="Nhập họ và tên..."
                      value={patientData.name} onChange={handlePatientChange}
                      className={`w-full p-2 border rounded mt-1 ${!patientData.name ? 'border-yellow-300 bg-yellow-50' : 'border-gray-300'}`} 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Tuổi</label>
                    <input 
                      name="age" type="number" placeholder="Tuổi..."
                      value={patientData.age} onChange={handlePatientChange}
                      className={`w-full p-2 border rounded mt-1 ${!patientData.age ? 'border-yellow-300 bg-yellow-50' : 'border-gray-300'}`} 
                    />
                  </div>
               </div>

               {/* Giới tính */}
               <div className="md:col-span-2">
                 <label className="text-sm font-semibold text-gray-700">Giới tính <span className="text-red-500">*</span></label>
                 <select 
                    name="gender" value={patientData.gender} onChange={handlePatientChange}
                    className={`w-full p-2 border rounded mt-1 ${!patientData.gender ? 'border-red-300 ring-1 ring-red-200' : 'border-gray-300'}`}
                 >
                   <option value="">-- Chọn giới tính --</option>
                   <option value="Nam">Nam</option>
                   <option value="Nữ">Nữ</option>
                 </select>
               </div>

               {/* Sinh hiệu */}
               <div className="grid grid-cols-2 gap-4 md:col-span-2">
                 <div>
                   <label className="text-xs font-bold text-gray-500 uppercase">Chiều cao (cm)</label>
                   <input name="height" type="number" placeholder="165" value={patientData.height} onChange={handlePatientChange} className="w-full p-2 border rounded mt-1"/>
                 </div>
                 <div>
                   <label className="text-xs font-bold text-gray-500 uppercase">Cân nặng (kg)</label>
                   <input name="weight" type="number" placeholder="60" value={patientData.weight} onChange={handlePatientChange} className="w-full p-2 border rounded mt-1"/>
                 </div>
                 
                 <div>
                   <label className="text-xs font-bold text-gray-500 uppercase">HA Tâm Thu</label>
                   <input name="systolicBloodPressure" type="number" placeholder="120" value={patientData.systolicBloodPressure} onChange={handlePatientChange} className="w-full p-2 border rounded mt-1"/>
                 </div>
                 <div>
                   <label className="text-xs font-bold text-gray-500 uppercase">HA Tâm Trương</label>
                   <input name="diastolicBloodPressure" type="number" placeholder="80" value={patientData.diastolicBloodPressure} onChange={handlePatientChange} className="w-full p-2 border rounded mt-1"/>
                 </div>
                 
                 <div className="col-span-2">
                   <label className="text-xs font-bold text-gray-500 uppercase">Nhịp tim</label>
                   <input name="heartRate" type="number" placeholder="75" value={patientData.heartRate} onChange={handlePatientChange} className="w-full p-2 border rounded mt-1"/>
                 </div>
               </div>
            </div>
          </div>

          {/* --- B. CHỈ SỐ XÉT NGHIỆM --- */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-indigo-700 font-bold mb-3 flex items-center gap-2">
              🧪 Chỉ số xét nghiệm (Máu/Nước tiểu)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(bloodLabelMap).map((key) => (
                <div key={key}>
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    {bloodLabelMap[key]} { !bloodTests[key] && <span className="text-red-400 text-[10px]">(Thiếu)</span> }
                  </label>
                  <input 
                    name={key} type="number" step="0.01" placeholder="Nhập số..."
                    value={bloodTests[key]} onChange={handleBloodChange} 
                    className={`w-full p-2 border rounded mt-1 ${!bloodTests[key] ? 'border-yellow-300 bg-yellow-50' : 'border-gray-300'}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handlePredictDisease(patientData, bloodTests)}
            disabled={loading}
            className="w-full py-3 rounded-lg text-white bg-green-600 hover:bg-green-700 font-bold shadow-lg transition flex justify-center items-center gap-2"
          >
             {loading ? (
                 <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{loadingText}</span>
                 </>
             ) : "✅ Hoàn tất & Xem kết quả"}
          </button>
        </div>
      )}
    </div>
  );
}