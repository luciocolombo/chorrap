import React, {useState, useEffect} from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import axios from "axios"
import CustomMarker from "./CustomMarker"


function MapAllDogs() {
    
    const position = [-32.959676, -60.661406]
    const [info, setInfo]=useState({data:[]}) //incluye toda la info de perros 
    const [isLoading, setIsLoading]=useState(true);
    
     function afterAxios({res}){
        setInfo(res);
        setIsLoading(false);  
     }
     useEffect(()=>{
        axios.get("http://localhost:4000/dogs")
        .then(res=>afterAxios({res}))}
     ,[])
        
 if(isLoading){return(<h1>LOADING</h1>)}    

    return (
        <div>         
            <MapContainer className="mapcontainer" center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

              {/*   AQUI METO A TODOS LOS PERROS PERDIDOS */}
               
               
                 {info.data[0].position!=undefined?
                 info.data.map((x,index)=>{
                     return(
        
            
                    <CustomMarker position={[info.data[index].position.lat,info.data[index].position.lng]}   hoverText={info.data[index].email} 
                    popUpText={
                    <ul>
                        <li>Email: {JSON.stringify(info.data[index].email)}</li>
                        <li>Raza: {JSON.stringify(info.data[index].raza)}</li>
                        {info.data[index].blackColor?<li>Color: Negro</li>:console.log("no")}
                        {info.data[index].redColor?<li>Color: Rojizo</li>:console.log("no")}
                        {info.data[index].whiteColor?<li>Color: Blanco</li>:console.log("no")}
                        {info.data[index].blondeColor?<li>Color: Rubio</li>:console.log("no")}
                        {info.data[index].brownColor?<li>Color: Marron</li>:console.log("no")}
                    </ul>
                }  />
                     )
                }):console.log("NAN")}
            </MapContainer>     
        </div>
       
    )
}

export default MapAllDogs;