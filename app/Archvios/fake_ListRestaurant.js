import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import * as Firebase from 'firebase';

export const ListRestaurant = (props) => {

    const { listRestaurants, isLoading, handleMoreRestaurant } = props;
    return(
        <View>
                <View style={styles.loaderRestaurant}>
                    <ActivityIndicator  size="large" color="#00a680" />
                    <Text style={styles.text_loading}>¡Cargando Restaurantes!</Text>
                </View>

        </View>
    );
}

//



//Styles
const styles = StyleSheet.create({
    loadingRestaurant:{
        marginTop: 20,
        alignItems:"center",
        justifyContent: "center"
    },
    viewStylesRestaurant:{
        flexDirection:"row",
        margin: 10
    },
    viewImageRestaurant:{
        marginRight: 15
    },
    imageRestaurant:{
        width: 80,
        height: 80
    },
    restaurantName:{
        fontWeight: "bold"
    },
    restaurantAddress:{
        paddingTop: 2,
        color:"grey"
    },
    restaurantDescription:{
        paddingTop: 2,
        color:"grey",
        width: 300
    },
    stylesFooterList:{
        marginTop: 20,
        alignItems:"center"
    },
    notFoundList:{
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center"
    },
    loaderRestaurant:{
        marginTop: 10,
        marginBottom: 10,

    },
    text_loading:{
        marginTop: 10,
        paddingTop: 10,
        margin:100,
        alignItems: "center",
        justifyContent: "center"
    }
});