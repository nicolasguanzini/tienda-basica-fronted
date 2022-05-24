import React from 'react';
import "../styles/Hero.css"

const Hero = (props) => {
    return ( 
    
        <div className="hero-image">
            <div className="hero-text">
            <h3>DESCUENTOS DE INVIERNO</h3>
            <button onClick={()=>props.setMenu("Descuentos")}>Click aquí</button>
            </div>
            
        </div>

     );
}
 
export default Hero;