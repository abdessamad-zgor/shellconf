import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='border-4 border-teal-400 rounded-md shadow flex gap-2 p-4 bg-stone-600'>
      <div className="flex gap-2">
        <NavLink className={(navProps) => `${navProps.isActive ? "bg-stone-400 text-white/85 border border-white" : "text-stone-200"} py-2 text-xl px-4 rounded `} to="/prompt">Prompts</NavLink>
        <NavLink className={(navProps) => `${navProps.isActive ? "bg-stone-400 text-white/85 border border-white" : "text-stone-200"} py-2 text-xl px-4 rounded `} to="/theme">Themes</NavLink>
        <NavLink className={(navProps) => `${navProps.isActive ? "bg-stone-400 text-white/85 border border-white" : "text-stone-200"} py-2 text-xl px-4 rounded `} to="/alias">Aliases</NavLink>
        <NavLink className={(navProps) => `${navProps.isActive ? "bg-stone-400 text-white/85 border border-white" : "text-stone-200"} py-2 text-xl px-4 rounded `} to="/environment">Environment</NavLink>
      </div>
    </nav>
  )
}

export default Navbar
