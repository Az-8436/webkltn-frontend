//
// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { Camera, Upload, RefreshCw, ArrowRight } from "lucide-react";

// export default function UploadImage() {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [loadingText, setLoadingText] = useState("Đang xử lý...");

//   const [showInputForm, setShowInputForm] = useState(false);
  
//   const [rawOCR, setRawOCR] = useState({}); 

//   const [patientData, setPatientData] = useState({
//     name: "", gender: "", age: "", height: "", weight: "",
//     systolicBloodPressure: "", diastolicBloodPressure: "", heartRate: "", bmi: ""
//   });
  
//   const [bloodTests, setBloodTests] = useState({
//     cholesterol: "", hdl: "", ldl: "", triglycerid: "", 
//     creatinin: "", hba1c: "", ure: "", vldl: ""
//   });

//   const [units, setUnits] = useState({
//     cholesterol: "", hdl: "", ldl: "", triglycerid: "", 
//     creatinin: "", hba1c: "", ure: "", vldl: ""
//   });

//   const navigate = useNavigate();
//   const timerRef1 = useRef(null);
//   const timerRef2 = useRef(null);

//   const bloodLabelMap = {
//     cholesterol: "Cholesterol", hdl: "HDL-C", ldl: "LDL-C",
//     triglycerid: "Triglycerid", creatinin: "Creatinin", hba1c: "HbA1c", ure: "Ure", vldl: "VLDL"
//   };

//   // --- XỬ LÝ ẢNH CHUNG (CHO CẢ 2 NÚT) ---
//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//       setShowInputForm(false);
//       setPatientData({});
//       setBloodTests({});
//       setUnits({});
//       setRawOCR({});
//     }
//   };

//   // --- HÀM CHUYỂN ĐỔI ĐƠN VỊ ---
//   const convertMgToMmol = (value, unit, type) => {
//     if (!value) return { value, unit }; 
//     const cleanUnit = unit ? unit.toLowerCase().trim() : "";
//     const numVal = parseFloat(value);

//     if (isNaN(numVal)) return { value, unit };

//     if (cleanUnit === "mg/dl" || cleanUnit === "mg%") {
//         let newVal = numVal;
//         if (type === "creatinin") {
//             newVal = numVal * 88.4;
//             return { value: newVal.toFixed(2), unit: "umol/L" };
//         }
//         switch (type) {
//             case "cholesterol":
//             case "hdl":
//             case "ldl":
//             case "vldl":
//                 newVal = numVal / 38.67;
//                 break;
//             case "triglycerid":
//             case "triglycerides":
//                 newVal = numVal / 88.57;
//                 break;
//             case "ure": 
//                 newVal = numVal * 0.1665; 
//                 break;
//             case "glucose":
//                 newVal = numVal / 18;
//                 break;
//             default:
//                 return { value, unit };
//         }
//         return { value: newVal.toFixed(2), unit: "mmol/L" };
//     }
//     return { value, unit };
//   };

//   // --- XỬ LÝ API VÀ DỮ LIỆU ---
//   const handlePatientChange = (e) => setPatientData({ ...patientData, [e.target.name]: e.target.value });
//   const handleBloodChange = (e) => setBloodTests({ ...bloodTests, [e.target.name]: e.target.value });
//   const handleUnitChange = (e) => setUnits({ ...units, [e.target.name]: e.target.value });

//   const handleAnalyzeOCR = async () => {
//     if (!image) return alert("⚠️ Vui lòng chọn ảnh trước!");
//     setLoading(true);
//     setLoadingText("☁️ Đang gửi ảnh lên server...");

//     timerRef1.current = setTimeout(() => setLoadingText("🤖 AI đang đọc dữ liệu phiếu khám..."), 2500);
//     timerRef2.current = setTimeout(() => setLoadingText("🏥 Đang tổng hợp hồ sơ bệnh án..."), 5500);

//     try {
//       const formData = new FormData();
//       formData.append("file", image);

//       // LƯU Ý: Nếu bé chạy trên điện thoại qua Ngrok thì dùng link Ngrok hoặc IP máy tính
//       // Nếu test local thì để localhost. Tốt nhất là dùng Relative Path nếu build chung
//       // Hoặc để IP máy tính: http://192.168.1.xxx:8000/ocr
//       const resOCR = await fetch("http://127.0.0.1:8000/ocr", { 
//         method: "POST",
//         body: formData,
//       });
//       const responseData = await resOCR.json();

//       clearTimeout(timerRef1.current);
//       clearTimeout(timerRef2.current);

//       if (responseData.status === "success") {
//         const pInfo = responseData.data.patient_info;
//         const bTests = responseData.data.blood_tests || {};

//         setRawOCR(bTests);

//         setPatientData({
//           name: pInfo.name || "",
//           gender: pInfo.gender || "",
//           age: pInfo.age || "",
//           height: pInfo.height || "",
//           weight: pInfo.weight || "",
//           systolicBloodPressure: pInfo.systolicBloodPressure || "",
//           diastolicBloodPressure: pInfo.diastolicBloodPressure || "",
//           heartRate: pInfo.heartRate || "",
//           bmi: pInfo.bmi || ""
//         });

//         const newValues = {};
//         const newUnits = {};

//         Object.keys(bloodLabelMap).forEach(key => {
//             const item = bTests[key];
//             let rawVal = "", rawUnit = "";

//             if (item && typeof item === 'object') {
//                 rawVal = item.value || "";
//                 rawUnit = item.unit || "";
//             } else {
//                 rawVal = item || "";
//             }

//             // 🔥 LOGIC: Kiểm tra Creatinin
//             if (key === 'creatinin' && (!rawVal || rawVal.toString().trim() === "")) {
//                 newValues[key] = "5.5";
//                 newUnits[key] = "umol/L"; 
//                 return; 
//             }

//             const converted = convertMgToMmol(rawVal, rawUnit, key);
//             newValues[key] = converted.value;
//             newUnits[key] = converted.unit;
//         });
        
//         setBloodTests(newValues);
//         setUnits(newUnits);

//         const isMissing = !pInfo.name || !pInfo.age || !pInfo.gender || !pInfo.height || !pInfo.weight || 
//                           !pInfo.systolicBloodPressure || !pInfo.diastolicBloodPressure || !pInfo.heartRate;
//         const isBloodMissing = !newValues.cholesterol || !newValues.hdl; 

//         if (isMissing || isBloodMissing) {
//           setShowInputForm(true);
//           setLoading(false);      
//         } else {
//           handlePredictDisease(newValues, newUnits, { ...pInfo, bmi: pInfo.bmi });
//         }
//       } else {
//         alert("❌ Không đọc được dữ liệu!");
//         setLoading(false);
//       }
//     } catch (err) {
//       clearTimeout(timerRef1.current);
//       clearTimeout(timerRef2.current);
//       setLoading(false);
//       console.error(err);
//       alert("Lỗi OCR! Kiểm tra lại server backend.");
//     }
//   };

//   const handlePredictDisease = async (finalValues, finalUnits, finalPatient) => {
//     const dataValues = finalValues || bloodTests;
//     const dataUnits = finalUnits || units;
//     const dataPatient = finalPatient || patientData;

//     if (!loading) {
//         setLoading(true);
//         setLoadingText("🧠 AI đang chẩn đoán bệnh...");
//     }

//     try {
//       let currentBMI = dataPatient.bmi;
//       if (!currentBMI && dataPatient.height && dataPatient.weight) {
//         const h = parseFloat(dataPatient.height) / 100;
//         const w = parseFloat(dataPatient.weight);
//         currentBMI = (w / (h * h)).toFixed(2);
//       }

//       const payload = {
//         patient_info: { ...dataPatient, bmi: currentBMI },
//         blood_tests: dataValues,
//         units: dataUnits
//       };

//       const resPredict = await fetch("http://127.0.0.1:8000/predict-disease", {
//         method: 'POST',
//         body: JSON.stringify(payload),
//         headers: { 'Content-Type': 'application/json' }
//       });
//       const predict_result = await resPredict.json();
//       setLoading(false);
//       navigate("/ket-qua-chan-doan", {
//         state: { type: "Phân tích tổng hợp", result: predict_result.data, input: payload },
//       });
//     } catch (err) {
//       setLoading(false);
//       alert("❌ Lỗi dự đoán!");
//     }
//   };

//   const getRawDisplay = (key) => {
//     const item = rawOCR[key];
//     if (!item) return "-";
//     if (typeof item === 'object') {
//         return `${item.value || ""} ${item.unit || ""}`;
//     }
//     return item;
//   };

//   return (
//     <div className="w-full relative">
//       {!showInputForm && (
//         <div className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
//             {/* NÚT 1: TẢI ẢNH TỪ THƯ VIỆN */}
//             <div className="border-2 border-dashed border-indigo-300 p-6 rounded-xl text-center bg-indigo-50 hover:bg-indigo-100 transition cursor-pointer relative group">
//                <input type="file" accept="image/*" onChange={handleUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
//               <div className="flex flex-col items-center text-indigo-600"><Upload size={32} className="mb-2"/><p className="font-bold">Tải ảnh từ thư viện</p></div>
//             </div>

//             {/* NÚT 2: CHỤP ẢNH TRỰC TIẾP (Dùng app Camera của ĐT) */}
//             <div className="border-2 border-dashed border-pink-300 p-6 rounded-xl text-center bg-pink-50 hover:bg-pink-100 transition cursor-pointer relative group">
//                {/* capture="environment" sẽ gọi camera sau */}
//                <input type="file" accept="image/*" capture="environment" onChange={handleUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
//                <div className="flex flex-col items-center text-pink-600"><Camera size={32} className="mb-2"/><p className="font-bold">Chụp ảnh ngay</p></div>
//             </div>

//           </div>
          
//           {preview && <div className="flex flex-col items-center animate-fade-in"><img src={preview} alt="preview" className="h-64 object-contain rounded-lg shadow-md bg-white border" /></div>}
          
//           {preview && (
//             <button 
//               onClick={handleAnalyzeOCR} 
//               disabled={loading} 
//               className={`w-full py-3 rounded-lg text-white font-bold transition flex justify-center items-center gap-2 ${
//                 loading ? "bg-indigo-300 cursor-wait shadow-inner" : "bg-indigo-600 hover:bg-indigo-700 shadow-lg"
//               }`}
//             >
//               {loading ? (
//                   <>
//                       <RefreshCw size={20} className="animate-spin" />
//                       <span>{loadingText}</span>
//                   </>
//               ) : (
//                   "🚀 Phân tích ảnh ngay"
//               )}
//             </button>
//           )}
//         </div>
//       )}

//       {showInputForm && (
//         <div className="animate-fade-in space-y-6">
//           <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 text-yellow-800 text-sm">⚠️ Vui lòng kiểm tra và bổ sung thông tin:</div>
          
//           {/* <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
//             <h3 className="text-indigo-700 font-bold mb-3 flex items-center gap-2">🧑‍⚕️ Thông tin & Sinh hiệu</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="col-span-2"><label className="text-sm font-semibold">Họ tên</label><input name="name" value={patientData.name} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
//                 <div><label className="text-sm font-semibold">Tuổi</label><input name="age" type="number" value={patientData.age} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
//                 <div><label className="text-sm font-semibold">Giới tính</label><select name="gender" value={patientData.gender} onChange={handlePatientChange} className="w-full p-2 border rounded"><option value="">--</option><option value="Nam">Nam</option><option value="Nữ">Nữ</option></select></div>
//                 <div><label className="text-xs font-bold text-gray-500 uppercase">Chiều cao (cm)</label><input name="height" type="number" value={patientData.height} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
//                 <div><label className="text-xs font-bold text-gray-500 uppercase">Cân nặng (kg)</label><input name="weight" type="number" value={patientData.weight} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
//                 <div><label className="text-xs font-bold text-gray-500 uppercase">HA Tâm Thu</label><input name="systolicBloodPressure" type="number" value={patientData.systolicBloodPressure} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
//                 <div><label className="text-xs font-bold text-gray-500 uppercase">HA Tâm Trương</label><input name="diastolicBloodPressure" type="number" value={patientData.diastolicBloodPressure} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
//                 <div className="col-span-2"><label className="text-xs font-bold text-gray-500 uppercase">Nhịp tim</label><input name="heartRate" type="number" value={patientData.heartRate} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
//             </div>
//           </div> */}
//         <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg border border-gray-200 shadow-sm overflow-auto">
//           <h3 className="text-indigo-700 font-bold mb-4 flex items-center gap-2 text-base md:text-lg lg:text-xl">
//             🧑‍⚕️ Thông tin & Sinh hiệu
//           </h3>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
//             {/* Họ tên */}
//             <div className="col-span-1 md:col-span-2">
//               <label className="text-sm font-semibold">Họ tên</label>
//               <input
//                 name="name"
//                 value={patientData.name}
//                 onChange={handlePatientChange}
//                 className="w-full max-w-full p-2 border rounded"
//               />
//             </div>
            
//             {/* Tuổi */}
//             <div className="col-span-1">
//               <label className="text-sm font-semibold">Tuổi</label>
//               <input
//                 name="age"
//                 type="number"
//                 value={patientData.age}
//                 onChange={handlePatientChange}
//                 className="w-full max-w-full p-2 border rounded"
//               />
//             </div>
            
//             {/* Giới tính */}
//             <div className="col-span-1">
//               <label className="text-sm font-semibold">Giới tính</label>
//               <select
//                 name="gender"
//                 value={patientData.gender}
//                 onChange={handlePatientChange}
//                 className="w-full max-w-full p-2 border rounded"
//               >
//                 <option value="">--</option>
//                 <option value="Nam">Nam</option>
//                 <option value="Nữ">Nữ</option>
//               </select>
//             </div>
            
//             {/* Chiều cao */}
//             <div className="col-span-1">
//               <label className="text-xs font-bold text-gray-500 uppercase">Chiều cao (cm)</label>
//               <input
//                 name="height"
//                 type="number"
//                 value={patientData.height}
//                 onChange={handlePatientChange}
//                 className="w-full max-w-full p-2 border rounded"
//               />
//             </div>
            
//             {/* Cân nặng */}
//             <div className="col-span-1">
//               <label className="text-xs font-bold text-gray-500 uppercase">Cân nặng (kg)</label>
//               <input
//                 name="weight"
//                 type="number"
//                 value={patientData.weight}
//                 onChange={handlePatientChange}
//                 className="w-full max-w-full p-2 border rounded"
//               />
//             </div>
            
//             {/* HA Tâm Thu */}
//             <div className="col-span-1">
//               <label className="text-xs font-bold text-gray-500 uppercase">HA Tâm Thu</label>
//               <input
//                 name="systolicBloodPressure"
//                 type="number"
//                 value={patientData.systolicBloodPressure}
//                 onChange={handlePatientChange}
//                 className="w-full max-w-full p-2 border rounded"
//               />
//             </div>
            
//             {/* HA Tâm Trương */}
//             <div className="col-span-1">
//               <label className="text-xs font-bold text-gray-500 uppercase">HA Tâm Trương</label>
//               <input
//                 name="diastolicBloodPressure"
//                 type="number"
//                 value={patientData.diastolicBloodPressure}
//                 onChange={handlePatientChange}
//                 className="w-full max-w-full p-2 border rounded"
//               />
//             </div>
            
//             {/* Nhịp tim */}
//             <div className="col-span-1 md:col-span-2">
//               <label className="text-xs font-bold text-gray-500 uppercase">Nhịp tim</label>
//               <input
//                 name="heartRate"
//                 type="number"
//                 value={patientData.heartRate}
//                 onChange={handlePatientChange}
//                 className="w-full max-w-full p-2 border rounded"
//               />
//             </div>
            
//           </div>
//         </div>


//           <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
//             <h3 className="text-indigo-700 font-bold mb-3 flex items-center gap-2">🧪 Chỉ số xét nghiệm</h3>
            
//             <div className="hidden md:grid grid-cols-12 gap-2 text-xs font-bold text-gray-500 uppercase border-b pb-2 mb-2">
//                 <div className="col-span-3">Tên chỉ số</div>
//                 <div className="col-span-3 text-center bg-gray-100 rounded">Kết quả Gốc (OCR)</div>
//                 <div className="col-span-3 text-center">Giá trị chuẩn</div>
//                 <div className="col-span-3 text-center">Đơn vị chuẩn</div>
//             </div>
            
//             <div className="space-y-4 md:space-y-3">
//               {Object.keys(bloodLabelMap).map((key) => (
//                 <div key={key} className="flex flex-col md:grid md:grid-cols-12 gap-2 items-start md:items-center border-b pb-4 md:pb-2 last:border-0">
//                   <label className="w-full md:col-span-3 text-sm font-bold text-gray-800 md:text-gray-700 md:font-medium mb-1 md:mb-0">
//                     {bloodLabelMap[key]} { !bloodTests[key] && <span className="text-red-400 text-[10px]">*</span> }
//                   </label>

//                   <div className="w-full md:col-span-3 flex justify-between md:justify-center items-center bg-gray-50 p-2 rounded text-xs text-gray-500 font-mono mb-1 md:mb-0">
//                       <span className="md:hidden font-semibold text-gray-400 mr-2">Gốc:</span>
//                       <div className="flex items-center">
//                           {getRawDisplay(key)}
//                           {getRawDisplay(key).includes("mg") && <ArrowRight className="w-3 h-3 ml-1 text-indigo-400"/>}
//                       </div>
//                   </div>

//                   <div className="w-full md:col-span-3">
//                     <input name={key} type="number" step="0.01" placeholder="0.0" value={bloodTests[key]} onChange={handleBloodChange} className="w-full p-2 border border-indigo-200 rounded text-center font-bold text-indigo-700"/>
//                   </div>

//                   <div className="w-full md:col-span-3">
//                     <input name={key} type="text" placeholder="VD: mmol/L" value={units[key]} onChange={handleUnitChange} className="w-full p-2 border rounded bg-gray-50 text-sm text-center"/>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button 
//             onClick={() => handlePredictDisease(null, null, null)} 
//             disabled={loading} 
//             className={`w-full py-3 rounded-lg text-white font-bold shadow-lg transition flex justify-center items-center gap-2 ${
//                 loading ? "bg-green-300 cursor-wait" : "bg-green-600 hover:bg-green-700"
//             }`}
//           >
//               {loading ? (
//                   <>
//                     <RefreshCw size={20} className="animate-spin" />
//                     <span>Đang chẩn đoán...</span>
//                   </>
//               ) : "✅ Hoàn tất & Xem kết quả"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

//======================================================UPLOAD NHIEU HINH ANH PHIEU KHAM=========================================================






// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Camera, Upload, RefreshCw, ArrowRight, CheckCircle, ChevronRight } from "lucide-react";

// export default function UploadImage() {
//   // --- STATE QUẢN LÝ ---
//   const [files, setFiles] = useState([]); // Danh sách file gốc
//   const [analyzedData, setAnalyzedData] = useState([]); // Danh sách dữ liệu sau OCR
//   const [reviewIndex, setReviewIndex] = useState(-1); // Index đang review (-1 là chưa review)
  
//   // Loading state
//   const [loading, setLoading] = useState(false);
//   const [loadingText, setLoadingText] = useState("");
  
//   // State tạm thời cho form đang sửa hiện tại
//   const [currentPatient, setCurrentPatient] = useState({});
//   const [currentBlood, setCurrentBlood] = useState({});
//   const [currentUnits, setCurrentUnits] = useState({});
//   const [currentRawOCR, setCurrentRawOCR] = useState({});

//   const navigate = useNavigate();
  
//   // --- CẤU HÌNH LABEL (Y CHANG CODE CŨ CỦA BÉ) ---
//   const bloodLabelMap = {
//     cholesterol: "Cholesterol", hdl: "HDL-C", ldl: "LDL-C",
//     triglycerid: "Triglycerid", creatinin: "Creatinin", hba1c: "HbA1c", ure: "Ure", vldl: "VLDL"
//   };

//   // --- HÀM DELAY (Tạo độ trễ) ---
//   const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//   // --- HÀM CHUYỂN ĐỔI ĐƠN VỊ ---
//   const convertMgToMmol = (value, unit, type) => {
//     if (!value) return { value, unit }; 
//     const cleanUnit = unit ? unit.toLowerCase().trim() : "";
//     const numVal = parseFloat(value);
//     if (isNaN(numVal)) return { value, unit };

//     if (cleanUnit === "mg/dl" || cleanUnit === "mg%") {
//        let newVal = numVal;
//        if (type === "creatinin") {
//            newVal = numVal * 88.4;
//            return { value: newVal.toFixed(2), unit: "umol/L" };
//        }
//        switch (type) {
//            case "cholesterol": case "hdl": case "ldl": case "vldl":
//                newVal = numVal / 38.67; break;
//            case "triglycerid": case "triglycerides":
//                newVal = numVal / 88.57; break;
//            case "ure": 
//                newVal = numVal * 0.1665; break;
//            case "glucose":
//                newVal = numVal / 18; break;
//            default: return { value, unit };
//        }
//        return { value: newVal.toFixed(2), unit: "mmol/L" };
//     }
//     return { value, unit };
//   };

//   // --- HÀM TÌM GIÁ TRỊ THÔNG MINH (QUAN TRỌNG ĐỂ ĐỌC ĐƯỢC API) ---
//   const findValueInResponse = (apiData, targetKey) => {
//     if (!apiData) return null;
//     // 1. Tìm chính xác
//     if (apiData[targetKey]) return apiData[targetKey];
//     // 2. Tìm không phân biệt hoa thường
//     const lowerKey = targetKey.toLowerCase();
//     const foundKey = Object.keys(apiData).find(k => k.toLowerCase() === lowerKey);
//     if (foundKey) return apiData[foundKey];
//     // 3. Xử lý Alias (triglycerid vs triglycerides)
//     if (lowerKey === 'triglycerid') {
//         const triKey = Object.keys(apiData).find(k => k.toLowerCase() === 'triglycerides');
//         if (triKey) return apiData[triKey];
//     }
//     return null;
//   };

//   // --- XỬ LÝ UPLOAD NHIỀU ẢNH ---
//   const handleUpload = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     if (selectedFiles.length > 0) {
//       setFiles(selectedFiles);
//       setAnalyzedData([]); 
//       setReviewIndex(-1);
//     }
//   };

//   // --- GỌI OCR CHO TẤT CẢ ẢNH ---
//   const handleAnalyzeBatch = async () => {
//     if (files.length === 0) return alert("⚠️ Vui lòng chọn ít nhất 1 ảnh!");
    
//     setLoading(true);
//     const results = [];

//     try {
//         for (let i = 0; i < files.length; i++) {
//             const file = files[i];
            
//             // Delay từ ảnh thứ 2 trở đi
//             if (i > 0) {
//                 setLoadingText(`⏳ Đang nghỉ một chút để server không bị quá tải...`);
//                 await delay(15000); 
//             }

//             setLoadingText(`AI đang đọc phiếu ${i + 1}/${files.length}...`);

//             const formData = new FormData();
//             formData.append("file", file);
            
//             const resOCR = await fetch("http://127.0.0.1:8000/ocr", { 
//                 method: "POST", 
//                 body: formData 
//             });
//             const responseData = await resOCR.json();

//             // Khởi tạo object theo cấu trúc y chang code cũ
//             let processedItem = {
//                 file: file,
//                 preview: URL.createObjectURL(file),
//                 rawOCR: {},
//                 patientData: {
//                     name: "", gender: "", age: "", height: "", weight: "",
//                     systolicBloodPressure: "", diastolicBloodPressure: "", heartRate: "", bmi: ""
//                 },
//                 bloodTests: {
//                     cholesterol: "", hdl: "", ldl: "", triglycerid: "", 
//                     creatinin: "", hba1c: "", ure: "", vldl: ""
//                 },
//                 units: {
//                     cholesterol: "", hdl: "", ldl: "", triglycerid: "", 
//                     creatinin: "", hba1c: "", ure: "", vldl: ""
//                 }
//             };

//             if (responseData.status === "success") {
//                 const pInfo = responseData.data.patient_info || {};
//                 const bTests = responseData.data.blood_tests || {};

//                 processedItem.rawOCR = bTests;
                
//                 // Điền thông tin bệnh nhân
//                 processedItem.patientData = {
//                     name: pInfo.name || "", 
//                     gender: pInfo.gender || "", 
//                     age: pInfo.age || "",
//                     height: pInfo.height || "", 
//                     weight: pInfo.weight || "",
//                     systolicBloodPressure: pInfo.systolicBloodPressure || "",
//                     diastolicBloodPressure: pInfo.diastolicBloodPressure || "",
//                     heartRate: pInfo.heartRate || "", 
//                     bmi: pInfo.bmi || ""
//                 };

//                 const newValues = { ...processedItem.bloodTests };
//                 const newUnits = { ...processedItem.units };

//                 Object.keys(bloodLabelMap).forEach(key => {
//                     // Dùng hàm tìm kiếm thông minh
//                     const item = findValueInResponse(bTests, key);
                    
//                     let rawVal = "", rawUnit = "";
//                     if (item) {
//                         if (typeof item === 'object') {
//                             rawVal = item.value || "";
//                             rawUnit = item.unit || "";
//                         } else {
//                             rawVal = item || "";
//                         }
//                     }

//                     // Logic Creatinin
//                     if (key === 'creatinin' && (!rawVal || rawVal.toString().trim() === "")) {
//                         newValues[key] = "5.5";
//                         newUnits[key] = "umol/L"; 
//                     } else {
//                         const converted = convertMgToMmol(rawVal, rawUnit, key);
//                         newValues[key] = converted.value;
//                         newUnits[key] = converted.unit;
//                     }
//                 });

//                 processedItem.bloodTests = newValues;
//                 processedItem.units = newUnits;
//             }
//             results.push(processedItem);
//         }

//         setAnalyzedData(results);
//         setLoading(false);
//         startReviewProcess(results, 0);

//     } catch (err) {
//         console.error(err);
//         setLoading(false);
//         alert("❌ Lỗi khi xử lý OCR! Kiểm tra backend.");
//     }
//   };

//   // --- LOGIC REVIEW ---
//   const startReviewProcess = (data, index) => {
//       if (index < data.length) {
//           setReviewIndex(index);
//           const item = data[index];
//           setCurrentPatient(item.patientData);
//           setCurrentBlood(item.bloodTests);
//           setCurrentUnits(item.units);
//           setCurrentRawOCR(item.rawOCR);
//       } else {
//           finishAllReviews(data);
//       }
//   };

//   const handleNextReview = () => {
//       const updatedData = [...analyzedData];
//       updatedData[reviewIndex] = {
//           ...updatedData[reviewIndex],
//           patientData: currentPatient,
//           bloodTests: currentBlood,
//           units: currentUnits
//       };
//       setAnalyzedData(updatedData);

//       const nextIndex = reviewIndex + 1;
//       if (nextIndex < updatedData.length) {
//           startReviewProcess(updatedData, nextIndex);
//           window.scrollTo(0, 0);
//       } else {
//           finishAllReviews(updatedData);
//       }
//   };

//   const finishAllReviews = (finalData) => {
//       navigate("/ket-qua-chan-doan", {
//           state: { dataQueue: finalData }
//       });
//   };

//   const handlePatientChange = (e) => setCurrentPatient({ ...currentPatient, [e.target.name]: e.target.value });
//   const handleBloodChange = (e) => setCurrentBlood({ ...currentBlood, [e.target.name]: e.target.value });
//   const handleUnitChange = (e) => setCurrentUnits({ ...currentUnits, [e.target.name]: e.target.value });
  
//   const getRawDisplay = (key) => {
//     // Tìm hiển thị gốc bằng hàm tìm kiếm thông minh luôn cho chắc
//     const val = findValueInResponse(currentRawOCR, key);
//     if (!val) return "-";
//     if (typeof val === 'object') return `${val.value || ""} ${val.unit || ""}`;
//     return val;
//   };

//   return (
//     <div className="w-full relative min-h-screen pb-20">
      
//       {/* 1. UPLOAD VIEW */}
//       {reviewIndex === -1 && (
//         <div className="space-y-6">
//           <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-blue-700">
//              <h3 className="font-bold text-lg">📸 Chế độ xử lý hàng loạt</h3>
//              <p>Bạn có thể chọn 1 hoặc nhiều ảnh (ví dụ 5 phiếu khám) để xử lý cùng lúc.</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="border-2 border-dashed border-indigo-300 p-8 rounded-xl text-center bg-indigo-50 hover:bg-indigo-100 transition cursor-pointer relative group">
//                <input type="file" accept="image/*" multiple onChange={handleUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
//                <div className="flex flex-col items-center text-indigo-600">
//                    <Upload size={40} className="mb-2"/>
//                    <p className="font-bold text-lg">Chọn nhiều ảnh từ thư viện</p>
//                    <p className="text-sm">(Giữ Ctrl hoặc chọn nhiều file)</p>
//                </div>
//             </div>

//             <div className="border-2 border-dashed border-pink-300 p-8 rounded-xl text-center bg-pink-50 hover:bg-pink-100 transition cursor-pointer relative group">
//                <input type="file" accept="image/*" capture="environment" multiple onChange={handleUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
//                <div className="flex flex-col items-center text-pink-600">
//                    <Camera size={40} className="mb-2"/>
//                    <p className="font-bold text-lg">Chụp ảnh mới</p>
//                </div>
//             </div>
//           </div>

//           {files.length > 0 && (
//              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 animate-fade-in">
//                  {Array.from(files).map((file, idx) => (
//                      <div key={idx} className="relative aspect-[3/4] border rounded-lg overflow-hidden shadow-sm">
//                          <img src={URL.createObjectURL(file)} alt={`file-${idx}`} className="w-full h-full object-cover" />
//                          <div className="absolute bottom-0 bg-black/50 text-white text-xs w-full text-center p-1">Phiếu {idx+1}</div>
//                      </div>
//                  ))}
//              </div>
//           )}
          
//           {files.length > 0 && (
//             <button 
//               onClick={handleAnalyzeBatch} 
//               disabled={loading} 
//               className={`w-full py-4 rounded-xl text-white font-bold text-lg transition flex justify-center items-center gap-2 shadow-lg ${
//                  loading ? "bg-indigo-300 cursor-wait" : "bg-indigo-600 hover:bg-indigo-700"
//               }`}
//             >
//               {loading ? <><RefreshCw className="animate-spin"/> {loadingText}</> : `🚀 Phân tích ${files.length} phiếu ngay`}
//             </button>
//           )}
//         </div>
//       )}

//       {/* 2. REVIEW VIEW */}
//       {reviewIndex !== -1 && (
//         <div className="animate-fade-in space-y-6">
//            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow border sticky top-0 z-20">
//                <div>
//                    <h2 className="text-xl font-bold text-indigo-800">📝 Duyệt phiếu khám {reviewIndex + 1}/{analyzedData.length}</h2>
//                    <p className="text-sm text-gray-500">Hãy kiểm tra và điền thông tin còn thiếu.</p>
//                </div>
//                <button onClick={handleNextReview} className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 flex items-center gap-2 shadow-md">
//                    {reviewIndex < analyzedData.length - 1 ? "Tiếp phiếu sau" : "Hoàn tất"} <ChevronRight/>
//                </button>
//            </div>

//            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               <div className="lg:col-span-1">
//                   <div className="sticky top-24 bg-gray-100 rounded-lg overflow-hidden border shadow-inner">
//                       <p className="bg-gray-800 text-white text-center py-2 text-sm font-bold">Ảnh gốc phiếu {reviewIndex + 1}</p>
//                       <img 
//                           src={analyzedData[reviewIndex].preview} 
//                           alt="preview-current" 
//                           className="w-full object-contain max-h-[80vh]" 
//                       />
//                   </div>
//               </div>

//               <div className="lg:col-span-2 space-y-6 pb-20">
//                   <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 shadow-sm">
//                     <h3 className="text-indigo-700 font-bold mb-4 flex items-center gap-2 text-lg">🧑‍⚕️ Thông tin & Sinh hiệu</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="col-span-2"><label className="text-sm font-semibold">Họ tên</label><input name="name" value={currentPatient.name || ""} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
//                         <div><label className="text-sm font-semibold">Tuổi</label><input name="age" type="number" value={currentPatient.age || ""} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
//                         <div><label className="text-sm font-semibold">Giới tính</label><select name="gender" value={currentPatient.gender || ""} onChange={handlePatientChange} className="w-full p-2 border rounded"><option value="">--</option><option value="Nam">Nam</option><option value="Nữ">Nữ</option></select></div>
//                         <div><label className="text-xs font-bold text-gray-500 uppercase">Chiều cao (cm)</label><input name="height" type="number" value={currentPatient.height || ""} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
//                         <div><label className="text-xs font-bold text-gray-500 uppercase">Cân nặng (kg)</label><input name="weight" type="number" value={currentPatient.weight || ""} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
//                         <div><label className="text-xs font-bold text-gray-500 uppercase">HA Tâm Thu</label><input name="systolicBloodPressure" type="number" value={currentPatient.systolicBloodPressure || ""} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
//                         <div><label className="text-xs font-bold text-gray-500 uppercase">HA Tâm Trương</label><input name="diastolicBloodPressure" type="number" value={currentPatient.diastolicBloodPressure || ""} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
//                         <div className="col-span-2"><label className="text-xs font-bold text-gray-500 uppercase">Nhịp tim</label><input name="heartRate" type="number" value={currentPatient.heartRate || ""} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
//                     </div>
//                   </div>

//                   <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
//                      <h3 className="text-indigo-700 font-bold mb-3 flex items-center gap-2">🧪 Chỉ số xét nghiệm</h3>
//                      <div className="hidden md:grid grid-cols-12 gap-2 text-xs font-bold text-gray-500 uppercase border-b pb-2 mb-2">
//                         <div className="col-span-3">Tên chỉ số</div>
//                         <div className="col-span-3 text-center bg-gray-100 rounded">Gốc (OCR)</div>
//                         <div className="col-span-3 text-center">Giá trị chuẩn</div>
//                         <div className="col-span-3 text-center">Đơn vị chuẩn</div>
//                      </div>
//                      <div className="space-y-4 md:space-y-3">
//                         {Object.keys(bloodLabelMap).map((key) => (
//                            <div key={key} className="flex flex-col md:grid md:grid-cols-12 gap-2 items-start md:items-center border-b pb-4 md:pb-2 last:border-0">
//                               <label className="w-full md:col-span-3 text-sm font-bold text-gray-800">
//                                   {bloodLabelMap[key]} { !currentBlood[key] && <span className="text-red-400 text-[10px]">*</span> }
//                               </label>
//                               <div className="w-full md:col-span-3 flex justify-between items-center bg-gray-50 p-2 rounded text-xs text-gray-500 font-mono">
//                                   <span className="md:hidden font-semibold text-gray-400 mr-2">Gốc:</span>
//                                   <span>{getRawDisplay(key)}</span>
//                               </div>
//                               <div className="w-full md:col-span-3">
//                                   <input name={key} type="number" step="0.01" value={currentBlood[key] || ""} onChange={handleBloodChange} className="w-full p-2 border border-indigo-200 rounded text-center font-bold text-indigo-700"/>
//                               </div>
//                               <div className="w-full md:col-span-3">
//                                   <input name={key} type="text" value={currentUnits[key] || ""} onChange={handleUnitChange} className="w-full p-2 border rounded bg-gray-50 text-sm text-center"/>
//                               </div>
//                            </div>
//                         ))}
//                      </div>
//                   </div>
//               </div>
//            </div>
//         </div>
//       )}
//     </div>
//   );
// }





//==============================================THEM ID HO SO=============================================================


import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, RefreshCw, ArrowRight, CheckCircle, ChevronRight } from "lucide-react";

export default function UploadImage() {
  // --- STATE QUẢN LÝ ---
  const [files, setFiles] = useState([]); 
  const [analyzedData, setAnalyzedData] = useState([]); 
  const [reviewIndex, setReviewIndex] = useState(-1); 
  
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  
  // --- State preview ---
  const [filePreviews, setFilePreviews] = useState([]); 

  const [currentPatient, setCurrentPatient] = useState({});
  const [currentBlood, setCurrentBlood] = useState({});
  const [currentUnits, setCurrentUnits] = useState({});
  const [currentRawOCR, setCurrentRawOCR] = useState({});

  const navigate = useNavigate();
  
  // --- CẤU HÌNH LABEL ---
  const bloodLabelMap = {
    cholesterol: "Cholesterol", hdl: "HDL-C", ldl: "LDL-C",
    triglycerid: "Triglycerid", creatinin: "Creatinin", hba1c: "HbA1c", ure: "Ure", vldl: "VLDL"
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // --- HÀM TẠO ID HỒ SƠ TỰ ĐỘNG ---
  const generatePatientID = (index) => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const sequence = String(index + 1).padStart(3, '0'); 
    return `HS-${yyyy}${mm}${dd}-${hh}${min}-${sequence}`;
  };

  const convertMgToMmol = (value, unit, type) => {
    if (!value) return { value, unit }; 
    const cleanUnit = unit ? unit.toLowerCase().trim() : "";
    const numVal = parseFloat(value);
    if (isNaN(numVal)) return { value, unit };

    if (cleanUnit === "mg/dl" || cleanUnit === "mg%") {
       let newVal = numVal;
       if (type === "creatinin") {
           newVal = numVal * 88.4;
           return { value: newVal.toFixed(2), unit: "umol/L" };
       }
       switch (type) {
           case "cholesterol": case "hdl": case "ldl": case "vldl":
               newVal = numVal / 38.67; break;
           case "triglycerid": case "triglycerides":
               newVal = numVal / 88.57; break;
           case "ure": 
               newVal = numVal * 0.1665; break;
           case "glucose":
               newVal = numVal / 18; break;
           default: return { value, unit };
       }
       return { value: newVal.toFixed(2), unit: "mmol/L" };
    }
    return { value, unit };
  };

  const findValueInResponse = (apiData, targetKey) => {
    if (!apiData) return null;
    if (apiData[targetKey]) return apiData[targetKey];
    const lowerKey = targetKey.toLowerCase();
    const foundKey = Object.keys(apiData).find(k => k.toLowerCase() === lowerKey);
    if (foundKey) return apiData[foundKey];
    if (lowerKey === 'triglycerid') {
        const triKey = Object.keys(apiData).find(k => k.toLowerCase() === 'triglycerides');
        if (triKey) return apiData[triKey];
    }
    return null;
  };

  const handleUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
      
      const previews = selectedFiles.map(file => URL.createObjectURL(file));
      setFilePreviews(previews);

      setAnalyzedData([]); 
      setReviewIndex(-1);
    }
  };

  const handleAnalyzeBatch = async () => {
    if (files.length === 0) return alert("⚠️ Vui lòng chọn ít nhất 1 ảnh!");
    
    setLoading(true);
    const results = [];

    try {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            if (i > 0) {
                setLoadingText(`⏳ Đang nghỉ một chút để server không bị quá tải...`);
                await delay(15000); 
            }

            setLoadingText(`AI đang đọc phiếu ${i + 1}/${files.length}...`);

            const formData = new FormData();
            formData.append("file", file);
            
            const resOCR = await fetch("https://webkltn-backend.onrender.com/ocr", { 
                method: "POST", 
                body: formData 
            });
            const responseData = await resOCR.json();

            const newID = generatePatientID(i);

            let processedItem = {
                file: file,
                preview: URL.createObjectURL(file),
                rawOCR: {},
                patientData: {
                    id: newID, 
                    name: "", gender: "", age: "", height: "", weight: "",
                    systolicBloodPressure: "", diastolicBloodPressure: "", heartRate: "", bmi: ""
                },
                bloodTests: {
                    cholesterol: "", hdl: "", ldl: "", triglycerid: "", 
                    creatinin: "", hba1c: "", ure: "", vldl: ""
                },
                units: {
                    cholesterol: "", hdl: "", ldl: "", triglycerid: "", 
                    creatinin: "", hba1c: "", ure: "", vldl: ""
                }
            };

            if (responseData.status === "success") {
                const pInfo = responseData.data.patient_info || {};
                const bTests = responseData.data.blood_tests || {};

                processedItem.rawOCR = bTests;
                
                processedItem.patientData = {
                    id: newID, 
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

                const newValues = { ...processedItem.bloodTests };
                const newUnits = { ...processedItem.units };

                Object.keys(bloodLabelMap).forEach(key => {
                    const item = findValueInResponse(bTests, key);
                    
                    let rawVal = "", rawUnit = "";
                    if (item) {
                        if (typeof item === 'object') {
                            rawVal = item.value || "";
                            rawUnit = item.unit || "";
                        } else {
                            rawVal = item || "";
                        }
                    }

                    if (key === 'creatinin' && (!rawVal || rawVal.toString().trim() === "")) {
                        newValues[key] = "5.5";
                        newUnits[key] = "umol/L"; 
                    } else {
                        const converted = convertMgToMmol(rawVal, rawUnit, key);
                        newValues[key] = converted.value;
                        newUnits[key] = converted.unit;
                    }
                });

                processedItem.bloodTests = newValues;
                processedItem.units = newUnits;
            }
            results.push(processedItem);
        }

        setAnalyzedData(results);
        setLoading(false);
        startReviewProcess(results, 0);

    } catch (err) {
        console.error(err);
        setLoading(false);
        alert("❌ Lỗi khi xử lý OCR! Kiểm tra backend.");
    }
  };

  const startReviewProcess = (data, index) => {
      if (index < data.length) {
          setReviewIndex(index);
          const item = data[index];
          setCurrentPatient(item.patientData);
          setCurrentBlood(item.bloodTests);
          setCurrentUnits(item.units);
          setCurrentRawOCR(item.rawOCR);
      } else {
          finishAllReviews(data);
      }
  };

  const handleNextReview = () => {
      const updatedData = [...analyzedData];
      updatedData[reviewIndex] = {
          ...updatedData[reviewIndex],
          patientData: currentPatient,
          bloodTests: currentBlood,
          units: currentUnits
      };
      setAnalyzedData(updatedData);

      const nextIndex = reviewIndex + 1;
      if (nextIndex < updatedData.length) {
          startReviewProcess(updatedData, nextIndex);
          window.scrollTo(0, 0);
      } else {
          finishAllReviews(updatedData);
      }
  };

  const finishAllReviews = (finalData) => {
      navigate("/ket-qua-chan-doan", {
          state: { dataQueue: finalData }
      });
  };

  const handlePatientChange = (e) => setCurrentPatient({ ...currentPatient, [e.target.name]: e.target.value });
  const handleBloodChange = (e) => setCurrentBlood({ ...currentBlood, [e.target.name]: e.target.value });
  const handleUnitChange = (e) => setCurrentUnits({ ...currentUnits, [e.target.name]: e.target.value });
  
  const getRawDisplay = (key) => {
    const val = findValueInResponse(currentRawOCR, key);
    if (!val) return "-";
    if (typeof val === 'object') return `${val.value || ""} ${val.unit || ""}`;
    return val;
  };

  return (
    <div className="w-full relative min-h-screen pb-20">
      
      {/* 1. UPLOAD VIEW */}
      {reviewIndex === -1 && (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-blue-700">
             <h3 className="font-bold text-lg">📸 Chế độ xử lý hàng loạt</h3>
             <p>Bạn có thể chọn 1 hoặc nhiều ảnh (Tối đa 5 phiếu khám) để xử lý cùng lúc.</p>
             
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-dashed border-indigo-300 p-8 rounded-xl text-center bg-indigo-50 hover:bg-indigo-100 transition cursor-pointer relative group">
               <input type="file" accept="image/*" multiple onChange={handleUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
               <div className="flex flex-col items-center text-indigo-600">
                   <Upload size={40} className="mb-2"/>
                   <p className="font-bold text-lg">Chọn nhiều ảnh từ thư viện</p>
                   <p className="text-sm">(Giữ Ctrl hoặc chọn nhiều file)</p>
               </div>
            </div>

            <div className="border-2 border-dashed border-pink-300 p-8 rounded-xl text-center bg-pink-50 hover:bg-pink-100 transition cursor-pointer relative group">
               <input type="file" accept="image/*" capture="environment" multiple onChange={handleUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
               <div className="flex flex-col items-center text-pink-600">
                   <Camera size={40} className="mb-2"/>
                   <p className="font-bold text-lg">Chụp ảnh mới</p>
                   <p className="text-sm">(Chụp liên tục để tạo nhiều hình ảnh phiếu khám)</p>
               </div>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-6">
              
              {/* --- ĐÃ CHỈNH SỬA: PREVIEW ẢNH TO HƠN --- */}
              {/* Mobile: 1 cột (to đùng), Tablet: 2 cột, PC: 3 cột */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                {filePreviews.map((src, index) => (
                  <div key={index} className="relative group aspect-[3/4] rounded-xl overflow-hidden border-2 border-gray-200 shadow-md">
                    <img 
                      src={src} 
                      alt={`preview-${index}`} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white font-medium p-2 text-center truncate">
                      {files[index].name}
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={handleAnalyzeBatch} 
                disabled={loading} 
                className={`w-full py-4 rounded-xl text-white font-bold text-lg transition flex justify-center items-center gap-2 shadow-lg ${
                   loading ? "bg-indigo-300 cursor-wait" : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {loading ? <><RefreshCw className="animate-spin"/> {loadingText}</> : `🚀 Phân tích ${files.length} phiếu ngay`}
              </button>
            </div>
          )}
        </div>
      )}

      {/* 2. REVIEW VIEW - Giữ nguyên */}
      {reviewIndex !== -1 && (
        <div className="animate-fade-in space-y-6">
           <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow border sticky top-0 z-20">
               <div>
                   <h2 className="text-xl font-bold text-indigo-800">📝 Duyệt phiếu {reviewIndex + 1}/{analyzedData.length}</h2>
                   <p className="text-sm text-gray-500">ID: {currentPatient.id}</p>
               </div>
               <button onClick={handleNextReview} className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 flex items-center gap-2 shadow-md">
                   {reviewIndex < analyzedData.length - 1 ? "Tiếp theo" : "Hoàn tất"} <ChevronRight/>
               </button>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                  <div className="sticky top-24 bg-gray-100 rounded-lg overflow-hidden border shadow-inner">
                      <img src={analyzedData[reviewIndex].preview} alt="preview" className="w-full object-contain max-h-[80vh]" />
                  </div>
              </div>

              <div className="lg:col-span-2 space-y-6 pb-20">
                  <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-indigo-700 font-bold mb-4 text-lg">🧑‍⚕️ Thông tin bệnh nhân</h3>
                    
                    <div className="mb-4">
                        <label className="text-sm font-bold text-red-600 uppercase">Mã Hồ Sơ (ID)</label>
                        <input name="id" value={currentPatient.id || ""} onChange={handlePatientChange} className="w-full p-2 border border-red-200 bg-red-50 rounded font-mono font-bold text-red-700"/>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2"><label className="text-sm font-semibold">Họ tên</label><input name="name" value={currentPatient.name || ""} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
                        <div><label className="text-sm font-semibold">Tuổi</label><input name="age" type="number" value={currentPatient.age || ""} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
                        <div><label className="text-sm font-semibold">Giới tính</label><select name="gender" value={currentPatient.gender || ""} onChange={handlePatientChange} className="w-full p-2 border rounded"><option value="">--</option><option value="Nam">Nam</option><option value="Nữ">Nữ</option></select></div>
                        <div><label className="text-xs font-bold text-gray-500 uppercase">Chiều cao (cm)</label><input name="height" type="number" value={currentPatient.height || ""} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
                        <div><label className="text-xs font-bold text-gray-500 uppercase">Cân nặng (kg)</label><input name="weight" type="number" value={currentPatient.weight || ""} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
                        <div><label className="text-xs font-bold text-gray-500 uppercase">HA Tâm Thu</label><input name="systolicBloodPressure" type="number" value={currentPatient.systolicBloodPressure || ""} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
                        <div><label className="text-xs font-bold text-gray-500 uppercase">HA Tâm Trương</label><input name="diastolicBloodPressure" type="number" value={currentPatient.diastolicBloodPressure || ""} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
                        <div className="col-span-2"><label className="text-xs font-bold text-gray-500 uppercase">Nhịp tim</label><input name="heartRate" type="number" value={currentPatient.heartRate || ""} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                     <h3 className="text-indigo-700 font-bold mb-3">🧪 Chỉ số xét nghiệm</h3>
                     <div className="space-y-4 md:space-y-3">
                        {Object.keys(bloodLabelMap).map((key) => (
                           <div key={key} className="flex flex-col md:grid md:grid-cols-12 gap-2 items-center border-b pb-2 last:border-0">
                              <label className="w-full md:col-span-3 text-sm font-bold text-gray-800">{bloodLabelMap[key]}</label>
                              <div className="w-full md:col-span-3 text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                                  {getRawDisplay(key)}
                              </div>
                              <div className="w-full md:col-span-3">
                                  <input name={key} type="number" step="0.01" value={currentBlood[key] || ""} onChange={handleBloodChange} className="w-full p-2 border border-indigo-200 rounded text-center font-bold text-indigo-700"/>
                              </div>
                              <div className="w-full md:col-span-3">
                                  <input name={key} type="text" value={currentUnits[key] || ""} onChange={handleUnitChange} className="w-full p-2 border rounded bg-gray-50 text-sm text-center"/>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

