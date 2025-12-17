import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, RefreshCw, ChevronRight } from "lucide-react";

export default function UploadImage() {
  // --- STATE QUẢN LÝ ---
  const [files, setFiles] = useState([]);
  const [analyzedData, setAnalyzedData] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(-1);

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const [filePreviews, setFilePreviews] = useState([]);

  const [currentPatient, setCurrentPatient] = useState({});
  const [currentBlood, setCurrentBlood] = useState({});
  const [currentUnits, setCurrentUnits] = useState({});
  const [currentRawOCR, setCurrentRawOCR] = useState({});

  // 🔴 STATE BÁO LỖI FORM
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  const bloodLabelMap = {
    cholesterol: "Cholesterol",
    hdl: "HDL-C",
    ldl: "LDL-C",
    triglycerid: "Triglycerid",
    creatinin: "Creatinin",
    hba1c: "HbA1c",
    ure: "Ure",
    vldl: "VLDL",
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const generatePatientID = (index) => {
    const now = new Date();
    return `HS-${now.getTime()}-${index + 1}`;
  };

  const handleUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      setFiles((prev) => [...prev, ...selectedFiles]);
      setFilePreviews((prev) => [
        ...prev,
        ...selectedFiles.map((f) => URL.createObjectURL(f)),
      ]);
      setAnalyzedData([]);
      setReviewIndex(-1);
    }
    e.target.value = "";
  };

  const handleAnalyzeBatch = async () => {
    if (files.length === 0) return alert("Vui lòng chọn ảnh!");
    setLoading(true);
    const results = [];

    try {
      for (let i = 0; i < files.length; i++) {
        setLoadingText(`Đang xử lý ${i + 1}/${files.length}`);
        const formData = new FormData();
        formData.append("file", files[i]);

        const res = await fetch("https://webkltn-backend.onrender.com/ocr", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        results.push({
          preview: URL.createObjectURL(files[i]),
          rawOCR: data?.data?.blood_tests || {},
          patientData: {
            id: generatePatientID(i),
            name: "",
            age: "",
            gender: "",
            height: "",
            weight: "",
            systolicBloodPressure: "",
            diastolicBloodPressure: "",
            heartRate: "",
            bmi: "",
          },
          bloodTests: {},
          units: {},
        });

        await delay(1500);
      }

      setAnalyzedData(results);
      setReviewIndex(0);
      setCurrentPatient(results[0].patientData);
      setCurrentRawOCR(results[0].rawOCR);
    } catch (err) {
      alert("Lỗi OCR");
    } finally {
      setLoading(false);
    }
  };

  // 🔴 VALIDATION BẮT BUỘC
  const handleNextReview = () => {
    const requiredFields = [
      "name",
      "age",
      "gender",
      "height",
      "weight",
      "systolicBloodPressure",
      "diastolicBloodPressure",
      "heartRate",
    ];

    const isMissing = requiredFields.some(
      (f) =>
        !currentPatient[f] ||
        currentPatient[f].toString().trim() === ""
    );

    if (isMissing) {
      setFormError("❗ Vui lòng nhập đầy đủ thông tin bệnh nhân!");
      return;
    }

    setFormError("");

    const updated = [...analyzedData];
    updated[reviewIndex].patientData = currentPatient;
    setAnalyzedData(updated);

    if (reviewIndex < updated.length - 1) {
      setReviewIndex(reviewIndex + 1);
      setCurrentPatient(updated[reviewIndex + 1].patientData);
      setCurrentRawOCR(updated[reviewIndex + 1].rawOCR);
      window.scrollTo(0, 0);
    } else {
      navigate("/ket-qua-chan-doan", {
        state: { dataQueue: updated },
      });
    }
  };

  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...currentPatient, [name]: value };

    if (name === "height" || name === "weight") {
      const h = parseFloat(updated.height);
      const w = parseFloat(updated.weight);
      if (h > 0 && w > 0) {
        updated.bmi = (w / ((h / 100) ** 2)).toFixed(2);
      }
    }

    setCurrentPatient(updated);
  };

  return (
    <div className="w-full min-h-screen p-4">
      {reviewIndex === -1 && (
        <>
          <input type="file" multiple onChange={handleUpload} />
          <button onClick={handleAnalyzeBatch}>
            {loading ? loadingText : "Phân tích"}
          </button>
        </>
      )}

      {reviewIndex !== -1 && (
        <div className="space-y-4">
          <h2 className="font-bold text-lg">
            Duyệt {reviewIndex + 1}/{analyzedData.length}
          </h2>

          {/* 🔴 HIỂN THỊ LỖI */}
          {formError && (
            <div className="bg-red-100 text-red-700 p-3 rounded">
              {formError}
            </div>
          )}

          <input
            placeholder="Họ tên"
            name="name"
            value={currentPatient.name || ""}
            onChange={handlePatientChange}
          />
          <input
            type="number"
            placeholder="Tuổi"
            name="age"
            value={currentPatient.age || ""}
            onChange={handlePatientChange}
          />
          <select
            name="gender"
            value={currentPatient.gender || ""}
            onChange={handlePatientChange}
          >
            <option value="">--</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>

          <input
            type="number"
            placeholder="Chiều cao"
            name="height"
            value={currentPatient.height || ""}
            onChange={handlePatientChange}
          />
          <input
            type="number"
            placeholder="Cân nặng"
            name="weight"
            value={currentPatient.weight || ""}
            onChange={handlePatientChange}
          />
          <input
            type="number"
            placeholder="HA tâm thu"
            name="systolicBloodPressure"
            value={currentPatient.systolicBloodPressure || ""}
            onChange={handlePatientChange}
          />
          <input
            type="number"
            placeholder="HA tâm trương"
            name="diastolicBloodPressure"
            value={currentPatient.diastolicBloodPressure || ""}
            onChange={handlePatientChange}
          />
          <input
            type="number"
            placeholder="Nhịp tim"
            name="heartRate"
            value={currentPatient.heartRate || ""}
            onChange={handlePatientChange}
          />

          <button onClick={handleNextReview} className="bg-green-600 text-white px-4 py-2 rounded">
            {reviewIndex < analyzedData.length - 1 ? "Tiếp theo" : "Hoàn tất"}
          </button>
        </div>
      )}
    </div>
  );
}
