import React, { useEffect } from 'react';
import "../styles/Portada.css"

const Portada = (props) => {
  const [productos, setProductos] = React.useState([]);
  const [cargando, setCargando] = React.useState(true);

  useEffect(() => {

    setCargando(true);

  fetch("https://shopping-express-react-mongo2.nicolasguanzini.repl.co/api")
    .then(res=>res.json())
    .then((json)=>{
      
      if(props.paginaActiva === "Home"){
        setProductos(filtrar(json, "men's clothing", "women's clothing", 8));
      }else if(props.paginaActiva === "Electronics"){
        setProductos(filtrar(json, "electronics", "", 8));
      }else if(props.paginaActiva === "Mens"){
        setProductos(filtrar(json, "men's clothing", "", 8));
      }else if(props.paginaActiva === "Womens"){
        setProductos(filtrar(json, "women's clothing", "", 8));
      }else if(props.paginaActiva === "Jewelery"){
        setProductos(filtrar(json, "jewelery", "", 8));
      }else if(props.paginaActiva === "Descuentos"){
        setProductos(filtrar(json, "men's clothing", "women's clothing", 8));
      }
      setCargando(false);
    })
    .catch((error) => console.log(error)); 

  }, [props.paginaActiva]);

  function filtrar(arreglo, categoria1, categoria2, cantidad){
    let resultado = arreglo.filter((item) => {
      return ((item.category === categoria1) ||(item.category === categoria2));
    });
    resultado.splice(cantidad);
    return resultado;
  }

  function cantidadLetras(string){
    let separado = string.split("");
    separado.splice(30);
    let unido = separado.join("");
    return unido;
  }

  function enviarInfoADescripcion(item){
      props.setItem(item);
      props.setMenu("Descripcion");
  }

  return (
    <main>
      <div className="amazon">
        <h3>Productos Destacados</h3>
        {cargando && <h3 className="cargando">Cargando productos...</h3>}
        <div className="contprod">

      {productos.map((item, i) => {
          return (
            <div onClick={()=> enviarInfoADescripcion(item)} key={i} className="producto">
            <div className="imgcontainer">
              <img src={item.image} alt="" className="imgprod" />
              <div className="prodtitle">{cantidadLetras(item.title) + "..."}</div>
              <div className="price">{"$ " + item.price}</div>
            </div>
          </div>
          );
      })}
        </div>
        
        <footer className="footer">
          Todos los derechos reservados
        </footer>
      </div>

    </main>
  );
}

export default Portada;