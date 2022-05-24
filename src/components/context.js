import React, { useEffect, useState } from 'react';

export const MyContext = React.createContext('');

const Proveedor = (props) => {
  const [cart, setCart] = useState(parseJson());
  const [cantiItems, setCantItems] = useState(0);
  const [totalCart, setTotalCart] = useState('0');

  function parseJson(){
    try {
      if(JSON.parse(window.localStorage.getItem("cart")) == null){
        return [];
      }else{
        return JSON.parse(window.localStorage.getItem("cart"));
      } 
    } catch(ex){
      return [];
    }
    }

  function handleClick(item, cantidad) {
    if (cart.filter((e) => e.id === item.id).length > 0) {
    } else if (cantidad === '0') {
    } else {
      let nuevo = { ...item };
      nuevo['cantidad'] = cantidad;
      window.localStorage.setItem("cart", JSON.stringify([...cart, nuevo]));
      setCart([...cart, nuevo]);
    }
  }

  function quitarItem(item) {
    for (let i = 0; i < cart.length; i++) {
      if (item.id === cart[i].id) {
        let clon = [...cart];
        clon.splice(i, 1);
        window.localStorage.setItem("cart", JSON.stringify(clon));
        setCart(clon);
      }
    }
  }

  function modificar(selector, item) {
    for (let i = 0; i < cart.length; i++) {
      if (item.id === cart[i].id) {
        let cantidad = 0;
        if (selector === 'mas' && cart[i].cantidad < 99) {
          cantidad = parseInt(cart[i].cantidad) + 1;
        } else if (selector === 'menos' && cart[i].cantidad >= 0) {
          cantidad = parseInt(cart[i].cantidad) - 1;
          if (cantidad === 0) {
            quitarItem(item);
            return;
          }
        }

        let clon = [...cart];
        clon[i].cantidad = cantidad;
        window.localStorage.setItem("cart", JSON.stringify(clon));
        setCart(clon);
      }
    }
  }

  useEffect(() => {
    let total = cart.length;

    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
      sum += Math.round(cart[i].price * cart[i].cantidad);
    }

    setTotalCart(sum.toString());
    setCantItems(total.toString());
  }, [cart]);

  return (
    <MyContext.Provider
      value={{ handleClick, cart, setCart, cantiItems, totalCart, modificar }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default Proveedor;