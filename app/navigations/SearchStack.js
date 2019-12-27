/**
*   Stack Search
*/

import { createStackNavigator } from 'react-navigation-stack';
import { Search } from './../screens/Search';

export const SearchScreenStack = createStackNavigator({
    Search:{
        screen: Search,
        navigationOptions: () => ({
            title: "Busca un Restaurante"
        })
    }
});
