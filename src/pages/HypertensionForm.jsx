import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HypertensionForm() {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [bmi, setBmi] = useState("");
  const [cholesterol, setCholesterol] = useState("");
  const navigate = useNavigate();

  const handleDiagnosis = async () => {
    const inputData = { systolic, diastolic, heartRate, bmi, cholesterol };

    let result = "Không xác định (chưa có dữ liệu)";
    try {
      // 🛰 Gọi API backend
      const res = await fetch("http://localhost:8000/predict/hypertension", {
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
      // 🧮 Nếu backend chưa có → fallback rule-based
      const sys = Number(systolic);
      const dia = Number(diastolic);

      if (sys >= 140 || dia >= 90) {
        result = "Nguy cơ cao mắc Tăng huyết áp (tính tạm)";
      } else if (sys >= 130 || dia >= 85) {
        result = "Tiền tăng huyết áp (tính tạm)";
      } else {
        result = "Huyết áp bình thường (tính tạm)";
      }
    }

    navigate("/ket-qua-chan-doan", {
      state: { type: "Tăng huyết áp", result, input: inputData },
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="bg-white shadow-xl rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">
        <h1 className="text-2xl font-bold mb-6 text-red-700">
          ❤️ Nhập số liệu bệnh Tăng Huyết Áp
        </h1>
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Huyết áp tâm thu (mmHg)
            </label>
            <input
              type="number"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              placeholder="Ví dụ: 130"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Huyết áp tâm trương (mmHg)
            </label>
            <input
              type="number"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              placeholder="Ví dụ: 85"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Nhịp tim (bpm)
            </label>
            <input
              type="number"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              placeholder="Ví dụ: 70"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              BMI (kg/m²)
            </label>
            <input
              type="number"
              value={bmi}
              onChange={(e) => setBmi(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              placeholder="Ví dụ: 24"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Cholesterol toàn phần (mg/dL)
            </label>
            <input
              type="number"
              value={cholesterol}
              onChange={(e) => setCholesterol(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              placeholder="Ví dụ: 200"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-danger text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-200"
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
