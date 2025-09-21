import { Link } from 'react-router-dom'
import logo from '../assets/bloom-gloom-high-resolution-logo-transparent.png'

export default function Navbar() {
  return (
    <nav className="border-b border-br-background-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className='flex items-center space-x-3 rtl:space-x-reverse'>
          <img src={logo} alt="Bloom & Gloom logo" className="h-12"/>
        </Link>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-br-text rounded-lg md:hidden hover:bg-br-background-800 focus:outline-none focus:ring-2 focus:ring-br-background-700" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-br-background-800 rounded-lg bg-br-background md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-br-background'>
            <li className='block py-2 px-3 text-br-text rounded-sm hover:bg-br-background-800 md:hover:bg-transparent md:border-0 md:hover:text-brand md:p-0'>
              <Link to="/" >Home</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/createthread">Create thread</Link>
            </li>
          </ul>
        </div>
      </div>
      
    </nav>
  )
}