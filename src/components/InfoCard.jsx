export default function InfoCard({ title, value }) {
  return (
    <div className="bg-white p-4 shadow rounded w-full md:w-1/2 lg:w-1/3 xl:w-1/4 m-2 hover:shadow-xl transition-shadow">
      <div className="text-gray-700 font-semibold mb-1">{title}</div>
      <div className="text-xl">{value}</div>
    </div>
  );
}
