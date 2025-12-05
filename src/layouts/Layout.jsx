import Sidebar from "../components/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="fixed top-0 left-0 h-full w-64 z-10">
        <Sidebar />
      </div>
      <main className="ml-64 flex-1 overflow-y-auto p-6 bg-[url('/nen.png')] bg-no-repeat bg-cover bg-fixed">
        {children}
      </main>
    </div>
  );
}
