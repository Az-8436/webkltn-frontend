import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/Login";
import DoctorDashboard from "./pages/DoctorDashboard";
import Dashboard from "./pages/Dashboard";
import DiabetesForm from "./pages/DiabetesForm";
import HypertensionForm from "./pages/HypertensionForm";
import PatientInfoForm from "./pages/PatientInfoForm";
import PatientDetail from "./pages/PatientDetail";
import DiagnosisResult from "./pages/DiagnosisResult";
import AdvancedStats from "./pages/AdvancedStats";
import MedicalRecords from "./pages/MedicalRecords";
import UploadImage from "./pages/UploadImage";
import History from "./pages/History";
import Diagnosis from "./pages/Diagnosis";
import RecordDetail from "./pages/RecordDetail";
import DashBoardAddChatbot from "./pages/DashBoardAddChatbot";


function ProtectedRoute({ children, allowRoles, requiredRole }) {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const role = localStorage.getItem("role");

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (requiredRole && role !== requiredRole) return <Navigate to="/chan-doan" replace />;
  if (allowRoles && !allowRoles.includes(role)) return <Navigate to="/chan-doan" replace />;

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Trang gộp Chẩn đoán */}
        <Route
          path="/chan-doan"
          element={
            <ProtectedRoute allowRoles={["admin", "doctor"]}>
              <Layout>
                <Diagnosis /> {/* gộp bệnh nhân + upload ảnh */}
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Các page khác vẫn tồn tại, nhưng sidebar không show */}
         <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowRoles="doctor">
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        /> 
        <Route
          path="/ho-so-benh-an"
          element={
            <ProtectedRoute allowRoles={["admin", "doctor"]}>
              <Layout>
                <MedicalRecords />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tieu-duong"
          element={
            <ProtectedRoute allowRoles={["admin", "doctor"]}>
              <Layout>
                <DiabetesForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tang-huyet-ap"
          element={
            <ProtectedRoute allowRoles={["admin", "doctor"]}>
              <Layout>
                <HypertensionForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/benh-nhan"
          element={
            <ProtectedRoute allowRoles={["admin", "doctor"]}>
              <Layout>
                <PatientInfoForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/benh-nhan/:id"
          element={
            <ProtectedRoute allowRoles={["admin", "doctor"]}>
              <Layout>
                <PatientDetail />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ket-qua-chan-doan"
          element={
            <ProtectedRoute allowRoles={["admin", "doctor"]}>
              <Layout>
                <DiagnosisResult />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-image"
          element={
            <ProtectedRoute allowRoles={["admin", "doctor"]}>
              <Layout>
                <UploadImage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/lich-su-kham"
          element={
            <ProtectedRoute allowRoles={["admin", "doctor"]}>
              <Layout>
                <History />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/phan-tich-anh"
          element={
            <ProtectedRoute allowRoles={["admin", "doctor"]}>
              <Layout>
                <UploadImage />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* Admin only */}
        <Route
          path="/dashboard-chatbot"
          element={
            <ProtectedRoute allowRoles="admin">
              <Layout>
                <DashBoardAddChatbot />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/thong-ke-nang-cao"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <AdvancedStats />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/ho-so-benh-an"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <MedicalRecords />
              </Layout>
            </ProtectedRoute>
          }
        /> */}

        <Route path="/chi-tiet-ho-so" 
        element={
          <ProtectedRoute allowRoles={["admin", "doctor"]}>
            <Layout>
              <RecordDetail />
            </Layout>
          </ProtectedRoute>
        } />


        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/chan-doan" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
