// // // import { useState, useEffect, useRef } from "react";
// // // import {
// // //   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend
// // // } from "recharts";
// // // import { MessageCircle, X, Send, Bot } from "lucide-react"; // Icon đẹp

// // // export default function GlucoseHealth() {
// // //   // --- STATE QUẢN LÝ DỮ LIỆU ---
// // //   const [history, setHistory] = useState([]);
// // //   const [inputData, setInputData] = useState({
// // //     value: "",
// // //     type: "fasting", // Mặc định là 'fasting' (Lúc đói)
// // //     note: ""
// // //   });
// // //   const [analysisResult, setAnalysisResult] = useState(null);
// // //   const [loading, setLoading] = useState(false);

// // //   // --- LOGIC 1: ĐÁNH GIÁ SỨC KHỎE ---
// // //   const analyzeGlucose = (val, type) => {
// // //     const value = parseInt(val);
// // //     if (!value) return null;
// // //     let result = { status: "", msg: "", color: "" };

// // //     if (type === "fasting") {
// // //       if (value < 70) result = { status: "HẠ ĐƯỜNG HUYẾT", msg: "Cần nạp đường ngay! Quá thấp.", color: "bg-red-100 text-red-700 border-red-500" };
// // //       else if (value <= 130) result = { status: "AN TOÀN", msg: "Đường huyết kiểm soát tốt.", color: "bg-green-100 text-green-700 border-green-500" };
// // //       else result = { status: "CAO", msg: "Cảnh báo! Cao hơn mức an toàn lúc đói.", color: "bg-orange-100 text-orange-700 border-orange-500" };
// // //     } else {
// // //       if (value < 140) result = { status: "TỐT", msg: "Cơ thể dung nạp tốt.", color: "bg-green-100 text-green-700 border-green-500" };
// // //       else if (value <= 180) result = { status: "CHẤP NHẬN ĐƯỢC", msg: "Cần chú ý giảm tinh bột.", color: "bg-yellow-100 text-yellow-700 border-yellow-500" };
// // //       else result = { status: "NGUY HIỂM", msg: "Đường huyết sau ăn tăng quá cao.", color: "bg-red-100 text-red-700 border-red-500" };
// // //     }
// // //     return result;
// // //   };

// // //   // --- LOGIC 2: GỌI API ---
// // //   const fetchHistory = async () => {
// // //     try {
// // //       const res = await fetch("http://127.0.0.1:8000/api/glucose/history");
// // //       const data = await res.json();
// // //       setHistory(data.data);
// // //     } catch (error) { console.error("Lỗi tải lịch sử:", error); }
// // //   };

// // //   useEffect(() => { fetchHistory(); }, []);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!inputData.value) return;

// // //     const result = analyzeGlucose(inputData.value, inputData.type);
// // //     setAnalysisResult(result);
// // //     setLoading(true);

// // //     try {
// // //       await fetch("http://127.0.0.1:8000/api/glucose/add", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           value: parseInt(inputData.value),
// // //           measure_type: inputData.type,
// // //           note: inputData.note,
// // //           created_at: new Date().toLocaleString("vi-VN")
// // //         }),
// // //       });
// // //       await fetchHistory();
// // //       setInputData({ ...inputData, value: "", note: "" }); 
// // //     } catch (error) { alert("Lỗi khi lưu dữ liệu!"); } 
// // //     finally { setLoading(false); }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 p-6 font-sans relative">
// // //       {/* Header */}
// // //       <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 flex justify-between items-center">
// // //         <div>
// // //           <h1 className="text-2xl font-bold text-gray-800">🩸 Sổ Tay Đường Huyết Thông Minh</h1>
// // //           <p className="text-gray-500 text-sm">Theo dõi & Hỏi đáp cùng bác sĩ AI</p>
// // //         </div>
// // //         <div className="text-right hidden sm:block">
// // //           <div className="flex gap-4 text-xs font-bold mt-1">
// // //             <span className="text-green-600 bg-green-50 px-2 py-1 rounded">Đói: 70-130</span>
// // //             <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded">Sau ăn: &lt;180</span>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 pb-24"> {/* Thêm padding bottom để không bị chat che */}
        
// // //         {/* CỘT TRÁI: NHẬP LIỆU */}
// // //         <div className="space-y-6">
// // //           <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-50">
// // //             <h2 className="text-lg font-bold text-indigo-900 mb-4">📝 Nhập kết quả mới</h2>
// // //             <form onSubmit={handleSubmit} className="space-y-4">
// // //               {/* Chọn thời điểm */}
// // //               <div>
// // //                 <label className="block text-sm font-semibold text-gray-700 mb-2">Thời điểm đo</label>
// // //                 <div className="grid grid-cols-2 gap-3">
// // //                   <button type="button" onClick={() => setInputData({...inputData, type: 'fasting'})}
// // //                     className={`p-3 rounded-lg border text-sm font-bold transition ${inputData.type === 'fasting' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-500 hover:bg-gray-50'}`}>
// // //                     🌙 Lúc đói
// // //                   </button>
// // //                   <button type="button" onClick={() => setInputData({...inputData, type: 'after_meal'})}
// // //                     className={`p-3 rounded-lg border text-sm font-bold transition ${inputData.type === 'after_meal' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-500 hover:bg-gray-50'}`}>
// // //                     🍜 Sau ăn 2h
// // //                   </button>
// // //                 </div>
// // //               </div>

// // //               {/* Nhập số */}
// // //               <div>
// // //                 <label className="block text-sm font-semibold text-gray-700 mb-1">Chỉ số (mg/dL)</label>
// // //                 <div className="relative">
// // //                   <input type="number" value={inputData.value} onChange={(e) => setInputData({...inputData, value: e.target.value})}
// // //                     className="w-full p-4 text-3xl font-bold text-center text-gray-800 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none" placeholder="---" required />
// // //                   <span className="absolute right-4 top-6 text-gray-400 font-medium">mg/dL</span>
// // //                 </div>
// // //               </div>

// // //               <button type="submit" disabled={loading} className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-bold shadow-lg transition transform active:scale-95">
// // //                 {loading ? "Đang lưu..." : "KIỂM TRA NGAY"}
// // //               </button>
// // //             </form>
// // //           </div>

// // //           {/* KẾT QUẢ PHÂN TÍCH */}
// // //           {analysisResult && (
// // //             <div className={`p-6 rounded-2xl border-l-8 shadow-md animate-bounce-in ${analysisResult.color}`}>
// // //               <h3 className="text-xs font-bold opacity-70 uppercase">Kết quả phân tích</h3>
// // //               <div className="text-2xl font-extrabold mt-1">{analysisResult.status}</div>
// // //               <p className="font-medium">{analysisResult.msg}</p>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* CỘT PHẢI: BIỂU ĐỒ */}
// // //         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col h-[500px]">
// // //           <h2 className="text-lg font-bold text-gray-800 mb-4">📈 Xu hướng gần đây</h2>
// // //           <div className="flex-1">
// // //             <ResponsiveContainer width="100%" height="100%">
// // //               <LineChart data={history} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
// // //                 <CartesianGrid stroke="#f5f5f5" vertical={false} />
// // //                 <XAxis dataKey="created_at" tick={{fontSize: 10}} tickFormatter={(tick) => tick.split(" ")[0]} />
// // //                 <YAxis domain={[0, 'auto']} tick={{fontSize: 10}} />
// // //                 <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
// // //                 <ReferenceLine y={130} stroke="green" strokeDasharray="3 3" />
// // //                 <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: "#4f46e5", strokeWidth: 2, stroke: "#fff" }} />
// // //               </LineChart>
// // //             </ResponsiveContainer>
// // //           </div>
          
// // //           <div className="mt-4 pt-4 border-t h-32 overflow-y-auto custom-scrollbar">
// // //               {history.slice().reverse().map((item, idx) => (
// // //                   <div key={idx} className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded mb-1">
// // //                       <span className="font-bold text-gray-700">{item.value} <span className="text-xs font-normal text-gray-400">mg/dL</span></span>
// // //                       <span className={`text-xs px-2 py-0.5 rounded ${item.measure_type === 'fasting' ? 'bg-indigo-100 text-indigo-700' : 'bg-purple-100 text-purple-700'}`}>
// // //                           {item.measure_type === 'fasting' ? 'Đói' : 'Sau ăn'}
// // //                       </span>
// // //                   </div>
// // //               ))}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* --- WIDGET CHATBOT (TÍCH HỢP SẴN) --- */}
// // //       <AIChatWidget currentGlucose={parseInt(inputData.value)} measureType={inputData.type} />
// // //     </div>
// // //   );
// // // }

// // // // --- SUB-COMPONENT: CHATBOT ---
// // // function AIChatWidget({ currentGlucose, measureType }) {
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [messages, setMessages] = useState([
// // //     { sender: "bot", text: "Xin chào! Mình là trợ lý AI. Bạn cần tư vấn thực đơn không? 🥗" }
// // //   ]);
// // //   const [input, setInput] = useState("");
// // //   const [isTyping, setIsTyping] = useState(false);
// // //   const messagesEndRef = useRef(null);

// // //   useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

// // //   const handleSend = async () => {
// // //     if (!input.trim()) return;
// // //     const userMsg = input;
// // //     setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
// // //     setInput("");
// // //     setIsTyping(true);

// // //     try {
// // //       const res = await fetch("http://127.0.0.1:8000/api/chat/advice", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           question: userMsg,
// // //           glucose_value: currentGlucose || 0,
// // //           measure_type: measureType || "fasting"
// // //         }),
// // //       });
// // //       const data = await res.json();
// // //       setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
// // //     } catch (error) {
// // //       setMessages(prev => [...prev, { sender: "bot", text: "Lỗi kết nối server rồi ạ! 😢" }]);
// // //     } finally {
// // //       setIsTyping(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
// // //       {/* Cửa sổ Chat */}
// // //       {isOpen && (
// // //         <div className="bg-white w-80 sm:w-96 h-[450px] rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden mb-4 animate-fade-in-up">
// // //           <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex justify-between items-center shadow-md">
// // //             <div className="flex items-center gap-2">
// // //               <Bot size={24} />
// // //               <div>
// // //                 <h3 className="font-bold text-sm">Trợ lý Dinh Dưỡng AI</h3>
// // //                 {currentGlucose > 0 && <p className="text-[10px] text-indigo-100 bg-white/20 px-2 py-0.5 rounded-full inline-block">Đang xem xét mức: {currentGlucose}</p>}
// // //               </div>
// // //             </div>
// // //             <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition"><X size={18} /></button>
// // //           </div>

// // //           <div className="flex-1 p-3 overflow-y-auto bg-slate-50 space-y-3">
// // //             {messages.map((msg, i) => (
// // //               <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
// // //                 <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === "user" ? "bg-indigo-600 text-white rounded-br-none" : "bg-white border text-gray-700 rounded-bl-none shadow-sm"}`}>
// // //                   {msg.text}
// // //                 </div>
// // //               </div>
// // //             ))}
// // //             {isTyping && (
// // //                <div className="flex justify-start">
// // //                  <div className="bg-gray-200 p-3 rounded-2xl rounded-bl-none text-xs text-gray-500 italic flex items-center gap-1">
// // //                    AI đang nhập <span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span>
// // //                  </div>
// // //                </div>
// // //             )}
// // //             <div ref={messagesEndRef} />
// // //           </div>

// // //           <div className="p-3 bg-white border-t flex gap-2">
// // //             <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()}
// // //               placeholder="Hỏi về món ăn..." className="flex-1 p-2 bg-gray-100 rounded-lg outline-none text-sm focus:ring-1 focus:ring-indigo-500" />
// // //             <button onClick={handleSend} disabled={isTyping} className="bg-indigo-600 text-white p-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
// // //               <Send size={18} />
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Nút Mở Chat */}
// // //       <button onClick={() => setIsOpen(!isOpen)} 
// // //         className={`${isOpen ? 'rotate-90 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'} transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 group`}>
// // //         <MessageCircle size={28} />
// // //         <span className="font-bold pr-1 max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap">Hỏi Bác sĩ</span>
// // //       </button>
// // //     </div>
// // //   );
// // // }

// // import { useState, useEffect, useRef } from "react";
// // import {
// //   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend, LabelList
// // } from "recharts";
// // import { MessageCircle, X, Send, Bot, TrendingUp } from "lucide-react";
// // import ReactMarkdown from "react-markdown";
// // import remarkGfm from "remark-gfm";

// // export default function GlucoseHealth() {
// //   // --- STATE ---
// //   const [history, setHistory] = useState([]); // Dữ liệu gốc từ DB
// //   const [chartData, setChartData] = useState([]); // Dữ liệu để vẽ (Gồm cả dự báo)
  
// //   const [inputData, setInputData] = useState({ value: "", type: "fasting", note: "" });
// //   const [analysisResult, setAnalysisResult] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [loadingPred, setLoadingPred] = useState(false); // Loading cho nút dự báo

// //   // --- LOGIC 1: ĐÁNH GIÁ (Giữ nguyên) ---
// //   const analyzeGlucose = (val, type) => {
// //     const value = parseInt(val);
// //     if (!value) return null;
// //     let result = { status: "", msg: "", color: "" };
// //     if (type === "fasting") {
// //       if (value < 70) result = { status: "HẠ ĐƯỜNG HUYẾT", msg: "Cần nạp đường ngay!", color: "bg-red-100 text-red-700" };
// //       else if (value <= 130) result = { status: "AN TOÀN", msg: "Ổn định.", color: "bg-green-100 text-green-700" };
// //       else result = { status: "CAO", msg: "Cảnh báo cao.", color: "bg-orange-100 text-orange-700" };
// //     } else {
// //       if (value < 140) result = { status: "TỐT", msg: "Dung nạp tốt.", color: "bg-green-100 text-green-700" };
// //       else if (value <= 180) result = { status: "CHẤP NHẬN", msg: "Hạn chế tinh bột.", color: "bg-yellow-100 text-yellow-700" };
// //       else result = { status: "NGUY HIỂM", msg: "Quá cao sau ăn.", color: "bg-red-100 text-red-700" };
// //     }
// //     return result;
// //   };

// //   // --- LOGIC 2: TẢI DỮ LIỆU ---
// //   const fetchHistory = async () => {
// //     try {
// //       const res = await fetch("http://127.0.0.1:8000/api/glucose/history");
// //       const data = await res.json();
      
// //       // Sắp xếp dữ liệu cũ -> mới để vẽ biểu đồ cho đúng chiều thời gian
// //       const sortedHistory = data.data; 
      
// //       setHistory(sortedHistory);
// //       setChartData(sortedHistory); // Ban đầu biểu đồ chỉ hiện lịch sử
// //     } catch (error) { console.error("Lỗi:", error); }
// //   };

// //   useEffect(() => { fetchHistory(); }, []);

// //   // --- LOGIC 3: LƯU KẾT QUẢ ---
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!inputData.value) return;
// //     const result = analyzeGlucose(inputData.value, inputData.type);
// //     setAnalysisResult(result);
// //     setLoading(true);
// //     try {
// //       await fetch("http://127.0.0.1:8000/api/glucose/add", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           value: parseInt(inputData.value),
// //           measure_type: inputData.type,
// //           note: inputData.note,
// //           created_at: new Date().toLocaleString("vi-VN")
// //         }),
// //       });
// //       await fetchHistory(); 
// //       setInputData({ ...inputData, value: "", note: "" }); 
// //     } catch (error) { alert("Lỗi lưu!"); } 
// //     finally { setLoading(false); }
// //   };

// //   // --- LOGIC 4: DỰ BÁO VÀ VẼ LÊN BIỂU ĐỒ ---
// //   const handlePredict = async () => {
// //     setLoadingPred(true);
// //     try {
// //       const res = await fetch("http://127.0.0.1:8000/api/predict/glucose", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ measure_type: "fasting" }), 
// //       });
// //       const data = await res.json();

// //       if (data.can_predict) {
// //         // Lấy điểm dữ liệu cuối cùng trong lịch sử
// //         const lastPoint = history[history.length - 1];

// //         // Tạo điểm nối (Bridge) để đường vẽ liền mạch
// //         // Điểm này có cả 'value' (thật) và 'forecast' (bắt đầu dự báo)
// //         const bridgePoint = {
// //             ...lastPoint,
// //             forecast: lastPoint.value // Bắt đầu đường dự báo từ điểm thật cuối cùng
// //         };

// //         // Tạo điểm dự báo cho ngày mai
// //         const forecastPoint = {
// //             created_at: "Ngày mai (Dự báo)",
// //             forecast: data.predicted_value, // Chỉ có giá trị dự báo, không có giá trị thật
// //             isPrediction: true // Cờ để nhận biết
// //         };

// //         // Cập nhật dữ liệu biểu đồ: Lịch sử (trừ điểm cuối) + Điểm nối + Điểm dự báo
// //         const newChartData = [...history.slice(0, -1), bridgePoint, forecastPoint];
// //         setChartData(newChartData);

// //         alert(data.message); // Thông báo kết quả
// //       } else {
// //         alert(data.message);
// //       }
// //     } catch (error) {
// //       console.error("Lỗi dự báo:", error);
// //     } finally {
// //       setLoadingPred(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6 font-sans relative">
// //       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 flex justify-between items-center">
// //         <h1 className="text-2xl font-bold text-gray-800">🩸 Sổ Tay Đường Huyết Thông Minh</h1>
// //         <button 
// //             onClick={handlePredict}
// //             disabled={loadingPred}
// //             className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold shadow-md hover:scale-105 transition"
// //         >
// //             {loadingPred ? "Đang tính..." : <><TrendingUp size={18}/> Dự Báo Ngày Mai</>}
// //         </button>
// //       </div>

// //       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pb-24">
        
// //         {/* CỘT TRÁI: NHẬP LIỆU (Giữ nguyên) */}
// //         <div className="md:col-span-1 space-y-6">
// //           <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-50">
// //             <h2 className="text-lg font-bold text-indigo-900 mb-4">📝 Nhập kết quả mới</h2>
// //             <form onSubmit={handleSubmit} className="space-y-4">
// //               <div>
// //                 <div className="grid grid-cols-2 gap-3 mb-2">
// //                   <button type="button" onClick={() => setInputData({...inputData, type: 'fasting'})}
// //                     className={`p-2 rounded-lg border text-xs font-bold ${inputData.type === 'fasting' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>🌙 Lúc đói</button>
// //                   <button type="button" onClick={() => setInputData({...inputData, type: 'after_meal'})}
// //                     className={`p-2 rounded-lg border text-xs font-bold ${inputData.type === 'after_meal' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-500'}`}>🍜 Sau ăn 2h</button>
// //                 </div>
// //                 <input type="number" value={inputData.value} onChange={(e) => setInputData({...inputData, value: e.target.value})}
// //                     className="w-full p-3 text-2xl font-bold text-center border-2 rounded-xl focus:border-indigo-500 outline-none" placeholder="---" required />
// //               </div>
// //               <button type="submit" disabled={loading} className="w-full bg-indigo-900 text-white py-3 rounded-xl font-bold shadow-lg">
// //                 {loading ? "..." : "LƯU KẾT QUẢ"}
// //               </button>
// //             </form>
// //           </div>
// //           {analysisResult && (
// //             <div className={`p-4 rounded-xl border-l-4 ${analysisResult.color}`}>
// //               <div className="font-bold">{analysisResult.status}</div>
// //               <div className="text-sm">{analysisResult.msg}</div>
// //             </div>
// //           )}
// //         </div>

// //         {/* CỘT PHẢI: BIỂU ĐỒ (ĐÃ NÂNG CẤP) */}
// //         <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col h-[500px]">
// //           <h2 className="text-lg font-bold text-gray-800 mb-4 flex justify-between">
// //             📈 Xu hướng & Dự báo
// //             <div className="flex gap-4 text-xs font-normal">
// //                 <span className="flex items-center gap-1"><span className="w-3 h-3 bg-indigo-600 rounded-full"></span> Thực tế</span>
// //                 <span className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-500 rounded-full"></span> Dự báo</span>
// //             </div>
// //           </h2>
          
// //           <div className="flex-1">
// //             <ResponsiveContainer width="100%" height="100%">
// //               <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
// //                 <CartesianGrid stroke="#f5f5f5" vertical={false} />
// //                 <XAxis dataKey="created_at" tick={{fontSize: 10}} tickFormatter={(tick) => tick.includes("Dự báo") ? "Ngày mai" : tick.split(" ")[0]} />
// //                 <YAxis domain={[0, 'auto']} />
// //                 <Tooltip />
// //                 <Legend />
// //                 <ReferenceLine y={130} stroke="green" strokeDasharray="3 3" label={{ value: 'Ngưỡng an toàn', position: 'insideTopRight', fill: 'green', fontSize: 10 }} />
                
// //                 {/* ĐƯỜNG 1: DỮ LIỆU THỰC TẾ (Nét liền màu xanh) */}
// //                 <Line 
// //                     type="monotone" 
// //                     dataKey="value" 
// //                     name="Thực tế"
// //                     stroke="#4f46e5" 
// //                     strokeWidth={3} 
// //                     dot={{ r: 4, fill: "#4f46e5", strokeWidth: 2, stroke: "#fff" }}
// //                     connectNulls={false} // Không nối nếu không có dữ liệu
// //                 />

// //                 {/* ĐƯỜNG 2: DỮ LIỆU DỰ BÁO (Nét đứt màu cam) */}
// //                 <Line 
// //                     type="monotone" 
// //                     dataKey="forecast" 
// //                     name="AI Dự báo"
// //                     stroke="#f97316" 
// //                     strokeWidth={3} 
// //                     strokeDasharray="5 5" // Tạo nét đứt
// //                     dot={{ r: 5, fill: "#f97316", stroke: "#fff", strokeWidth: 2 }}
// //                     activeDot={{ r: 8 }}
// //                 >
// //                     <LabelList dataKey="forecast" position="top" offset={10} fill="#f97316" fontSize={12} formatter={(val) => val ? `${val}` : ""} />
// //                 </Line>

// //               </LineChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>
// //       </div>

// //       <AIChatWidget currentGlucose={parseInt(inputData.value)} measureType={inputData.type} />
// //     </div>
// //   );
// // }

// // // ... (Giữ nguyên phần AIChatWidget ở cuối file như cũ)
// // // Nhớ copy lại phần AIChatWidget từ câu trả lời trước dán vào đây nha bé!
// // function AIChatWidget({ currentGlucose, measureType }) {
// //     const [isOpen, setIsOpen] = useState(false);
// //     const [messages, setMessages] = useState([
// //       { sender: "bot", text: "Xin chào! Mình là trợ lý AI. Bạn cần tư vấn thực đơn không? 🥗" }
// //     ]);
// //     const [input, setInput] = useState("");
// //     const [isTyping, setIsTyping] = useState(false);
// //     const messagesEndRef = useRef(null);
  
// //     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);
  
// //     const handleSend = async () => {
// //       if (!input.trim()) return;
// //       const userMsg = input;
// //       setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
// //       setInput("");
// //       setIsTyping(true);
  
// //       try {
// //         const res = await fetch("http://127.0.0.1:8000/api/chat/advice", {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({
// //             question: userMsg,
// //             glucose_value: currentGlucose || 0,
// //             measure_type: measureType || "fasting"
// //           }),
// //         });
// //         const data = await res.json();
// //         setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
// //       } catch (error) {
// //         setMessages(prev => [...prev, { sender: "bot", text: "Lỗi kết nối server rồi ạ! 😢" }]);
// //       } finally {
// //         setIsTyping(false);
// //       }
// //     };
  
// //     return (
// //       <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
// //         {/* Cửa sổ Chat */}
// //         {isOpen && (
// //           <div className="bg-white w-80 sm:w-96 h-[450px] rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden mb-4 animate-fade-in-up">
// //             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex justify-between items-center shadow-md">
// //               <div className="flex items-center gap-2">
// //                 <Bot size={24} />
// //                 <div>
// //                   <h3 className="font-bold text-sm">Trợ lý Dinh Dưỡng AI</h3>
// //                   {currentGlucose > 0 && <p className="text-[10px] text-indigo-100 bg-white/20 px-2 py-0.5 rounded-full inline-block">Đang xem xét mức: {currentGlucose}</p>}
// //                 </div>
// //               </div>
// //               <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition"><X size={18} /></button>
// //             </div>
  
// //             {/* KHUNG CHAT */}
// //             <div className="flex-1 p-3 overflow-y-auto bg-slate-50 space-y-3">
// //               {messages.map((msg, i) => (
// //                 <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
// //                   <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === "user" ? "bg-indigo-600 text-white rounded-br-none" : "bg-white border text-gray-700 rounded-bl-none shadow-sm"}`}>
                    
// //                     {/* 👇👇👇 PHẦN QUAN TRỌNG: Render Markdown */}
// //                     {msg.sender === "user" ? (
// //                       msg.text
// //                     ) : (
// //                       <ReactMarkdown 
// //                           remarkPlugins={[remarkGfm]}
// //                           components={{
// //                               ul: ({node, ...props}) => <ul className="list-disc ml-4 space-y-1 my-2" {...props} />,
// //                               ol: ({node, ...props}) => <ol className="list-decimal ml-4 space-y-1 my-2" {...props} />,
// //                               li: ({node, ...props}) => <li className="pl-1" {...props} />,
// //                               p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
// //                               strong: ({node, ...props}) => <strong className="font-bold text-indigo-700" {...props} />,
// //                           }}
// //                       >
// //                           {msg.text}
// //                       </ReactMarkdown>
// //                     )}
// //                     {/* 👆👆👆 Kết thúc phần Markdown */}
  
// //                   </div>
// //                 </div>
// //               ))}
// //               {isTyping && (
// //                  <div className="flex justify-start">
// //                    <div className="bg-gray-200 p-3 rounded-2xl rounded-bl-none text-xs text-gray-500 italic flex items-center gap-1">
// //                      AI đang nhập <span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span>
// //                    </div>
// //                  </div>
// //               )}
// //               <div ref={messagesEndRef} />
// //             </div>
  
// //             {/* Ô Nhập tin nhắn */}
// //             <div className="p-3 bg-white border-t flex gap-2">
// //               <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()}
// //                 placeholder="Hỏi về món ăn..." className="flex-1 p-2 bg-gray-100 rounded-lg outline-none text-sm focus:ring-1 focus:ring-indigo-500" />
// //               <button onClick={handleSend} disabled={isTyping} className="bg-indigo-600 text-white p-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
// //                 <Send size={18} />
// //               </button>
// //             </div>
// //           </div>
// //         )}
  
// //         {/* Nút Mở Chat */}
// //         <button onClick={() => setIsOpen(!isOpen)} 
// //           className={`${isOpen ? 'rotate-90 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'} transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 group`}>
// //           <MessageCircle size={28} />
// //           <span className="font-bold pr-1 max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap">Hỏi Bác sĩ</span>
// //         </button>
// //       </div>
// //     );
// //   }
// // ==============================================================================================================================
// //PREDICT CHO 1 NGÀY
// // import { useState, useEffect, useRef } from "react";
// // import {
// //   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend, LabelList
// // } from "recharts";
// // import { MessageCircle, X, Send, Bot, TrendingUp, Sparkles } from "lucide-react"; // Đã thêm icon Sparkles
// // import ReactMarkdown from "react-markdown";
// // import remarkGfm from "remark-gfm";

// // export default function GlucoseHealth() {
// //   // --- STATE ---
// //   const [history, setHistory] = useState([]);
// //   const [chartData, setChartData] = useState([]);
  
// //   const [inputData, setInputData] = useState({ value: "", type: "fasting", note: "" });
// //   const [analysisResult, setAnalysisResult] = useState(null);
// //   const [loading, setLoading] = useState(false);
  
// //   // State cho Dự Báo
// //   const [loadingPred, setLoadingPred] = useState(false);
// //   const [predictionMsg, setPredictionMsg] = useState(null); // ✨ STATE MỚI: Lưu kết quả dự báo

// //   // --- LOGIC 1: ĐÁNH GIÁ ---
// //   const analyzeGlucose = (val, type) => {
// //     const value = parseInt(val);
// //     if (!value) return null;
// //     let result = { status: "", msg: "", color: "" };
// //     if (type === "fasting") {
// //       if (value < 70) result = { status: "HẠ ĐƯỜNG HUYẾT", msg: "Cần nạp đường ngay!", color: "bg-red-100 text-red-700" };
// //       else if (value <= 130) result = { status: "AN TOÀN", msg: "Ổn định.", color: "bg-green-100 text-green-700" };
// //       else result = { status: "CAO", msg: "Cảnh báo cao.", color: "bg-orange-100 text-orange-700" };
// //     } else {
// //       if (value < 140) result = { status: "TỐT", msg: "Dung nạp tốt.", color: "bg-green-100 text-green-700" };
// //       else if (value <= 180) result = { status: "CHẤP NHẬN", msg: "Hạn chế tinh bột.", color: "bg-yellow-100 text-yellow-700" };
// //       else result = { status: "NGUY HIỂM", msg: "Quá cao sau ăn.", color: "bg-red-100 text-red-700" };
// //     }
// //     return result;
// //   };

// //   // --- LOGIC 2: TẢI DỮ LIỆU ---
// //   const fetchHistory = async () => {
// //     try {
// //       const res = await fetch("http://127.0.0.1:8000/api/glucose/history");
// //       const data = await res.json();
// //       const sortedHistory = data.data; // Giữ nguyên thứ tự từ API (Cũ -> Mới)
// //       setHistory(sortedHistory);
// //       setChartData(sortedHistory);
// //     } catch (error) { console.error("Lỗi:", error); }
// //   };

// //   useEffect(() => { fetchHistory(); }, []);

// //   // --- LOGIC 3: LƯU KẾT QUẢ ---
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!inputData.value) return;
// //     const result = analyzeGlucose(inputData.value, inputData.type);
// //     setAnalysisResult(result);
// //     setLoading(true);
// //     try {
// //       await fetch("http://127.0.0.1:8000/api/glucose/add", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           value: parseInt(inputData.value),
// //           measure_type: inputData.type,
// //           note: inputData.note,
// //           created_at: new Date().toLocaleString("vi-VN")
// //         }),
// //       });
// //       await fetchHistory(); 
// //       setInputData({ ...inputData, value: "", note: "" }); 
// //     } catch (error) { alert("Lỗi lưu!"); } 
// //     finally { setLoading(false); }
// //   };

// //   // --- LOGIC 4: DỰ BÁO (ĐÃ SỬA: KHÔNG DÙNG ALERT) ---
// //   const handlePredict = async () => {
// //     setLoadingPred(true);
// //     setPredictionMsg(null); // Reset thông báo cũ
// //     try {
// //       const res = await fetch("http://127.0.0.1:8000/api/predict/glucose", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ measure_type: "fasting" }), 
// //       });
// //       const data = await res.json();

// //       if (data.can_predict) {
// //         // Xử lý vẽ biểu đồ
// //         const lastPoint = history[history.length - 1];
// //         const bridgePoint = { ...lastPoint, forecast: lastPoint.value };
// //         const forecastPoint = {
// //             created_at: "Ngày mai (Dự báo)",
// //             forecast: data.predicted_value,
// //             isPrediction: true
// //         };
// //         const newChartData = [...history.slice(0, -1), bridgePoint, forecastPoint];
// //         setChartData(newChartData);

// //         // ✨ HIỂN THỊ KẾT QUẢ RA UI
// //         setPredictionMsg({ type: 'success', text: data.message });
// //       } else {
// //         // ✨ HIỂN THỊ LỖI RA UI
// //         setPredictionMsg({ type: 'error', text: data.message });
// //       }
// //     } catch (error) {
// //       console.error("Lỗi dự báo:", error);
// //     } finally {
// //       setLoadingPred(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6 font-sans relative">
      
// //       {/* --- HEADER & DỰ BÁO --- */}
// //       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
// //         <div>
// //            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
// //              🩸 Sổ Tay Đường Huyết Thông Minh
// //            </h1>
           
// //            {/* ✨ KHU VỰC HIỂN THỊ KẾT QUẢ DỰ BÁO ✨ */}
// //            {predictionMsg && (
// //              <div className={`mt-3 text-sm px-4 py-3 rounded-xl border flex items-center gap-3 animate-fade-in-up ${
// //                 predictionMsg.type === 'success' 
// //                 ? 'bg-orange-50 text-orange-800 border-orange-200' 
// //                 : 'bg-red-50 text-red-600 border-red-200'
// //              }`}>
// //                 {predictionMsg.type === 'success' ? <Sparkles size={18} className="text-orange-500" /> : <X size={18} />}
// //                 <span className="font-medium">{predictionMsg.text}</span>
// //              </div>
// //            )}
// //         </div>

// //         <button 
// //             onClick={handlePredict}
// //             disabled={loadingPred}
// //             className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:scale-105 transition active:scale-95 whitespace-nowrap"
// //         >
// //             {loadingPred ? "Đang tính toán..." : <><TrendingUp size={20}/> Dự Báo Ngày Mai</>}
// //         </button>
// //       </div>

// //       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pb-24">
        
// //         {/* CỘT TRÁI: NHẬP LIỆU */}
// //         <div className="md:col-span-1 space-y-6">
// //           <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-50">
// //             <h2 className="text-lg font-bold text-indigo-900 mb-4">📝 Nhập kết quả mới</h2>
// //             <form onSubmit={handleSubmit} className="space-y-4">
// //               <div>
// //                 <div className="grid grid-cols-2 gap-3 mb-2">
// //                   <button type="button" onClick={() => setInputData({...inputData, type: 'fasting'})}
// //                     className={`p-2 rounded-lg border text-xs font-bold ${inputData.type === 'fasting' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>🌙 Lúc đói</button>
// //                   <button type="button" onClick={() => setInputData({...inputData, type: 'after_meal'})}
// //                     className={`p-2 rounded-lg border text-xs font-bold ${inputData.type === 'after_meal' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-500'}`}>🍜 Sau ăn 2h</button>
// //                 </div>
// //                 <input type="number" value={inputData.value} onChange={(e) => setInputData({...inputData, value: e.target.value})}
// //                     className="w-full p-3 text-2xl font-bold text-center border-2 rounded-xl focus:border-indigo-500 outline-none" placeholder="---" required />
// //               </div>
// //               <button type="submit" disabled={loading} className="w-full bg-indigo-900 text-white py-3 rounded-xl font-bold shadow-lg">
// //                 {loading ? "..." : "LƯU KẾT QUẢ"}
// //               </button>
// //             </form>
// //           </div>
// //           {analysisResult && (
// //             <div className={`p-4 rounded-xl border-l-4 ${analysisResult.color}`}>
// //               <div className="font-bold">{analysisResult.status}</div>
// //               <div className="text-sm">{analysisResult.msg}</div>
// //             </div>
// //           )}
// //         </div>

// //         {/* CỘT PHẢI: BIỂU ĐỒ */}
// //         <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col h-[500px]">
// //           <h2 className="text-lg font-bold text-gray-800 mb-4 flex justify-between">
// //             📈 Xu hướng & Dự báo
// //             <div className="flex gap-4 text-xs font-normal">
// //                 <span className="flex items-center gap-1"><span className="w-3 h-3 bg-indigo-600 rounded-full"></span> Thực tế</span>
// //                 <span className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-500 rounded-full"></span> Dự báo</span>
// //             </div>
// //           </h2>
          
// //           <div className="flex-1">
// //             <ResponsiveContainer width="100%" height="100%">
// //               <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
// //                 <CartesianGrid stroke="#f5f5f5" vertical={false} />
// //                 <XAxis dataKey="created_at" tick={{fontSize: 10}} tickFormatter={(tick) => tick.includes("Dự báo") ? "Ngày mai" : tick.split(" ")[0]} />
// //                 <YAxis domain={[0, 'auto']} />
// //                 <Tooltip />
// //                 <Legend />
// //                 <ReferenceLine y={130} stroke="green" strokeDasharray="3 3" label={{ value: 'Ngưỡng an toàn', position: 'insideTopRight', fill: 'green', fontSize: 10 }} />
                
// //                 {/* Đường Thực tế */}
// //                 <Line type="monotone" dataKey="value" name="Thực tế" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: "#4f46e5", strokeWidth: 2, stroke: "#fff" }} connectNulls={false} />

// //                 {/* Đường Dự báo */}
// //                 <Line type="monotone" dataKey="forecast" name="AI Dự báo" stroke="#f97316" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 5, fill: "#f97316", stroke: "#fff", strokeWidth: 2 }} activeDot={{ r: 8 }}>
// //                     <LabelList dataKey="forecast" position="top" offset={10} fill="#f97316" fontSize={12} formatter={(val) => val ? `${val}` : ""} />
// //                 </Line>
// //               </LineChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>
// //       </div>

// //       <AIChatWidget currentGlucose={parseInt(inputData.value)} measureType={inputData.type} />
// //     </div>
// //   );
// // }

// // // ... (Giữ nguyên phần AIChatWidget ở cuối file)
// // function AIChatWidget({ currentGlucose, measureType }) {
// //     const [isOpen, setIsOpen] = useState(false);
// //     const [messages, setMessages] = useState([
// //       { sender: "bot", text: "Xin chào! Mình là trợ lý AI. Bạn cần tư vấn thực đơn không? 🥗" }
// //     ]);
// //     const [input, setInput] = useState("");
// //     const [isTyping, setIsTyping] = useState(false);
// //     const messagesEndRef = useRef(null);
  
// //     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);
  
// //     const handleSend = async () => {
// //       if (!input.trim()) return;
// //       const userMsg = input;
// //       setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
// //       setInput("");
// //       setIsTyping(true);
  
// //       try {
// //         const res = await fetch("http://127.0.0.1:8000/api/chat/advice", {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({
// //             question: userMsg,
// //             glucose_value: currentGlucose || 0,
// //             measure_type: measureType || "fasting"
// //           }),
// //         });
// //         const data = await res.json();
// //         setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
// //       } catch (error) {
// //         setMessages(prev => [...prev, { sender: "bot", text: "Lỗi kết nối server rồi ạ! 😢" }]);
// //       } finally {
// //         setIsTyping(false);
// //       }
// //     };
  
// //     return (
// //       <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
// //         {isOpen && (
// //           <div className="bg-white w-80 sm:w-96 h-[450px] rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden mb-4 animate-fade-in-up">
// //             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex justify-between items-center shadow-md">
// //               <div className="flex items-center gap-2">
// //                 <Bot size={24} />
// //                 <div>
// //                   <h3 className="font-bold text-sm">Trợ lý Dinh Dưỡng AI</h3>
// //                   {currentGlucose > 0 && <p className="text-[10px] text-indigo-100 bg-white/20 px-2 py-0.5 rounded-full inline-block">Đang xem xét mức: {currentGlucose}</p>}
// //                 </div>
// //               </div>
// //               <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition"><X size={18} /></button>
// //             </div>
  
// //             <div className="flex-1 p-3 overflow-y-auto bg-slate-50 space-y-3">
// //               {messages.map((msg, i) => (
// //                 <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
// //                   <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === "user" ? "bg-indigo-600 text-white rounded-br-none" : "bg-white border text-gray-700 rounded-bl-none shadow-sm"}`}>
// //                     {msg.sender === "user" ? (
// //                       msg.text
// //                     ) : (
// //                       <ReactMarkdown 
// //                           remarkPlugins={[remarkGfm]}
// //                           components={{
// //                               ul: ({node, ...props}) => <ul className="list-disc ml-4 space-y-1 my-2" {...props} />,
// //                               ol: ({node, ...props}) => <ol className="list-decimal ml-4 space-y-1 my-2" {...props} />,
// //                               li: ({node, ...props}) => <li className="pl-1" {...props} />,
// //                               p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
// //                               strong: ({node, ...props}) => <strong className="font-bold text-indigo-700" {...props} />,
// //                           }}
// //                       >
// //                           {msg.text}
// //                       </ReactMarkdown>
// //                     )}
// //                   </div>
// //                 </div>
// //               ))}
// //               {isTyping && (
// //                  <div className="flex justify-start">
// //                    <div className="bg-gray-200 p-3 rounded-2xl rounded-bl-none text-xs text-gray-500 italic flex items-center gap-1">
// //                      AI đang nhập <span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span>
// //                    </div>
// //                  </div>
// //               )}
// //               <div ref={messagesEndRef} />
// //             </div>
  
// //             <div className="p-3 bg-white border-t flex gap-2">
// //               <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()}
// //                 placeholder="Hỏi về món ăn..." className="flex-1 p-2 bg-gray-100 rounded-lg outline-none text-sm focus:ring-1 focus:ring-indigo-500" />
// //               <button onClick={handleSend} disabled={isTyping} className="bg-indigo-600 text-white p-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
// //                 <Send size={18} />
// //               </button>
// //             </div>
// //           </div>
// //         )}
  
// //         <button onClick={() => setIsOpen(!isOpen)} 
// //           className={`${isOpen ? 'rotate-90 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'} transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 group`}>
// //           <MessageCircle size={28} />
// //           <span className="font-bold pr-1 max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap">Hỏi Bác sĩ</span>
// //         </button>
// //       </div>
// //     );
// // }
// //===============================================================================================================================
// // import { useState, useEffect, useRef } from "react";
// // import {
// //   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend, LabelList
// // } from "recharts";
// // import { MessageCircle, X, Send, Bot, TrendingUp, Sparkles, Activity } from "lucide-react";
// // import ReactMarkdown from "react-markdown";
// // import remarkGfm from "remark-gfm";

// // export default function GlucoseHealth() {
// //   // --- STATE ---
// //   const [history, setHistory] = useState([]);
// //   const [chartData, setChartData] = useState([]);
  
// //   const [inputData, setInputData] = useState({ value: "", type: "fasting", note: "" });
// //   const [analysisResult, setAnalysisResult] = useState(null);
// //   const [loading, setLoading] = useState(false);
  
// //   // State cho Dự Báo
// //   const [loadingPred, setLoadingPred] = useState(false);
// //   const [predictionMsg, setPredictionMsg] = useState(null);

// //   // --- LOGIC 1: ĐÁNH GIÁ ---
// //   const analyzeGlucose = (val, type) => {
// //     const value = parseInt(val);
// //     if (!value) return null;
// //     let result = { status: "", msg: "", color: "" };
// //     if (type === "fasting") {
// //       if (value < 70) result = { status: "HẠ ĐƯỜNG HUYẾT", msg: "Cần nạp đường ngay!", color: "bg-red-100 text-red-700" };
// //       else if (value <= 130) result = { status: "AN TOÀN", msg: "Ổn định.", color: "bg-green-100 text-green-700" };
// //       else result = { status: "CAO", msg: "Cảnh báo cao.", color: "bg-orange-100 text-orange-700" };
// //     } else {
// //       if (value < 140) result = { status: "TỐT", msg: "Dung nạp tốt.", color: "bg-green-100 text-green-700" };
// //       else if (value <= 180) result = { status: "CHẤP NHẬN", msg: "Hạn chế tinh bột.", color: "bg-yellow-100 text-yellow-700" };
// //       else result = { status: "NGUY HIỂM", msg: "Quá cao sau ăn.", color: "bg-red-100 text-red-700" };
// //     }
// //     return result;
// //   };

// //   // --- LOGIC 2: TẢI DỮ LIỆU ---
// //   const fetchHistory = async () => {
// //     try {
// //       const res = await fetch("http://127.0.0.1:8000/api/glucose/history");
// //       const data = await res.json();
// //       // Format lại ngày tháng hiển thị cho gọn
// //       const formattedData = data.data.map(item => ({
// //         ...item,
// //         displayDate: item.created_at.split(" ")[0] // Lấy phần ngày YYYY-MM-DD
// //       }));
// //       setHistory(formattedData);
// //       setChartData(formattedData);
// //     } catch (error) { console.error("Lỗi:", error); }
// //   };

// //   useEffect(() => { fetchHistory(); }, []);

// //   // --- LOGIC 3: LƯU KẾT QUẢ ---
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!inputData.value) return;
// //     const result = analyzeGlucose(inputData.value, inputData.type);
// //     setAnalysisResult(result);
// //     setLoading(true);
// //     try {
// //       await fetch("http://127.0.0.1:8000/api/glucose/add", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           value: parseInt(inputData.value),
// //           measure_type: inputData.type,
// //           note: inputData.note,
// //           created_at: new Date().toISOString().replace('T', ' ').substring(0, 19) // Format YYYY-MM-DD HH:MM:SS
// //         }),
// //       });
// //       await fetchHistory(); 
// //       setInputData({ ...inputData, value: "", note: "" }); 
// //     } catch (error) { alert("Lỗi lưu!"); } 
// //     finally { setLoading(false); }
// //   };

// //   // --- LOGIC 4: DỰ BÁO 7 NGÀY (CẬP NHẬT MỚI) ---
// //   const handlePredict = async () => {
// //     setLoadingPred(true);
// //     setPredictionMsg(null);
// //     try {
// //       const res = await fetch("http://127.0.0.1:8000/api/predict/glucose", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ measure_type: "fasting" }), 
// //       });
// //       const data = await res.json();

// //       if (data.can_predict) {
// //         // 1. Lấy điểm cuối cùng của lịch sử thật
// //         const lastPoint = history[history.length - 1];
        
// //         // 2. Tạo điểm cầu nối (Bridge) để đường vẽ liền mạch từ Tím -> Cam
// //         const bridgePoint = { ...lastPoint, forecast: lastPoint.value, displayDate: lastPoint.displayDate };

// //         // 3. Map dữ liệu dự báo 7 ngày từ API
// //         const forecastPoints = data.predictions.map(item => ({
// //             displayDate: item.date, // VD: 05/12
// //             forecast: item.value,
// //             isPrediction: true
// //         }));

// //         // 4. Gộp mảng: Lịch sử (bỏ phần tử cuối để tránh trùng) + Cầu nối + Dự báo
// //         const newChartData = [...history.slice(0, -1), bridgePoint, ...forecastPoints];
        
// //         setChartData(newChartData);
// //         setPredictionMsg({ type: 'success', text: data.message });
// //       } else {
// //         setPredictionMsg({ type: 'error', text: data.message });
// //       }
// //     } catch (error) {
// //       console.error("Lỗi dự báo:", error);
// //       setPredictionMsg({ type: 'error', text: "Không thể kết nối Server AI." });
// //     } finally {
// //       setLoadingPred(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-sans relative">
      
// //       {/* HEADER & BUTTON DỰ BÁO */}
// //       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
// //         <div>
// //            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
// //              🩸 Sổ Tay Đường Huyết
// //            </h1>
// //            {predictionMsg && (
// //              <div className={`mt-3 text-sm px-4 py-2 rounded-lg border flex items-center gap-2 animate-pulse ${
// //                 predictionMsg.type === 'success' ? 'bg-orange-50 text-orange-800 border-orange-200' : 'bg-red-50 text-red-600 border-red-200'
// //              }`}>
// //                 {predictionMsg.type === 'success' ? <Sparkles size={16}/> : <X size={16}/>}
// //                 <span className="font-medium">{predictionMsg.text}</span>
// //              </div>
// //            )}
// //         </div>

// //         <button 
// //             onClick={handlePredict}
// //             disabled={loadingPred}
// //             className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:scale-105 transition active:scale-95 disabled:opacity-50"
// //         >
// //             {loadingPred ? "AI đang tính..." : <><TrendingUp size={20}/> Dự Báo 7 Ngày Tới</>}
// //         </button>
// //       </div>

// //       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pb-24">
        
// //         {/* FORM NHẬP LIỆU */}
// //         <div className="md:col-span-1 space-y-6">
// //           <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-50">
// //             <h2 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2"><Activity size={20}/> Nhập chỉ số mới</h2>
// //             <form onSubmit={handleSubmit} className="space-y-4">
// //               <div>
// //                 <div className="grid grid-cols-2 gap-3 mb-2">
// //                   <button type="button" onClick={() => setInputData({...inputData, type: 'fasting'})}
// //                     className={`p-2 rounded-lg border text-xs font-bold transition ${inputData.type === 'fasting' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>🌙 Lúc đói</button>
// //                   <button type="button" onClick={() => setInputData({...inputData, type: 'after_meal'})}
// //                     className={`p-2 rounded-lg border text-xs font-bold transition ${inputData.type === 'after_meal' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>🍜 Sau ăn 2h</button>
// //                 </div>
// //                 <input type="number" value={inputData.value} onChange={(e) => setInputData({...inputData, value: e.target.value})}
// //                     className="w-full p-3 text-3xl font-bold text-center border-2 rounded-xl focus:border-indigo-500 outline-none text-gray-700" placeholder="---" required />
// //               </div>
// //               <button type="submit" disabled={loading} className="w-full bg-indigo-900 hover:bg-indigo-800 text-white py-3 rounded-xl font-bold shadow-lg transition">
// //                 {loading ? "Đang lưu..." : "LƯU KẾT QUẢ"}
// //               </button>
// //             </form>
// //           </div>
// //           {analysisResult && (
// //             <div className={`p-4 rounded-xl border-l-4 shadow-sm ${analysisResult.color}`}>
// //               <div className="font-bold text-lg">{analysisResult.status}</div>
// //               <div className="text-sm opacity-90">{analysisResult.msg}</div>
// //             </div>
// //           )}
// //         </div>

// //         {/* BIỂU ĐỒ */}
// //         <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col h-[500px]">
// //           <h2 className="text-lg font-bold text-gray-800 mb-4 flex justify-between items-center">
// //             📈 Biểu đồ theo dõi
// //             <div className="flex gap-4 text-xs font-medium">
// //                 <span className="flex items-center gap-1"><div className="w-3 h-3 bg-indigo-600 rounded-full"></div> Thực tế</span>
// //                 <span className="flex items-center gap-1"><div className="w-3 h-3 bg-orange-500 rounded-full"></div> Dự báo</span>
// //             </div>
// //           </h2>
          
// //           <div className="flex-1 w-full h-full">
// //             <ResponsiveContainer width="100%" height="100%">
// //               <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
// //                 <CartesianGrid stroke="#f0f0f0" vertical={false} />
// //                 <XAxis 
// //                     dataKey="displayDate" 
// //                     tick={{fontSize: 11, fill: '#666'}} 
// //                     interval="preserveStartEnd"
// //                 />
// //                 <YAxis domain={[0, 'auto']} tick={{fontSize: 11}} />
// //                 <Tooltip 
// //                     contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
// //                     labelStyle={{fontWeight: 'bold', color: '#333'}}
// //                 />
// //                 <Legend wrapperStyle={{paddingTop: '10px'}}/>
// //                 <ReferenceLine y={130} stroke="#22c55e" strokeDasharray="3 3" label={{ value: 'An toàn (130)', position: 'insideTopRight', fill: '#22c55e', fontSize: 10 }} />
                
// //                 {/* Đường thực tế */}
// //                 <Line type="monotone" dataKey="value" name="Thực tế" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: "#4f46e5", strokeWidth: 2, stroke: "#fff" }} connectNulls={false} />

// //                 {/* Đường dự báo */}
// //                 <Line type="monotone" dataKey="forecast" name="AI Dự báo" stroke="#f97316" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 5, fill: "#f97316", stroke: "#fff", strokeWidth: 2 }} activeDot={{ r: 7 }} />
// //               </LineChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>
// //       </div>
      
// //       {/* AIChatWidget: Bé giữ nguyên component Chatbot ở dưới cùng file này nhé */}
// //       <AIChatWidget currentGlucose={parseInt(inputData.value)} measureType={inputData.type} />
// //     </div>
// //   );
// // }

// // // ... Component AIChatWidget bé copy từ bài trước vào đây nhé (không thay đổi gì) ...
// // function AIChatWidget({ currentGlucose, measureType }) {
// //     const [isOpen, setIsOpen] = useState(false);
// //     const [messages, setMessages] = useState([
// //       { sender: "bot", text: "Xin chào! Mình là trợ lý AI. Bạn cần tư vấn thực đơn không? 🥗" }
// //     ]);
// //     const [input, setInput] = useState("");
// //     const [isTyping, setIsTyping] = useState(false);
// //     const messagesEndRef = useRef(null);
  
// //     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);
  
// //     const handleSend = async () => {
// //       if (!input.trim()) return;
// //       const userMsg = input;
// //       setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
// //       setInput("");
// //       setIsTyping(true);
  
// //       try {
// //         const res = await fetch("http://127.0.0.1:8000/api/chat/advice", {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({
// //             question: userMsg,
// //             glucose_value: currentGlucose || 0,
// //             measure_type: measureType || "fasting"
// //           }),
// //         });
// //         const data = await res.json();
// //         setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
// //       } catch (error) {
// //         setMessages(prev => [...prev, { sender: "bot", text: "Lỗi kết nối server rồi ạ! 😢" }]);
// //       } finally {
// //         setIsTyping(false);
// //       }
// //     };
  
// //     return (
// //       <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
// //         {isOpen && (
// //           <div className="bg-white w-80 sm:w-96 h-[450px] rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden mb-4 animate-fade-in-up">
// //             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex justify-between items-center shadow-md">
// //               <div className="flex items-center gap-2">
// //                 <Bot size={24} />
// //                 <div>
// //                   <h3 className="font-bold text-sm">Trợ lý Dinh Dưỡng AI</h3>
// //                   {currentGlucose > 0 && <p className="text-[10px] text-indigo-100 bg-white/20 px-2 py-0.5 rounded-full inline-block">Đang xem xét mức: {currentGlucose}</p>}
// //                 </div>
// //               </div>
// //               <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition"><X size={18} /></button>
// //             </div>
  
// //             <div className="flex-1 p-3 overflow-y-auto bg-slate-50 space-y-3">
// //               {messages.map((msg, i) => (
// //                 <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
// //                   <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === "user" ? "bg-indigo-600 text-white rounded-br-none" : "bg-white border text-gray-700 rounded-bl-none shadow-sm"}`}>
// //                     {msg.sender === "user" ? (
// //                       msg.text
// //                     ) : (
// //                       <ReactMarkdown 
// //                           remarkPlugins={[remarkGfm]}
// //                           components={{
// //                               ul: ({node, ...props}) => <ul className="list-disc ml-4 space-y-1 my-2" {...props} />,
// //                               ol: ({node, ...props}) => <ol className="list-decimal ml-4 space-y-1 my-2" {...props} />,
// //                               li: ({node, ...props}) => <li className="pl-1" {...props} />,
// //                               p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
// //                               strong: ({node, ...props}) => <strong className="font-bold text-indigo-700" {...props} />,
// //                           }}
// //                       >
// //                           {msg.text}
// //                       </ReactMarkdown>
// //                     )}
// //                   </div>
// //                 </div>
// //               ))}
// //               {isTyping && (
// //                  <div className="flex justify-start">
// //                    <div className="bg-gray-200 p-3 rounded-2xl rounded-bl-none text-xs text-gray-500 italic flex items-center gap-1">
// //                      AI đang nhập <span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span>
// //                    </div>
// //                  </div>
// //               )}
// //               <div ref={messagesEndRef} />
// //             </div>
  
// //             <div className="p-3 bg-white border-t flex gap-2">
// //               <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()}
// //                 placeholder="Hỏi về món ăn..." className="flex-1 p-2 bg-gray-100 rounded-lg outline-none text-sm focus:ring-1 focus:ring-indigo-500" />
// //               <button onClick={handleSend} disabled={isTyping} className="bg-indigo-600 text-white p-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
// //                 <Send size={18} />
// //               </button>
// //             </div>
// //           </div>
// //         )}
  
// //         <button onClick={() => setIsOpen(!isOpen)} 
// //           className={`${isOpen ? 'rotate-90 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'} transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 group`}>
// //           <MessageCircle size={28} />
// //           <span className="font-bold pr-1 max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap">Hỏi Bác sĩ</span>
// //         </button>
// //       </div>
// //     );
// //   }





// import { useState, useEffect, useRef } from "react";
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend
// } from "recharts";
// import { MessageCircle, X, Send, Bot, TrendingUp, Sparkles, Activity } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

// export default function GlucoseHealth() {
//   // --- STATE ---
//   const [history, setHistory] = useState([]);
//   const [chartData, setChartData] = useState([]);
  
//   const [inputData, setInputData] = useState({ value: "", type: "fasting", note: "" });
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [loading, setLoading] = useState(false);
  
//   // State cho Dự Báo
//   const [loadingPred, setLoadingPred] = useState(false);
//   const [predictionMsg, setPredictionMsg] = useState(null);

//   // --- LOGIC 1: ĐÁNH GIÁ ---
//   const analyzeGlucose = (val, type) => {
//     const value = parseInt(val);
//     if (!value) return null;
//     let result = { status: "", msg: "", color: "" };
//     if (type === "fasting") {
//       if (value < 70) result = { status: "HẠ ĐƯỜNG HUYẾT", msg: "Cần nạp đường ngay!", color: "bg-red-100 text-red-700" };
//       else if (value <= 130) result = { status: "AN TOÀN", msg: "Ổn định.", color: "bg-green-100 text-green-700" };
//       else result = { status: "CAO", msg: "Cảnh báo cao.", color: "bg-orange-100 text-orange-700" };
//     } else {
//       if (value < 140) result = { status: "TỐT", msg: "Dung nạp tốt.", color: "bg-green-100 text-green-700" };
//       else if (value <= 180) result = { status: "CHẤP NHẬN", msg: "Hạn chế tinh bột.", color: "bg-yellow-100 text-yellow-700" };
//       else result = { status: "NGUY HIỂM", msg: "Quá cao sau ăn.", color: "bg-red-100 text-red-700" };
//     }
//     return result;
//   };

//   // --- LOGIC 2: TẢI DỮ LIỆU (ĐÃ SỬA: Thêm patient_id) ---
//   const fetchHistory = async () => {
//       try {
//         const myId = localStorage.getItem("patientId");
//         if (!myId) return; 

//         const res = await fetch(`https://webkltn-backend.onrender.com/api/glucose/history?patient_id=${myId}`);
//         const data = await res.json();
        
//         // Sắp xếp dữ liệu theo thời gian tăng dần (cũ nhất ở index 0, mới nhất ở cuối mảng)
//         // Điều này giúp điểm mới nhập nằm ở bên phải biểu đồ.
//         const sortedData = data.data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

//         const formattedData = sortedData.map(item => ({
//           ...item,
//           displayDate: item.created_at.split(" ")[0] 
//         }));
//         setHistory(formattedData);
//         setChartData(formattedData);
//       } catch (error) { console.error("Lỗi:", error); }
//     };

//   useEffect(() => { fetchHistory(); }, []);
//   // --- LOGIC 3: LƯU KẾT QUẢ (ĐÃ SỬA: Thêm patient_id) ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!inputData.value) return;

//     const myId = localStorage.getItem("patientId");
//     if (!myId) {
//         alert("Lỗi: Không tìm thấy mã hồ sơ bệnh nhân!");
//         return;
//     }

//     const result = analyzeGlucose(inputData.value, inputData.type);
//     setAnalysisResult(result);
//     setLoading(true);
    
//     try {
//       await fetch("https://webkltn-backend.onrender.com/api/glucose/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           patient_id: myId, // <--- Gửi ID lên để Backend biết lưu vào đâu
//           value: parseInt(inputData.value),
//           measure_type: inputData.type,
//           note: inputData.note,
//           created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
//         }),
//       });
//       await fetchHistory(); 
//       setInputData({ ...inputData, value: "", note: "" }); 
//     } catch (error) { alert("Lỗi lưu!"); } 
//     finally { setLoading(false); }
//   };

//   // --- LOGIC 4: DỰ BÁO 7 NGÀY (ĐÃ SỬA: Thêm patient_id) ---
//   const handlePredict = async () => {
//     setLoadingPred(true);
//     setPredictionMsg(null);
//     try {
//       const myId = localStorage.getItem("patientId");

//       const res = await fetch("https://webkltn-backend.onrender.com/api/predict/glucose", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ 
//             measure_type: "fasting",
//             patient_id: myId // <--- Gửi ID lên để Backend lấy đúng lịch sử
//         }), 
//       });
//       const data = await res.json();

//       if (data.can_predict) {
//         const lastPoint = history[history.length - 1];
//         const bridgePoint = { ...lastPoint, forecast: lastPoint.value, displayDate: lastPoint.displayDate };

//         const forecastPoints = data.predictions.map(item => ({
//             displayDate: item.date,
//             forecast: item.value,
//             isPrediction: true
//         }));

//         const newChartData = [...history.slice(0, -1), bridgePoint, ...forecastPoints];
        
//         setChartData(newChartData);
//         setPredictionMsg({ type: 'success', text: data.message });
//       } else {
//         setPredictionMsg({ type: 'error', text: data.message });
//       }
//     } catch (error) {
//       console.error("Lỗi dự báo:", error);
//       setPredictionMsg({ type: 'error', text: "Không thể kết nối Server AI." });
//     } finally {
//       setLoadingPred(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-sans relative">
      
//       {/* HEADER & BUTTON DỰ BÁO */}
//       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//              🩸 Sổ Tay Đường Huyết
//            </h1>
//            {predictionMsg && (
//              <div className={`mt-3 text-sm px-4 py-2 rounded-lg border flex items-center gap-2 animate-pulse ${
//                 predictionMsg.type === 'success' ? 'bg-orange-50 text-orange-800 border-orange-200' : 'bg-red-50 text-red-600 border-red-200'
//              }`}>
//                 {predictionMsg.type === 'success' ? <Sparkles size={16}/> : <X size={16}/>}
//                 <span className="font-medium">{predictionMsg.text}</span>
//              </div>
//            )}
//         </div>

//         <button 
//             onClick={handlePredict}
//             disabled={loadingPred}
//             className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:scale-105 transition active:scale-95 disabled:opacity-50"
//         >
//             {loadingPred ? "AI đang tính..." : <><TrendingUp size={20}/> Dự Báo 7 Ngày Tới</>}
//         </button>
//       </div>

//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pb-24">
        
//         {/* FORM NHẬP LIỆU */}
//         <div className="md:col-span-1 space-y-6">
//           <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-50">
//             <h2 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2"><Activity size={20}/> Nhập chỉ số mới</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <div className="grid grid-cols-2 gap-3 mb-2">
//                   <button type="button" onClick={() => setInputData({...inputData, type: 'fasting'})}
//                     className={`p-2 rounded-lg border text-xs font-bold transition ${inputData.type === 'fasting' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>🌙 Lúc đói</button>
//                   <button type="button" onClick={() => setInputData({...inputData, type: 'after_meal'})}
//                     className={`p-2 rounded-lg border text-xs font-bold transition ${inputData.type === 'after_meal' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>🍜 Sau ăn 2h</button>
//                 </div>
//                 <input type="number" value={inputData.value} onChange={(e) => setInputData({...inputData, value: e.target.value})}
//                     className="w-full p-3 text-3xl font-bold text-center border-2 rounded-xl focus:border-indigo-500 outline-none text-gray-700" placeholder="---" required />
//               </div>
//               <button type="submit" disabled={loading} className="w-full bg-indigo-900 hover:bg-indigo-800 text-white py-3 rounded-xl font-bold shadow-lg transition">
//                 {loading ? "Đang lưu..." : "LƯU KẾT QUẢ"}
//               </button>
//             </form>
//           </div>
//           {analysisResult && (
//             <div className={`p-4 rounded-xl border-l-4 shadow-sm ${analysisResult.color}`}>
//               <div className="font-bold text-lg">{analysisResult.status}</div>
//               <div className="text-sm opacity-90">{analysisResult.msg}</div>
//             </div>
//           )}
//         </div>

//         {/* BIỂU ĐỒ */}
//         <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col h-[500px]">
//           <h2 className="text-lg font-bold text-gray-800 mb-4 flex justify-between items-center">
//             📈 Biểu đồ theo dõi
//             <div className="flex gap-4 text-xs font-medium">
//                 <span className="flex items-center gap-1"><div className="w-3 h-3 bg-indigo-600 rounded-full"></div> Thực tế</span>
//                 <span className="flex items-center gap-1"><div className="w-3 h-3 bg-orange-500 rounded-full"></div> Dự báo</span>
//             </div>
//           </h2>
          
//           <div className="flex-1 w-full h-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
//                 <CartesianGrid stroke="#f0f0f0" vertical={false} />
//                 <XAxis 
//                     dataKey="displayDate" 
//                     tick={{fontSize: 11, fill: '#666'}} 
//                     interval="preserveStartEnd"
//                 />
//                 <YAxis domain={[0, 'auto']} tick={{fontSize: 11}} />
//                 <Tooltip 
//                     contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
//                     labelStyle={{fontWeight: 'bold', color: '#333'}}
//                 />
//                 <Legend wrapperStyle={{paddingTop: '10px'}}/>
//                 <ReferenceLine y={130} stroke="#22c55e" strokeDasharray="3 3" label={{ value: 'An toàn (130)', position: 'insideTopRight', fill: '#22c55e', fontSize: 10 }} />
                
//                 {/* Đường thực tế */}
//                 <Line type="monotone" dataKey="value" name="Thực tế" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: "#4f46e5", strokeWidth: 2, stroke: "#fff" }} connectNulls={false} />

//                 {/* Đường dự báo */}
//                 <Line type="monotone" dataKey="forecast" name="AI Dự báo" stroke="#f97316" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 5, fill: "#f97316", stroke: "#fff", strokeWidth: 2 }} activeDot={{ r: 7 }} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
      
//       {/* AIChatWidget */}
//       <AIChatWidget currentGlucose={parseInt(inputData.value)} measureType={inputData.type} />
//     </div>
//   );
// }

// // ... Component AIChatWidget ...
// function AIChatWidget({ currentGlucose, measureType }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [messages, setMessages] = useState([
//       { sender: "bot", text: "Xin chào! Mình là trợ lý AI. Bạn cần tư vấn thực đơn không? 🥗" }
//     ]);
//     const [input, setInput] = useState("");
//     const [isTyping, setIsTyping] = useState(false);
//     const messagesEndRef = useRef(null);
  
//     useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);
  
//     const handleSend = async () => {
//       if (!input.trim()) return;
//       const userMsg = input;
//       setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
//       setInput("");
//       setIsTyping(true);
  
//       try {
//         const res = await fetch("https://webkltn-backend.onrender.com/api/chat/advice", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             question: userMsg,
//             glucose_value: currentGlucose || 0,
//             measure_type: measureType || "fasting"
//           }),
//         });
//         const data = await res.json();
//         setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
//       } catch (error) {
//         setMessages(prev => [...prev, { sender: "bot", text: "Lỗi kết nối server rồi ạ! 😢" }]);
//       } finally {
//         setIsTyping(false);
//       }
//     };
  
//     return (
//       <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
//         {isOpen && (
//           <div className="bg-white w-80 sm:w-96 h-[450px] rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden mb-4 animate-fade-in-up">
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex justify-between items-center shadow-md">
//               <div className="flex items-center gap-2">
//                 <Bot size={24} />
//                 <div>
//                   <h3 className="font-bold text-sm">Trợ lý Dinh Dưỡng AI</h3>
//                   {currentGlucose > 0 && <p className="text-[10px] text-indigo-100 bg-white/20 px-2 py-0.5 rounded-full inline-block">Đang xem xét mức: {currentGlucose}</p>}
//                 </div>
//               </div>
//               <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition"><X size={18} /></button>
//             </div>
  
//             <div className="flex-1 p-3 overflow-y-auto bg-slate-50 space-y-3">
//               {messages.map((msg, i) => (
//                 <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
//                   <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === "user" ? "bg-indigo-600 text-white rounded-br-none" : "bg-white border text-gray-700 rounded-bl-none shadow-sm"}`}>
//                     {msg.sender === "user" ? (
//                       msg.text
//                     ) : (
//                       <ReactMarkdown 
//                           remarkPlugins={[remarkGfm]}
//                           components={{
//                               ul: ({node, ...props}) => <ul className="list-disc ml-4 space-y-1 my-2" {...props} />,
//                               ol: ({node, ...props}) => <ol className="list-decimal ml-4 space-y-1 my-2" {...props} />,
//                               li: ({node, ...props}) => <li className="pl-1" {...props} />,
//                               p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
//                               strong: ({node, ...props}) => <strong className="font-bold text-indigo-700" {...props} />,
//                           }}
//                       >
//                           {msg.text}
//                       </ReactMarkdown>
//                     )}
//                   </div>
//                 </div>
//               ))}
//               {isTyping && (
//                  <div className="flex justify-start">
//                    <div className="bg-gray-200 p-3 rounded-2xl rounded-bl-none text-xs text-gray-500 italic flex items-center gap-1">
//                      AI đang nhập <span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span>
//                    </div>
//                  </div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>
  
//             <div className="p-3 bg-white border-t flex gap-2">
//               <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                 placeholder="Hỏi về món ăn..." className="flex-1 p-2 bg-gray-100 rounded-lg outline-none text-sm focus:ring-1 focus:ring-indigo-500" />
//               <button onClick={handleSend} disabled={isTyping} className="bg-indigo-600 text-white p-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
//                 <Send size={18} />
//               </button>
//             </div>
//           </div>
//         )}
  
//         <button onClick={() => setIsOpen(!isOpen)} 
//           className={`${isOpen ? 'rotate-90 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'} transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 group`}>
//           <MessageCircle size={28} />
//           <span className="font-bold pr-1 max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap">Hỏi Bác sĩ</span>
//         </button>
//       </div>
//     );
//   }


import { useState, useEffect, useRef } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend
} from "recharts";
import { MessageCircle, X, Send, Bot, TrendingUp, Sparkles, Activity } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function GlucoseHealth() {
  // --- STATE ---
  const [history, setHistory] = useState([]);
  const [chartData, setChartData] = useState([]);
  
  const [inputData, setInputData] = useState({ value: "", type: "fasting", note: "" });
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // State cho Dự Báo
  const [loadingPred, setLoadingPred] = useState(false);
  const [predictionMsg, setPredictionMsg] = useState(null);

  // --- LOGIC 1: ĐÁNH GIÁ ---
  const analyzeGlucose = (val, type) => {
    const value = parseInt(val);
    if (!value) return null;
    let result = { status: "", msg: "", color: "" };
    if (type === "fasting") {
      if (value < 70) result = { status: "HẠ ĐƯỜNG HUYẾT", msg: "Cần nạp đường ngay!", color: "bg-red-100 text-red-700" };
      else if (value <= 130) result = { status: "AN TOÀN", msg: "Ổn định.", color: "bg-green-100 text-green-700" };
      else result = { status: "CAO", msg: "Cảnh báo cao.", color: "bg-orange-100 text-orange-700" };
    } else {
      if (value < 140) result = { status: "TỐT", msg: "Dung nạp tốt.", color: "bg-green-100 text-green-700" };
      else if (value <= 180) result = { status: "CHẤP NHẬN", msg: "Hạn chế tinh bột.", color: "bg-yellow-100 text-yellow-700" };
      else result = { status: "NGUY HIỂM", msg: "Quá cao sau ăn.", color: "bg-red-100 text-red-700" };
    }
    return result;
  };

  // --- LOGIC 2: TẢI DỮ LIỆU (ĐÃ SỬA: Sắp xếp thời gian) ---
  const fetchHistory = async () => {
    try {
      const myId = localStorage.getItem("patientId");
      if (!myId) return; 

      const res = await fetch(`https://webkltn-backend.onrender.com/api/glucose/history?patient_id=${myId}`);
      const data = await res.json();
      
      const formattedData = data.data.map(item => ({
        ...item,
        displayDate: item.created_at.split(" ")[0] 
      }));

      // Sắp xếp tăng dần theo thời gian để biểu đồ chạy từ Trái -> Phải
      formattedData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

      setHistory(formattedData);
      setChartData(formattedData);
    } catch (error) { console.error("Lỗi:", error); }
  };

  useEffect(() => { fetchHistory(); }, []);

  // --- LOGIC 3: LƯU KẾT QUẢ ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputData.value) return;

    const myId = localStorage.getItem("patientId");
    if (!myId) {
        alert("Lỗi: Không tìm thấy mã hồ sơ bệnh nhân!");
        return;
    }

    const result = analyzeGlucose(inputData.value, inputData.type);
    setAnalysisResult(result);
    setLoading(true);
    
    try {
      await fetch("https://webkltn-backend.onrender.com/api/glucose/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_id: myId, 
          value: parseInt(inputData.value),
          measure_type: inputData.type,
          note: inputData.note,
          created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
        }),
      });
      await fetchHistory(); 
      setInputData({ ...inputData, value: "", note: "" }); 
    } catch (error) { alert("Lỗi lưu!"); } 
    finally { setLoading(false); }
  };

  // --- LOGIC 4: DỰ BÁO 7 NGÀY ---
  const handlePredict = async () => {
    setLoadingPred(true);
    setPredictionMsg(null);
    try {
      const myId = localStorage.getItem("patientId");

      const res = await fetch("https://webkltn-backend.onrender.com/api/predict/glucose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            measure_type: "fasting",
            patient_id: myId 
        }), 
      });
      const data = await res.json();

      if (data.can_predict) {
        const lastPoint = history[history.length - 1];
        const bridgePoint = { ...lastPoint, forecast: lastPoint.value, displayDate: lastPoint.displayDate, created_at: lastPoint.created_at }; // Thêm created_at cho điểm nối

        const forecastPoints = data.predictions.map(item => ({
            displayDate: item.date,
            created_at: item.date, // Thêm dòng này để XAxis không bị lỗi
            forecast: item.value,
            isPrediction: true
        }));

        const newChartData = [...history.slice(0, -1), bridgePoint, ...forecastPoints];
        
        setChartData(newChartData);
        setPredictionMsg({ type: 'success', text: data.message });
      } else {
        setPredictionMsg({ type: 'error', text: data.message });
      }
    } catch (error) {
      console.error("Lỗi dự báo:", error);
      setPredictionMsg({ type: 'error', text: "Không thể kết nối Server AI." });
    } finally {
      setLoadingPred(false);
    }
  };

  // --- LOGIC 5: CUSTOM TOOLTIP ---
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-indigo-100 shadow-xl rounded-xl">
          {/* Hiển thị ngày tháng rõ ràng */}
          <p className="text-gray-500 text-xs font-bold mb-2">{data.displayDate}</p>
          
          {data.value !== undefined && (
             <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Thực tế:</span>
                <span className="text-lg font-bold text-indigo-700">{data.value}</span>
             </div>
          )}

          {data.forecast !== undefined && (data.isPrediction || data.value === undefined || data.value === data.forecast) && (
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Dự báo:</span>
                <span className="text-lg font-bold text-orange-600">{data.forecast}</span>
             </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-sans relative">
      
      {/* HEADER & BUTTON DỰ BÁO */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
             🩸 Sổ Tay Đường Huyết
           </h1>
           {predictionMsg && (
             <div className={`mt-3 text-sm px-4 py-2 rounded-lg border flex items-center gap-2 animate-pulse ${
                predictionMsg.type === 'success' ? 'bg-orange-50 text-orange-800 border-orange-200' : 'bg-red-50 text-red-600 border-red-200'
             }`}>
                {predictionMsg.type === 'success' ? <Sparkles size={16}/> : <X size={16}/>}
                <span className="font-medium">{predictionMsg.text}</span>
             </div>
           )}
        </div>

        <button 
            onClick={handlePredict}
            disabled={loadingPred}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:scale-105 transition active:scale-95 disabled:opacity-50"
        >
            {loadingPred ? "AI đang tính..." : <><TrendingUp size={20}/> Dự Báo 7 Ngày Tới</>}
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pb-24">
        
        {/* FORM NHẬP LIỆU (Không thay đổi) */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-50">
            <h2 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2"><Activity size={20}/> Nhập chỉ số mới</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <button type="button" onClick={() => setInputData({...inputData, type: 'fasting'})}
                    className={`p-2 rounded-lg border text-xs font-bold transition ${inputData.type === 'fasting' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>🌙 Lúc đói</button>
                  <button type="button" onClick={() => setInputData({...inputData, type: 'after_meal'})}
                    className={`p-2 rounded-lg border text-xs font-bold transition ${inputData.type === 'after_meal' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>🍜 Sau ăn 2h</button>
                </div>
                <input type="number" value={inputData.value} onChange={(e) => setInputData({...inputData, value: e.target.value})}
                    className="w-full p-3 text-3xl font-bold text-center border-2 rounded-xl focus:border-indigo-500 outline-none text-gray-700" placeholder="---" required />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-indigo-900 hover:bg-indigo-800 text-white py-3 rounded-xl font-bold shadow-lg transition">
                {loading ? "Đang lưu..." : "LƯU KẾT QUẢ"}
              </button>
            </form>
          </div>
          {analysisResult && (
            <div className={`p-4 rounded-xl border-l-4 shadow-sm ${analysisResult.color}`}>
              <div className="font-bold text-lg">{analysisResult.status}</div>
              <div className="text-sm opacity-90">{analysisResult.msg}</div>
            </div>
          )}
        </div>

        {/* BIỂU ĐỒ */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col h-[500px]">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex justify-between items-center">
            📈 Biểu đồ theo dõi
            <div className="flex gap-4 text-xs font-medium">
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-indigo-600 rounded-full"></div> Thực tế</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-orange-500 rounded-full"></div> Dự báo</span>
            </div>
          </h2>
          
          <div className="flex-1 w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid stroke="#f0f0f0" vertical={false} />
                
                {/* --- CHỈNH SỬA QUAN TRỌNG Ở ĐÂY --- */}
                {/* Dùng created_at làm dataKey để đảm bảo duy nhất, không bị trùng */}
                <XAxis 
                    dataKey="created_at" 
                    tick={{fontSize: 11, fill: '#666'}} 
                    interval="preserveStartEnd"
                    tickFormatter={(val) => val ? val.split(" ")[0] : ""} // Vẫn hiển thị ngày tháng đẹp
                />
                
                <YAxis domain={[0, 'auto']} tick={{fontSize: 11}} />
                
                {/* Tooltip sẽ hoạt động trơn tru vì các điểm không bị trùng nhau nữa */}
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                
                <Legend wrapperStyle={{paddingTop: '10px'}}/>
                <ReferenceLine y={130} stroke="#22c55e" strokeDasharray="3 3" label={{ value: 'An toàn (130)', position: 'insideTopRight', fill: '#22c55e', fontSize: 10 }} />
                
                {/* Đường thực tế */}
                <Line type="monotone" dataKey="value" name="Thực tế" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: "#4f46e5", strokeWidth: 2, stroke: "#fff" }} connectNulls={false} />

                {/* Đường dự báo */}
                <Line type="monotone" dataKey="forecast" name="AI Dự báo" stroke="#f97316" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 5, fill: "#f97316", stroke: "#fff", strokeWidth: 2 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* AIChatWidget */}
      <AIChatWidget currentGlucose={parseInt(inputData.value)} measureType={inputData.type} />
    </div>
  );
}

// ... Component AIChatWidget giữ nguyên như cũ ...
function AIChatWidget({ currentGlucose, measureType }) {
    // (Giữ nguyên code phần này của bé)
   const [isOpen, setIsOpen] = useState(false);
   const [messages, setMessages] = useState([
     { sender: "bot", text: "Xin chào! Mình là trợ lý AI. Bạn cần tư vấn thực đơn không? 🥗" }
   ]);
   const [input, setInput] = useState("");
   const [isTyping, setIsTyping] = useState(false);
   const messagesEndRef = useRef(null);
 
   useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);
 
   const handleSend = async () => {
     if (!input.trim()) return;
     const userMsg = input;
     setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
     setInput("");
     setIsTyping(true);
 
     try {
       const res = await fetch("https://webkltn-backend.onrender.com/api/chat/advice", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           question: userMsg,
           glucose_value: currentGlucose || 0,
           measure_type: measureType || "fasting"
         }),
       });
       const data = await res.json();
       setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
     } catch (error) {
       setMessages(prev => [...prev, { sender: "bot", text: "Lỗi kết nối server rồi ạ! 😢" }]);
     } finally {
       setIsTyping(false);
     }
   };
 
   return (
     <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
       {isOpen && (
         <div className="bg-white w-80 sm:w-96 h-[450px] rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden mb-4 animate-fade-in-up">
           <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex justify-between items-center shadow-md">
             <div className="flex items-center gap-2">
               <Bot size={24} />
               <div>
                 <h3 className="font-bold text-sm">Trợ lý Dinh Dưỡng AI</h3>
                 {currentGlucose > 0 && <p className="text-[10px] text-indigo-100 bg-white/20 px-2 py-0.5 rounded-full inline-block">Đang xem xét mức: {currentGlucose}</p>}
               </div>
             </div>
             <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition"><X size={18} /></button>
           </div>
 
           <div className="flex-1 p-3 overflow-y-auto bg-slate-50 space-y-3">
             {messages.map((msg, i) => (
               <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                 <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === "user" ? "bg-indigo-600 text-white rounded-br-none" : "bg-white border text-gray-700 rounded-bl-none shadow-sm"}`}>
                   {msg.sender === "user" ? (
                     msg.text
                   ) : (
                     <ReactMarkdown 
                         remarkPlugins={[remarkGfm]}
                         components={{
                             ul: ({node, ...props}) => <ul className="list-disc ml-4 space-y-1 my-2" {...props} />,
                             ol: ({node, ...props}) => <ol className="list-decimal ml-4 space-y-1 my-2" {...props} />,
                             li: ({node, ...props}) => <li className="pl-1" {...props} />,
                             p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                             strong: ({node, ...props}) => <strong className="font-bold text-indigo-700" {...props} />,
                         }}
                     >
                         {msg.text}
                     </ReactMarkdown>
                   )}
                 </div>
               </div>
             ))}
             {isTyping && (
                 <div className="flex justify-start">
                   <div className="bg-gray-200 p-3 rounded-2xl rounded-bl-none text-xs text-gray-500 italic flex items-center gap-1">
                     AI đang nhập <span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span>
                   </div>
                 </div>
             )}
             <div ref={messagesEndRef} />
           </div>
 
           <div className="p-3 bg-white border-t flex gap-2">
             <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()}
               placeholder="Hỏi về món ăn..." className="flex-1 p-2 bg-gray-100 rounded-lg outline-none text-sm focus:ring-1 focus:ring-indigo-500" />
             <button onClick={handleSend} disabled={isTyping} className="bg-indigo-600 text-white p-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
               <Send size={18} />
             </button>
           </div>
         </div>
       )}
 
       <button onClick={() => setIsOpen(!isOpen)} 
         className={`${isOpen ? 'rotate-90 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'} transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 group`}>
         <MessageCircle size={28} />
         <span className="font-bold pr-1 max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap">Hỏi Bác sĩ</span>
       </button>
     </div>
   );
}