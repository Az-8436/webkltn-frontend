import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DiabetesForm() {
  const [fasting, setFasting] = useState("");   // Đường huyết lúc đói
  const [after2h, setAfter2h] = useState("");   // Đường huyết sau ăn 2h
  const [random, setRandom] = useState("");     // Đường huyết ngẫu nhiên
  const [hba1c, setHba1c] = useState("");       // HbA1c %
  const [cholesterol, setCholesterol] = useState(""); // thêm lipid máu
  const [triglyceride, setTriglyceride] = useState("");
  const navigate = useNavigate();

  const handleDiagnosis = async () => {
    const inputData = { fasting, after2h, random, hba1c, cholesterol, triglyceride };

    let result = "Không xác định (chưa có dữ liệu)";
    try {
      // 🛰 gọi API backend (nếu có)
      const res = await fetch("http://localhost:8000/predict/diabetes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });

      if (res.ok) {
        const data = await res.json();
        result = data.result || "Không rõ kết quả";
      } else {
        throw new Error("API lỗi");
      }
    } catch (err) {
      // 🧮 fallback: FE rule-based
      const f = Number(fasting);
      const a2h = Number(after2h);
      const r = Number(random);
      const h = Number(hba1c);

      if (h >= 6.5 || f >= 126 || a2h >= 200 || r >= 200) {
        result = "Nguy cơ cao mắc Tiểu đường type 2 (tính tạm)";
      } else if ((h >= 5.7 && h < 6.5) || (f >= 100 && f < 126) || (a2h >= 140 && a2h < 200)) {
        result = "Tiền tiểu đường (tính tạm)";
      } else {
        result = "Đường huyết bình thường (tính tạm)";
      }
    }

    navigate("/ket-qua-chan-doan", {
      state: { type: "Tiểu đường", result, input: inputData },
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="bg-white shadow-xl rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">🩺 Nhập số liệu bệnh Tiểu Đường</h1>
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Đường huyết lúc đói (mg/dL)</label>
            <input
              type="number"
              value={fasting}
              onChange={(e) => setFasting(e.target.value)}
              placeholder="Ví dụ: 110"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Đường huyết sau ăn 2h (mg/dL)</label>
            <input
              type="number"
              value={after2h}
              onChange={(e) => setAfter2h(e.target.value)}
              placeholder="Ví dụ: 150"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Đường huyết ngẫu nhiên (mg/dL)</label>
            <input
              type="number"
              value={random}
              onChange={(e) => setRandom(e.target.value)}
              placeholder="Ví dụ: 160"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">HbA1c (%)</label>
            <input
              type="text"
              value={hba1c}
              onChange={(e) => setHba1c(e.target.value)}
              placeholder="Ví dụ: 6.5"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Cholesterol toàn phần (mg/dL)</label>
            <input
              type="number"
              value={cholesterol}
              onChange={(e) => setCholesterol(e.target.value)}
              placeholder="Ví dụ: 200"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Triglyceride (mg/dL)</label>
            <input
              type="number"
              value={triglyceride}
              onChange={(e) => setTriglyceride(e.target.value)}
              placeholder="Ví dụ: 150"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              💾 Lưu số liệu
            </button>
            <button
              type="button"
              onClick={handleDiagnosis}
              className="ml-0 bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200"
            >
              Chẩn đoán
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
