import './components/shared/shared.css'
import { Post, Login, Navbar, ErrorPage, AddPost, EditPost } from './components/index';
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
      element: <><Navbar /><Post /></>,
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
  ]);

  return (
    <div className="blog">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
