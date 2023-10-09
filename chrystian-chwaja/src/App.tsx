import React from 'react';
import './App.css'
import Navbar from './components/Navbar';
import Content from './components/Content';

function App() {
  return (
    <div className='container'>
      <Navbar />
      <Content />
    </div>
  );
}

export default App;
