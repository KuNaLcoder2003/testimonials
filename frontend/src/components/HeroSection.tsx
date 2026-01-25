import type React from "react"
import LogoLoop from "./LogoLoop"


import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

// Alternative with image sources
// const imageLogos = [
//     { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
//     { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
//     { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
// ];




const HeroSection: React.FC = () => {
    return (
        <div className="pt-32 sm:pt-36 lg:pt-40 px-4 overflow-x-hidden">
            <div className="max-w-7xl m-auto space-y-6">


                <h1 className="font-bold text-center leading-tight
                   text-3xl md:text-6xl lg:text-7xl">
                    Get testimonials from your
                    <span className="block">customers with ease</span>

                </h1>


                <p className="text-gray-400 font-light text-center
                    text-base text-md md:text-xl">
                    Collecting testimonials is hard, we get it! So we built Testimonial.
                    In minutes, you can collect text and video testimonials from your
                    customers with no need for a developer or website hosting.
                </p>


                <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            className="w-[90%] lg:w-auto text-white bg-blue-600
                            px-6 py-3 rounded-lg cursor-pointer
                            hover:scale-[1.03] transition-transform duration-200"
                        >
                            Try Free now
                        </button>

                        <button
                            className="w-[90%] lg:w-auto text-center
                            px-10 py-3 border border-blue-600 rounded-lg cursor-pointer
                            hover:scale-[1.03] transition-transform duration-200"
                        >
                            Talk to us
                        </button>
                    </div>

                    <p className="text-gray-400 font-light text-sm sm:text-md text-center">
                        Get started with free credits on us.{" "}
                        <span className="text-black underline cursor-pointer">
                            See our pricing
                        </span>
                    </p>
                </div>
            </div>


            <div className="w-screen lg:w-full flex flex-col items-center justify-center overflow-hidden mt-12">
                <div className="w-full max-w-5xl px-2 mb-4">
                    <video
                        preload="auto"
                        poster="https://imagedelivery.net/pcavElAZUUevXK53Dl4vWA/c2ee0460-afa5-46b3-ce49-a02daf7d9600/public"
                        playsInline
                        controls
                        autoPlay
                        loop
                        className="w-full rounded-xl shadow-xl aspect-video"
                    >
                        <source
                            src="https://customer-k5rghq683w5sm3cf.cloudflarestream.com/f82c5af2ad310ce09fb81b03cc6fb09d/downloads/default.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>
                <div className="overflow-hidden max-w-full space-y-2">
                    <p className="text-lg font-semibold mt-8 text-center">Trusted Partners</p>
                    <div className="max-w-full" style={{ height: '120px', position: 'relative', overflow: 'hidden' }}>
                        {/* Basic horizontal loop */}
                        <LogoLoop
                            logos={techLogos}
                            speed={100}
                            direction="left"
                            logoHeight={60}
                            gap={60}
                            hoverSpeed={0}
                            scaleOnHover
                            fadeOut
                            fadeOutColor="#ffffff"
                            ariaLabel="Technology partners"
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
