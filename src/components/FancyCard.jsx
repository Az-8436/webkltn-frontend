export default function FancyCard({ title, icon, color, to }) {
  return (
    <div className={`p-6 rounded-xl shadow-md text-white ${color} transition transform hover:scale-105`}>
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-lg font-bold">{title}</div>
    </div>
  );
}
