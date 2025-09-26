import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../../axios.config.js";


export default function Login() {
    const email = useRef()
    const password = useRef()
    const navigate = useNavigate()

    function connexion(event) {
        event.preventDefault();  // formun sayfayı yenilemesini engeller
        axios.post(`/api/login`, {
            email: email.current?.value?.trim(),
            password: password.current?.value ?? ""
        }
        )

        const userData = res.data.user;

        // localStorage'a kaydet
        localStorage.setItem("user", JSON.stringify(userData));
        
        navigate('/dashboard');
     
        

    }


    return (
        <>
            <div className="wrapper">
                <main className="content">
                    <form onSubmit={connexion}>
                        <div className="container d-flex justify-content-center mt-5">
                            <div className=" p-4 border rounded bg-dark text-white">
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" ref={email} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" ref={password} />
                                </div>
                                <button type="submit" className="btn btn-outline-success w-100">Login</button>
                            </div>
                        </div>
                    </form>
                </main>

            </div>
        </>
    )
}