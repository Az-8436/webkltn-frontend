


// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// export default function UploadImage() {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [loadingText, setLoadingText] = useState("Đang xử lý..."); // State cho text loading
  
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
//   // Dùng useRef để quản lý timer, tránh lỗi khi component unmount
//   const timerRef1 = useRef(null);
//   const timerRef2 = useRef(null);

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
//     setLoadingText("☁️ Đang gửi ảnh lên server...");

//     // Tạo hiệu ứng loading text thay đổi để người dùng đỡ sốt ruột
//     timerRef1.current = setTimeout(() => setLoadingText("🤖 AI đang đọc dữ liệu phiếu khám..."), 2500);
//     timerRef2.current = setTimeout(() => setLoadingText("🏥 Đang tổng hợp hồ sơ bệnh án..."), 5500);

//     try {
//       const formData = new FormData();
//       formData.append("file", image);

//       const resOCR = await fetch("https://webkltn-backend.onrender.com/ocr", {
//         method: "POST",
//         body: formData,
//       });
//       const responseData = await resOCR.json();

//       // Xóa timer nếu API trả về sớm hơn dự kiến
//       clearTimeout(timerRef1.current);
//       clearTimeout(timerRef2.current);

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
//           // Đủ dữ liệu -> Chuyển sang dự đoán luôn
//           handlePredictDisease(newPatientData, newBloodTests);
//         }
//       } else {
//         alert("❌ Không đọc được dữ liệu từ ảnh!");
//         setLoading(false);
//       }
//     } catch (err) {
//       clearTimeout(timerRef1.current);
//       clearTimeout(timerRef2.current);
//       setLoading(false);
//       alert("❌ Lỗi server OCR!");
//       console.error(err);
//     }
//   };

//   // --- BƯỚC B: PREDICT ---
//   const handlePredictDisease = async (finalPatientData, finalBloodTests) => {
//     if (!loading) {
//         setLoading(true);
//         setLoadingText("🧠 AI đang chẩn đoán bệnh...");
//     }

//     try {
//       // Tự động tính BMI ngầm (Weight / Height^2)
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

//       const resPredict = await fetch("https://webkltn-backend.onrender.com/predict-disease", {
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
      
//       {/* 1. KHU VỰC UPLOAD */}
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
//             className={`w-full py-3 rounded-lg text-white font-bold transition flex justify-center items-center gap-2 ${
//               loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-lg"
//             }`}
//           >
//             {loading ? (
//                 <>
//                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <span>{loadingText}</span>
//                 </>
//             ) : (
//                 "🚀 Phân tích ảnh ngay"
//             )}
//           </button>
//         </div>
//       )}

//       {/* 2. KHU VỰC FORM NHẬP THIẾU */}
//       {showInputForm && (
//         <div className="animate-fade-in space-y-6">
//           <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 text-yellow-800 text-sm">
//             ⚠️ <b>Thiếu thông tin!</b> AI chưa đọc được một số chỉ số. Vui lòng kiểm tra và nhập bổ sung:
//           </div>
          
//           {/* --- A. THÔNG TIN CÁ NHÂN & SINH HIỆU --- */}
//           <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
//             <h3 className="text-indigo-700 font-bold mb-3 flex items-center gap-2">
//               🧑‍⚕️ Thông tin & Sinh hiệu
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               
//                {/* Tên & Tuổi */}
//                <div className="md:col-span-2 grid grid-cols-3 gap-4">
//                   <div className="col-span-2">
//                     <label className="text-sm font-semibold text-gray-700">Họ và tên</label>
//                     <input 
//                       name="name" type="text" placeholder="Nhập họ và tên..."
//                       value={patientData.name} onChange={handlePatientChange}
//                       className={`w-full p-2 border rounded mt-1 ${!patientData.name ? 'border-yellow-300 bg-yellow-50' : 'border-gray-300'}`} 
//                     />
//                   </div>
//                   <div>
//                     <label className="text-sm font-semibold text-gray-700">Tuổi</label>
//                     <input 
//                       name="age" type="number" placeholder="Tuổi..."
//                       value={patientData.age} onChange={handlePatientChange}
//                       className={`w-full p-2 border rounded mt-1 ${!patientData.age ? 'border-yellow-300 bg-yellow-50' : 'border-gray-300'}`} 
//                     />
//                   </div>
//                </div>

//                {/* Giới tính */}
//                <div className="md:col-span-2">
//                  <label className="text-sm font-semibold text-gray-700">Giới tính <span className="text-red-500">*</span></label>
//                  <select 
//                     name="gender" value={patientData.gender} onChange={handlePatientChange}
//                     className={`w-full p-2 border rounded mt-1 ${!patientData.gender ? 'border-red-300 ring-1 ring-red-200' : 'border-gray-300'}`}
//                  >
//                    <option value="">-- Chọn giới tính --</option>
//                    <option value="Nam">Nam</option>
//                    <option value="Nữ">Nữ</option>
//                  </select>
//                </div>

//                {/* Sinh hiệu */}
//                <div className="grid grid-cols-2 gap-4 md:col-span-2">
//                  <div>
//                    <label className="text-xs font-bold text-gray-500 uppercase">Chiều cao (cm)</label>
//                    <input name="height" type="number" placeholder="165" value={patientData.height} onChange={handlePatientChange} className="w-full p-2 border rounded mt-1"/>
//                  </div>
//                  <div>
//                    <label className="text-xs font-bold text-gray-500 uppercase">Cân nặng (kg)</label>
//                    <input name="weight" type="number" placeholder="60" value={patientData.weight} onChange={handlePatientChange} className="w-full p-2 border rounded mt-1"/>
//                  </div>
                 
//                  <div>
//                    <label className="text-xs font-bold text-gray-500 uppercase">HA Tâm Thu</label>
//                    <input name="systolicBloodPressure" type="number" placeholder="120" value={patientData.systolicBloodPressure} onChange={handlePatientChange} className="w-full p-2 border rounded mt-1"/>
//                  </div>
//                  <div>
//                    <label className="text-xs font-bold text-gray-500 uppercase">HA Tâm Trương</label>
//                    <input name="diastolicBloodPressure" type="number" placeholder="80" value={patientData.diastolicBloodPressure} onChange={handlePatientChange} className="w-full p-2 border rounded mt-1"/>
//                  </div>
                 
//                  <div className="col-span-2">
//                    <label className="text-xs font-bold text-gray-500 uppercase">Nhịp tim</label>
//                    <input name="heartRate" type="number" placeholder="75" value={patientData.heartRate} onChange={handlePatientChange} className="w-full p-2 border rounded mt-1"/>
//                  </div>
//                </div>
//             </div>
//           </div>

//           {/* --- B. CHỈ SỐ XÉT NGHIỆM --- */}
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
//                     name={key} type="number" step="0.01" placeholder="Nhập số..."
//                     value={bloodTests[key]} onChange={handleBloodChange} 
//                     className={`w-full p-2 border rounded mt-1 ${!bloodTests[key] ? 'border-yellow-300 bg-yellow-50' : 'border-gray-300'}`}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button
//             onClick={() => handlePredictDisease(patientData, bloodTests)}
//             disabled={loading}
//             className="w-full py-3 rounded-lg text-white bg-green-600 hover:bg-green-700 font-bold shadow-lg transition flex justify-center items-center gap-2"
//           >
//              {loading ? (
//                  <>
//                     <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <span>{loadingText}</span>
//                  </>
//              ) : "✅ Hoàn tất & Xem kết quả"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, RefreshCw, ArrowRight } from "lucide-react";

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Đang xử lý...");

  const [showInputForm, setShowInputForm] = useState(false);
  
  const [rawOCR, setRawOCR] = useState({}); 

  const [patientData, setPatientData] = useState({
    name: "", gender: "", age: "", height: "", weight: "",
    systolicBloodPressure: "", diastolicBloodPressure: "", heartRate: "", bmi: ""
  });
  
  const [bloodTests, setBloodTests] = useState({
    cholesterol: "", hdl: "", ldl: "", triglycerid: "", 
    creatinin: "", hba1c: "", ure: "", vldl: ""
  });

  const [units, setUnits] = useState({
    cholesterol: "", hdl: "", ldl: "", triglycerid: "", 
    creatinin: "", hba1c: "", ure: "", vldl: ""
  });

  const navigate = useNavigate();
  const timerRef1 = useRef(null);
  const timerRef2 = useRef(null);

  const bloodLabelMap = {
    cholesterol: "Cholesterol", hdl: "HDL-C", ldl: "LDL-C",
    triglycerid: "Triglycerid", creatinin: "Creatinin", hba1c: "HbA1c", ure: "Ure", vldl: "VLDL"
  };

  // --- XỬ LÝ ẢNH CHUNG (CHO CẢ 2 NÚT) ---
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setShowInputForm(false);
      setPatientData({});
      setBloodTests({});
      setUnits({});
      setRawOCR({});
    }
  };

  // --- HÀM CHUYỂN ĐỔI ĐƠN VỊ ---
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
            case "cholesterol":
            case "hdl":
            case "ldl":
            case "vldl":
                newVal = numVal / 38.67;
                break;
            case "triglycerid":
            case "triglycerides":
                newVal = numVal / 88.57;
                break;
            case "ure": 
                newVal = numVal * 0.1665; 
                break;
            case "glucose":
                newVal = numVal / 18;
                break;
            default:
                return { value, unit };
        }
        return { value: newVal.toFixed(2), unit: "mmol/L" };
    }
    return { value, unit };
  };

  // --- XỬ LÝ API VÀ DỮ LIỆU ---
  const handlePatientChange = (e) => setPatientData({ ...patientData, [e.target.name]: e.target.value });
  const handleBloodChange = (e) => setBloodTests({ ...bloodTests, [e.target.name]: e.target.value });
  const handleUnitChange = (e) => setUnits({ ...units, [e.target.name]: e.target.value });

  const handleAnalyzeOCR = async () => {
    if (!image) return alert("⚠️ Vui lòng chọn ảnh trước!");
    setLoading(true);
    setLoadingText("☁️ Đang gửi ảnh lên server...");

    timerRef1.current = setTimeout(() => setLoadingText("🤖 AI đang đọc dữ liệu phiếu khám..."), 2500);
    timerRef2.current = setTimeout(() => setLoadingText("🏥 Đang tổng hợp hồ sơ bệnh án..."), 5500);

    try {
      const formData = new FormData();
      formData.append("file", image);

      // LƯU Ý: Nếu bé chạy trên điện thoại qua Ngrok thì dùng link Ngrok hoặc IP máy tính
      // Nếu test local thì để localhost. Tốt nhất là dùng Relative Path nếu build chung
      // Hoặc để IP máy tính: http://192.168.1.xxx:8000/ocr
      const resOCR = await fetch("http://127.0.0.1:8000/ocr", { 
        method: "POST",
        body: formData,
      });
      const responseData = await resOCR.json();

      clearTimeout(timerRef1.current);
      clearTimeout(timerRef2.current);

      if (responseData.status === "success") {
        const pInfo = responseData.data.patient_info;
        const bTests = responseData.data.blood_tests || {};

        setRawOCR(bTests);

        setPatientData({
          name: pInfo.name || "",
          gender: pInfo.gender || "",
          age: pInfo.age || "",
          height: pInfo.height || "",
          weight: pInfo.weight || "",
          systolicBloodPressure: pInfo.systolicBloodPressure || "",
          diastolicBloodPressure: pInfo.diastolicBloodPressure || "",
          heartRate: pInfo.heartRate || "",
          bmi: pInfo.bmi || ""
        });

        const newValues = {};
        const newUnits = {};

        Object.keys(bloodLabelMap).forEach(key => {
            const item = bTests[key];
            let rawVal = "", rawUnit = "";

            if (item && typeof item === 'object') {
                rawVal = item.value || "";
                rawUnit = item.unit || "";
            } else {
                rawVal = item || "";
            }

            // 🔥 LOGIC: Kiểm tra Creatinin
            if (key === 'creatinin' && (!rawVal || rawVal.toString().trim() === "")) {
                newValues[key] = "5.5";
                newUnits[key] = "umol/L"; 
                return; 
            }

            const converted = convertMgToMmol(rawVal, rawUnit, key);
            newValues[key] = converted.value;
            newUnits[key] = converted.unit;
        });
        
        setBloodTests(newValues);
        setUnits(newUnits);

        const isMissing = !pInfo.name || !pInfo.age || !pInfo.gender || !pInfo.height || !pInfo.weight || 
                          !pInfo.systolicBloodPressure || !pInfo.diastolicBloodPressure || !pInfo.heartRate;
        const isBloodMissing = !newValues.cholesterol || !newValues.hdl; 

        if (isMissing || isBloodMissing) {
          setShowInputForm(true);
          setLoading(false);      
        } else {
          handlePredictDisease(newValues, newUnits, { ...pInfo, bmi: pInfo.bmi });
        }
      } else {
        alert("❌ Không đọc được dữ liệu!");
        setLoading(false);
      }
    } catch (err) {
      clearTimeout(timerRef1.current);
      clearTimeout(timerRef2.current);
      setLoading(false);
      console.error(err);
      alert("Lỗi OCR! Kiểm tra lại server backend.");
    }
  };

  const handlePredictDisease = async (finalValues, finalUnits, finalPatient) => {
    const dataValues = finalValues || bloodTests;
    const dataUnits = finalUnits || units;
    const dataPatient = finalPatient || patientData;

    if (!loading) {
        setLoading(true);
        setLoadingText("🧠 AI đang chẩn đoán bệnh...");
    }

    try {
      let currentBMI = dataPatient.bmi;
      if (!currentBMI && dataPatient.height && dataPatient.weight) {
        const h = parseFloat(dataPatient.height) / 100;
        const w = parseFloat(dataPatient.weight);
        currentBMI = (w / (h * h)).toFixed(2);
      }

      const payload = {
        patient_info: { ...dataPatient, bmi: currentBMI },
        blood_tests: dataValues,
        units: dataUnits
      };

      const resPredict = await fetch("http://127.0.0.1:8000/predict-disease", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      });
      const predict_result = await resPredict.json();
      setLoading(false);
      navigate("/ket-qua-chan-doan", {
        state: { type: "Phân tích tổng hợp", result: predict_result.data, input: payload },
      });
    } catch (err) {
      setLoading(false);
      alert("❌ Lỗi dự đoán!");
    }
  };

  const getRawDisplay = (key) => {
    const item = rawOCR[key];
    if (!item) return "-";
    if (typeof item === 'object') {
        return `${item.value || ""} ${item.unit || ""}`;
    }
    return item;
  };

  return (
    <div className="w-full relative">
      {!showInputForm && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* NÚT 1: TẢI ẢNH TỪ THƯ VIỆN */}
            <div className="border-2 border-dashed border-indigo-300 p-6 rounded-xl text-center bg-indigo-50 hover:bg-indigo-100 transition cursor-pointer relative group">
               <input type="file" accept="image/*" onChange={handleUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className="flex flex-col items-center text-indigo-600"><Upload size={32} className="mb-2"/><p className="font-bold">Tải ảnh từ thư viện</p></div>
            </div>

            {/* NÚT 2: CHỤP ẢNH TRỰC TIẾP (Dùng app Camera của ĐT) */}
            <div className="border-2 border-dashed border-pink-300 p-6 rounded-xl text-center bg-pink-50 hover:bg-pink-100 transition cursor-pointer relative group">
               {/* capture="environment" sẽ gọi camera sau */}
               <input type="file" accept="image/*" capture="environment" onChange={handleUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
               <div className="flex flex-col items-center text-pink-600"><Camera size={32} className="mb-2"/><p className="font-bold">Chụp ảnh ngay</p></div>
            </div>

          </div>
          
          {preview && <div className="flex flex-col items-center animate-fade-in"><img src={preview} alt="preview" className="h-64 object-contain rounded-lg shadow-md bg-white border" /></div>}
          
          {preview && (
            <button 
              onClick={handleAnalyzeOCR} 
              disabled={loading} 
              className={`w-full py-3 rounded-lg text-white font-bold transition flex justify-center items-center gap-2 ${
                loading ? "bg-indigo-300 cursor-wait shadow-inner" : "bg-indigo-600 hover:bg-indigo-700 shadow-lg"
              }`}
            >
              {loading ? (
                  <>
                      <RefreshCw size={20} className="animate-spin" />
                      <span>{loadingText}</span>
                  </>
              ) : (
                  "🚀 Phân tích ảnh ngay"
              )}
            </button>
          )}
        </div>
      )}

      {showInputForm && (
        <div className="animate-fade-in space-y-6">
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 text-yellow-800 text-sm">⚠️ Vui lòng kiểm tra và bổ sung thông tin:</div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-indigo-700 font-bold mb-3 flex items-center gap-2">🧑‍⚕️ Thông tin & Sinh hiệu</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2"><label className="text-sm font-semibold">Họ tên</label><input name="name" value={patientData.name} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
                <div><label className="text-sm font-semibold">Tuổi</label><input name="age" type="number" value={patientData.age} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
                <div><label className="text-sm font-semibold">Giới tính</label><select name="gender" value={patientData.gender} onChange={handlePatientChange} className="w-full p-2 border rounded"><option value="">--</option><option value="Nam">Nam</option><option value="Nữ">Nữ</option></select></div>
                <div><label className="text-xs font-bold text-gray-500 uppercase">Chiều cao (cm)</label><input name="height" type="number" value={patientData.height} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
                <div><label className="text-xs font-bold text-gray-500 uppercase">Cân nặng (kg)</label><input name="weight" type="number" value={patientData.weight} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
                <div><label className="text-xs font-bold text-gray-500 uppercase">HA Tâm Thu</label><input name="systolicBloodPressure" type="number" value={patientData.systolicBloodPressure} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
                <div><label className="text-xs font-bold text-gray-500 uppercase">HA Tâm Trương</label><input name="diastolicBloodPressure" type="number" value={patientData.diastolicBloodPressure} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
                <div className="col-span-2"><label className="text-xs font-bold text-gray-500 uppercase">Nhịp tim</label><input name="heartRate" type="number" value={patientData.heartRate} onChange={handlePatientChange} className="w-full p-2 border rounded"/></div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-indigo-700 font-bold mb-3 flex items-center gap-2">🧪 Chỉ số xét nghiệm</h3>
            
            <div className="hidden md:grid grid-cols-12 gap-2 text-xs font-bold text-gray-500 uppercase border-b pb-2 mb-2">
                <div className="col-span-3">Tên chỉ số</div>
                <div className="col-span-3 text-center bg-gray-100 rounded">Kết quả Gốc (OCR)</div>
                <div className="col-span-3 text-center">Giá trị chuẩn</div>
                <div className="col-span-3 text-center">Đơn vị chuẩn</div>
            </div>
            
            <div className="space-y-4 md:space-y-3">
              {Object.keys(bloodLabelMap).map((key) => (
                <div key={key} className="flex flex-col md:grid md:grid-cols-12 gap-2 items-start md:items-center border-b pb-4 md:pb-2 last:border-0">
                  <label className="w-full md:col-span-3 text-sm font-bold text-gray-800 md:text-gray-700 md:font-medium mb-1 md:mb-0">
                    {bloodLabelMap[key]} { !bloodTests[key] && <span className="text-red-400 text-[10px]">*</span> }
                  </label>

                  <div className="w-full md:col-span-3 flex justify-between md:justify-center items-center bg-gray-50 p-2 rounded text-xs text-gray-500 font-mono mb-1 md:mb-0">
                      <span className="md:hidden font-semibold text-gray-400 mr-2">Gốc:</span>
                      <div className="flex items-center">
                          {getRawDisplay(key)}
                          {getRawDisplay(key).includes("mg") && <ArrowRight className="w-3 h-3 ml-1 text-indigo-400"/>}
                      </div>
                  </div>

                  <div className="w-full md:col-span-3">
                    <input name={key} type="number" step="0.01" placeholder="0.0" value={bloodTests[key]} onChange={handleBloodChange} className="w-full p-2 border border-indigo-200 rounded text-center font-bold text-indigo-700"/>
                  </div>

                  <div className="w-full md:col-span-3">
                    <input name={key} type="text" placeholder="VD: mmol/L" value={units[key]} onChange={handleUnitChange} className="w-full p-2 border rounded bg-gray-50 text-sm text-center"/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => handlePredictDisease(null, null, null)} 
            disabled={loading} 
            className={`w-full py-3 rounded-lg text-white font-bold shadow-lg transition flex justify-center items-center gap-2 ${
                loading ? "bg-green-300 cursor-wait" : "bg-green-600 hover:bg-green-700"
            }`}
          >
              {loading ? (
                  <>
                    <RefreshCw size={20} className="animate-spin" />
                    <span>Đang chẩn đoán...</span>
                  </>
              ) : "✅ Hoàn tất & Xem kết quả"}
          </button>
        </div>
      )}
    </div>
  );
}