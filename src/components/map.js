import React, { useState, useEffect } from 'react'
import L, { latLng, LatLng } from 'leaflet'
import restaurantIcon from '../graphics/restaurant_marker.png'
import locationIcon from '../graphics/marker_sm.png'

function Map() {

    const [text, setText] = useState({});
    const foodIcon = L.icon({
        iconUrl: restaurantIcon,
        iconSize: [50, 50]
    })
    const markerIcon = L.icon({
        iconUrl: locationIcon,
        iconSize: [30, 30]
    })

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

    const collection = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
                "name": "My Point",
                "popupContent": "Somewhere"
            },
            "geometry": {
              "type": "Point",
              "coordinates": [
                -59.627409, 13.132086]
            }
          },
          {
            "type": "Feature",
            "properties": {
                "name": "Playing field",
                "popupContent": "3Ws Cricket Ground"
            },
            "geometry": {
              "type": "Point",
              "coordinates": [-59.630754, 13.135710]
            }
          },
          {
            "type": "Feature",
            "properties": {
                "name": "My Point 2",
                "popupContent": "Somewhere 2",
            },
            "geometry": {
              "type": "Point",
              "coordinates": [-59.627760, 13.133146]
            }
          }
        ]
    }

    const onEachFeature = (feature, layer) => {

        if (feature.properties && feature.properties.popupContent) {
            layer.bindPopup('<strong>' + feature.properties.name + '</strong></br>' + 
                feature.properties.popupContent +'</br>' + feature.geometry.coordinates.toString(), 
                {className: 'popup'});
        }
    }

    const pointToLayer = (feature, latlng) => L.marker(latlng, {icon: markerIcon});

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
        L.popup()
        .setLatLng(event.latlng)
        .setContent(event.latlng.toString())
        .openOn(event.target);
    }
    
    const uwi = L.marker([13.134660, -59.629543])
        .bindPopup('<strong>The UWI</strong><br/>Cave Hill Campus, <br/> Barbados', {'className': 'popup', 'id': 'uwi'})
        .on('popupopen', handleOpen);
    const chickenBarn = L.marker([13.13328777,-59.63296816], {icon: foodIcon})
        .bindPopup('<strong>Chicken Barn</strong><br/><i>Fast Food Restaurant<i>', {'className': 'popup', 'id': 'chickenbarn'})
        .on('popupopen', handleOpen);
    const points = L.layerGroup([uwi, chickenBarn]);

    useEffect(() => {
        const map = L.map('map', {
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
        
        L.geoJSON(collection, {
            onEachFeature: onEachFeature,
            pointToLayer: pointToLayer
        }).addTo(map);   

    }, []);

    return (
        <div>
            <div data-testid={'map-div'} id={'map'} ></div>
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



