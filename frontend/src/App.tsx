

import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import ProtectedRoute from './components/ProtectedRoute'
import { UserProvider } from './context/UserContext'
import Collect from './pages/Collect'
import Space from './pages/Space'
// import { EmbedRenderer } from './components/EmbedRenderer'
// import { useEffect, useState } from 'react'
import Preview from './components/Preview'


function App() {

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/signin' element={<SignInPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/testify/:space' element={<Collect />} />
      <Route path='/embbed/c/:space' element={<Collect />} />
      <Route path='/dashboard'
        element={
          <ProtectedRoute>
            <UserProvider>
              <Dashboard />
            </UserProvider>
          </ProtectedRoute>} />
      <Route path='/space/:id' element={<Space />} />
      <Route path='/t/:id' element={<Preview />} />
    </Routes>


  )
}

// function EmbedPreviewPage() {
//   const [design, setDesign] = useState<any>(null);
//   const [testimonial, setTestimonial] = useState<any>(null);

//   useEffect(() => {
//     const handler = (e: MessageEvent) => {
//       if (e.data?.type === "APPLY_EMBED_DESIGN") {
//         console.log(e.data)
//         setDesign(e.data.design);
//         setTestimonial(e.data.testimonial);
//       }
//     };

//     window.addEventListener("message", handler);
//     return () => window.removeEventListener("message", handler);
//   }, []);

//   if (!design || !testimonial) {
//     return <div style={{ minHeight: 200 }} />;
//   }

//   return (
//     <EmbedRenderer
//       design={design}
//       testimonial={testimonial}
//     />
//   );
// }
{/* <script src="http://localhost:5173/iframeResizer.min.js"></script>

<iframe
  id="easymonials-embed-9161654e"
  src="http://localhost:5173/t/9161654e"
  style="width:100%; border:0;"
  scrolling="no">
</iframe>

<script>
  iFrameResize(
    {
      log: false,
      checkOrigin: true
    },
    "#easymonials-embed-9161654e"
  );
</script> */}

export default App
