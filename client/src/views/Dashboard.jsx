import AdminFilms from "../components/AdminFilms";
import FilmCard from "../components/FilmCard";
import Profile from  '../components/Profile';
import { GlobalContext } from "../contexts/GlobalContext.jsx";
import { useContext} from "react";

export default function Dashboard() {
     
        const {userInfo} = useContext(GlobalContext)
        
     
return (
    <>
        <Profile />
        {userInfo?.role === 'admin' && <AdminFilms />}
        <FilmCard />
    </>
    )
}