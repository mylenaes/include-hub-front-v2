import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const LayoutBase = () => {

  return (
    <div
      className="
        flex
        min-h-screen
        bg-[#1E2132]
      "
    >
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutBase;