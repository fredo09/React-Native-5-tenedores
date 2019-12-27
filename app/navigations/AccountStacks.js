/**
 * Stack Account
 */

import { createStackNavigator } from 'react-navigation-stack';
import { MyAccount } from './../screens/Account/MyAccount';
import { Login } from './../screens/Account/Login';
import { Register } from './../screens/Account/Register';

export const AccountScreenStack = createStackNavigator({
    Account : {
        screen: MyAccount,
        navigationOptions: () => ({
            title: "Mi Cuenta"
        })
    },
    Login:{
        screen: Login,
        navigationOptions:() => ({
            title: "Login"
        })
    },
    Register: {
        screen: Register,
        navigationOptions: () => ({
            title:"Registro"
        })
    }
});