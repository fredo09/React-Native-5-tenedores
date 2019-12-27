/**
 * Stack  TopLists
 */

import { createStackNavigator } from 'react-navigation-stack';
import { TopRestaurants } from './../screens/TopRestaurants';

export const TopListScreenStack = createStackNavigator({
    TopRestaurants:{
        screen:TopRestaurants,
        navigationOptions: () => ({
            title: "Mejores Restaurantes"
        })
    }
})