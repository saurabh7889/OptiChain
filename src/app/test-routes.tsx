import { createBrowserRouter } from "react-router";

function TestPage() {
  return <div className="p-8"><h1 className="text-2xl">Test Page Works!</h1></div>;
}

export const testRouter = createBrowserRouter([
  {
    path: "/",
    Component: TestPage,
  },
]);
