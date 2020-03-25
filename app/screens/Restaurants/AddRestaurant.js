/**
 * Screen Add Restaurants
 */

import React, { useState,useRef } from 'react';
import { View } from 'react-native';
import { Loading } from './../../components/Loading';
import { AddRestaurantForm } from './../../components/Restaurants/AddRestaurantForm';
import Toast from 'react-native-easy-toast';

export const AddRestaurant = (props) => {
    const { navigation } = props;
    const { setIsReloadRestaurants } = navigation.state.params;
    const toastRef = useRef();
    const [ isLoading, setIsLoading ] = useState(false);

    return(
        <View>
            <AddRestaurantForm 
                navigation={navigation}
                setIsLoading={setIsLoading}
                toastRef={toastRef}
                setIsReloadRestaurants={setIsReloadRestaurants}
            />
            <Toast 
                position="center"
                opacity={0.5}
                ref={toastRef}
            />
            <Loading 
                text="Creando Restaurante" 
                isVisible={isLoading}
            />
        </View>
    );
}
