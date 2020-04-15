/**
*  SCREEN RESTAURANT
*/

import React,{ useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { CarruselItem } from './../../components/CarruselRestaurant';
import { Rating, Icon, ListItem } from 'react-native-elements';
import { MapRestaurant } from './../../components/Map';
import { ListReviewRestaurant } from './../../components/ListReview';
import * as Firebase from 'firebase';

const screenwidth = Dimensions.get('window').width;

export const DetailRestaurant = (props) => {
    
    const { navigation } = props;
    const { restaurant } = props.navigation.state.params;

    // URL para las Imagenes
    const [imagesRestaurante , setImagesRestaurante] = useState([]);
    const [ rating, setRating ] = useState(restaurant.rating);


    //Obtenindo url de las imagenes del restaurante.
    useEffect(() => {
       const arrayUrl = [];
       
       (async () => {
            await Promise.all(
                restaurant.images.map(async (image) => {
                    await Firebase.storage()
                                  .ref(`restaurants-images/${image}`)
                                  .getDownloadURL()
                                  .then(imageUrl => {
                                      arrayUrl.push(imageUrl);
                                  });
                })
            );
            setImagesRestaurante(arrayUrl);
       }
       )()
    },[])
    
    return(    
        <ScrollView style={styles.viewContainer}>
            <View style={styles.viewFavorite}>

            </View>
            <CarruselItem 
                arrayImages={imagesRestaurante}
                width={screenwidth}
                height={300}
            />
            { /* TODA LA INFO DEL RESTAURANTE */}
            <TitleRestaurant 
                name={restaurant.name}
                description={restaurant.description}
                rating={rating}
            />
           <RestaurantInfo 
                location={restaurant.location}
                name={restaurant.name}
                addres={restaurant.address}
           />
           <ListReviewRestaurant 
                navigation={navigation}
                idRestaurant={restaurant.id}
                setRating={setRating}
           />
        </ScrollView>
    );
}

// Componente interno sobre la informacion del restaurante
const TitleRestaurant = (props) => {
    const { name, description, rating } = props;

    return(
        <View style={styles.viewResturantTitle}>
            <View style={{ flexDirectio: "row" }}>
                <Text style={styles.nameRestaurant}>
                    {name}
                </Text>
                <Rating 
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 15, marginTop:15 }}>
                Descripcion:
            </Text>
            <Text style={styles.descriptionRestaurant}>
                {description}
            </Text>
        </View>
    );
}

// Informacion del Restaurante
const RestaurantInfo = (props) =>{
    const { location, name, addres } = props;


    const infoRestaurante = [
        {
            text:addres,
            iconName: "map-marker",
            iconType: "material-community",
            action: null
        }
    ];
    return(
        <View style={styles.viewRestaurantInfo}>
            <Text style={{ fontSize: 20, fontWeight:"bold", marginBottom:10 }}>
                Informacion del Restaurante.
            </Text>
            <MapRestaurant 
                location={location}
                name={name}
                height={100}
            />
            { infoRestaurante.map( (info, idx) => {
                return(
                    <ListItem 
                        key={idx}
                        title={info.text}
                        leftIcon={{
                            name: info.iconName,
                            type: info.iconType,
                            color: "#00a680"
                        }}
                        containerStyle={styles.viewContainerListItem}
                    />
                );
            }) 
            }
        </View>
    );
}

//Styles
const styles = StyleSheet.create({
    viewContainer:{
        flex: 1
    },
    viewResturantTitle:{
        margin: 15,

    },
    nameRestaurant:{
        fontSize: 20,
        fontWeight:"bold"
    },
    rating:{
        position: "absolute",
        right: 0
    },
    descriptionRestaurant:{
        color: "grey",
        marginTop: 5
    },
    viewRestaurantInfo:{
        margin: 15,
        marginTop: 25
    },
    viewContainerListItem:{
        borderBottomColor: "#d8d8d8",
        borderBottomWidth: 1
    },
    viewFavorite:{
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 2,
        backgroundColor: "#fff",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 5,
        borderBottomLeftRadius: 100
    }
});