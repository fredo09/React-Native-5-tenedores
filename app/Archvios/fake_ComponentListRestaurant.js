/**
 * Component ListRestaurant
 */

import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, FlatList,TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import * as Firebase from 'firebase';

export const ListRestaurant = (props) => {
    
    const { listRestaurants, isLoading, handleMoreRestaurant } = props;

    return(
        <View>
            { listRestaurants ? (
                <FlatList 
                    data={listRestaurants}
                    renderItem={ restaurant => <Restaurant  restaurant={restaurant}/> }
                    keyExtractor={ (item, index) => index.toString() }
                    onEndReached={handleMoreRestaurant} // pedir nuevos restaurante a cargar
                    onEndReachedThreshold={0} //cuando pedir informacion
                    ListFooterComponent={<FooterList  isLoading={isLoading}/>}
                />
            ):(
                <View style={styles.loaderRestaurant}>
                    <ActivityIndicator  size="large" color="#00a680" />
                    <Text>¡Cargando Restaurantes!</Text>
                </View>
            )}
        </View>
    );
}

//Contenido de Restaurante
const Restaurant = (props) => {
    
    const { restaurant } = props;
    const { name, address, description, images } = restaurant.item.restaurant;
    const [ imagesRestaurant, setImagesRestaurant ] =  useState(null);

    useEffect(() => {
        let image = images[0];
        Firebase.storage().ref(`restaurants-images/${image}`).getDownloadURL().then(result => {
            setImagesRestaurant(result);
        });
    },[])

    return(
        <TouchableOpacity onPress={() => console.log('Ir a Restaurante')}>
            <View style={styles.viewStylesRestaurant}>
                <View style={styles.viewImageRestaurant}>
                    <Image
                        resizeMode="cover"
                        source={{ uri : imagesRestaurant }}
                        style={styles.imageRestaurant}
                        PlaceholderContent={<ActivityIndicator color="fff" />}
                    />
                </View>
                <View>
                    <Text style={styles.restaurantName}>{name}</Text>
                    <Text style={styles.restaurantAddress}>{address}</Text>
                    <Text style={styles.restaurantDescription}>
                        {description.substr(0, 60)}...
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const FooterList = (props) => {

    const { isLoading } = props;

    if(isLoading){
        return(
            <View style={styles.stylesFooterList}>
                <ActivityIndicator size="large"/>
            </View>
        );
    } else {
        return(
            <View style={styles.notFoundList}>
                <Text>No hay Restaurantes que mostrar.</Text>
            </View>
        );
    }
}




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

    }
});