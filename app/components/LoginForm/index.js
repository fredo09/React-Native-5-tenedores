/**
 * Component LoginFrom
 */

import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { validateEmail } from './../../utils/ValidationsForm';
import { Loading } from './../Loading'
import * as Firebase from 'firebase';

const LoginForm = (props) => {
    
    const { toastRef, navigation } = props;
    const [ hidePassword, setHidePassword ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isVisibleLoading, setIsVisibleLoading ] = useState(false);

    const login = async() => {
        setIsVisibleLoading(true);
        if(!email || !password){
            toastRef.current.show('Todos los campos son obligatorios');
        }else{
            if(!validateEmail(email)){
                toastRef.current.show('El email no es valido');
            }else{
                await Firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(() => {
                        console.log('Login...')
                        navigation.navigate('Account');
                    })
                    .catch((e)=>{
                        console.log(e);
                        toastRef.current.show('Email o Passoword Incorrecto');
                    });
            }
        }
        setIsVisibleLoading(false);
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
            <Loading text="Creando cuenta..." isVisible={isVisibleLoading} />
        </View>
    );
}

export default withNavigation(LoginForm);

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