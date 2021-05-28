import {React, useState} from 'react'
import axios from 'axios'
import UserBar from './UserBar'
import {Button, Table} from 'react-bootstrap'
function Reported() {

    const [reportedDogs, setReportedDogs]=useState({})
    function retrieveData(){
        let userid=localStorage.getItem('userid')?localStorage.getItem('userid'):'nodata'
        axios.get(`http://localhost:4000/reported/${userid}`)
        .then((res)=>setReportedDogs(res.data.dogs))
    }
    return (
    <div>
        <UserBar/>
        <div className="container">
            <Button onClick={retrieveData}>Retrieve data</Button>
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Color</th>
                    <th>Email contacto</th>
                    <th>Imagen</th>
                    <th>Posicion</th>
                </tr>
            </thead>
            <tbody>
                {reportedDogs.map((dog,index)=>{
                return(
                <tr>
                    <th>{index}</th>
                    <th>{(dog.redColor?"Colorado":'')
                       //  (dog.blackColor?"Negro":'')
                       // (dog.greyColor?"Gris":'')
                       // (dog.brownColor?"Marron":'')
                       // (dog.whiteColor?"Blanco":'') 
                        }</th>
                    <th>{dog.email}</th>
                    <th>{dog.url}</th>
                    <th>{JSON.stringify(dog.position)}</th>
                </tr>
            )    
            }
                )
                }
            </tbody>
        </Table>
        {console.log(reportedDogs)}
    </div>
    )
}

export default Reported
