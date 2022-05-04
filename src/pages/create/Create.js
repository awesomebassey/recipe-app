import './Create.css'
import { useState, useRef } from 'react'
import { projectFirestore } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

export default function Create() {
  const ref = useRef(null)
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([])
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const doc = { title, cookingTime: cookingTime + ' minutes', ingredients, method }

    try {
      await projectFirestore.collection('recipes').add(doc)
      navigate('/')
    } catch (err){
      console.log(err)
    }
  }

  const handleClick = () => {
    const ing = newIngredient.trim()
    if (ing && !ingredients.includes(ing)) {
      setIngredients(prev => ([...prev, ing]))
    }
    ref.current.focus()
    setNewIngredient('')
  }

  return (
    <div className='create'>
      <h1 className="page-title">Add new recipe</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title</span>
          <input
            type="text"
            onChange={e => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label>
          <span>Recipe Method</span>
          <textarea
            onChange={e => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Ingredients</span>
          <div className="ingredients">
            <input
              onChange={e => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ref}
            />
            <button type='button' className="btn" onClick={handleClick}>Add</button>
          </div>
        </label>
        <p>{ingredients.map(ingredient => (<em key={ingredient}>{ingredient}, </em>))}</p>
        <label>
          <span>Cooking Time (in minutes)</span>
          <input
            type="number"
            onChange={e => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  )
}
