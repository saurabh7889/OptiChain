import { createBrowserRouter, Outlet } from "react-router";

function Layout() {
  return (
    <div className="h-screen flex flex-col">
      <header className="bg-indigo-600 text-white p-4">
        <h1 className="text-xl font-bold">OptiChain</h1>
      </header>
      <main className="flex-1 overflow-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}

function HomePage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p>Welcome to OptiChain</p>
    </div>
  );
}

export const simpleRouter = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
    ],
  },
]);
