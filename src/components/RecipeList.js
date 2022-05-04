import './RecipeList.css'
import { Link } from 'react-router-dom'
import trashcan from '../assets/trashcan.svg'
import { useTheme } from '../hooks/useTheme'
import { projectFirestore } from '../firebase/config'

export default function RecipeList({ recipes }) {
    const { mode } = useTheme()
    const handleClick = (id) => {
        projectFirestore.collection('recipes').doc(id).delete()
    }
    return (
        <div className="recipe-list">
            {recipes.map(recipe => (
                <div className={`card ${mode}`} key={recipe.id}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.cookingTime} to make.</p>
                    <div>{recipe.method.substring(0, 100)}...</div>
                    <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
                    <img
                        src={ trashcan }
                        alt='trashcan'
                        className='delete'
                        onClick={() => handleClick(recipe.id)}
                    />
                </div>
            ))}
        </div>
    )
}
