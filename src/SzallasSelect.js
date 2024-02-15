import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const SzallasSelect = ({ isLoggedIn }) => {
    const param = useParams();

    const [isFetchPending, setFetchPending] = React.useState(true)
    const [szallas, setSelectedSzallas] = React.useState([])


    const fetchData = async () => {
        await axios.get(`https://nodejs.sulla.hu/data/${param.szallasId}`).then(async (response) => {
            setSelectedSzallas(response.data);
        }).finally(() => setFetchPending(false));
    }

    useEffect(() => {
        fetchData();
    }, [isFetchPending]);

    return (
        <div className='row container-fluid justify-content-center'>
            {
                isFetchPending ? <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                    <div className='spinner-border text-danger' />
                </div> :
                    <div key={szallas.id} className="card m-2" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">{szallas.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{szallas.hostname}</h6>
                            <p className="card-text">Location: {szallas.location}</p>
                            <p className="card-text">Price: {szallas.price}</p>
                            <p className="card-text">Minimum nights: {szallas.minimum_nights}</p>
                            <p className="card-text">{szallas.description}</p>
                        </div>
                        {isLoggedIn ? 
                        <div>
                        <Link to={`/delete/${szallas.id}`} type="button" className="btn btn-danger m-2">Törlés</Link>
                        <Link to={`/put/${szallas.id}`} type="button" className="btn btn-warning m-2">Módosít</Link>
                        </div>
                        : null}
                        
                        <Link to='/' className="btn btn-primary m-2">Vissza a főoldalra</Link>
                    </div>
            }
        </div>


    )
}

export default SzallasSelect