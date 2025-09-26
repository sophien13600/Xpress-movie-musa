import { Route, Routes } from "react-router-dom"
import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import Home from "../views/Home"
import Favori from "../views/Favori"
import Signup from "../views/Signup"
import Login from "../views/Login"
import Dashboard from "../views/Dashboard"



const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favori" element={<Favori />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />

        </Routes>

    )
}

export default AppRoutes;