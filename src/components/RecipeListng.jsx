import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import RecipeItem from './RecipeItem'
import { getAllRecipes } from '../features/recipe/recipeSlice'

const RecipeContaner = () => {
  const { isLoading } = useSelector(state => state.recipes)
  const { results } = useSelector(getAllRecipes)

  const [filteredRecipes, setFilteredRecipes] = useState(results)
  const [searchField, setSearchField] = useState('')

  console.log(results)

  useEffect(() => {
    const newfilteredRecipes = results.filter(recipe => {
      return recipe.title.toLocaleLowerCase().includes(searchField)
    })

    setFilteredRecipes(newfilteredRecipes)
  }, [results, searchField])

  const onSearchChangee = e => {
    const searchFieldString = e.target.value.toLocaleLowerCase()

    setSearchField(searchFieldString)
  }

  if (isLoading) {
    return (
      <div className='loading'>
        <h1 className='title'>Loading...</h1>
      </div>
    )
  }

  const renderRecipe = filteredRecipes.map((recipe, id) => (
    <RecipeItem key={id} {...recipe} />
  ))

  return (
    <div className='recipe-wrapper'>
      <input
        className={`search-box`}
        type='text'
        value={searchField}
        placeholder='Search User'
        onChange={onSearchChangee}
      />
      <div className='recipe-list'>
        <h2>Recipes</h2>
        <div className='recipe-container'>{renderRecipe}</div>
      </div>
    </div>
  )
}

export default RecipeContaner
