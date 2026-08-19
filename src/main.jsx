import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NewPage from './components/newPage.js'
import AboutUs from './components/AboutUs.js'
import Resources from './components/Resources.js'
import ScrollToTop from './components/ScrollToTop.jsx'
import TenCommitments from './components/TenCommitments.js'
import { BrowserRouter, Routes, Route } from "react-router"
import Kids from './components/Kids.jsx'
import Privacy from './components/Privacy.js'
import Terms from './components/Terms.js'
import Support from './components/Support.js'
import DailyDevotional from './components/Devotional.js'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ScrollToTop /> {/* 👈 Add this here */}

    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/expect' element={<NewPage />} />
      <Route path='/about' element={<AboutUs />} />
      <Route path='/resources' element={<Resources />} />
      <Route path='/commitments' element={<TenCommitments />} />
      <Route path='/kids' element={<Kids />} />
      <Route path='/privacy' element={<Privacy />} />
      <Route path='/terms' element={<Terms />} />
      <Route path='/support' element={<Support />} />
      <Route path='/devotional' element={<DailyDevotional />} />
    </Routes>

  </BrowserRouter>
)
