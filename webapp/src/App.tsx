import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Topdown from "./routes/topdown";

const router = createBrowserRouter([
  {
    path: "/",
    element: <p>hello world</p>
  },
  {
    path: "/topdown",
    element: <Topdown />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App
