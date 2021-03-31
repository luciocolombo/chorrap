import React, {useState, useEffect} from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import axios from "axios"
import CustomMarker from "./CustomMarker"


function MapAllDogs() {
    
    const position = [-32.959676, -60.661406]
    const [info, setInfo]=useState("") //incluye toda la info de perros 
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
                <CustomMarker position={position} hoverText="Hover text" popUpText="text"/>
                   
            </MapContainer>     
        
        {info.data.map((x,index)=>{
            console.log(info.data[index].raza)
        })}

         {info.data!=undefined?
         info.data.map((x,index)=>{
             <ul>
             <li>{info.data[index].raza}</li>
             </ul>
            })
         :"No data to show"}
        </div>
    )
}

export default MapAllDogs;