import React from 'react';
import './App.css'
import { Navbar, Content } from './components/index';

function App() {
  
  return (
    <div className='container'>
      <div className='container--card'>
      <Navbar />
      <Content {...{}}/>
      </div>
    </div>
  );
}

export default App;
