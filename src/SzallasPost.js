import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SzallasPost = ({ setFetchPending }) => {
  const navigate = useNavigate();
  
  return (
    <div className='container'>
      <form onSubmit={async (e) => {
        e.preventDefault();
        e.persist();

        const name = e.target.name.value
        const hostname = e.target.hostname.value
        const location = e.target.location.value
        const price = e.target.price.value
        const minimum_nights = e.target.minimum_nights.value

        const postData = {

          name: name,
          hostname: hostname,
          location: location,
          price: price,
          minimum_nights: minimum_nights
        }
        await axios.post('https://nodejs.sulla.hu/data', postData).then(async () => {
          await setFetchPending(true);
        });
        alert("Szállás hozzáadva!")
        navigate('/')

      }}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Név</label>
          <input type="text" className="form-control" id="name" />
        </div>

        <div className="mb-3">
          <label htmlFor="hostname" className="form-label">Host név</label>
          <input type="text" className="form-control" id="hostname" />
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">Hely</label>
          <input type="text" className="form-control" id="location" />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Ár</label>
          <input type="number" className="form-control" id="price" />
        </div>

        <div className="mb-3">
          <label htmlFor="minimum_nights" className="form-label">Minimum éjszakák</label>
          <input type="number" className="form-control" id="minimum_nights" />
        </div>
        <button type="submit" className="btn btn-primary">Szállás hozzáadása</button>
      </form>
    </div>
  )
}

export default SzallasPost