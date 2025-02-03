import { createBrowserRouter, RouterProvider } from "react-router-dom"
import TestPhaser from "./routes/testPhaser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <p>hello world</p>
  },
  {
    path: "/phaser",
    element: <TestPhaser />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App
