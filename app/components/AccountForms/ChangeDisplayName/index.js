/**
* Component FomrDisplayName 
*/

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as Firebase from 'firebase'; 

export const FormDisplayName = (props) => {

    const { displayName, setIsVisibleModal, setReloadData, toastRef  } = props;
    const [ newdisplayName, setNewDisplayName ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);

    const updateDisplayName = () => {
       setError(null);

       if(!newdisplayName){
           setError('No se ha actualizado el displayName');
       }else{
           setIsLoading(true);

           let update ={
               displayName : newdisplayName
           }
           
           // Actualizamdo el diplayName en Firebase
           Firebase.auth().currentUser.updateProfile(update).then(() =>{
               setIsLoading(false); // quitamos el icono de loading en el botton
               setReloadData(true); // recargamos el data del usuario
               toastRef.current.show('Nombre actualizado correctamente!');
               setIsVisibleModal(false); //quitamos el modal al final
           }).catch(() =>{
               setError('Error al actualizar el Nombre');
               setIsLoading(false);
           });
       }
    }

    return(
        <View styles={styles.viewFormDisplayName}>
            <Input
                placeholder="Nombre"
                containerStyle={styles.inputDisplayName}
                rightIcon={{
                    type:'material-community',
                    name:'account-circle-outline',
                    color: '#c2c2c2'
                }}
                onChange={e => setNewDisplayName(e.nativeEvent.text)}
                defaultValue={displayName && displayName}
                errorMessage={error}
            />
            <Button
                title='Cambiar Nombre'
                containerStyle={styles.btnContainerForm}
                buttonStyle={styles.btnstylesForm}
                onPress={updateDisplayName}
                loading={isLoading}
            />
        </View>
    );
}

//Styles
const styles = StyleSheet.create({
    viewFormDisplayName:{
        alignItems:"center",
        paddingTop: 10,
        paddingBottom: 10
    },
    inputDisplayName:{
        marginBottom: 10
    },
    btnContainerForm:{
        marginTop: 20,
        width:"100%"
    },
    btnstylesForm:{
        backgroundColor: '#00a680'
    }
});