import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import restaurantIcon from '../graphics/restaurant_marker.png'

function Map() {

    const info = {
        chickenbarn: {
            Name: 'Chicken Barn',
            Type: 'Fast Food Restaurant',
            About: 'Now with 6 Locations to serve you the best chicken in Barbados!',
            Phone: '(246) 623-2276',
            Messenger: 'm.me/chickenbarnrestaurants',
            Email: 'chickenbarnbarbados@gmail.com',
            Attire: 'Casual Attire'
        }, 
        uwi: {
            Name: 'UWI Cave Hill Campus',
            Type: 'Educational Institution',
            About: 'The University of the West Indies, Cave Hill Campus',
            Phone: '(246) 417-4000',
            Messenger: 'm.me/UWICaveHill',
            Facebook: 'facebook@cavehill.uwi.edu',
            Website: 'http://www.cavehill.uwi.edu',
            Founded: 'Founed in 1963'
        }
    };

    const handleOpen = (event) => {
        switch(event.target._popup.options.id) {
            case 'chickenbarn':
                setText(info.chickenbarn);
                break;
            case 'uwi':
                setText(info.uwi);
                break;
            default:
                break;
        }
    }

    const handleMapClick = (event) => {
        console.log(event)
    }
    
    const [text, setText] = useState({});
    const foodIcon = L.icon({
        iconUrl: restaurantIcon,
        iconSize: [50, 50]
    });
    const uwi = L.marker([13.134660, -59.629543])
        .bindPopup('<strong>The UWI</strong><br/>Cave Hill Campus, <br/> Barbados', {'className': 'popup', 'id': 'uwi'})
        .on('popupopen', handleOpen);
    const chickenBarn = L.marker([13.13328777,-59.63296816], {icon: foodIcon})
        .bindPopup('<strong>Chicken Barn</strong><br/><i>Fast Food Restaurant<i>', {'className': 'popup', 'id': 'chickenbarn'})
        .on('popupopen', handleOpen);
    const points = L.layerGroup([uwi, chickenBarn])
    
    useEffect(() => {
        L.map('map', {
            center: [13.134660, -59.629543],
            zoom: 16,
            zoomDelta: 1,
            layers: [
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }),
                points                    
            ]
        })
        .on('click', handleMapClick);   
    }, []);

    return (
        <div>
            <div id={'map'}></div>
            <div className={'info_pane'}>              
                <h2>{text.Name}</h2>
                <i>{text.Type}</i><br /><br />
                {Object.entries(text).slice(2).map((value, index) => (
                    <li key={index}>{value[1]}</li>
                ))}                      
            </div>
        </div>
    )

}
export default Map;
