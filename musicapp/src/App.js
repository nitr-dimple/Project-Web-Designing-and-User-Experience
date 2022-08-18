import React from 'react';
import './App.scss';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Signup/Signup.js';
import Dashboard from './Pages/Dashboard/Dashboard';
import Auth from './Components/Auth';
import 'bootstrap/dist/css/bootstrap.css';
import authentication from './config';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Playlists from './Pages/Playlists/Playlists';
import UserPlaylist from './Pages/UserPlaylist/UserPlaylist';
import Home from './Pages/Dashboard/Dashboard';
import Favorite from './Pages/Favorites/Favorites'


const code = new URLSearchParams(window.location.search).get("code");

class App extends React.Component{

    render() {

    return (
        <div>
			<BrowserRouter>
            <Routes>
                <Route path="/"  element={<Login></Login>} />
				<Route path="/login"  element={<Login></Login>} />
				<Route path="/register"  element={<Register></Register>} />
                {/* {localStorage.token === "tokenExpired" &&<Route path="/login"  element={<Login></Login>} />} */}
                {localStorage.token !== "tokenExpired" && localStorage.token !== undefined &&<Route path="/dashboard"  element={<Dashboard></Dashboard>} />}
                
                {/* <Route path="/dashboard"  element={<Dashboard></Dashboard>} /> */}
                
                <Route path="/playlists" element={<Playlists></Playlists>}/>
                <Route path="/favorites" element={<Favorite></Favorite>}/>
                <Route path="/userplaylist"  element={<UserPlaylist></UserPlaylist>} />
                <Route path="/home"  exact element={<Home/>}/>
                
                
                {/* <Route path="/" element={code ? <Auth code={code} /> : <Login />} />  */}
            </Routes>
			
			</BrowserRouter>
             {/* {code ? <Auth code={code} /> : <Login />} */}
		</div>

    );
    }
}

export default App;