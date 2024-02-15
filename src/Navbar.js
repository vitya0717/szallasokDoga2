import React from 'react'
import { Link } from 'react-router-dom'
import LoginModal from './LoginModal'
import { useNavigate } from 'react-router-dom'


const Navbar = ({ fetchPending, setFetchPending, isLoggedIn, setIsLoggedIn}) => {
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand" aria-current="page">Szállások</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {
                            isLoggedIn ? <li className="nav-item">
                            <Link to='/post' className="nav-link active" aria-current="page">Szállás hozzáadása</Link>
                            </li> : null
                        }
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item ">

                            {
                                isLoggedIn ? 
                                <Link onClick={() => {
                                    if(isLoggedIn){
                                        setIsLoggedIn(false);
                                        localStorage.setItem('loginState', false);
                                    } else {
                                        alert("Nincs bejelentkezve!")
                                    }
                                    
                                }} to={'/'} className="nav-link active" aria-current="page">Kijelentkezés</Link> : 
                                <Link to='/login' className="nav-link active" data-bs-toggle="modal" data-bs-target="#exampleModal" aria-current="page">Bejelentkezés</Link>
                            }
                            
                        </li>
                    </ul>
                </div>
                <LoginModal fetchPending={fetchPending} setFetchPending={setFetchPending} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </div>
        </nav>
    )
}

export default Navbar