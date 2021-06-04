import { React, useState, useEffect } from 'react';
import axios from 'axios';
import UserBar from './UserBar';
import { Table } from 'react-bootstrap';
import DeleteBtn from './DeleteBtn';
function Reported() {
  const [imageArray, setImageArray] = useState([]);
  const [colorArray, setColorArray] = useState([]);
  const [positionArray, setPositionArray] = useState([]);
  const [emailsArray, setEmailsArray] = useState([]);
  const [reportedDogs, setReportedDogs] = useState({});
  const [dogIdArray, setDogId] = useState([]);

  function retrieveData() {
    const instance = axios.create({
      withCredentials: true,
    });
    let userid = localStorage.getItem('userid')
      ? localStorage.getItem('userid')
      : 'nodata';
    instance.get(`http://localhost:4000/reported/${userid}`).then((res) => {
      setReportedDogs(res.data.dogs);
    });
  }
  useEffect(retrieveData, []);
  useEffect(() => (reportedDogs ? defineArrays : ''), [reportedDogs]);
  function defineArrays() {
    let amountDogs = Object.keys(reportedDogs).length;
    let emailsArray = [];
    let positionArray = [];
    let imageArray = [];
    let colorArray = [''];
    let dogIdArray = [];
    for (let x = 0; x < amountDogs; x++) {
      emailsArray = [...emailsArray, reportedDogs[x].email];
      positionArray = [...positionArray, reportedDogs[x].position];
      imageArray = [...imageArray, reportedDogs[x].url];
      dogIdArray = [...dogIdArray, reportedDogs[x]._id];
      if (reportedDogs[x].blackColor) {
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
      }
    }
    setEmailsArray(emailsArray);
    setPositionArray(positionArray);
    setImageArray(imageArray);
    setColorArray(colorArray);
    setDogId(dogIdArray);
  }

  return (
    <div>
      <UserBar />
      <div className="container bg-white border shadow mt-4">
        <Table striped bordered hover className="table table-responsive mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Email de contacto</th>
              <th>Imagen</th>
              <th>Colores</th>
              <th>Coordenadas</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              let renglones = [];
              for (let x = 0; x < emailsArray.length; x++) {
                renglones.push(
                  <tr>
                    <td key={x}>{x}</td>
                    <td>{emailsArray[x]}</td>
                    <img
                      alt="perro"
                      className="col d-flex align-items-center justify-content-center"
                      src={imageArray[x]}
                    />
                    <td>{colorArray[x]}</td>
                    <td className="text-wrap">
                      {JSON.stringify(Object.values(positionArray)[x])}
                    </td>
                    <td>
                      <DeleteBtn dogId={dogIdArray[x]} />
                    </td>
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
    </div>
  );
}

export default Reported;
