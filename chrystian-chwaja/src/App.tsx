import React from 'react';
import './App.css'
import { Navbar, Content, Login, Post } from './components/index';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {

//use params in  child
  const router = createBrowserRouter([
    {
      path: '/',
      element: <><Login /></>
    },
    {
      path: '/posts',
      element: <> <Navbar title={"Posts"} /><Post /></>// TODO: dodać icon
    },
    {
      path: '/comments',
      element: <> <Navbar title={"Comments"}/><Content /></>
    },
    {
      path: '/albums',
      element: <> <Navbar title={"Albums"}/><Content /></>
    },
    {
      path: '/photos',
      element: <> <Navbar title={"Photos"}/><Content /></>
    },
    {
      path: '/todos',
      element: <> <Navbar title={"Todos"}/><Content /></>
    },
    {
      path: '/users',
      element: <> <Navbar title={"Users"}/><Content /></>
    }
  ]);

  return (
    <div className='container'>
      <div className='container--card'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
