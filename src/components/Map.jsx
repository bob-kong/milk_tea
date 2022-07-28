import React from 'react';
import {useMemo,useState,useEffect} from 'react';
import {GoogleMap, Marker} from "@react-google-maps/api";
import { useLoadScript } from '@react-google-maps/api';
import '../index.css'

const GOOGLE_MAP_API_KEY = "AIzaSyAuAUOK5qCIF10_U6HSzuDjAW0NWz461Y0";

async function getCoordinates(address,setCoordinate){
    const response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+ address +'&key='+ GOOGLE_MAP_API_KEY)
    const data = await response.json()
    const latitude = data.results[0].geometry.location.lat;
    const longitude = data.results[0].geometry.location.lng;
    setCoordinate({lat:latitude, lng:longitude});
}

const Map = (props) =>{
    const { isLoaded } = useLoadScript({ googleMapsApiKey:GOOGLE_MAP_API_KEY })
    const [coordinate,setCoordinate] = useState({ lat:22.3219035, lng:114.2200465 });

    useEffect(() => {
        getCoordinates(props.address,setCoordinate)
    },[props.address])
    
    //const center = useMemo( () => ( { lat:22.3219035, lng:114.2200465 } ), [] );

    if(!isLoaded) return <div>Loading</div>;
    return (

            <GoogleMap 
                zoom={14} 
                center={coordinate}
                mapContainerClassName="google_map_container"
                options={{
                    zoomControl:false,
                    streetViewControl:false,
                    mapTypeControl:false,
                    fullscreenControl:false
                }}
            >

                <Marker position={coordinate}/>
            
            </GoogleMap>
    );
}

export default Map;