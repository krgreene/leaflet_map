import React, { useEffect } from 'react';
import L from 'leaflet';

function Map() {  
    
    useEffect(() => {
        L.map('map', {
            center: [13.134660, -59.629543],
            zoom: 16,
            layers: [
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }),
                L.marker([13.134660, -59.629543])
                    .bindPopup('The UWI <br/>Cave Hill Campus <br/> Barbados'),
                L.marker([13.13328777,-59.63296816])
                    .bindPopup('Chicken Barn')
            ]
        });   
    }, []);

    return (
        <div id={'map'}></div>
    )

}
export default Map;
