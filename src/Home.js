import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const Home = ({ szallasok, setSzallasok, isLoggedIn, fetchPending, setFetchPending }) => {

  const fetchData = async () => {
    await axios.get(`https://nodejs.sulla.hu/data`).then(async (response) => {
      await setSzallasok(response.data);
    })
  }

  const params = useParams();

  useEffect(() => {
    try {
      fetchData()
    } catch (error) {
      console.log(error);
    } finally {
      setFetchPending(false);
    }
  }, [fetchPending])

  return (
    <div className='container row'>
      {
        szallasok.map((szallas) => {
          return (
            isLoggedIn === true ?
              (<div key={szallas.id} className="card m-2" style={{ width: "18rem" }}>
                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/get/${szallas.id}`}>
                  <div className="card-body">
                    <h5 className="card-title">{szallas.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{szallas.hostname}</h6>
                    <p className="card-text">Location: {szallas.location}</p>
                    <p className="card-text">Price: {szallas.price}</p>
                    <p className="card-text">Minimum nights: {szallas.minimum_nights}</p>
                    <p className="card-text">{szallas.description}</p>
                  
                  </div>
                </Link>
                <Link to={`/delete/${szallas.id}`} type="button" className="btn btn-danger m-2">Törlés</Link>
                <Link to={`/put/${szallas.id}`} type="button" className="btn btn-warning m-2">Módosít</Link>

              </div>) : 
              (<div key={szallas.id} className="card m-2" style={{ width: "18rem" }}>
                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/get/${szallas.id}`}>
                  <div className="card-body">
                    <h5 className="card-title">{szallas.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{szallas.hostname}</h6>
                    <p className="card-text">Location: {szallas.location}</p>
                    <p className="card-text">Price: {szallas.price}</p>
                    <p className="card-text">Minimum nights: {szallas.minimum_nights}</p>
                    <p className="card-text">{szallas.description}</p>
                  </div>
                </Link>
              </div>)


          )
        })
      }
    </div>
  )
}

export default Home