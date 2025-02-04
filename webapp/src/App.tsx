import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Topdown from "./routes/topdown";
import Login from "./routes/login";
import LandingPage from "./routes/landing";
import Register from "./routes/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/topdown",
    element: <Topdown />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App
