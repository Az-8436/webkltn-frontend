import { useState, useEffect } from "react";
import axios from "axios";

export default function DoctorDashboard() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [aiImage, setAiImage] = useState(null);
  const [aiResult, setAiResult] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/patients").then((res) => {
      setPatients(res.data);
    });
  }, []);

  const handleSelectPatient = (p) => {
    setSelectedPatient(p);
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAiImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post("http://localhost:8080/ai/analyze", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setAiResult(res.data);
  };

  return (
    <div className="flex w-full h-full bg-gray-100 p-6 gap-6">
      {/* PATIENT LIST */}
      <div className="w-1/3 bg-white rounded-2xl shadow p-4">
        <h1 className="text-xl font-bold mb-4">Danh sách bệnh nhân</h1>

        {patients.length === 0 ? (
          <p className="text-gray-500">Không có dữ liệu.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {patients.map((p) => (
              <div
                key={p.id}
                onClick={() => handleSelectPatient(p)}
                className={`p-3 rounded-xl cursor-pointer border ${
                  selectedPatient?.id === p.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-600">{p.phone}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DETAILS + AI */}
      <div className="flex-1 bg-white rounded-2xl shadow p-6">
        {!selectedPatient ? (
          <p className="text-gray-500">Chọn một bệnh nhân để xem chi tiết.</p>
        ) : (
          <>
            <h2 className="text-xl font-bold">{selectedPatient.name}</h2>
            <p className="mb-4 text-gray-600">{selectedPatient.phone}</p>

            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Thông tin chẩn đoán</h3>
              <div className="p-4 border rounded-xl bg-gray-50">
                <p>Tiểu đường: {selectedPatient.diabetes}</p>
                <p>Tăng huyết áp: {selectedPatient.hypertension}</p>
                <p>Ghi chú: {selectedPatient.note}</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-3">Phân tích ảnh (AI)</h3>

              <input
                type="file"
                accept="image/*"
                onChange={handleUploadImage}
                className="mb-4"
              />

              {aiImage && (
                <img
                  src={aiImage}
                  alt="preview"
                  className="w-60 rounded-xl shadow mb-4"
                />
              )}

              {aiResult && (
                <div className="p-4 border rounded-xl bg-green-50">
                  <p className="font-semibold">Kết quả AI:</p>
                  <p>{aiResult.result}</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
