/**
 * Stacks de Restaurants
 */

import { createStackNavigator } from 'react-navigation-stack';
import { Restaurants } from './../screens/Restaurants/Restaurants';
import { AddRestaurant } from './../screens/Restaurants/AddRestaurant';
import { DetailRestaurant } from './../screens/Restaurants/Restaurant';
import { CommentRestaurant } from './../screens/Restaurants/CommentRestaurant'; 

 export const RestaurantsScreenStack = createStackNavigator({
    Restaurants:{
        screen: Restaurants,
        navigationOptions: () => ({
            title:'Restaurantes'
        })
    },
    AddRestaurants:{
        screen: AddRestaurant,
        navigationOptions: () => ({
            title: 'Nuevo Restaurante'
        })
    },
    Restaurant:{
        screen: DetailRestaurant,
        navigationOptions: (props) =>({ // enviando props al screen de restaurante.
            title:  props.navigation.state.params.restaurant.name
        })
    },
    CommentRestaurant: {
        screen: CommentRestaurant,
        navigationOptions: () => ({
            title: "Nuevo Comentario" 
        })
    }
 });