import React from 'react'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { useNavigate } from 'react-router-dom'

const LoginModal = ({ setFetchPending, isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const [username, setUsername] = React.useState("admin");
    const [password, setPassword] = React.useState("admin");


    const setUsernameHandler = (event) => {
        setUsername(event.target.value);
    }

    const setPasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Bejelentkezés</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            if (e.target[0].value === "admin" && e.target[1].value === "admin") {
                                localStorage.setItem('loginState', true);
                                var myModalEl = document.getElementById('exampleModal');
                                var modal = bootstrap.Modal.getInstance(myModalEl)
                                setFetchPending(true);
                                modal.hide();
                                navigate('/');
                                setIsLoggedIn(true);
                            } else {
                                alert("Hiba a bejelentkezési adatokban!");
                            }
                        }
                        }>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" value={username} onChange={setUsernameHandler} className="form-control" id="username" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" value={password} onChange={setPasswordHandler} className="form-control" id="password" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal