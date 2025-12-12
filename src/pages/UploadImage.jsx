
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
                <img
                  src={analyzedData[reviewIndex].preview}
                  alt="preview"
                  className="w-full object-contain max-h-[80vh]"
                />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6 pb-20">
              <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-indigo-700 font-bold mb-4 text-lg">🧑‍⚕️ Thông tin bệnh nhân</h3>

                <div className="mb-4">
                  <label className="text-sm font-bold text-red-600 uppercase whitespace-normal lg:whitespace-nowrap">
                    Mã Hồ Sơ (ID)
                  </label>
                  <input
                    name="id"
                    value={currentPatient.id || ""}
                    onChange={handlePatientChange}
                    className="w-full p-2 border border-red-200 bg-red-50 rounded font-mono font-bold text-red-700"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs sm:text-sm font-semibold whitespace-normal md:whitespace-nowrap">
                      Họ tên
                    </label>
                    <input
                      name="name"
                      value={currentPatient.name || ""}
                      onChange={handlePatientChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold whitespace-normal md:whitespace-nowrap">
                      Tuổi
                    </label>
                    <input
                      name="age"
                      type="number"
                      value={currentPatient.age || ""}
                      onChange={handlePatientChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold whitespace-normal md:whitespace-nowrap">
                      Giới tính
                    </label>
                    <select
                      name="gender"
                      value={currentPatient.gender || ""}
                      onChange={handlePatientChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">--</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-500 whitespace-normal md:whitespace-nowrap">
                      Chiều cao (cm)
                    </label>
                    <input
                      name="height"
                      type="number"
                      value={currentPatient.height || ""}
                      onChange={handlePatientChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-500 whitespace-normal md:whitespace-nowrap">
                      Cân nặng (kg)
                    </label>
                    <input
                      name="weight"
                      type="number"
                      value={currentPatient.weight || ""}
                      onChange={handlePatientChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-500 whitespace-normal md:whitespace-nowrap">
                      HA Tâm Thu
                    </label>
                    <input
                      name="systolicBloodPressure"
                      type="number"
                      value={currentPatient.systolicBloodPressure || ""}
                      onChange={handlePatientChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-500 whitespace-normal md:whitespace-nowrap">
                      HA Tâm Trương
                    </label>
                    <input
                      name="diastolicBloodPressure"
                      type="number"
                      value={currentPatient.diastolicBloodPressure || ""}
                      onChange={handlePatientChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs sm:text-sm font-bold text-gray-500 whitespace-normal md:whitespace-nowrap">
                      Nhịp tim
                    </label>
                    <input
                      name="heartRate"
                      type="number"
                      value={currentPatient.heartRate || ""}
                      onChange={handlePatientChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-indigo-700 font-bold mb-3">🧪 Chỉ số xét nghiệm</h3>
                <div className="space-y-4 md:space-y-3">
                  {Object.keys(bloodLabelMap).map((key) => (
                    <div
                      key={key}
                      className="flex flex-col md:grid md:grid-cols-12 gap-2 items-center border-b pb-2 last:border-0 min-w-0"
                    >
                      <label className="w-full md:col-span-3 text-sm font-bold text-gray-800 whitespace-normal lg:whitespace-nowrap min-w-[100px]">
                        {bloodLabelMap[key]}
                      </label>

                      <div className="w-full md:col-span-3 text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                        {getRawDisplay(key)}
                      </div>

                      <div className="w-full md:col-span-3">
                        <input
                          name={key}
                          type="number"
                          step="0.01"
                          value={currentBlood[key] || ""}
                          onChange={handleBloodChange}
                          className="w-full p-2 border border-indigo-200 rounded text-center font-bold text-indigo-700"
                        />
                      </div>

                      <div className="w-full md:col-span-3">
                        <input
                          name={key}
                          type="text"
                          value={currentUnits[key] || ""}
                          onChange={handleUnitChange}
                          className="w-full p-2 border rounded bg-gray-50 text-sm text-center"
                        />
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

