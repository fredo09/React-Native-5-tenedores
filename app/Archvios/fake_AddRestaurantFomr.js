
import React,{ useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { firebaConfigApp } from './../../utils/Firebase';
import ActionButton from 'react-native-action-button';

import { ListRestaurant } from './../../components/ListRestaurant';

import Firebase from 'firebase/app';
import "firebase/firestore";

const db = Firebase.firestore(firebaConfigApp);
const LIMITE_RESTAUTANT = 8;

export const Restaurants = (props) => {
    const { navigation } = props;

    const [userInfo, setUserInfo] = useState(null);
    const [listRestaurant, setListRestaurant] = useState([]);
    const [startRestaurant, setStartRestaurant] = useState(null); // para scroll de nuevos restaurant
    const [totalRestaurant, setTotalRestaurant] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [reloadRestaurant, setReloadRestaurant] = useState(false); // para un reload despues de agregar nueva informacion restaurant

    //para pedir informacion del usuario logeado
    useEffect(() => {
        Firebase.auth().onAuthStateChanged( userInfo => {
            setUserInfo(userInfo);
        });
    },[]);
    
    //pedir informacion del la base de datos Restaurant firebase
    useEffect(() => {

        //Sacando total de restaurant
        db.collection("Restaurants").get().then((snap) => {
            let totalRestaurantes = snap.size;
            setTotalRestaurant(totalRestaurantes);   
        });

        // funcion autoejecutable ()() lista de restaurantes
        (async () => {
            let resultRestaurantes = [];
            let restaurantes = db.collection("Restaurants").orderBy("createAt","desc").limit(LIMITE_RESTAUTANT);
            
            //obteniendo listado de Restaurantes
            await restaurantes.get().then(response => {
                // donde empezar despues de ver los restaurante anteriores
                setStartRestaurant(
                    response.docs[
                        response.docs.length - 1 
                    ]
                );

                response.forEach(doc => {
                    let restaurant = doc.data();
                    restaurant.id = doc.id;
                    resultRestaurantes.push({ restaurant });
                });
                setListRestaurant(resultRestaurantes);
            });
        })()

        // reload para nueva informacion de restaurante agregado
        setReloadRestaurant(false);
    },[reloadRestaurant]);

    //Cargaremos mas restaurantes 8 en 8
    const handleMoreRestaurant = async () => {
        const restaurants = [];

        restaurants.length < totalRestaurant && setIsLoading(true);

        const restaurantsDB = db.collection("Restaurants")
                                .orderBy("createAt", "desc")
                                .startAfter(startRestaurant.data().createAt)
                                .limit(LIMITE_RESTAUTANT);
        
        await restaurantsDB.get().then(response => {
            if (response.docs.length > 0){
                setStartRestaurant(response.docs[response.docs.length - 1]);
            } else {
                setIsLoading(false);
            }

            response.forEach(doc => {
                let restaurant = doc.data();
                restaurant.id = doc.id;
                restaurants.push({ restaurant });
            });
            
            //Agregamos los nuevos restaurantes con lo ya cargados
            setListRestaurant([...listRestaurant, restaurants]);
        });
    }

    return(
        <View style={styles.viewBody}>
           {/* <ListRestaurant
                handleMoreRestaurant={handleMoreRestaurant}
                listRestaurants={listRestaurant} 
                isLoading={isLoading}/> */}
            <ListRestaurant 
                listRestaurants={listRestaurant}
                isLoading={isLoading}
            />
            {userInfo &&  <ActionRestaurant navigation={navigation} />}
        </View>
    )
}

// Buton flotante
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