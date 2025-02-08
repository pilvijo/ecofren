import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { injected, useAccount, useConnect } from "wagmi";
import useAuth from "../hooks/useAuth";
import supabase from "../utils/supabase";

interface Problem {
    id: string;
    title: string;
    image: string;
}

const problems: Problem[] = [
    {
        id: "energy-crisis",
        title: "Energy Crisis",
        image: "/assets/energy-crisis.webp",
    },
    {
        id: "green-transport",
        title: "Green Transport",
        image: "/assets/green-transport.webp",
    },
    {
        id: "waste-management",
        title: "Waste Management",
        image: "/assets/waste-management.webp",
    },
    {
        id: "decentralized-economy",
        title: "Decentralized Economy",
        image: "/assets/decentralized-economy.webp",
    },
    {
        id: "sustainable-living",
        title: "Sustainable Living",
        image: "/assets/sustainable-living.webp",
    },
];

export default function ProblemSelection() {
    const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
    const [attachedWallet, setAttachedWallet] = useState<string | null>(null);
    const navigate = useNavigate();
    const { isConnected, address } = useAccount();
    const { connect } = useConnect();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }

        const fetchWalletAddress = async () => {
            const { data, error } = await supabase
                .from("user_wallets")
                .select("wallet_address")
                .eq("user_id", user.id)
                .maybeSingle();

            if (!error && data) {
                setAttachedWallet(data.wallet_address);
            }
        };

        fetchWalletAddress();
    }, [user, navigate]);

    const handleContinue = () => {
        if (selectedProblem) {
            navigate(`/topdown/${selectedProblem}`);
        }
    };

    // Only show wallet connection if user has no attached wallet
    if (!attachedWallet) {
        return (
            <div className="h-screen bg-[#0c0c1d] flex items-center justify-center">
                <div className="max-w-md w-full mx-4 p-8 bg-[#1a1b2e] rounded-xl border border-[#627eea]/20 shadow-xl">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Wallet Required
                    </h2>
                    <p className="text-gray-300 mb-6">
                        Please connect your wallet to access the missions. Your
                        progress and achievements will be stored securely on the
                        blockchain.
                    </p>
                    <div className="space-y-4">
                        <button
                            onClick={() => connect({ connector: injected() })}
                            className="w-full bg-[#627eea] text-white py-3 px-4 rounded-lg hover:bg-[#4c63bb] transition-colors">
                            Connect Wallet
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="w-full bg-[#1a1b2e] text-gray-300 py-3 px-4 rounded-lg border border-gray-700 hover:bg-[#2a2b3e] transition-colors">
                            Return to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-[#0c0c1d] text-white flex flex-col">
            <div className="flex items-center justify-between px-8 py-6">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center space-x-2 rounded-lg px-2 py-2 text-gray-400 hover:text-[#627eea] bg-[#1a1b2e] hover:bg-[#2a2b3e] transition-all duration-200">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <h1 className="text-3xl font-bold text-center">
                    Choose Your <span className="text-[#627eea]">Mission</span>
                </h1>
                <div className="w-24" /> {/* Spacer for centering */}
            </div>

            {/* Grid Layout to Make Items Fill the Screen */}
            <div className="flex flex-grow justify-center items-center">
                <div className="grid grid-cols-5 gap-12 w-full h-full p-24">
                    {problems.map((problem) => (
                        <div
                            key={problem.id}
                            className={`relative group cursor-pointer transition-all duration-300
                ${
                    selectedProblem === problem.id
                        ? "scale-105"
                        : "hover:scale-105"
                }
                flex flex-col items-center w-full h-full`}
                            onClick={() => setSelectedProblem(problem.id)}>
                            <div className="relative w-full h-full rounded-xl overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10" />
                                <img
                                    src={problem.image}
                                    alt={problem.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 z-20 flex items-center justify-center">
                                    <h3 className="text-xl font-bold text-center">
                                        {problem.title}
                                    </h3>
                                </div>
                                <div
                                    className={`absolute inset-0 z-30 border-4 rounded-xl transition-all duration-300
                    ${
                        selectedProblem === problem.id
                            ? "border-[#627eea] shadow-[0_0_15px_rgba(98,126,234,0.3)]"
                            : "border-transparent group-hover:border-[#627eea]/50"
                    }
                  `}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center mb-6">
                <button
                    onClick={handleContinue}
                    disabled={!selectedProblem}
                    className={`
            px-6 py-3 rounded-full font-semibold transition-all duration-300
            ${
                selectedProblem
                    ? "bg-[#627eea] hover:bg-[#4c63bb] text-white"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }
          `}>
                    Continue to Mission
                </button>
            </div>
        </div>
    );
}