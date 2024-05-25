import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Prompt from './pages/Prompt'
import Theme from './pages/Theme'
import Alias from './pages/Alias'
import Environment from './pages/Environment'
import { useEffect } from 'react'

function App() {

  return (
    <BrowserRouter>
      <main className="min-h-screen bg-zinc-800 px-12 py-8">
        <Navbar />
        <section className='bg-stone-600 border border-teal-400 rounded my-4'>
          <Routes>
            <Route index element={<Redirect />} />
            <Route path='/prompt' element={<Prompt />} />
            <Route path='/theme' element={<Theme />} />
            <Route path='/alias' element={<Alias />} />
            <Route path='/environment' element={<Environment />} />
          </Routes>
        </section>
      </main >
    </BrowserRouter>
  )
}

export default App

function Redirect() {
  let navigate = useNavigate()
  useEffect(() => {
    navigate("/prompt")
  })
  return <></>
}
