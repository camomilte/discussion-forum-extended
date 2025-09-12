import { Link } from 'react-router-dom'

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
        <li>
          <Link to="/createthread">Create thread</Link>
        </li>
      </ul>
      
    </nav>
  )
}