import AdminFilms from "../components/AdminFilms";
import FilmCard from "../components/FilmCard";
import Profile from  '../components/Profile';

export default function Dashboard() {
      const storedUser = localStorage.getItem('user');
        const userInfo = storedUser ? JSON.parse(storedUser) : null;
     
return (
    <>
        <Profile />
        {userInfo?.role === 'admin' && <AdminFilms />}
        <FilmCard />
    </>
    )
}