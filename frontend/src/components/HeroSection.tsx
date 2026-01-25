import type React from "react"

const HeroSection: React.FC = () => {
    return (
        <div className="mt-24 sm:mt-32 lg:mt-100 px-4">
            <div className="max-w-7xl m-auto space-y-6">

                {/* Heading */}
                <h1 className="font-bold text-center leading-tight
                    text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                    Get testimonials from your<br />
                    <span className="block sm:inline">customers with ease</span>
                </h1>

                {/* Subheading */}
                <p className="text-gray-400 font-light text-center
                    text-base sm:text-lg md:text-xl">
                    Collecting testimonials is hard, we get it! So we built Testimonial.
                    In minutes, you can collect text <br /> and video testimonials from your
                    customers with no need for a developer or website hosting.
                </p>

                {/* CTA Section */}
                <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            className="w-full sm:w-auto text-white bg-blue-600
                            px-6 py-3 rounded-lg cursor-pointer
                            hover:scale-[1.03] transition-transform duration-200"
                        >
                            Try Free now
                        </button>

                        <button
                            className="w-full sm:w-auto text-center
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

            {/* Video Section */}
            <div className="w-full flex items-center justify-center overflow-hidden mt-12">
                <div className="w-full max-w-6xl">
                    <video
                        preload="auto"
                        poster="https://imagedelivery.net/pcavElAZUUevXK53Dl4vWA/c2ee0460-afa5-46b3-ce49-a02daf7d9600/public"
                        playsInline
                        controls
                        autoPlay
                        className="w-full rounded-xl shadow-xl aspect-video"
                    >
                        <source
                            src="https://customer-k5rghq683w5sm3cf.cloudflarestream.com/f82c5af2ad310ce09fb81b03cc6fb09d/downloads/default.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
