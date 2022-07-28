import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import Searchbar from "../components/Searchbar";

//Get Unqiue Value in an array
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

//------------------------------------------------------------------------------------------------------------------\\
//-------------------------------------------------Main Page Function------------------------------------------------||
//------------------------------------------------------------------------------------------------------------------//
function Home() {
  const [storeData, setStoreData] = useState(null);
  const [query, setQuery] = useState("")

  useEffect(() => {
    axios.get("https://irestaurant.hk-booking.com/wp-logout.php").then((response) => {
      setStoreData(response.data);
    });
  }, []);


  //After fetching API
    if (!storeData) return <div>Loading</div>;

  // Get Store Name in an array
    let storeName_duplicated = storeData.map(e => e.name);

    let storeName = storeName_duplicated.filter(onlyUnique);
    

    return (
        <div className="HomePageContainer">
            <Searchbar 
                type="text" 
                className="form-control mb-2 fs-5" 
                placeholder="搜尋名稱" 
                onChange={ e => setQuery(e.target.value)}
            />
            {storeName.filter(
                e => e.includes(query)
            ).map( 
               (name,index) => 
                    <ul className="list-group list-group-flush" key={index}>
                      <Link 
                        to="/StoreList" 
                        state={name} 
                        style={{ textDecoration: 'none' }}
                    >
                            <li className="list-group-item">
                                { index + 1 + ". " + name}
                            </li>
                      </Link>
                  </ul>
            )}
        </div>
    );
}

export default Home;