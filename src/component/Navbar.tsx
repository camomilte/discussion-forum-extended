import { Link } from 'react-router-dom'
import CreateThreadButton from './CreateThreadButton'

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul style={{listStyle:'none'}}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li className='right-navbar'>
          <CreateThreadButton/>
        </li>
      </ul>
      
    </nav>
  )
}