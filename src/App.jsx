import './App.css'
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<div><h1>Page not found</h1></div>} />
        </Routes>
      </Router>
    </>
  )
}

export default App

// awesome crypto wallpaper
// https://wallpapers.com/images/hd/cryptocurrency-ethereum-art-ojd0r7g0szz1eob8.jpg

// crypto hunter: https://crypto-hunter.netlify.app/
