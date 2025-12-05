import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, CartesianGrid, Legend
} from "recharts";

const monthlyData = [
  { name: "T1", diabetes: 12, hypertension: 8 },
  { name: "T2", diabetes: 18, hypertension: 10 },
  { name: "T3", diabetes: 15, hypertension: 12 },
  { name: "T4", diabetes: 20, hypertension: 16 },
  { name: "T5", diabetes: 22, hypertension: 18 },
  { name: "T6", diabetes: 30, hypertension: 25 },
  { name: "T7", diabetes: 28, hypertension: 20 },
  { name: "T8", diabetes: 24, hypertension: 22 },
  { name: "T9", diabetes: 26, hypertension: 24 },
  { name: "T10", diabetes: 32, hypertension: 28 },
  { name: "T11", diabetes: 29, hypertension: 26 },
  { name: "T12", diabetes: 35, hypertension: 30 },
];

const genderData = [
  { name: "Nam", value: 240 },
  { name: "Nữ", value: 160 },
];

const diseaseShare = [
  { name: "Tiểu đường", value: 320 },
  { name: "Tăng huyết áp", value: 300 },
  { name: "Khác", value: 80 },
];

const COLORS = ["#60a5fa", "#f87171", "#a78bfa"];

export default function AdvancedStats() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-extrabold">📊 Thống kê nâng cao</h1>
        <p className="text-sm mt-1 text-sky-100"></p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar chart - monthly */}
        <div className="bg-white/90 rounded-xl p-4 shadow">
          <h3 className="font-semibold mb-3">Số ca theo tháng (12 tháng)</h3>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={monthlyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="diabetes" fill="#f87171" radius={[6,6,0,0]} />
                <Bar dataKey="hypertension" fill="#60a5fa" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie - gender */}
        <div className="bg-white/90 rounded-xl p-4 shadow">
          <h3 className="font-semibold mb-3">Tỷ lệ giới tính</h3>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={genderData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={80} paddingAngle={4}>
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "#0ea5e9" : "#06b6d4"} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area - disease distribution */}
        <div className="bg-white/90 rounded-xl p-4 shadow">
          <h3 className="font-semibold mb-3">Phân bố bệnh </h3>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="diabetes" stackId="1" stroke="#f87171" fill="#fca5a5" />
                <Area type="monotone" dataKey="hypertension" stackId="1" stroke="#60a5fa" fill="#bfdbfe" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white/90 rounded-xl p-4 shadow">
        <h3 className="font-semibold mb-3">Tỷ lệ tổng </h3>
        <div className="flex gap-4">
          {diseaseShare.map((d, i) => (
            <div key={i} className="flex-1 bg-white p-4 rounded-lg shadow-inner">
              <div className="text-sm text-gray-500">{d.name}</div>
              <div className="text-2xl font-bold mt-2">{d.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
