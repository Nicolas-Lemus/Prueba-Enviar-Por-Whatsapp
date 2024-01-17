/* import React from 'react'
import Headers from '../components/Headers/Headers'
import ControlledCarousel from '../components/Carousels/ControlledCarousel';
import Welcome from '../components/Welcome/Welcome';


const Home = () => {
    return (
        <div>
            <Headers HeadersH1="Tienda Fashion"/>
            <ControlledCarousel/>
            <Welcome/>
        </div>
    )
};

export default Home;

 */

import React, { useState } from 'react';
import Headers from '../components/Headers/Headers';
import ControlledCarousel from '../components/Carousels/ControlledCarousel';
import Welcome from '../components/Welcome/Welcome';

const Home = () => {
  const [showAlert, setShowAlert] = useState(true);

  const handleAccept = () => {
    setShowAlert(false);
  };

  return (
    <div>
        {showAlert && (
            <div className="alert">
                <p>Esta página no es una página de compras</p>
                <p>Puede realizar sus consultas mediante WhatsApp</p>
                <button onClick={handleAccept}>Aceptar</button>
            </div>
        )}

        <Headers HeadersH1="Tienda Fashion" />      
        <ControlledCarousel />
        <Welcome />
    </div>
  );
};

export default Home;
