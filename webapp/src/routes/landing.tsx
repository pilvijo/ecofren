import { useEffect, useState } from "react";
import Carousel from "../components/landing/Carousel";
import Navigation from "../components/landing/Navigation";
import useAuth from "../hooks/useAuth";

const carouselImages = [
    {
        src: "/assets/illustration.webp",
        alt: "Game Preview",
        title: "Explore the World",
        description:
            "Immerse yourself in a vibrant eco-conscious gaming experience",
    },
    {
        src: "/assets/interior/TopDownHouse_FurnitureState1.png",
        alt: "Interior Preview",
        title: "Customize Your Space",
        description: "Design and build your sustainable virtual home",
    },
    {
        src: "/assets/interior/TopDownHouse_FurnitureState2.png",
        alt: "Furniture Preview",
        title: "Collect & Create",
        description: "Earn eco-friendly furniture and decorations",
    },
];

export default function LandingPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { user } = useAuth();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="h-screen overflow-hidden relative bg-[#0c0c1d]">
            {/* Mouse follower */}
            <div
                className="pointer-events-none fixed inset-0 z-0"
                style={{
                    background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(98, 126, 234, 0.15), transparent 80%)`,
                }}
            />

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#454a75] to-[#62688f] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-pulse"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    />
                </div>
            </div>

            <Navigation
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                user={user}
            />

            {/* Main content */}
            <main className="relative h-screen flex items-center">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 flex items-center">
                    <div className="grid lg:grid-cols-2 gap-x-12 gap-y-16 items-center">
                        {/* Left column */}
                        <div className="max-w-2xl">
                            <div className="relative">
                                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-2">
                                    Play Games,
                                    <br />
                                    <span className="text-[#627eea]">
                                        Save the Planet
                                    </span>
                                </h1>
                                <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#627eea] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                                <div className="absolute -bottom-8 right-4 w-24 h-24 bg-[#454a75] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                            </div>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                                Join Ecofren, where gaming meets sustainability.
                                Make real-world eco-friendly choices and watch
                                your virtual world thrive. Every action counts
                                towards a greener future.
                            </p>
                            <div className="mt-10 flex items-center gap-x-6">
                                {user ? (
                                    <a
                                        href="/problem-selection"
                                        className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#627eea] to-[#454a75] p-[2px] text-white focus:outline-none focus:ring-2 focus:ring-[#627eea] focus:ring-offset-2 hover:text-white">
                                        <span className="relative rounded-full bg-[#0c0c1d] px-8 py-3 transition-all duration-200 ease-out group-hover:bg-transparent">
                                            <span className="relative text-base font-semibold text-[#627eea] transition-colors duration-200 ease-out group-hover:text-white">
                                                Play Now
                                            </span>
                                        </span>
                                    </a>
                                ) : (
                                    <a
                                        href="/register"
                                        className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#627eea] to-[#454a75] p-[2px] text-white focus:outline-none focus:ring-2 focus:ring-[#627eea] focus:ring-offset-2 hover:text-white">
                                        <span className="relative rounded-full bg-[#0c0c1d] px-8 py-3 transition-all duration-200 ease-out group-hover:bg-transparent">
                                            <span className="relative text-base font-semibold text-[#627eea] transition-colors duration-200 ease-out group-hover:text-white">
                                                Join Now
                                            </span>
                                        </span>
                                    </a>
                                )}
                                <a
                                    href="#features"
                                    className="text-sm font-semibold leading-6 text-gray-300 hover:text-[#627eea] transition-colors">
                                    Learn more <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>

                        {/* Right column - Carousel */}
                        <Carousel
                            images={carouselImages}
                            currentSlide={currentSlide}
                            setCurrentSlide={setCurrentSlide}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
