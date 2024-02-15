import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const SzallasPut = () => {
  const navigate = useNavigate();
  const param = useParams();

  const [formPendingFetch, setFormPendingFetch] = React.useState(true)
  const [selectedSzallas, setSelectedSzallas] = React.useState([])

  const [name, setName] = React.useState("")
  const [hostname, setHostname] = React.useState("")
  const [location, setLoc] = React.useState("")
  const [price, setPrice] = React.useState("")
  const [minimum_nights, setMinNights] = React.useState("")


  const fetchData = async () => {
    await axios.get(`https://nodejs.sulla.hu/data/${param.szallasId}`).then(async (response) => {
      setSelectedSzallas(response.data);
      setName(response.data.name)
      setHostname(response.data.hostname)
      setLoc(response.data.location)
      setPrice(response.data.price)
      setMinNights(response.data.minimum_nights)
    }).finally(() => setFormPendingFetch(false));
  }

  useEffect(() => {
    fetchData();
  }, [formPendingFetch]);

  const Name = (e) => {
    setName(e.target.value)
  }

  const Hostname = (e) => {
    setHostname(e.target.value)
  }

  const Loc = (e) => {
    setLoc(e.target.checked)
  }

  const Price = (e) => {
    setPrice(e.target.value)
  }

  const MinNights = (e) => {
    setMinNights(e.target.value)
  }

  return (
    <div className='container w-25 mt-5'>
      <form onSubmit={async (e) => {
        e.preventDefault();
        e.persist();

        const szallasNev = e.target.name.value
        const szallasHostname = e.target.hostname.value
        const szallasLocation = e.target.location.value
        const szallasPrice = e.target.price.value
        const szallasMinNights = e.target.minimum_nights.value

        const updateData = {
          id: selectedSzallas.id,
          name: szallasNev,
          hostname: szallasHostname,
          location: szallasLocation,
          price: szallasPrice,
          minimum_nights: szallasMinNights
        }
        await axios.put(`https://nodejs.sulla.hu/data/${param.szallasId}`, updateData).then(async () => {
          setFormPendingFetch(true);
          navigate('/');
        });

      }}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Név</label>
          <input type="text" onChange={Name} defaultValue={name} className="form-control" id="name" />
        </div>

        <div className="mb-3">
          <label htmlFor="hostname" className="form-label">Host név</label>
          <input type="text" onChange={Hostname} defaultValue={hostname} className="form-control" id="hostname" />
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">Hely</label>
          <input type="text" onChange={Loc} defaultValue={location} className="form-control" id="location" />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Ár</label>
          <input type="number" onChange={Price} defaultValue={price} className="form-control" id="price" />
        </div>

        <div className="mb-3">
          <label htmlFor="minimum_nights" className="form-label">Minimum éjszakák</label>
          <input type="text" onChange={MinNights} defaultValue={minimum_nights} className="form-control" id="minimum_nights" />
        </div>
        <button type="submit" className="btn btn-success m-2">Módosítás mentése</button>
        <button type="button" className="btn btn-warning m-2" onClick={() => navigate('/')}>Vissza</button>
      </form>
    </div>
  )
}

export default SzallasPut