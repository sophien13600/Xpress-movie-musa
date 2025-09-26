import { useRef } from "react";
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";

export default function Signup(){
    const nom= useRef();
    const prenom = useRef();
    const email = useRef();
    const password = useRef();
    const role = useRef();


    const navigate = useNavigate();
    
    function connexion(formData){

        axios
            .post(`/api/users`, formData)
        reset()
        navigate('/login')

    }

    return ( 
 
            <div className="wrapper">
                <main className="content mt-5">
                    <form onSubmit={connexion}>
                        <div className="container d-flex justify-content-center mt-5">
                            <div className=" p-4 border rounded bg-dark text-white">

                                <div className="mb-3 ">
                                    <label htmlFor="nom" className="form-label">Nom</label>
                                <input type="text" className="form-control" id="nom" ref={nom} />
                                </div>
                                <div className="mb-3 ">
                                    <label htmlFor="prenom" className="form-label">Prenom</label>
                                <input type="text" className="form-control" id="prenom" ref={prenom} />
                                </div>
                                <div className="mb-3 ">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" ref={email} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" ref={password} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="role" className="form-label">Role</label>
                                <select className="form-select" id="role" ref={role}>
                                        <option value="admin">Admin</option>
                                        <option value="abonne">Abonne</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-outline-success w-100">Enregistrer</button>
                            </div>
                        </div>
                    </form>

                </main>
            </div>
         
           
        
    )
}