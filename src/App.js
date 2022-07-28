import Home from "./pages/Home";
import Header from "./components/Header";
import StoreList from "./pages/StoreList";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MapPage from "./pages/MapPage";

function App() {
  return (
    <>
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/StoreList" element={<StoreList />}/>
        <Route path="/MapPage" element={<MapPage />}/>
      </Routes>

    </BrowserRouter>
    </>
  );
}

export default App;
