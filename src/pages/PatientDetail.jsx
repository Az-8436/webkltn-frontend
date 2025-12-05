import { useParams } from "react-router-dom";

const patientData = {
  1: {
    name: "Nguyễn Văn A",
    age: 45,
    gender: "Nam",
    diabetes: { glucose: 180, hbA1c: 7.2 },
    hypertension: { systolic: 140, diastolic: 90 },
  },
  2: {
    name: "Trần Thị B",
    age: 52,
    gender: "Nữ",
    diabetes: null,
    hypertension: { systolic: 150, diastolic: 95 },
  },
  // Thêm dữ liệu bệnh nhân khác nếu muốn
};

export default function PatientDetail() {
  const { id } = useParams();
  const patient = patientData[id];

  if (!patient) {
    return <div className="p-6 text-red-500">Không tìm thấy bệnh nhân!</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Thông tin bệnh nhân</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <p><strong>Họ tên:</strong> {patient.name}</p>
        <p><strong>Tuổi:</strong> {patient.age}</p>
        <p><strong>Giới tính:</strong> {patient.gender}</p>
      </div>

      {patient.diabetes && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-blue-600">Chỉ số Tiểu đường</h2>
          <p>Glucose: {patient.diabetes.glucose} mg/dL</p>
          <p>HbA1c: {patient.diabetes.hbA1c} %</p>
        </div>
      )}

      {patient.hypertension && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-red-600">Chỉ số Huyết áp</h2>
          <p>Huyết áp: {patient.hypertension.systolic}/{patient.hypertension.diastolic} mmHg</p>
        </div>
      )}
    </div>
  );
}
