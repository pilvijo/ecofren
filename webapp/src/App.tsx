import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Topdown from "./routes/topdown";
import Login from "./routes/login";
import LandingPage from "./routes/landing";
import Register from "./routes/register";
import ProblemSelection from "./routes/problem-selection";
import { WagmiProvider } from "wagmi";
import wagmiConfig from "./utils/wagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EnergyGame from "./routes/energyGame";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/topdown/:problemId",
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
  {
    path: "/problem-selection",
    element: <ProblemSelection />
  },
  {
    path: "/energy-game",
    element: <EnergyGame />
  }
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <RouterProvider router={router} />
      </WagmiProvider>
    </QueryClientProvider>
  );
}

export default App