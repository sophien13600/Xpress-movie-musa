import { useNavigate } from "react-router-dom";
import axios from "../../axios.config";
import { useRef, useState, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext.jsx";

export default function AccountInfo({  onDeleteUser }) {
    const { userInfo, setUserInfo } = useContext(GlobalContext);

    const navigate = useNavigate()
    const password = useRef()

    const [formData, setFormData] = useState({
        nom: userInfo?.nom || "",
        prenom: userInfo?.prenom || "",
        email: userInfo?.email || "",
        role: userInfo?.role || "abonne"
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
             await axios.put(`/api/update_profil`,{
                formData:formData,
                 userId: userInfo.id
            })          
            const res =await axios.get(`api/user/${formData.email}`)
            const updatedUser = res.data.user;
            setUserInfo(updatedUser);
            alert('Profil updated')
            navigate('/dashboard');
            
        } catch (error) {
            console.error(error);
            alert('Profil could not be updated')
            navigate('/dashboard');
        }
         
    };

    const chanchePassword = async (e) => {
        e.preventDefault();
        console.log('user: ', userInfo.id, 'pass :', password.current.value);
        
        try {
            await axios.put(`/api/password/`, {
                userId: userInfo.id,
                pass: password.current.value
            })
            alert('Password updated')
         
        } catch (error) {
            console.error(error);
            alert('Password could not be updated')
            navigate('/dashboard');
        }

    };

    async function onDeleteUser(id) {
        try {
            await axios.delete(`/api/delete_films/${id}`)
            await axios.delete(`/api/delete_user/${id}`)

            localStorage.removeItem('user');
            alert('Profil deleted')
            navigate('/signup')
        } catch (error) {
            console.error(error);
            alert('Profil could not be deleted')
            navigate('/dashboard');
        }

    }

    return (
        <div className="container mt-5 card shadow-sm p-4 bg-dark text-light border rounded">
            <h2 className="mb-4">Information de compte</h2>

            {/* --- User Info Update --- */}
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-12 col-md-6">
                        <label htmlFor="nom" className="form-label" >Nom</label>
                        <input type="text" className="form-control" name='nom' value={formData.nom} onChange={handleChange}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="prenom" className="form-label" >Prenom</label>
                        <input type="text" className="form-control" name='prenom' value={formData.prenom} onChange={handleChange}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={formData.email} onChange={handleChange}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="role" className="form-label" >Role</label>
                        <select className="form-select" name='role' value={formData.role} onChange={handleChange} >
                            <option value="admin">Admin</option>
                            <option value="abonne">Abonne</option>
                        </select>
                    </div>
                </div>

                <div className="d-flex mt-4 gap-3">
                    <button type="submit" className="btn btn-success flex-fill">  Modifier </button>
                </div>
            </form>

            {/* --- Password Change --- */}
            <form onSubmit={chanchePassword} className="mt-4">
                <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="Nouveau mot de passe" ref={password} />
                    <button type="submit" className="btn btn-warning mt-3"> Changer  </button>
                </div>
            </form>

            {/* --- Delete Account --- */}
            <div className="mt-5 p-3 border rounded bg-dark text-light d-flex align-items-center justify-content-between">
                <h5 className="text-danger mb-0">Supprimer votre compte</h5>
                <button className="btn btn-danger" onClick={() => onDeleteUser(userInfo.id)} > Supprimer </button>
            </div>
        </div>
    );
}
