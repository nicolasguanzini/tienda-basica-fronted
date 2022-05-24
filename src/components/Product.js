import React from 'react';
import '../styles/Product.css';
import { MyContext } from './context';

const Product = (props) => {
  const [cantidad, setCantidad] = React.useState('0');
  const con = React.useContext(MyContext);

  const handleChange = (event) => {
    setCantidad(event.target.value);
  };

  return (
    <div className="productoContenedor">
      <div className="columnaImagen">
        <img className="imagengrande" src={props.item.image} alt="" />
      </div>
      <div className="columnaInformacion">
        <div className="rating">
          <u>RATING:</u>{' '}
          {props.item.rating.rate +
            '- Cantidad de votos: ' +
            props.item.rating.count}
        </div>
        <div className="informacionProducto">
          <h3 className="tituloProducto">{props.item.title}</h3>
          <div className="precioProducto">{'$ ' + props.item.price}</div>
          <div className="cantidadYADD">
            <div className="cantidad">Cantidad</div>
            <div className="formulario">
              <input
                onChange={handleChange}
                type="number"
                id="cantidad"
                className="entrada-cantidad"
              />
              <button
                onClick={() => con.handleClick(props.item, cantidad)}
                className="addcart"
              >
                Agregar Carrito
              </button>
            </div>
          </div>
          <div className="descripcion">
            <p>{props.item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
