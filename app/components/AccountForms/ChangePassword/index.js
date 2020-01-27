/**
* Component FomrDisplayName 
*/

import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { reauthenticate } from './../../../utils/Api';
import * as Firebase from 'firebase';

export const FormPassword = (props) => {

    //props
    const { setIsVisibleModal, toastRef } = props;

    //Hooks
    const [ password, setPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ newPasswordRepeat, setNewPasswordRepeat ] = useState('');
    const [ error, setError ] = useState({});
    const [ hidePassword, setHidePassword ] = useState(true);
    const [ hideNewPassword, setHideNewPassword ] = useState(true);
    const [ hideNewRepeatPassword, setHideNewRepeatPassword ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(false);

    const updatePassword = () => {
        setError({}); // Limpiando algun mensaje de error

        if(!password || !newPassword || !newPasswordRepeat) {
            let objError = ({})
            
            !password && (objError.password = 'No Puede estar vacio');
            !newPassword && (objError.newPassword = 'No Puede estar vacio');
            !newPasswordRepeat && (objError.newRepeatPassword = 'No puede estar vacio');
            
            setError(objError);
        }else{
            if(newPassword !== newPasswordRepeat){
                setError({
                    newPassword : 'La contraseña no coinciden',
                    newRepeatPassword: 'La contraseña no coinciden'
                });
            }else{
                setIsLoading(true);
                reauthenticate(password).then(() => {
                    // todo bien
                    Firebase.auth().currentUser.updatePassword(newPassword).then(() => {
                        setIsLoading(false);
                        toastRef.current.show('Contraseña actualizada.');
                        //  Firebase.auth().signOut(); // cerramos session
                        setIsVisibleModal(false);
                    }).catch(() => {
                        setError({
                            general: 'Error al actualizar contraseña'
                        });
                        setIsLoading(false);
                    });
                }).catch(() => {
                    setError({
                        password: 'La contraseña es incorrecta'
                    });
                    setIsLoading(false);
                });
            }
        }

    }

    return(
        <View style={styles.ViewContainer}>
            <Input 
                containerStyle={styles.inputPass}
                errorMessage={error.password}
                placeholder="Password"
                password={true}
                onChange={e => setPassword(e.nativeEvent.text)}
                rightIcon={{
                    type: 'material-community',
                    color: '#c2c2c2',
                    name:  hidePassword ?  'eye-off-outline' : 'eye-outline' ,
                    onPress: () => { setHidePassword(!hidePassword) }
                }}
                secureTextEntry={hidePassword}
                
            />
            <Input
                containerStyle={styles.inputPass}
                errorMessage={error.newPassword}
                password={true}
                placeholder="Nueva passowrd"
                onChange={e => setNewPassword(e.nativeEvent.text)}
                rightIcon={{
                    type: 'material-community',
                    color: '#c2c2c2',
                    name:  hideNewPassword ?  'eye-off-outline' : 'eye-outline' ,
                    onPress: () => { setHideNewPassword(!hideNewPassword) }
                }}
                secureTextEntry={hideNewPassword}
                
            />
            <Input
                containerStyle={styles.inputPass} 
                errorMessage={error.newRepeatPassword}
                password={true}
                placeholder="Confirmar Password"
                onChange={e => setNewPasswordRepeat(e.nativeEvent.text)}
                rightIcon={{
                    type: 'material-community',
                    color: '#c2c2c2',
                    name:  hideNewRepeatPassword ?  'eye-off-outline' : 'eye-outline' ,
                    onPress: () => { setHideNewRepeatPassword(!hideNewRepeatPassword) }
                }}
                secureTextEntry={hideNewRepeatPassword}
            />
            <Button 
                containerStyle={styles.btnContainerStyle}
                buttonStyle={styles.btnStyes}
                loading={isLoading}
                onPress={updatePassword}
                title="Actualizar Password"
            />
            <Text>
                {error.general}
            </Text>
        </View>
    );
}

//Styles
const styles = StyleSheet.create({
    ViewContainer:{
        alignItems:"center",
        paddingTop: 10,
        paddingBottom: 10
    },
    inputPass:{
        paddingBottom: 10
    },
    btnContainerStyle:{
        marginTop: 20,
        width:"95%"
    },
    btnStyes:{
        backgroundColor:"#00a680"
    }
});