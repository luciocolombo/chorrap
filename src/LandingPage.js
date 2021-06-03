import React from 'react';
import Navbarr from './Navbarr';
function LandingPage() {
  return (
    <div className="landingpage d-flex flex-column ">
      <div className="row  col d-flex flex-column justify-content-center align-items-center ">
        <h1> Encuentra tu mascota perdida en Rosario</h1>
        <h2>Tu mascota te espera!</h2>
        <Navbarr />
      </div>

      {/* <div className="d-flex justify-content-center border col-8">
        <h1 className="text-light">
          Encuentra a tu mascota perdida en Rosario
        </h1>

        <div
          className="btn-group mt-2 mb-4"
          role="group"
          aria-label="actionButtons"
        >
          <div>
            
          </div>
          <div>
            
          </div>
        </div>
      </div>
      <div>
        <h2>
          Esta aplicacion sin ánimos de lucro busca facilitar el proceso de
          búsqueda de mascotas perdidas
        </h2>
      </div> */}
    </div>
  );
}

export default LandingPage;
