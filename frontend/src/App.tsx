

import './App.css'
import Features from './components/Features'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className='space-y-20 overflow-x-hidden'>
      <div className='w-full flex flex-col items-center'>
        <Navbar />
        <HeroSection />
      </div>
      <div className='w-full flex flex-col items-center'>
        <Features />
      </div>
    </div>
  )
}

export default App
