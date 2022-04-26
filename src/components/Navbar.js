import { Link } from 'react-router-dom'
import './Navbar.css'
import Searchbar from './Searchbar'

export default function Navbar() {
    return (
        <div className='navbar'>
            <nav>
                <Link to="/" className='brand'>
                    Recipe App
                </Link>
                <Searchbar />
                <Link to="/create">
                    Create Recipe
                </Link>
            </nav>
        </div>
    )
}
