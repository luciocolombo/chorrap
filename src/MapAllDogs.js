import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import axios from 'axios';
import CustomMarker from './CustomMarker';

import UserBar from './UserBar';

function MapAllDogs() {
  const position = [-32.959676, -60.661406];
  const [info, setInfo] = useState({ data: [] }); //incluye toda la info de perros
  const [isLoading, setIsLoading] = useState(true);

  function afterAxios({ res }) {
    setInfo(res);
    setIsLoading(false);
  }
  useEffect(() => {
    axios.get('http://localhost:4000/dogs').then((res) => afterAxios({ res }));
  }, []);

  if (isLoading) {
    return <h1>LOADING</h1>;
  }

  return (
    <div>
      <UserBar seeAllDogs="disabled" />
      {/*  <div className="text-center my-5">
                <h2>Querés subir un perro perdido? <Link to="/"><Button className="btn-secondary" >Subir perro perdido</Button></Link></h2>
            </div>    */}
      <MapContainer
        className="mapcontainer"
        center={position}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/*   AQUI METO A TODOS LOS PERROS PERDIDOS */}

        {info.data[0].position !== undefined
          ? info.data.map((x, index) => {
              return (
                <CustomMarker
                  position={[
                    info.data[index].position.lat,
                    info.data[index].position.lng,
                  ]} /*  hoverText={info.data[index].email}  */
                  popUpText={
                    <ul>
                      <img
                        className="imagenperro"
                        alt="perro"
                        src={info.data[index].url}
                      ></img>

                      <li key={index}>
                        Email: {JSON.stringify(info.data[index].email)}
                      </li>
                      {info.data[index].blackColor ? (
                        <li key={index * 100}>Color: Negro</li>
                      ) : (
                        ''
                      )}
                      {info.data[index].redColor ? (
                        <li key={index * 200}>Color: Rojizo</li>
                      ) : (
                        ''
                      )}
                      {info.data[index].whiteColor ? (
                        <li key={index * 300}>Color: Blanco</li>
                      ) : (
                        ''
                      )}
                      {info.data[index].blondeColor ? (
                        <li key={index * 400}>Color: Rubio</li>
                      ) : (
                        ''
                      )}
                      {info.data[index].brownColor ? (
                        <li key={index * 500}>Color: Marron</li>
                      ) : (
                        ''
                      )}
                    </ul>
                  }
                />
              );
            })
          : ''}
      </MapContainer>

      {/* FILTRAR RESULTADOS DE MAPA */}
    </div>
  );
}

export default MapAllDogs;
