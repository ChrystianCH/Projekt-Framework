import { Link } from 'react-router-dom';

function Navbar() {
  return (<nav className='topnav'>
    <Link to={'/posts'}>Posts</Link>
    <Link to={'/albums'}>Albums</Link>
    <Link to={'/todos'}>Todos</Link>
    <Link to={'/'} onClick={() =>
      localStorage.removeItem('token')}>Sign out</Link>
  </nav>);
}

export default Navbar;
