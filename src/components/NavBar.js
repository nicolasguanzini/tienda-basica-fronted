import React, { useEffect, useState } from 'react';
import '../styles/NavBar.scss';
import { MyContext } from './context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'

const NavBar = (props) => {
  const [clasesCarrito, setClasesCarrito] = React.useState('shopping-cart');
  const [estadoMovil, setestadoMovil] = React.useState("none");
  const con = React.useContext(MyContext);

  function handleClick() {
    if (clasesCarrito === 'shopping-cart') {
      setClasesCarrito('shopping-cart fade-in');
    } else if (clasesCarrito === 'shopping-cart fade-in') {
      setClasesCarrito('shopping-cart fade-out');
    } else {
      setClasesCarrito('shopping-cart fade-in');
    }
  }

  function cantidadLetras(string) {
    let separado = string.split('');
    separado.splice(20);
    let unido = separado.join('');
    return unido;
  }

  function menumovilFunc(){
    if(estadoMovil === "none"){
      setestadoMovil("block");
    }else{

      setestadoMovil("none");
    }
  }

  useEffect(() => {
    setestadoMovil("none");
  }, [props.paginaActiva])
  

  return (
    <div>
      <header>
        <div className="nav">

        

          <div className="menu">
            <h2 onClick={() => props.setMenu('Home')} className="titulo">
              NicoShop
            </h2>

            
            

            <span onClick={() => props.setMenu('Mens')}>MEN's CLOTHING</span>
            <span onClick={() => props.setMenu('Womens')}>
              WOMEN's CLOTHING
            </span>
            <span onClick={() => props.setMenu('Electronics')}>
              ELECTRONICS
            </span>
            <span onClick={() => props.setMenu('Jewelery')}>JEWELERY</span>
          </div>

          <div onClick={()=> menumovilFunc()} className="menumovil">
            <FontAwesomeIcon icon={faBars} />
          </div>

          <div onClick={() => handleClick()} className="carrito">
            <span>( {con.cantiItems} ) </span>
            <span>
              <img
                style={{ position: 'relative', width: '25px', top: '5px' }}
                src="https://i.ibb.co/nwQfwrm/logo.png"
                alt="logo"
              />
            </span>
          </div>
        </div>
      </header>

      <div style={{display: estadoMovil}}>
        
        <div className="contenedorMenuMovil2">
          <ul>
            <li  style={{cursor: "pointer", padding: "10px"}} onClick={() => props.setMenu('Mens')}>
            MEN's CLOTHING
            </li>
            <li style={{cursor: "pointer", padding: "10px"}} onClick={() => props.setMenu('Womens')}>
            WOMEN's CLOTHING
            </li>
            <li style={{cursor: "pointer", padding: "10px"}} onClick={() => props.setMenu('Electronics')}>
            ELECTRONICS
            </li>
            <li style={{cursor: "pointer", padding: "10px"}} onClick={() => props.setMenu('Jewelery')}>
            JEWELERY
            </li>
          </ul>
          </div>
      </div>

      <div className={clasesCarrito}>
        <div className="shopping-cart-header">
          <i className="fa fa-shopping-cart cart-icon"></i>
          <span className="badge">{con.cantiItems}</span>
          <div className="shopping-cart-total">
            <span className="lighter-text">{'Total: $'}</span>
            <span className="main-color-text">{con.totalCart}</span>
          </div>
        </div>

        <ul className="shopping-cart-items">
          {con.cart.map((item) => {
            return (
              <li key={item.id} className="clearfix">
                <img src={item.image} alt="item1" />
                <span className="item-name">
                  {cantidadLetras(item.title) + '...'}
                </span>
                <span className="item-price">{'$ ' + item.price}</span>
                <span className="item-quantity">
                  {'Cantidad: ' + item.cantidad}
                </span>
                <span className="masMenos">
                  <button onClick={() => con.modificar('mas', item)}>+</button>
                  <button onClick={() => con.modificar('menos', item)}>
                    -
                  </button>
                </span>
              </li>
            );
          })}
        </ul>

        <div className="button">Pagar</div>
      </div>
    </div>
  );
};

export default NavBar;
