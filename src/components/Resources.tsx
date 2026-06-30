import Footer from "./Footer";
import Header from "./Header";
import { useNavigate } from "react-router";

export default function Resources() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="w-full">
                {/* Hero Section - Using the Cinematic Style */}
                <section className="relative h-[45vh] md:h-[60vh] min-h-[400px] w-full flex items-end overflow-hidden">
                    <img
                        src="/pexels-repuding-12064.jpg"
                        alt="Resources Hero"
                        className="absolute inset-0 w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-12 md:pb-20">
                        <div className="w-12 h-1 bg-[#7bb0e0] mb-6 rounded-full" />
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
                            Resources
                        </h1>
                        <p className="mt-4 text-[#7bb0e0] font-medium tracking-widest uppercase text-sm">
                            Equipping the Saints
                        </p>
                    </div>
                </section>

                {/* Main Content Area */}
                <section className="py-20 md:py-32 px-6">
                    <div className="max-w-7xl mx-auto space-y-32">

                        {/* Podcast Section - Premium Card Style */}
                        <div className="relative group overflow-hidden bg-slate-50 rounded-[2rem] border border-slate-100 shadow-xl">
                            <div className="flex flex-col lg:flex-row items-center">

                                {/* Podcast Image/Branding */}
                                <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex justify-center bg-white">
                                    <div className="relative w-full max-w-[400px] aspect-square transition-transform duration-500 group-hover:scale-105">
                                        <img
                                            src="/Screenshot 2026-01-08 090658.png"
                                            alt="5 Minutes With The Doc Logo"
                                            className="w-full h-full object-contain drop-shadow-2xl"
                                        />
                                    </div>
                                </div>

                                {/* Podcast Text Content */}
                                <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16">
                                    <span className="text-[#7bb0e0] font-bold tracking-widest uppercase text-xs mb-4 block">
                                        Daily Podcast
                                    </span>
                                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                                        5 Minutes With The Doc
                                    </h2>
                                    <p className="text-lg text-slate-600 leading-relaxed font-light mb-8 max-w-md">
                                        Be encouraged each day as one of our Elders guides you
                                        through the Bible, teaching and sharing insights from
                                        the Scriptures.
                                    </p>
                                    <a
                                        href="https://spotify.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold transition-all hover:bg-[#7bb0e0] hover:shadow-lg hover:shadow-[#7bb0e0]/20 group/btn"
                                    >
                                        Listen Now
                                        <span className="transform transition-transform group-hover/btn:translate-x-1">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Sermons High-Impact Banner */}
                        <div className="relative w-full group overflow-hidden rounded-[2rem] shadow-2xl cursor-pointer">
                            <img
                                src="/pexels-rdne-8674846.jpg"
                                alt="Sermons"
                                className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20">
                                <span className="text-[#7bb0e0] font-bold tracking-[0.3em] uppercase text-sm mb-4">
                                    Watch & Listen
                                </span>
                                <h3 className="text-white text-4xl md:text-7xl font-extrabold tracking-tight mb-8">
                                    Sermon Archive
                                </h3>
                            </div>
                        </div>

                    </div>
                </section>
            </main>

            {/* Footer Spacer */}
            <Footer />
        </div>
    );
}