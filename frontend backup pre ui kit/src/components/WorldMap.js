import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import DraggableMarker from './DraggableMarker'



const WorldMap = () => {

    const offlineURL = './tiles/{z}/{x}/{y}.png';
    const position = [0, 0];

    return (
        <MapContainer center={position} zoom={2} style={{ height: "100vh" }}>
            <TileLayer url={offlineURL} noWrap={true} maxZoom={4} minZoom={2} />
            <DraggableMarker />


        </MapContainer>
    )
}

export default WorldMap