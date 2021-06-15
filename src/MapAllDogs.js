import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import axios from './services/api';
import CustomMarker from './CustomMarker';
import { Spinner, Button } from 'react-bootstrap';

function MapAllDogs({
  black,
  white,
  blonde,
  red,
  brown,
  sex,
  size /* , estado */,
  /* exactColors, */
}) {
  const position = [-32.959676, -60.661406];
  const [info, setInfo] = useState({ data: [] }); //incluye toda la info de perros
  const [isLoading, setIsLoading] = useState(true);

  function afterAxios({ res }) {
    setInfo(res);
    setIsLoading(false);
  }

  /* useEffect(() => axios.get('/dogs').then((res) => afterAxios({ res })), []); */ //SIN ESTO SE ROMPE, PERO BUSCA TODOS LOS PERROS. EL QUERY ES CON LO DE ABAJO
  function clickSearch() {
    let colors = [];
    if (black) {
      colors.push('black');
    }
    if (white) {
      colors.push('white');
    }
    if (red) {
      colors.push('red');
    }
    if (brown) {
      colors.push('brown');
    }
    if (blonde) {
      colors.push('blonde');
    }
    console.log(colors);
    axios
      .get(`/dogs/search?colors=${colors}&size=${size}&sex=${sex}`)
      /*  .then((res) => ; */ //aca es donde cambie dogs por dog/search para q la query la haga el backend
      .then((res) =>
        res.data[0] ? afterAxios({ res }) : alert('Sin resultados')
      );
  }

  if (isLoading) {
    return (
      <div>
        <Button className="d-block" onClick={() => clickSearch()}>
          {' '}
          BUSCAR
        </Button>
        {/* <Spinner className="mt-5 mb-2" animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> */}
      </div>
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
            <Button onClick={() => clickSearch()}> BUSCAR</Button>

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

              {!isLoading && info.data[0].position ? (
                info.data.map((x, index) => {
                  return (
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
                          <li key={'fecha' + index}>
                            Fecha:{' '}
                            {JSON.stringify(info.data[index].date).substr(
                              1,
                              10
                            )}
                          </li>
                          <li key={'estado' + index}>
                            Estado:
                            {info.data[index].estado}
                          </li>
                          <li key={'sex' + index}>
                            Sexo:
                            {info.data[index].sex}
                          </li>
                          <li key={'email' + index}>
                            Contacto: {info.data[index].email}
                          </li>
                          <li key={'size' + index}>
                            Tamaño: {info.data[index].size}
                          </li>

                          <li key={'colors' + index + Math.random()}>
                            {info.data[index].colors}
                          </li>
                        </ul>
                      }
                    />
                  );
                })
              ) : (
                <p>Nada aun</p>
              )}
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
