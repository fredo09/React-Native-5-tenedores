/**
 * Stacks de Restaurants
 */

 import { createStackNavigator } from 'react-navigation-stack';
 import { Restaurants } from './../screens/Restaurants/Restaurants';
 import { AddRestaurant } from './../screens/Restaurants/AddRestaurant';

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
    }
 })