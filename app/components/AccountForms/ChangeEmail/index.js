/**
* Component FormEmail
*/

import React,{ useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { reauthenticate } from './../../../utils/Api';
import * as Firebase from 'firebase';

export const FormEmail = (props) => {

    //props
    const { email, setIsVisibleModal, setReloadData, toastRef } = props;

    // Hooks
    const [ newEmail, setNewEmail ] = useState(null);
    const [ password, setPassword ] = useState('');;
    const [ error, setError ] = useState({});
    const [ hidePassword, setHidePassword ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(false);

    const updateEmail = () => {
        setError({});

        if(!newEmail || email === newEmail){
            setError({ email: 'No pueden ser los mismos o no puede estar vacio' });
        }else{
            setIsLoading(true);
            reauthenticate(password).then(() => {

                // Actualizamos el email
                Firebase.auth()
                        .currentUser
                        .updateEmail(newEmail).then(() => {

                            setIsLoading(false);
                            setReloadData(true);
                            toastRef.current.show('Email Actualizado');
                            setIsVisibleModal(false);

                        }).catch(() => {

                            setError({ email:'Error al actualizar el email' });
                            setIsLoading(false);

                        });

            }).catch(() => { 
                setError({ password: 'La contraseña no es correcta' });
                setIsLoading(false);
            });
        }

    }

    return(
        <View styles={styles.ViewContainer}>
            <Input
                containerStyle={styles.inputForm} 
                placeholder="Email"
                rightIcon={{
                    type: 'material-community',
                    name: 'email',
                    color: '#c2c2c2'
                }}
                defaultValue={email && email}
                onChange={e => setNewEmail(e.nativeEvent.text)}
                errorMessage={error.email}
            />
            <Input
                containerStyle={styles.inputPass}
                onChange={e => setPassword(e.nativeEvent.text)}
                placeholder="Password"
                rightIcon={{
                    type: 'material-community',
                    color: '#c2c2c2',
                    name:  hidePassword ?  'eye-off-outline' : 'eye-outline' ,
                    onPress: () => { setHidePassword(!hidePassword) }
                }}
                password={true}
                secureTextEntry={hidePassword}
                errorMessage={error.password}
            />
            <Button
                buttonStyle={styles.btnStyes}
                title="Actualizar Email"
                containerStyle={styles.containerStyle}
                onPress={updateEmail}
                loading={isLoading}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    ViewContainer:{
        alignItems:"center",
        paddingTop: 10,
        paddingBottom: 10
    },
    inputForm:{
        paddingBottom: 10
    },
    inputPass:{
        paddingBottom: 10
    },
    btnContainerStyle:{
        marginTop: 20,
        width:"100%"
    },
    btnStyes:{
        backgroundColor:"#00a680"
    }
});