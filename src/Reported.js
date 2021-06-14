import { React, useState, useEffect } from 'react';
import axios from './services/api';
import UserBar from './UserBar';
import { Table } from 'react-bootstrap';
import DeleteBtn from './DeleteBtn';
import Footer from './Footer';
function Reported() {
  const [imageArray, setImageArray] = useState([]);
  const [colorArray, setColorArray] = useState([]);
  /*   const [positionArray, setPositionArray] = useState([]); */
  const [emailsArray, setEmailsArray] = useState([]);
  const [reportedDogs, setReportedDogs] = useState({});
  const [dogIdArray, setDogId] = useState([]);
  const [sizeArray, setSizeArray] = useState([]);
  const [sexArray, setSexArray] = useState([]);
  const [stateArray, setStateArray] = useState([]);

  function retrieveData() {
    /*     const instance = axios.create({
      withCredentials: true,
    }); */
    let userid = localStorage.getItem('userid'); ///
    axios
      .get(
        `/reported/${userid}`
        /* `http://localhost:4000/reported/${userid}` */
      )
      .then((res) => {
        setReportedDogs(res.data.dogs);
      });
  }
  useEffect(retrieveData, []);
  useEffect(defineArrays, [reportedDogs]);
  function defineArrays() {
    if (reportedDogs !== undefined) {
      let amountDogs = Object.keys(reportedDogs).length;
      let emailsArray = [];
      let positionArray = [];
      let imageArray = [];
      let colorArray = [''];
      let dogIdArray = [];
      let sizeArray = [];
      let sexArray = [];
      let stateArray = [];

      for (let x = 0; x < amountDogs; x++) {
        emailsArray = [...emailsArray, reportedDogs[x].email];
        positionArray = [...positionArray, reportedDogs[x].position];
        imageArray = [...imageArray, reportedDogs[x].url];
        dogIdArray = [...dogIdArray, reportedDogs[x]._id];
        sizeArray = [...sizeArray, reportedDogs[x].size];
        sexArray = [...sexArray, reportedDogs[x].sex];
        stateArray = [...stateArray, reportedDogs[x].estado];
        colorArray[x] = reportedDogs[x].colors;
        /*  if (reportedDogs[x].blackColor) {
          colorArray[x] = colorArray[x] ? colorArray[x] + ' Negro ' : 'Negro';
        }
        if (reportedDogs[x].whiteColor) {
          colorArray[x] = colorArray[x] ? colorArray[x] + ' Blanco ' : 'Blanco';
        }
        if (reportedDogs[x].redColor) {
          colorArray[x] = colorArray[x]
            ? colorArray[x] + ' Colorado '
            : 'Colorado';
        }
        if (reportedDogs[x].blondeColor) {
          colorArray[x] = colorArray[x] ? colorArray[x] + ' Rubio ' : 'Rubio';
        }
        if (reportedDogs[x].brownColor) {
          colorArray[x] = colorArray[x] ? colorArray[x] + ' Marrón ' : 'Marrón';
        } */
      }
      setEmailsArray(emailsArray);
      /*  setPositionArray(positionArray); */
      setImageArray(imageArray);
      setColorArray(colorArray);
      setDogId(dogIdArray);
      setSizeArray(sizeArray);
      setSexArray(sexArray);
      setStateArray(stateArray);
    } else {
      console.log('No hay perros registrados');
    }
  }

  return (
    <div className="overflow-scroll">
      <UserBar />
      <div className="container bg-white border shadow mt-4">
        <Table striped bordered hover className="table table-responsive mt-3">
          <thead>
            <tr>
              <th>Borrar</th>
              <th>#</th>
              <th>Email de contacto</th>
              <th>Imagen</th>
              <th>Colores</th>
              <th>Tamaño</th>
              <th>Sexo</th>
              <th>Estado</th>
              {/*  <th>Coordenadas</th> */}
            </tr>
          </thead>
          <tbody>
            {(() => {
              let renglones = [];
              for (let x = 0; x < emailsArray.length; x++) {
                renglones.push(
                  <tr>
                    <td className="align-middle">
                      <DeleteBtn dogId={dogIdArray[x]} />
                    </td>
                    <td className="align-middle" key={x}>
                      {x}
                    </td>
                    <td className="align-middle">{emailsArray[x]}</td>
                    <img
                      /*   className="align-middle" */
                      alt="perro"
                      className="col d-flex align-items-center justify-content-center"
                      src={imageArray[x]}
                    />
                    <td className="align-middle">{colorArray[x]}</td>
                    <td className="align-middle">{sizeArray[x]}</td>
                    <td className="align-middle">{sexArray[x]}</td>
                    <td className="align-middle">{stateArray[x]}</td>
                    {/* <td className="text-wrap align-middle">
                      {JSON.stringify(Object.values(positionArray)[x])}
                    </td> */}
                  </tr>
                );
              }
              return renglones;
            })()}
          </tbody>
        </Table>
        {reportedDogs ? (
          ''
        ) : (
          <p>Reporta tu primer perro perdido y ayuda a la comunidad a crecer</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Reported;
