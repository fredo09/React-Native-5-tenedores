/**
* Component Map Restuarant 
*/

import React from 'react';
import { StyleSheet } from 'react-native';
import OpenMap from 'react-native-open-maps';
import MapView from 'react-native-maps';


export const MapRestaurant = (props) => {
    const { location, name, height } = props;
    
    // funcion para abrir la app de mapas
    const openAppMaps = () =>{
        OpenMap({
            latitude: location.latitude,
            longitude: location.longitude,
            zoom: 19,
            query: name
        })
    }

    return(
        <MapView
            style={{ height , width: "100%" }}
            initialRegion={location}
            onPress={ openAppMaps }
        >
            <MapView.Marker 
                coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude
                }}
            />
        </MapView>
    );
}
