

import './App.css'
import CTA from './components/CTA'
import Features from './components/Features'
import Footer from './components/Footer'
import Founder from './components/Founder'
import HeroSection from './components/HeroSection'
import Integrations from './components/Integrations'
import Navbar from './components/Navbar'

function App() {

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

export default App
