import React from 'react'
import Map from '../components/Map';
import { useLocation } from 'react-router-dom';

const MapPage = () => {

    const location = useLocation();
    const store_data = location.state;
    const store_address = store_data.address
    console.log(store_address)

    return  <Map address={store_address} />

}

export default MapPage