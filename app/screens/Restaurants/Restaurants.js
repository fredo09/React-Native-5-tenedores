/*
*  Page Restaurants
*/

import React,{ useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ActionButton from 'react-native-action-button';
import * as Firebase from 'firebase';

export const Restaurants = (props) => {
    const { navigation } = props;

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        Firebase.auth().onAuthStateChanged( userInfo => {
            setUserInfo(userInfo);
        })
    },[]) 

    return(
        <View style={styles.viewBody}>
            <Text>Estamos en Restaurantes</Text>
            
            {userInfo &&  <ActionRestaurant navigation={navigation}/>}
        </View>
    )
}

const ActionRestaurant = (props) => {
    const { navigation } = props;

    return (
        <ActionButton 
            buttonColor="#00a680"
            onPress={ () => navigation.navigate('AddRestaurants') } 
        />
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1 
    }
});