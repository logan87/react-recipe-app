import React, { useEffect, useState } from 'react'
import RecipeListing from './RecipeListng'

import { useDispatch } from 'react-redux'
import { getRecipeItems } from '../features/recipe/recipeSlice'

const Home = () => {
  const dispatch = useDispatch()
  const [query, setQuery] = useState('')

  useEffect(() => {
    dispatch(getRecipeItems())
  }, [dispatch])

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(getRecipeItems(query))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className={`search-box`}
          type='text'
          value={query}
          placeholder='Enter Recipe Name'
          onChange={e => setQuery(e.target.value)}
        />
      </form>

      <RecipeListing />
    </div>
  )
}

export default Home
