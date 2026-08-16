import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserHome from "./pages/UserHome";
import ArtistHome from "./pages/ArtistHome";

import "./App.css";

function App() {

    return (

        <Routes>

            <Route path="/" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/user" element={<UserHome />} />

            <Route path="/artist" element={<ArtistHome />} />

        </Routes>

    );

}

export default App;