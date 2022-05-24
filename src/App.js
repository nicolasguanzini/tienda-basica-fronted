import './App.css';
import React, { useEffect } from "react";
import NavBar from './components/NavBar';
import Portada from './components/Portada';
import Hero from './components/Hero';
import Product from './components/Product';
import Proveedor from './components/context';

function App() {
  const [paginaActiva, setPaginaActiva] = React.useState("Home");
  const [item, setItem] = React.useState({});

  function setMenu(link){
    setPaginaActiva(link);
  }
  

  return (
    <div>
      <Proveedor>
      <NavBar paginaActiva={paginaActiva} setMenu={setMenu}/>
      {(paginaActiva === "Home") && <Hero setMenu={setMenu} />}
      {(paginaActiva === "Descripcion")? <Product item={item}/> : <Portada setItem={setItem} setMenu={setMenu} paginaActiva={paginaActiva}/>}
      </Proveedor>
    </div>
  );
}

export default App;
