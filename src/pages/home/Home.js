import './Home.css'
import { projectFirestore } from '../../firebase/config'
import RecipeList from '../../components/RecipeList'
import { useState, useEffect } from 'react'

export default function Home() {
  const [data, setData] = useState(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setPending(true)

    const unsub = projectFirestore.collection('recipes').onSnapshot(snapshot => {
      if(snapshot.empty){
        setError('No recipes to load')
        setPending(false)
      } else {
        let results = []
        snapshot.docs.forEach(doc => {
          results.push({id: doc.id, ...doc.data()})
          setData(results)
          setPending(false)
        })
      }
    }, err => {
      setError(err.message)
      setPending(false)
    })

    return () =>  unsub()
  }, []);

  return (
    <div className='home'>
      {pending && <div className='loading'>Loading...</div>}
      {error && <div className='error'>{error}</div>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}
