import React from "react";
import { useLocation,Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import Searchbar from "../components/Searchbar";
import axios from "axios";

function StoreList() {
    const location = useLocation();
    const store_name = location.state;
    const [storeData, setStoreData] = useState(null);
    const [query,setQuery] = useState("");
    
    useEffect(() => {
        axios.get("https://irestaurant.hk-booking.com/wp-logout.php").then((response) => {
          let StoreList = response.data.filter((e) => {return e.name === store_name})
          setStoreData(StoreList)  
        });
    }, [store_name]);

    if (!storeData) return <div> Loading </div> 

    return (
        <div className="Store_List_Page_Container">
            <Searchbar 
                type="text" 
                className="form-control mb-2 fs-5" 
                placeholder="搜尋地區" 
                onChange={ e => setQuery(e.target.value)}
            />
            {storeData.filter( 
                e => e.address.includes(query)
            ).map( 
                (store,index) => (
                    <Link 
                        to="/MapPage" 
                        state={store} 
                        style={{ textDecoration: 'none'}}
                        key={index}
                    >
                        <div className="card">
                            <div className="card-body">
                              <div className="card-title fs-4 text-dark">{store.name}</div>
                              <div className="card-subtitle mb-2 text-muted">{store.address}</div>
                              <div className="card-text text-body">營業時間: {store.opening_hour}</div>
                              <div className="card-text text-body">聯絡電話: {store.phone}</div>
                            </div>
                        </div>  
                    </Link>
                )
                
            )}
        </div>
    );
  }

export default StoreList;