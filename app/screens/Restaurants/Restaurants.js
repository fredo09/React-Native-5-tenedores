/*
*  Page Restaurants
*/
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ActionButton from "react-native-action-button";
import {ListRestaurants} from "./../../components/ListRestaurant";

import { firebaseApp } from "./../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export const Restaurants = (props) => {
  const { navigation } = props;

  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [startRestaurants, setStartRestaurants] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [isReloadRestaurants, setIsReloadRestaurants] = useState(false);
  const limitRestaurants = 7;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []);

  useEffect(() => {
    db.collection("Restaurants")
      .get()
      .then(snap => {
        setTotalRestaurants(snap.size);
      });

    (async () => {
      const resultRestaurants = [];

      const restaurants = db
        .collection("Restaurants")
        .orderBy("createAt","asc")
        .limit(limitRestaurants);

      await restaurants.get().then(response => {
        setStartRestaurants(response.docs[response.docs.length - 1]);

        response.forEach(doc => {
          let restaurant = doc.data();
          restaurant.id = doc.id;
          resultRestaurants.push({ restaurant });
        });
        setRestaurants(resultRestaurants);
      });
    })();
    setIsReloadRestaurants(false);
  }, [isReloadRestaurants]);

  const handleLoadMore = async () => {
    const resultRestaurants = [];
    restaurants.length < totalRestaurants && setIsLoading(true);

    const restaurantsDb = db
      .collection("Restaurants")
      .orderBy("createAt", "asc")
      .startAfter(startRestaurants.data().createAt)
      .limit(limitRestaurants);

    await restaurantsDb.get().then(response => {
      if (response.docs.length > 0) {
        setStartRestaurants(response.docs[response.docs.length - 1]);
      } else {
        setIsLoading(false);
      }

      response.forEach(doc => {
        let restaurant = doc.data();
        restaurant.id = doc.id;
        resultRestaurants.push({ restaurant });
      });

      setRestaurants([...restaurants, ...resultRestaurants]);
    });
  };

  return (
    <View style={styles.viewBody}>
      <ListRestaurants
        restaurants={restaurants}
        isLoading={isLoading}
        handleLoadMore={handleLoadMore}
        navigation={navigation}
      />
      {user && (
        <AddRestaurantButton
          navigation={navigation}
          setIsReloadRestaurants={setIsReloadRestaurants}
        />
      )}
    </View>
  );
}

const AddRestaurantButton = (props) => {
  const { navigation, setIsReloadRestaurants } = props;

  return (
    <ActionButton
      buttonColor="#00a680"
      onPress={() => 
        navigation.navigate("AddRestaurants", { setIsReloadRestaurants })
      }
    />
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  }
});