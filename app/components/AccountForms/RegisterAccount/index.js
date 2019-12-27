/**
* Component Form Account 
*/

import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { validateEmail } from './../../../utils/ValidationsForm';
import { withNavigation } from 'react-navigation';
import * as Firebase from 'firebase';
import { Loading } from './../../Loading';

const RegisterForm = (props) => {
    const { toastRef, navigation } = props;

    const [ HidePassword, setHidePassword ] = useState(true);
    const [ HideRepetPassword, setHideRepetPassword ] = useState(true);
    const [ isVisibleLoagin, setIsVisibleLoading ] = useState(false);

    // State of form
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repetPassword, setRepetPassword ] = useState('');


const Register = async () => {
        setIsVisibleLoading(true);
        if(!email || !password || !repetPassword ){
            toastRef.current.show('Todos los campos deben estar llenos!...');
        } else {
            if(!validateEmail(email)){
                toastRef.current.show('el email con tiene el formato correcto');
            }else{
                if(password !== repetPassword){
                    toastRef.current.show('las contraseñas no coinciden');
                }else{
                    await Firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, password)
                        .then(() => {
                            navigation.navigate("Account");
                            toastRef.current.show('Usuario creado correctamente!')
                        })
                        .catch((e) => {
                            console.log(e);
                            toastRef.current.show('No se pudo crear el Usuario, intente mas tarde')
                        }) 
                }
            }
        }
        setIsVisibleLoading(false);
    }
    
    return (
        <View style={styles.fromContainer}>
            <Input 
                placeholder="Correo Electronico"
                containerStyle={styles.inputForm}
                onChange={ e => setEmail(e.nativeEvent.text)}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name="email"
                        iconStyle={styles.rightIcon}
                    />
                }
            />
            <Input
                placeholder="Contraseña"
                password={true}
                secureTextEntry={HidePassword}
                containerStyle={styles.inputForm}
                onChange={ e => setPassword(e.nativeEvent.text) }
                rightIcon={
                    <Icon 
                        type="material-community"
                        name={HidePassword ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.rightIcon}
                        onPress={() => setHidePassword(!HidePassword)}
                    />
                }
            />
            <Input
                placeholder="Confirmar Contraseña"
                password={true}
                secureTextEntry={HideRepetPassword}
                containerStyle={styles.inputForm}
                onChange={e => setRepetPassword(e.nativeEvent.text)}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name={HideRepetPassword ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.rightIcon}
                        onPress={() => setHideRepetPassword(!HideRepetPassword)}
                    />
                }
            />
            <Button
                title="Unirse"
                containerStyle={styles.btnUnirse}
                buttonStyle={styles.stylesbtn}
                onPress={Register}
            />
            <Loading 
                text="Creando cuenta espere un momento!..."
                isVisible={isVisibleLoagin}
            />
        </View>
    )
}

export default withNavigation(RegisterForm);

const styles = StyleSheet.create({
    fromContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 30

    },
    inputForm:{
        width: "100%",
        marginTop: 20
    },
    rightIcon:{
        color: "#c1c1c1"
    },
    btnUnirse:{
        marginTop: 20,
        width:"90%"
    },
    stylesbtn:{
        backgroundColor: "#00a680"
    }
})