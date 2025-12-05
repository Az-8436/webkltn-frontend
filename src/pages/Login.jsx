import { useState } from "react";
import { useNavigate } from "react-router-dom";

const users = [
  { username: "admin", password: "0000", role: "admin" },
  { username: "doctor", password: "1111", role: "doctor" },
];

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("role", user.role);
      navigate("/", { state: { role: user.role } });
    } else {
      setError("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/login.png')" }}
    >
      <div className="bg-white/90 rounded-xl shadow-lg flex w-full max-w-3xl overflow-hidden">
        {/* Form đăng nhập */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6">Đăng nhập</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Tên tài khoản"
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Đăng nhập
            </button>
          </form>
          <p className="text-sm mt-4">
            Quên mật khẩu?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Khôi phục
            </a>
          </p>
        </div>

        {/* Ảnh bác sĩ */}
        <div className="w-1/2 flex items-center justify-center p-6 bg-blue-50">
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
