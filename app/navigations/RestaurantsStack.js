/**
 * Stacks de Restaurants
 */

 import { createStackNavigator } from 'react-navigation-stack';
 import { Restaurants } from './../screens/Restaurants';

 export const RestaurantsScreenStack = createStackNavigator({
     Restaurants:{
        screen: Restaurants,
        navigationOptions: () => ({
            title:'Restaurantes'
        })
     }
 })