import React,{} from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import Profile from './pages/Profile/Profile';
import Home from "./pages/home/Home"
import Auth from './pages/Auth/Auth';
import {Provider} from "react-redux"
import store from "./Redux/store.js"


function App() {
  return (
    <div className="App">
      <div className="blur" style={{top: '-18%',right:'0'}}></div>
      <div className="blur" style={{top:"36%",left:"-8rem"}}></div>
      <Provider store={store}>
      <BrowserRouter >
          <Routes >
              <Route path='/' element={<Auth />} />
              <Route path='/home' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
          </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
