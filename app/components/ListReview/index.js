/**
* Component ListReview 
*/

import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Button, Avatar, Rating } from 'react-native-elements';
import moment from 'moment';
import { firebaConfigApp } from './../../utils/Firebase';
import firebase from 'firebase/app';
import "firebase/firestore";

const db = firebase.firestore(firebaConfigApp);

//Component ListReviewRestaurant
export const ListReviewRestaurant = (props) => {

    const { navigation, idRestaurant, setRating } = props;
    const [ reviews, setReviews ] = useState([]);
    const [ reviewReload, setReviewReload ] = useState(false);
    const [ userLogged, setUserLogged ] = useState(false);

    //verificando el usuario logeado
    firebase.auth().onAuthStateChanged( user => {
        user ? setUserLogged(true) : setUserLogged(false)
    });

    useEffect(() => {
        ( async () => {
            const resultReviews = [];
            const ratingReview = [];
            
            // pididiendo informacion de reviews con el id Restuarante
            db.collection("reviews").where("idRestaurant", "==", idRestaurant ).get()
                .then((response) => {
                    response.forEach(doc => {
                        const review = doc.data();

                        resultReviews.push(review);
                        ratingReview.push(review.rating);
                    });

                    let numSum = 0;
                    ratingReview.map(value => {
                        numSum = numSum + value;
                    });

                    // calculos para rating
                    const countRating = ratingReview.length;
                    const resultRatings = numSum / countRating;
                    const resultRatingFinish = resultRatings ? resultRatings : 0;

                    //Asignando el review y rating
                    setReviews(resultReviews);
                    setRating(resultRatingFinish);
                }).catch((err) => {
                    console.log(err);
                });
            setReviewReload(false);
        })()
    },[reviewReload])

    return(
        <View>
            {
                userLogged ?
                (
                    <Button
                        title="Escribe un comentario"
                        titleStyle={styles.stylesTitleButton}
                        buttonStyle={styles.stylesButton}
                        icon={{
                            type: "material-community",
                            name: "square-edit-outline",
                            color: "#00a680"
                        }}
                        onPress={ () => { navigation.navigate('CommentRestaurant',{ idRestaurant, setReviewReload }) } }
                    />
                ): 
                (
                    <View style={{ flex: 1, }}>
                        <Text 
                            style={{ textAlign: "center", color: "#00a680", padding: 20 }}
                            onPress={ () => { navigation.navigate('Login') } }
                        >
                            Es necesario estar crear una cuenta para realizar un comentario { " " }
                            <Text style={{fontWeight : "bold", fontStyle: "italic"}}>
                                Iniciar Session
                            </Text>
                        </Text>
                    </View>
                )
            }
            <FlatList 
                data={reviews}
                renderItem={ review => <Review review={review}/> }
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

// component Review
const Review = (props) => {

    const { comentario, title, rating , createAt, avatarUser, idUser} = props.review.item;
    const URL_AVATAR = 'https://api.adorable.io/avatars/285/abott@adorable.png';
    const createAtNew = new Date(createAt.seconds * 1000); 

    const date_at = moment(createAtNew).startOf('day', 'hour').fromNow() 
                    < 1 ? moment(createAtNew).subtract(1, 'days').calendar()
                    : moment(createAtNew).startOf('day', 'hour').fromNow() ;

    return(
        <View style={styles.viewReviews}>
            <View style={styles.viewAvatar}>
                <Avatar
                    containerStyle={{ width: 50, height: 50 }} 
                    rounded
                    source={{ url: avatarUser ? avatarUser : URL_AVATAR }}
                    size="large"
                />
            </View>
            <View style={styles.viewInfoReview}>
                <Text style={styles.viewTitleReview}>
                    {title}
                </Text>
                <Text style={styles.viewReviewContent}>
                    {comentario}
                </Text>
                <Rating 
                    imageSize={15}
                    startingValue={rating}
                    readonly
                />
                <Text style={styles.viewCreateAtReview}>
                    {date_at}
                </Text>
            </View>
        </View>
    );
}

//Styles
const styles = StyleSheet.create({
    stylesButton: {
        backgroundColor: "transparent"
    },
    stylesTitleButton: {
        color: "#00a680"
    },
    viewReviews: {
        flexDirection: "row",
        margin: 10,
        paddingBottom: 15,
        borderBottomColor: "#e3e3e3",
        borderBottomWidth: 1
    },
    viewAvatar:{
        marginRight: 10
    },
    viewInfoReview:{
        flex: 1,
        alignItems: "flex-start"
    },
    viewTitleReview: {
        fontWeight : "bold"
    },
    viewReviewContent:{
        padding: 2,
        color: "grey",
        marginBottom: 5
    },
    viewCreateAtReview: {
        marginTop: 5,
        color: "grey",
        fontSize: 12,
        position: "absolute",
        right: 0,
        bottom: 0
    }
});

