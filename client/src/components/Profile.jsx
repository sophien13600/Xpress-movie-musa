import { useState } from "react";

export default function AccountInfo({ onUpdateUser, onUpdatePassword, onDeleteUser }) {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const [formData, setFormData] = useState({
        nom: user.nom || "",
        prenom: user.prenom || "",
        email: user.email || "",
        role: user.role || "abonne"
    });
    const [newPassword, setNewPassword] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser(formData);   // backend’e axios ile gönderilecek
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        onUpdatePassword(newPassword);
    };

    return (
        <div className="container mt-5 card shadow-sm p-4 bg-dark text-light border rounded">
            <h2 className="mb-4">Information de compte</h2>

            {/* --- User Info Update --- */}
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-12 col-md-6">
                        <label htmlFor="nom" className="form-label">Nom</label>
                        <input type="text" className="form-control" value={formData.nom} onChange={handleChange}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="prenom" className="form-label">Prenom</label>
                        <input type="text" className="form-control" value={formData.prenom} onChange={handleChange}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" value={formData.email} onChange={handleChange}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select className="form-select" value={formData.role} onChange={handleChange} >
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
            <form onSubmit={handlePasswordChange} className="mt-4">
                <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="Nouveau mot de passe" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                    <button type="submit" className="btn btn-warning mt-3"> Changer  </button>
                </div>
            </form>

            {/* --- Delete Account --- */}
            <div className="mt-5 p-3 border rounded bg-dark text-light d-flex align-items-center justify-content-between">
                <h5 className="text-danger mb-0">Supprimer votre compte</h5>
                <button className="btn btn-danger" onClick={() => onDeleteUser(user.id)} > Supprimer </button>
            </div>
        </div>
    );
}
