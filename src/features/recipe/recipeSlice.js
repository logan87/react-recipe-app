import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import recipeApi from '../../common/apis/recipeApi'

export const getRecipeItems = createAsyncThunk(
  'recipe/getRecipeItems',
  async (queryText = 'Pasta', thunkAPI) => {
    const recipesNumber = 10
    try {
      const { data } = await recipeApi.get(
        `/complexSearch?query=${queryText}&number=${recipesNumber}&apiKey=${process.env.REACT_APP_RECIPES_API_KEY}`
      )
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response)
    }
  }
)

export const getAsyncRecipeDetail = createAsyncThunk(
  'recipe/getAsyncRecipeDetail',
  async id => {
    const { data } = await recipeApi.get(
      `/${id}/information?&apiKey=${process.env.REACT_APP_RECIPES_API_KEY}&includeNutrition=true.`
    )
    return data
  }
)

export const getSimilarRecipes = createAsyncThunk(
  'recipe/getSimilarRecipes',
  async id => {
    const { data } = await recipeApi.get(
      `/${id}/similar?number=5&apiKey=${process.env.REACT_APP_RECIPES_API_KEY}`
    )

    return data
  }
)

const initialState = {
  recipes: {},
  isLoading: true,
  selectedRecipe: {},
  similarRecipe: {}
}

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    removeSelectedRecipe: state => {
      state.selectedRecipe = {}
    }
  },
  extraReducers: {
    [getRecipeItems.pending]: state => {
      state.isLoading = true
    },
    [getRecipeItems.fulfilled]: (state, { payload }) => {
      console.log('Fetched Successfully!')
      state.isLoading = false
      state.recipes = payload
    },
    [getRecipeItems.rejected]: (state, { payload }) => {
      console.log(payload)
      state.isLoading = false
    },
    [getAsyncRecipeDetail.fulfilled]: (state, { payload }) => {
      console.log('Fetched Successfully!')
      return { ...state, selectedRecipe: payload }
    },
    [getSimilarRecipes.fulfilled]: (state, { payload }) => {
      console.log('Fetched Successfully!')
      return { ...state, similarRecipe: payload }
    }
  }
})

export const { removeSelectedRecipe } = recipeSlice.actions

export const getAllRecipes = state => state.recipes.recipes

export const getSelectedRecipe = state => state.recipes.selectedRecipe

export const getAllSimilarRecipes = state => state.recipes.similarRecipe

export default recipeSlice.reducer
