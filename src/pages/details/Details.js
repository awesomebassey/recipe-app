import './Details.css'
import { useFetch } from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'

export default function Details() {
  const { id } = useParams()
  const url = 'http://localhost:3000/recipes/' + id
  const { data: recipe, pending, error } = useFetch(url)
  const {mode} = useTheme()

  return (
    <div className={`recipe ${mode}`}>
      {pending && <div className='pending'>Loading...</div>}
      {error && <div className='error'>{error}</div>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook</p>
          <ul>
            {recipe.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  )
}
