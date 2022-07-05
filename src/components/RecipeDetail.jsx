import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  getAsyncRecipeDetail,
  getSelectedRecipe,
  removeSelectedRecipe,
  getAllSimilarRecipes,
  getSimilarRecipes
} from '../features/recipe/recipeSlice'

const RecipeDetail = () => {
  const { id } = useParams()

  const dispatch = useDispatch()
  const data = useSelector(getSelectedRecipe)
  const dataSimilar = useSelector(getAllSimilarRecipes)
  useEffect(() => {
    dispatch(getAsyncRecipeDetail(id))
    dispatch(getSimilarRecipes(id))
    return () => {
      dispatch(removeSelectedRecipe())
    }
  }, [dispatch, id])
  console.log(id)

  return (
    <div className='recipe-section'>
      {Object.keys(data).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <>
          <div className='recipe-info'>
            <div className='recipe-section'>
              <div className='section-left'>
                <div className='recipe-title'>{data.title}</div>
                <div
                  className='recipe-plot'
                  dangerouslySetInnerHTML={{ __html: `${data.summary}` }}
                ></div>
              </div>
              <div className='section-right'>
                <img src={data.image} alt={data.title} />
              </div>
            </div>
            <div className='recipe-wrapper'>
              <div className='recipe-list'>
                <h2>Similar Recipes</h2>
                <div className='recipe-container'>
                  {dataSimilar.map((item, id) => {
                    return (
                      <div className='card-item' key={id}>
                        <div className='card-inner'>
                          <div className='card-top'>
                            <img src={`${item.sourceUrl} `} alt={item.title} />
                          </div>
                          <div className='card-bottom'>
                            <div className='card-info'>
                              <h4>{item.title}</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default RecipeDetail
