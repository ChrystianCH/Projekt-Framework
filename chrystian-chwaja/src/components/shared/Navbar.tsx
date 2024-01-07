import { Link } from 'react-router-dom';

function Navbar() {
  return (<nav className='topnav'>
    <Link to={'/posts'}>Posts</Link>
    <Link to={'/albums'}>Albums</Link>
    <Link to={'/toDos'}>Todos</Link>
  </nav>);
}

export default Navbar;
