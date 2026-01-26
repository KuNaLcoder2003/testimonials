import type React from "react"
import Navbar from "../components/Navbar"
import HeroSection from "../components/HeroSection"
import Features from "../components/Features"
import Integrations from "../components/Integrations"
import Founder from "../components/Founder"
import CTA from "../components/CTA"
import Footer from "../components/Footer"

const LandingPage: React.FC = () => {
    return (
        <div className='space-y-20 overflow-x-hidden'>
            <div className='w-full flex flex-col items-center'>
                <Navbar />
                <HeroSection />
            </div>
            <div className='w-full flex flex-col items-center gap-12'>
                <Features />
                <Integrations />
                <Founder />
                <CTA />
                <Footer />
            </div>
        </div>
    )
}

export default LandingPage