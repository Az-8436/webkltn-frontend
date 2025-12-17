// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const users = [
//   { username: "admin", password: "0000", role: "admin" },
//   { username: "doctor", password: "1111", role: "doctor" },
// ];

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const user = users.find(
//       (u) => u.username === username && u.password === password
//     );

//     if (user) {
//       localStorage.setItem("loggedIn", "true");
//       localStorage.setItem("role", user.role);
//       navigate("/", { state: { role: user.role } });
//     } else {
//       setError("Sai tài khoản hoặc mật khẩu!");
//     }
//   };

//   return (
//     <div
//       className="flex items-center justify-center min-h-screen bg-cover bg-center"
//       style={{ backgroundImage: "url('/login.png')" }}
//     >
//       <div className="bg-white/90 rounded-xl shadow-lg flex w-full max-w-3xl overflow-hidden">
//         {/* Form đăng nhập */}
//         <div className="w-1/2 p-8">
//           <h2 className="text-2xl font-bold mb-6">Đăng nhập</h2>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <input
//               type="text"
//               placeholder="Tên tài khoản"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <input
//               type="password"
//               placeholder="Mật khẩu"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             {error && <p className="text-red-500 text-sm">{error}</p>}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//             >
//               Đăng nhập
//             </button>
//           </form>
//           <p className="text-sm mt-4">
//             Quên mật khẩu?{" "}
//             <a href="#" className="text-blue-500 hover:underline">
//               Khôi phục
//             </a>
//           </p>
//         </div>

//         {/* Ảnh bác sĩ */}
//         <div className="w-1/2 flex items-center justify-center p-6 bg-blue-50">
//           <img
//             src="/doctor.png"
//             alt="Doctor"
//             className="w-3/4 object-contain drop-shadow-lg"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const users = [
//   { username: "admin", password: "0000", role: "admin" },
//   { username: "doctor", password: "1111", role: "doctor" },
// ];

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [patientId, setPatientId] = useState(""); // dùng cho user (bệnh nhân)
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   // -------------------------------
//   // LOGIN ADMIN / DOCTOR
//   // -------------------------------
//   const handleLogin = (e) => {
//     e.preventDefault();

//     const user = users.find(
//       (u) => u.username === username && u.password === password
//     );

//     if (user) {
//       localStorage.setItem("loggedIn", "true");
//       localStorage.setItem("role", user.role);

//       navigate("/chan-doan", { state: { role: user.role } });
//     } else {
//       setError("Sai tài khoản hoặc mật khẩu!");
//     }
//   };

//   // -------------------------------
//   // LOGIN USER = chỉ nhập patient_info.id
//   // -------------------------------
//   const handlePatientLogin = () => {
//     if (!patientId.trim()) {
//       setError("Vui lòng nhập mã hồ sơ bệnh nhân!");
//       return;
//     }

//     // Lưu thông tin user
//     localStorage.setItem("loggedIn", "true");
//     localStorage.setItem("role", "user");     // quyền như admin
//     localStorage.setItem("patientId", patientId);

//     // Redirect đúng trang home của hệ thống
//     navigate("/chan-doan", {
//       state: { role: "user", patientId },
//     });
//   };

//   return (
//     <div
//       className="flex items-center justify-center min-h-screen bg-cover bg-center"
//       style={{ backgroundImage: "url('/login.png')" }}
//     >
//       <div className="bg-white/90 rounded-xl shadow-lg flex w-full max-w-3xl overflow-hidden">

//         {/* LEFT: FORM */}
//         <div className="w-1/2 p-8">
//           <h2 className="text-2xl font-bold mb-6">Đăng nhập</h2>

//           {/* ADMIN / DOCTOR LOGIN */}
//           <form onSubmit={handleLogin} className="space-y-4">
//             <input
//               type="text"
//               placeholder="Tên tài khoản"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg"
//             />

//             <input
//               type="password"
//               placeholder="Mật khẩu"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg"
//             />

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//             >
//               Đăng nhập
//             </button>
//           </form>

//           {/* USER LOGIN */}
//           <div className="mt-8">
//             <h3 className="font-semibold mb-2">Đăng nhập bệnh nhân</h3>

//             <input
//               type="text"
//               placeholder="Nhập mã hồ sơ (HS-...)"
//               value={patientId}
//               onChange={(e) => setPatientId(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-green-400"
//             />

//             <button
//               onClick={handlePatientLogin}
//               className="w-full bg-green-600 text-white py-2 rounded-lg mt-3 hover:bg-green-700"
//             >
//               Xem kết quả khám
//             </button>
//           </div>

//           {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
//         </div>

//         {/* RIGHT: IMAGE */}
//         <div className="w-1/2 flex items-center justify-center p-6 bg-blue-50">
//           <img
//             src="/doctor.png"
//             alt="Doctor"
//             className="w-3/4 object-contain drop-shadow-lg"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 1. CHỈ GIỮ LẠI ROLE DOCTOR (Bỏ Admin)
const users = [
  { username: "doctor", password: "1111", role: "doctor" },
];

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [patientId, setPatientId] = useState(""); 
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái đang tải

  const navigate = useNavigate();

  // -------------------------------
  // LOGIN DOCTOR (Dữ liệu cứng)
  // -------------------------------
  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Reset lỗi cũ

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("role", user.role);
      // Chuyển hướng
      navigate("/dashboard", { state: { role: user.role } });
    } else {
      setError("Sai tài khoản hoặc mật khẩu bác sĩ!");
    }
  };

  // -------------------------------
  // LOGIN BỆNH NHÂN (Kiểm tra MongoDB qua API)
  // -------------------------------
  const handlePatientLogin = async () => {
    setError("");

    if (!patientId.trim()) {
      setError("Vui lòng nhập mã hồ sơ bệnh nhân!");
      return;
    }

    setIsLoading(true); // Bắt đầu load

    try {
      // 2. GỌI API KIỂM TRA MÃ HỒ SƠ
      // Bé nhớ thay đổi URL bên dưới cho đúng với đường dẫn API của bé nhé
      // Ví dụ: http://localhost:8000/api/patients/{patientId}
      const response = await axios.get(`https://webkltn-backend.onrender.com/api/patients/${patientId}`);

      // Giả sử API trả về data của bệnh nhân nếu tìm thấy
      if (response.data) {
        // Lưu thông tin
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("role", "admin");
        localStorage.setItem("patientId", patientId);

        // Chuyển hướng
        navigate("/ho-so-benh-an", {
          state: { role: "admin", patientId: patientId, patientData: response.data },
        });
      } 
    } catch (err) {
      // Nếu API trả về lỗi 404 (Không tìm thấy) hoặc lỗi mạng
      console.error(err);
      if (err.response && err.response.status === 404) {
         setError("Không tìm thấy mã hồ sơ này trong hệ thống!");
      } else {
         setError("Lỗi kết nối đến máy chủ. Vui lòng thử lại!");
      }
    } finally {
      setIsLoading(false); // Kết thúc load
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/login.png')" }}
    >
      <div className="bg-white/90 rounded-xl shadow-lg flex w-full max-w-3xl overflow-hidden">

        {/* LEFT: FORM */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-800">Đăng nhập hệ thống</h2>

          {/* DOCTOR LOGIN */}
          <form onSubmit={handleLogin} className="space-y-4 border-b pb-6 mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Dành cho Bác sĩ</h3>
            <input
              type="text"
              placeholder="Tên tài khoản (doctor)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Đăng nhập Bác sĩ
            </button>
          </form>

          {/* USER LOGIN (PATIENT) */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Dành cho Bệnh nhân</h3>

            <input
              type="text"
              placeholder="Nhập mã hồ sơ (Ví dụ: BN12345)"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <button
              onClick={handlePatientLogin}
              disabled={isLoading}
              className={`w-full text-white py-2 rounded-lg mt-3 transition 
                ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
            >
              {isLoading ? "Đang kiểm tra..." : "Xem kết quả khám"}
            </button>
          </div>

          {/* HIỂN THỊ LỖI */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg text-center">
              {error}
            </div>
          )}
        </div>

        {/* RIGHT: IMAGE */}
        <div className="hidden md:flex w-1/2 items-center justify-center p-6 bg-blue-50">
          <img
            src="/doctor.png"
            alt="Doctor"
            className="w-3/4 object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}