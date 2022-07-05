import { NavLink } from 'react-router-dom'

const MovieCard = ({ image, title, id }) => {
  return (
    <div className='card-item'>
      <NavLink to={`/recipe/${id}`}>
        <div className='card-inner'>
          <div className='card-top'>
            <img src={image} alt={title} />
          </div>
          <div className='card-bottom'>
            <div className='card-info'>
              <h4>{title}</h4>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  )
}

export default MovieCard
