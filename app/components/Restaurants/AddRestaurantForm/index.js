/**
*  Component Form AddRestaurant
*/

import React,{ useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import { Input, Button, Icon, Avatar, Image } from 'react-native-elements';
import { ModalOptions } from './../../Modal';
import { firebaConfigApp } from './../../../utils/Firebase';
import moment from 'moment';
import uuid from 'uuid/v4';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import firebase from 'firebase/app';
import "firebase/firestore";

// Constantes
const widtghImage = Dimensions.get("window").width;
const DEFAULT_IMAGEURL = './../../../../assets/img/no-image.png';
const db = firebase.firestore(firebaConfigApp); // configuracion de firestore db

//Componente AddRestautanForm
export const AddRestaurantForm = (props) => {

    const { toastRef, setIsLoading, navigation } = props;

    const [ selectImage, setSelectImage ] = useState([]);
    const [ restaurantName, setRestaurantName ] = useState('');
    const [ resutaurantUbication, setRestaurantUbication ]  = useState('');
    const [ restaurantDescription, setRestaurantDescription ] = useState('');
    const [ isVisibleMap, setIsVisibleMap ] = useState(false);
    const [ locationRestaurant, setLocationRestaurant ] = useState(null);

    // Agregar nuevo restaurant
    const addNewRestaurant = () => {
        if ( !restaurantName || !restaurantDescription || !resutaurantUbication ) {
            toastRef.current.show('Los campos son obligatorios.', 3000);
        } else if (selectImage.length === 0) {
            toastRef.current.show('Debes de seleccionar almenos una Imagen', 3000);
        } else if ( !locationRestaurant ) {
            toastRef.current.show('Debes de tener la ubicación del restaurante', 3000);
        } else {
            setIsLoading(true);
            
            //Llamando a la funcion para subir fotos
            uploadImagenStorage(selectImage).then( arrayImages => {

                //Subiendo informacion a Firebase
                db.collection("Restaurants").add({
                    name: restaurantName,
                    address: locationRestaurant,
                    description: restaurantDescription,
                    location: resutaurantUbication,
                    images: arrayImages,
                    rating : 0,
                    ratingTotal: 0,
                    quatityVoting: 0 ,// cuantos votos tiene 
                    createAt: moment(new Date()).format('DD/MM/YYYY HH:mm'),
                    createByUser: firebase.auth().currentUser.uid
                }).then(() => {
                    setIsLoading(false);
                    navigation.navigate("Restaurants");
                }).catch(() => {
                    setIsLoading(false);
                    toastRef.current.show("No se agrego el Restaurant, intente mas tarde.", 3000);
                });
            });
        }
    }

    //Subiendo imagenes en el storage
    const uploadImagenStorage = async (imagesArray) => {
        const newImagesArray = [];
        await Promise.all(
            imagesArray.map(async(image) => {
                const response = await fetch(image);
                const blob = await response.blob(); // imagen

                // donde guardar las imagenes
                const ref = firebase.storage().ref("restaurants-images").child(uuid()); 
    
                await ref.put(blob).then((result) => {
                    newImagesArray.push(result.metadata.name);
                });
            })
        );
        return newImagesArray; // regresamos el array de imagenes con sus nombres
    }

    return(
        <ScrollView>
            <ImagenRestaurant
                imagenRestaurant={selectImage[0]}
            />

            <FormRestaurant 
                setRestaurantName={setRestaurantName}
                setRestaurantUbication={setRestaurantUbication}
                setRestaurantDescription={setRestaurantDescription}
                setIsVisibleMap={setIsVisibleMap}
                locationRestaurant={locationRestaurant}
            />

            <ScrollView horizontal={true}>
                <UploadImage 
                    selectImage={selectImage}
                    setSelectImage={setSelectImage}
                />
            </ScrollView>

            <Button 
                title="Agregar Restaurante"
                buttonStyle={styles.btnStyles}
                containerStyle={styles.containerBtn}
                onPress={addNewRestaurant}
            />

            <Map 
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                setLocationRestaurant={setLocationRestaurant}
                toastRef={toastRef}
            />
        </ScrollView>
    );
}

// Compoenent UploadImage
const UploadImage = (props) =>{

    const { selectImage, setSelectImage } = props;

    // Buscando y seleccionando la imagen en el storage
    const imageSelected = async() => {
        const resutlPermision =  await Permissions.askAsync(Permissions.CAMERA_ROLL);

        const { status } = resutlPermision;

        if ( status === 'denied' ) {
            console.log('Es necesario el permiso para cambiar el avatar');
        } else {
            let avatarImageResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });

            if(avatarImageResult === 'cancelled'){
                console.log('Has cerrado el bucador de imagenes');
            } else {
                let uriImage = avatarImageResult.uri;

                // Traemos lo que tiene el state selectImage y agregamos el nuevo estado
                setSelectImage([...selectImage, uriImage ]);
            }
        }
    }

    // Aliminando imagenes del array state
    const deleteImage = (image) => {
        const removeImage = selectImage;

        Alert.alert(
            'Eliminar Imagen',
            '¿Estas Seguro de eliminar esta imagen?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Eliminar', 
                    onPress: () => setSelectImage(
                        removeImage.filter(imageURL => imageURL !== image)
                    )
                },
            ],
            {cancelable: false}
        );
    }

    return(
        <View style={styles.viewImage}>  
            {   // Quitando icono de camara al ser mas de 4 imagenes
                selectImage.length < 5 && (
                    <Icon 
                        type="material-community"
                        name="camera"
                        color="#7a7a7a"
                        containerStyle={styles.containerIcon}
                        onPress={imageSelected}
                    />
                )
            }
            
            {  // Representando las imagenes recuepradas en el state de imagenes seleccionadas del storage
               selectImage.map((image, idx) =>{
                   return(
                    <Avatar 
                        onPress={() => { deleteImage(image) }}
                        key={idx}
                        style={styles.styleAvatar}
                        source={{ uri:image }}
                     />
                   )
               }) 
            }
            
        </View>
    );
}

// ImagenRestaurant compenent
const ImagenRestaurant = (props) => {
    const { imagenRestaurant } = props;

    return(
        <View style={styles.viewPhoto}>
            {
                imagenRestaurant ? (
                    <Image 
                        source={{ uri : imagenRestaurant}}
                        style={{ width: widtghImage , height: 200 }}
                    />
                )
                :
                (
                    <Image 
                        source={ require(DEFAULT_IMAGEURL) }
                        style={{ width: widtghImage , height: 200 }}
                     />
                )
            }
        </View>
    );
}

// Formulario de restaurantes
const FormRestaurant = (props) => {
    
    const { setRestaurantName, setRestaurantUbication, setRestaurantDescription, setIsVisibleMap, locationRestaurant } = props;
    
    return(
        <View style={styles.viewForm}>
            <Input 
                placeholder="Nombre del restaurante"
                containerStyle={styles.stylesInput}
                onChange={(e) => setRestaurantName(e.nativeEvent.text)}
            />
            <Input 
                placeholder="Dirección del Restaurante"
                containerStyle={styles.stylesInput}
                onChange={e => setRestaurantUbication(e.nativeEvent.text)}
                rightIcon={{
                    type: 'material-community',
                    name: 'google-maps',
                    color: locationRestaurant ? '#00a680' : '#e3e3e3',
                    onPress: () => setIsVisibleMap(true)
                }}
            />
            <Input
                inputContainerStyle={styles.stylesContainerInput} 
                placeholder="Descripción del Restaurante"
                multiline={true}
                containerStyle={styles.stylesInput}
                onChange={(e) => setRestaurantDescription(e.nativeEvent.text)}
            />
        </View>
    );
}

//Compenente Map
const Map = (props) => {
    
    const { toastRef, isVisibleMap, setIsVisibleMap, setLocationRestaurant  } = props;
    const [ location, setLocation ] = useState(null); // Ubicacion del dispositivo

    // Obteninedo la ubicacion
    useEffect(() =>{
        (async() => {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if ( status !== 'granted' ) {
                toastRef.current.show('Debes de Aceptar los permisos de ubicacion', 3000);
            } else {
                let loc = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                });
            }
        })()
    }, [])

    // Guardar una nueva direccion de restaurant
    const saveUbicationRestaurnat = () => {
        setLocationRestaurant(location);
        toastRef.current.show('Restaurante Guardado', 3000);
        setIsVisibleMap(false);
    }
 
    return(
        <ModalOptions 
            isVisibleModal={isVisibleMap} 
            setIsVisibleModal={setIsVisibleMap}
        >
            <View>
                {location && (
                    <MapView 
                        style={styles.mapStyle}
                        initialRegion={location}
                        showsUserLocation={true}
                        onRegionChange={(region) => setLocation(region)}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude
                            }}
                            draggable
                        />
                    </MapView>
                )}
                <View style={styles.styleMapBtn}>
                    <Button
                        buttonStyle={styles.btnStylesMap}
                        containerStyle={styles.viewBtnContainer}
                        title="Guardar Ubicacion"
                        onPress={ saveUbicationRestaurnat }
                    />
                    <Button 
                        buttonStyle={styles.btnCancelButton}
                        containerStyle={styles.viewBtnContainer}
                        onPress={() => { console.log('click cancelar') }}
                        title="Cancelar"
                    />
                </View>
            </View>
        </ModalOptions>
    );
}

// STYLES
const styles = StyleSheet.create({
    viewImage:{
        flexDirection: "row",
        marginLeft:20,
        marginRight:20,
        marginTop: 30
    },
    containerIcon:{
        alignItems:"center",
        justifyContent: "center",
        marginRight:10,
        height:70,
        width:70,
        backgroundColor:"#e3e3e3"
    },
    styleAvatar:{
        height:70,
        width:70,
        marginRight: 10
    },
    viewPhoto:{
        alignItems: "center",
        height:200,
        marginBottom:10
    },
    viewForm:{
        marginLeft: 10,
        marginRight: 10
    },
    stylesInput:{
        marginBottom: 10
    },
    stylesContainerInput:{
        height: 100,
        width: '100%',
        padding: 0,
        margin: 0
    },
    btnStyles:{
        backgroundColor: '#00a680'
    },
    containerBtn:{
        marginTop: 60,
        marginLeft: 20,
        marginRight: 20
    },
    mapStyle:{
        width:'100%',
        height: 550
    },
    styleMapBtn:{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    viewBtnContainer:{
        paddingRight: 5
    },
    btnStylesMap:{
        backgroundColor : '#00a680'
    },
    btnCancelButton:{
        backgroundColor: "#a60d0d"
    }
});