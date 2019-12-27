/**
 * Component LoginFrom
 */

import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';

export const LoginForm = () => {

    const [ hidePassword, setHidePassword ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const login = () => {
        console.log('Usuario logeado');
        console.log(`Email: ${email} y password: ${password}`);
    }

    return (
        <View style={styles.formContainer}>
            <Input
                containerStyle={styles.inputForm} 
                onChange={(e) => { setEmail(e.nativeEvent.text) }}
                placeholder="Correo Electronico"
                rightIcon={
                    <Icon 
                        type="material-community"
                        name="email"
                        iconStyle={styles.iconForm}
                    />
                }
            />
            <Input
                containerStyle={styles.inputForm} 
                placeholder="Password"
                password={true}
                secureTextEntry={hidePassword}
                onChange={(e) => { setPassword(e.nativeEvent.text) }}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name={hidePassword ? "eye-outline" : "eye-off-outline" }
                        onPress={() => { setHidePassword(!hidePassword) } }
                        iconStyle={styles.iconForm}
                    />
                }
            />
            <Button 
                buttonStyle={styles.btnStyle}
                containerStyle={styles.btnContainer}
                onPress={ login }
                title="Inciar Session"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        alignItems: "center",
        justifyContent:"center",
        marginTop:30
    },
    inputForm:{
        width: "100%",
        marginTop:20
    },
    btnStyle:{
        backgroundColor:"#00a680"
    },
    btnContainer:{
        width:"95%",
        marginTop: 20
    },
    iconForm:{
        color:"#c1c1c1"
    }
});