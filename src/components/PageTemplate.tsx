import React, { ReactNode } from "react";
import ContentSection from "./ContentSection";
import Header from "./Header";
import Footer from "./Footer";

// Added optional video string to the typing data contract
interface SectionData {
    title: string;
    time?: string;
    Description: (props: any) => ReactNode | Promise<ReactNode>;
    image?: string; // Made optional since a section might use a video instead
    video?: string; // New asset track field
    bgColor?: string;
}

interface PageTemplateProps {
    heroTitle: string;
    heroImage: string;
    sections: SectionData[];
}

const PageTemplate: React.FC<PageTemplateProps> = ({
    heroTitle,
    heroImage,
    sections,
}) => {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="w-full">
                {/* Hero Section */}
                <section className="relative h-[45vh] md:h-[60vh] min-h-[400px] w-full flex items-end overflow-hidden">
                    <img
                        src={heroImage}
                        alt={heroTitle}
                        className="absolute inset-0 w-full h-full object-cover scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-12 md:pb-20">
                        <div className="w-12 h-1 bg-[#7bb0e0] mb-6 rounded-full" />
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
                            {heroTitle}
                        </h1>
                        <p className="mt-4 text-[#7bb0e0] font-medium tracking-widest uppercase text-sm">
                            318 Bible Church
                        </p>
                    </div>
                </section>

                {/* Content Sections Container */}
                <div className="relative">
                    <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />

                    <div className="py-12 md:py-20 space-y-0">
                        {sections.map((section, index) => (
                            <div
                                key={index}
                                className="bg-white transition-colors duration-500"
                            >
                                <div className="max-w-7xl mx-auto">
                                    <ContentSection
                                        imgSize="large"
                                        {...section}
                                        reverse={index % 2 === 1}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <div className="h-20 bg-[#1a1a1a]" />
            <Footer />
        </div>
    );
};

export default PageTemplate;