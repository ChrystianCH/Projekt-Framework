import { Link } from 'react-router-dom';

function Navbar() {
  return (<nav className='topnav'>
    <Link to={'/posts'}>Posts</Link>
    <Link to={'/comments'}>Comments</Link>
    <Link to={'/albums'}>Albums</Link>
    <Link to={'/photos'}>Photos</Link>
    <Link to={'/toDos'}>Todos</Link>
  </nav>);
}

export default Navbar;
