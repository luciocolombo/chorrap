import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import axios from 'axios';
import CustomMarker from './CustomMarker';
import { Spinner } from 'react-bootstrap';

function MapAllDogs({ black, white, blonde, red, brown }) {
  const position = [-32.959676, -60.661406];
  const [info, setInfo] = useState({ data: [] }); //incluye toda la info de perros
  const [isLoading, setIsLoading] = useState(true);

  function afterAxios({ res }) {
    setInfo(res);
    setIsLoading(false);
  }
  useEffect(() => {
    const instance = axios.create({
      withCredentials: true,
    });
    instance
      .get(
        'http://localhost:4000/dogs || https://mascotasperdidasapi.herokuapp.com/dogs'
      )
      .then((res) => afterAxios({ res }));
  }, []);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div className="container-fluid">
      <div>
        {/*  <div className="text-center my-5">
                <h2>Querés subir un perro perdido? <Link to="/"><Button className="btn-secondary" >Subir perro perdido</Button></Link></h2>
            </div>    */}
        <div className="mb-5">
          <div className="overflow-hidden">
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

              {
                /* (async () => await */ info.data[0].position /* ) */
                  ? info.data.map((x, index) => {
                      return info.data[index].redColor === red &&
                        info.data[index].blackColor === black &&
                        info.data[index].whiteColor === white &&
                        info.data[index].blondeColor === blonde &&
                        info.data[index].brownColor === brown ? (
                        <CustomMarker
                          key={'custommarker' + index}
                          position={[
                            info.data[index].position.lat,
                            info.data[index].position.lng,
                          ]}
                          popUpText={
                            <ul key={'ul' + index}>
                              <img
                                key={'img' + index}
                                className="imagenperro"
                                alt="perro"
                                src={info.data[index].url}
                              ></img>

                              <li key={'email' + index}>
                                Email: {JSON.stringify(info.data[index].email)}
                              </li>
                              {info.data[index].blackColor ? (
                                <li key={'negro' + index}>Color: Negro</li>
                              ) : (
                                ''
                              )}
                              {info.data[index].redColor ? (
                                <li key={'rojo' + index}>Color: Rojizo</li>
                              ) : (
                                ''
                              )}
                              {info.data[index].whiteColor ? (
                                <li key={'blanco' + index}>Color: Blanco</li>
                              ) : (
                                ''
                              )}
                              {info.data[index].blondeColor ? (
                                <li key={'rubio' + index}>Color: Rubio</li>
                              ) : (
                                ''
                              )}
                              {info.data[index].brownColor ? (
                                <li key={'marron' + index}>Color: Marron</li>
                              ) : (
                                ''
                              )}
                            </ul>
                          }
                        />
                      ) : (
                        <p key={'p' + index}>No hay perros así</p>
                      );
                    })
                  : ''
              }
            </MapContainer>

            {/*ACa van las cartas con los perros  {info.data.map((x, index) => {
            return info.data[index].redColor === red && //estas condiciones son las de filtro de perros en el mapa
              info.data[index].blackColor === black &&
              info.data[index].whiteColor === white &&
              info.data[index].blondeColor === blonde &&
              info.data[index].brownColor === brown ? (
              
              <img src={info.data[index].url}></img>
            ) : (
              console.log('nanan')
            );
          })} */}
          </div>
        </div>
        {/* FILTRAR RESULTADOS DE MAPA */}
      </div>
    </div>
  );
}

export default MapAllDogs;
