/**
 * Component InfoUser
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as Firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

//Imagen default para el usuario no tiene foto
const PHOTO_DEFAULT = 'https://api.adorable.io/avatars/285/abott@adorable.png';

export const UserInfo = (props) => {

    // Destructuracion de la destructuracion
    const { 
        userInfo: { displayName, email, photoURL, uid }, 
        setReloadData, 
        toastRef,
        setIsVisibleLoading,
        setTextInfo
    } = props;
    
    // Cambiando avatar 
    const changeAvatar = async() => {

        console.log('cambiando el avatar');

        //Preguntando el permiso para accedes a la camara
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        // const resultPermissionCamera = resultPermission.permissions.cameraROLL.status;
        const { status } = resultPermission;
    
        if(status === 'denied') {
            console.log('Es necesario el permiso para cambiar el avatar');
        }else{
            let avatarImageResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });
            
            if(avatarImageResult === 'cancelled'){
                console.log('Has cerrado el bucador de imagenes');
            }else{
                uploadAvatar(avatarImageResult.uri, uid)
                .then(() => {
                    console.log('Imagen subida correctamente');
                    updateImageAvatar(uid);
                })
                .catch((e) => {
                    console.log('No se pudo subir la imagen');
                    toastRef.current.show('No se pudo subir la imagen');
                });
            }
        }
    }

    // Subiendo foto a Firebase
    const uploadAvatar = async( Url, nameImage ) => {
        setTextInfo('Actualizando Foto de Perfil');
        setIsVisibleLoading(true);
        const response = await fetch(Url);
        const blob = await response.blob();

        const ref =  Firebase
                    .storage()
                    .ref()
                    .child(`Avatar/${nameImage}`);
        return ref.put(blob);
    }

    // Cambiando foto de perfil en la app recuperada de Firebase
    const updateImageAvatar = (uid) =>{
        Firebase.storage()
                .ref(`Avatar/${uid}`)
                .getDownloadURL()
                .then(async result => {
                    const update = {
                        photoURL: result
                    }
                    await Firebase.auth().currentUser.updateProfile(update);
                    setReloadData(true);
                    setIsVisibleLoading(false); // ocultando Loading
                })
                .catch(() => {
                    console.log('No se pudo obteneder la imagen');
                    toastRef.current.show('No se pudo subir la imagen');
                });
    }

    return(
        <View style={styles.viewUserInfo}>
            <Avatar
                containerStyle={styles.constainerAvatar} 
                rounded
                size="large"
                showEditButton
                onEditPress={changeAvatar}
                source={{ uri: photoURL ? photoURL : PHOTO_DEFAULT }}
            />
            <View>
                <Text style={styles.displayName}>
                    { displayName ? displayName : 'Anonimo' }
                </Text>
                <Text>
                    { email ? email : 'Social Login'}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        backgroundColor:"#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30,
    },
    constainerAvatar:{
        marginRight:20
    },
    displayName:{
        fontWeight:"bold"
    }
});