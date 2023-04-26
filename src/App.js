import './App.css';
import { Route, Routes } from 'react-router-dom'
import History from './Pages/History'
import Home from './Pages/Home'
import Navbar from './Component/Navbar'
import { React, useContext, useReducer } from 'react';
import reducer from './Reducer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/history' element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
