import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Searchbar.css'

export default function Searchbar() {
    const [term, setTerm] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        const query = `/search?q=${term}`
        navigate(query)
    }
    return (
        <div className='searchbar'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search</label>
                <input
                    type="text"
                    id="search"
                    onChange={e => setTerm(e.target.value)}
                    value={term}
                    required
                />
            </form>
        </div>
    )
}
