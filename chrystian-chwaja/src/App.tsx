import './components/shared/shared.css'
import { Posts, Login, Navbar, ErrorPage, AddPost, EditPost, Todos, AddToDo, EditToDo } from './components/index';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
      errorElement: <ErrorPage />
    },
    {
      path: '/posts',
      element: <><Navbar /><Posts /></>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/posts/addpost',
          element: <AddPost />,
        },
        {
          path: '/posts/editpost/:postId',
          element: <EditPost />,
        }
      ],
    },
    {
      path: '/toDos',
      element: <><Navbar /><Todos /></>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/toDos/addtoDo',
          element: <AddToDo />,
        },
        {
          path: '/toDos/editToDo/:toDoId',
          element: <EditToDo />,
        }
      ],
    },
  ]);

  return (
    <div className='blog'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
