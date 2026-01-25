

import './App.css'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <div className='w-screen h-screen flex items-center justify-center'>
        <Navbar />
        <HeroSection />
      </div>

    </>
  )
}

export default App
