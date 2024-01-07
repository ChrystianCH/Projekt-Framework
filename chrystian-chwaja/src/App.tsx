import './components/shared/shared.css'
import { Posts, Login, Navbar, ErrorPage, AddPost, EditPost, Todos, AddToDo, EditToDo, Photos, AddPhoto, EditPhoto, Comments, AddComment, EditComment, Albums, AddAlbum, EditAlbum } from './components/index';
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
    {
      path: '/photos/:albumId',
      element: <><Navbar /><Photos /></>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/photos/:albumId/addphoto',
          element: <AddPhoto />,
        },
        {
          path: '/photos/:albumId/editphoto/:photoId',
          element: <EditPhoto />,
        }
      ],
    },
    {
      path: '/comments/:postId',
      element: <><Navbar /><Comments /></>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/comments/:postId/addcomment',
          element: <AddComment />,
        },
        {
          path: '/comments/:postId/editcomment/:commentId',
          element: <EditComment />,
        }
      ],
    },
    {
      path: '/Albums',
      element: <><Navbar /><Albums /></>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/Albums/addalbum',
          element: <AddAlbum />,
        },
        {
          path: '/Albums/editalbum/:albumId',
          element: <EditAlbum />,
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
