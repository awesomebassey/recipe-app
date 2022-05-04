import './Details.css'
import { projectFirestore } from '../../firebase/config'
import { useParams } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useEffect, useState } from 'react'

export default function Details() {
  const { id } = useParams()
  const {mode} = useTheme()
  const [recipe, setRecipe] = useState(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setPending(true)
    projectFirestore.collection('recipes').doc(id).get().then(doc => {
      if(doc.exists){
        setPending(false)
        setRecipe(doc.data())
      } else {
        setError('Something went wrong, please try again.')
        setPending(false)
      }
    }).catch(err => {
      setError(err.message)
    })
  }, [id])

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
