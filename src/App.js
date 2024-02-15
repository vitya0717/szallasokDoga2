import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Admin from './Admin';
import LoginModal from './LoginModal';
import SzallasPost from './SzallasPost';
import SzallasSelect from './SzallasSelect';
import SzallasPut from './SzallasPut';
import SzallasDelete from './SzallasDelete';



function App() {

  let loginState = localStorage.getItem('loginState');

  loginState === null ? localStorage.setItem('loginState', false) : localStorage.getItem('loginState');;

  console.log(loginState);

  const [szallasok, setSzallasok] = React.useState([]);
  const [fetchPending, setFetchPending] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(loginState === 'true' ? true : false);

  const [username,] = React.useState("admin");
  const [password,] = React.useState("admin");
  
  return (
    <BrowserRouter>
      {
        <Navbar fetchPending={fetchPending} setFetchPending={setFetchPending} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} username={username} password={password} />
      }
      
      <Routes>
        <Route path="*" element={<Home szallasok={szallasok} setSzallasok={setSzallasok} isLoggedIn={isLoggedIn} setFetchPending={setFetchPending} fetchPending={fetchPending} />} />
        <Route path="/post" element={<SzallasPost szallasok={szallasok} setSzallasok={setSzallasok} setFetchPending={setFetchPending} fetchPending={fetchPending} />} />
        <Route path="/put/:szallasId" element={<SzallasPut szallasok={szallasok} setSzallasok={setSzallasok} isLoggedIn={isLoggedIn} setFetchPending={setFetchPending} fetchPending={fetchPending} />} />
        <Route path="/get/:szallasId" element={<SzallasSelect szallasok={szallasok} setSzallasok={setSzallasok} isLoggedIn={isLoggedIn} setFetchPending={setFetchPending} fetchPending={fetchPending} />} />
        <Route path="/delete/:szallasId" element={<SzallasDelete szallasok={szallasok} setSzallasok={setSzallasok} isLoggedIn={isLoggedIn} setFetchPending={setFetchPending} fetchPending={fetchPending} />} />
        <Route path="/login" element={<LoginModal setFetchPending={setFetchPending} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
