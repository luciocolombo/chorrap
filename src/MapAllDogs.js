import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import axios from './services/api';
import CustomMarker from './CustomMarker';
import { Button } from 'react-bootstrap';

function MapAllDogs({
  black,
  white,
  blonde,
  red,
  brown,
  sex,
  size,
  date,
  date2 /* , estado */,
  /* exactColors, */
}) {
  const position = [-32.959676, -60.661406];
  const [info, setInfo] = useState({ data: [] }); //incluye toda la info de perros
  const [isLoading, setIsLoading] = useState(true);
  const [btnEnabled, setBtnEnabled] = useState(true);
  function afterAxios({ res }) {
    setInfo(res);
    setIsLoading(false);
  }
  useEffect(
    () => (date > date2 ? setBtnEnabled(false) : setBtnEnabled(true)),
    [date, date2]
  );
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
    if (colors.length !== 0) {
      axios
        .get(
          `/dogs/search?colors=${colors}&size=${size}&sex=${sex}&date=${date}&date2=${date2}`
        )
        /*  .then((res) => ; */ //aca es donde cambie dogs por dog/search para q la query la haga el backend
        .then((res) =>
          res.data[0] ? afterAxios({ res }) : alert('Sin resultados')
        );
    } else {
      alert('Elija algun color para la busqueda');
    }
  }

  if (isLoading) {
    return (
      <div>
        {btnEnabled ? (
          <Button
            className=" w-75 d-block button1 btn btn-success mb-4"
            onClick={() => clickSearch()}
          >
            BUSCAR
          </Button>
        ) : (
          <Button className="d-block disabled " disabled>
            BUSCAR
          </Button>
        )}
      </div>
    );
  }

  return (
    <div /*className= "container-fluid" */>
      <div>
        {/*  <div className="text-center my-5">
                <h2>Querés subir un perro perdido? <Link to="/"><Button className="btn-secondary" >Subir perro perdido</Button></Link></h2>
            </div>    */}
        <div className="mb-5">
          <div className="overflow-hidden">
            <Button
              className="w-75 d-block button1 btn btn-success"
              onClick={() => clickSearch()}
            >
              {' '}
              BUSCAR
            </Button>

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
                          <div className="text-center mb-1">
                            <img
                              key={'img' + index}
                              className="imagenperro"
                              alt="perro"
                              src={info.data[index].url}
                            ></img>
                          </div>
                          <li key={'fecha' + index}>
                            <strong>Fecha: </strong>
                            {JSON.stringify(info.data[index].date).substr(
                              1,
                              10
                            )}
                          </li>
                          <li key={'estado' + index}>
                            <strong>Estado: </strong>
                            {info.data[index].estado}
                          </li>
                          <li key={'sex' + index}>
                            <strong>Sexo:</strong>
                            {info.data[index].sex}
                          </li>
                          <li key={'email' + index}>
                            <strong>Contacto:</strong> {info.data[index].email}
                          </li>
                          <li key={'size' + index}>
                            <strong> Tamaño:</strong> {info.data[index].size}
                          </li>
                          <li key={'commentary' + index}>
                            <strong>Comentario:</strong>{' '}
                            {info.data[index].commentary}
                          </li>

                          {/*  <li key={'colors' + index + Math.random()}>
                            {info.data[index].colors}
                          </li> */}
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
