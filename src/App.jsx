import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import RecipeDetail from './components/RecipeDetail'
import Footer from './components/Footer'
import PageNotFound from './components/PageNotFound'

function App () {
  return (
    <div className='app'>
      <Router>
        <Header></Header>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/recipe/:id' element={<RecipeDetail />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  )
}
export default App
