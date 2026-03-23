import { Outlet } from "react-router-dom";

const QRLayout = () => {
  return (
    <div className="bg-zinc-950">
      <main className="min-h-screen max-w-3xl mx-auto py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default QRLayout;
