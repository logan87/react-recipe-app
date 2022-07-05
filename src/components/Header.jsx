import { NavLink } from 'react-router-dom'
import user from '../images/user.png'

const Header = () => {
  return (
    <div className='header'>
      <NavLink to='/'>
        <div className='logo'>Recipe App</div>
      </NavLink>

      <div className='user-image'>
        <img src={user} alt='user' />
      </div>
    </div>
  )
}

export default Header
