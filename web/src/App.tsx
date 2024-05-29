import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import ThemeConfig from './pages/ThemeConfig'
import AliasConfig from './pages/AliasConfig'
import EnvironmentConfig from './pages/EnvironmentConfig'
import PromptConfig from './pages/PromptConfig'

function App() {

  return (
    <BrowserRouter>
      <main className="min-h-screen bg-zinc-800 px-12 py-8">
        <Navbar />
        <section className='bg-stone-600 border border-teal-400 rounded my-4'>
          <Routes>
            <Route index element={<Redirect />} />
            <Route path='/prompt' element={<PromptConfig />} />
            <Route path='/theme' element={<ThemeConfig />} />
            <Route path='/alias' element={<AliasConfig />} />
            <Route path='/environment' element={<EnvironmentConfig />} />
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
