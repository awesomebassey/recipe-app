import './Home.css'
import { useFetch } from '../../hooks/useFetch'
import RecipeList from '../../components/RecipeList'

export default function Home() {
  const { data, pending, error } = useFetch('http://localhost:3000/recipes')

  return (
    <div className='home'>
      {pending && <div className='loading'>Loading...</div>}
      {error && <div className='error'>{error}</div>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}
