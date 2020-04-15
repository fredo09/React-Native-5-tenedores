/**
* Screen CommentRestaurant 
*/

import React,{ useState, useRef } from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import { Input, AirbnbRating, Button } from 'react-native-elements';
import { Loading } from './../../components/Loading';
import momment from 'moment';
import Toast from 'react-native-easy-toast';
import firebase from 'firebase/app';

// configuracion a base de datos en firebase
import { firebaConfigApp } from './../../utils/Firebase';
import "firebase/firestore";
const db = firebase.firestore(firebaConfigApp);

// Screen de comentario Restaurant
export const CommentRestaurant = (props) => {

    //Destructuri objetos
    const { navigation } = props;
    const { idRestaurant , setReviewReload } = navigation.state.params;

    //State Components
    const [ rating, setRating ] = useState(null);
    const [ title, setTitle ] = useState("");
    const [ comentario, setComentario ] = useState("");
    const [ isVisible, setIsVisible ] = useState(false);
    const useRefToast = useRef();

    // Funcion para agregar el Review Restaurant
    const addReview = () => {
        
        if( !title ){
            useRefToast.current.show("Titulo no debe de estar vacio ")
        } else if ( rating === null ){
            useRefToast.current.show('Debes de Calificar el Restaurante');
        }else if (!comentario){
            useRefToast.current.show('Debes de comentar sobre el restaurante');
        } else {
            setIsVisible(true);

            // agregamos el comentario a la base de firebase
            const user = firebase.auth().currentUser;

            const payload = {
                idUser: user.uid,
                avatarUser: user.photoURL,
                idRestaurant: idRestaurant,
                title,
                comentario,
                rating,
                createAt: new Date()
            };
            
            // Agregando a firebase basedatos
            db.collection("reviews").add(payload).then(() => {
                updateRestaurant();
            }).catch(() => {
                useRefToast.current.show('Error al enviar el comentario');
            });
            setIsVisible(false);
        }
    }

    //Actualizar informacion del restaurante
    const updateRestaurant = () => {
        const restaurantRef = db.collection("Restaurants").doc(idRestaurant);

        restaurantRef.get().then(response => {
            const data = response.data();

            // contador de rating
            const ratingTotal = data.ratingTotal + rating;

            // contador de votos
            const quatityVoting = data.quatityVoting + 1;

            // Calculando media 
            const ratingResult = ratingTotal / quatityVoting;

            //Actualizando base de datos firebase
            restaurantRef.update({
                rating:ratingResult ,
                ratingTotal,
                quatityVoting
            }).then(() =>{
                setIsVisible(false);
                setReviewReload(true);
                navigation.goBack();
            });


        });
    }
    
    return(
        <View style={styles.viewBody}>
            <View style={styles.viewRating}>
                <AirbnbRating
                    count={5}
                    reviews={[ "Muy Malo", "Malo", "Regular", "Bueno", "Excelente" ]}
                    defaultRating={0}
                    size={35}
                    onFinishRating={ value => setRating(value) }
                />
            </View>
            <View style={styles.viewFormReview}>

                <Input
                    placeholder="Titulo"
                    containerStyle = {{ marginBottom :10}}
                    onChange={(e) => setTitle(e.nativeEvent.text)}
                />

                <Input
                    placeholder="Comentario..."
                    multiline={true}
                    inputContainerStyle={{ height:150, width:"100%", padding: 0, margin:0 }}
                    onChange={(e) => setComentario(e.nativeEvent.text) }
                />

                <Button 
                    title="Enviar Comentario"
                    containerStyle={styles.viewButton}
                    onPress={addReview}
                    buttonStyle={{ backgroundColor:"#00a680" }}
                />

                <Toast 
                    ref={useRefToast}
                    position="center"
                    opacity={0.5}
                />

                <Loading 
                   isVisible={isVisible}
                   text="Agregando Comentario" 
                />
            </View>

        </View>
    );
}

//styles
const styles = StyleSheet.create({
    viewBody:{
        flex: 1
    },
    viewRating:{
        height: 110,
        backgroundColor: "#f2f2f2"
    },
    viewFormReview:{
        marginTop: 40,
        margin: 10,
        flex:1,
        alignItems: "center"
    },
    viewButton:{
        flex:1,
        justifyContent: "flex-end",
        marginTop:20,
        marginBottom:10,
        width:"95%"
    }
});