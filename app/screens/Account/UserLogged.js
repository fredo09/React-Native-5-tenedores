/**
*   User Logged 
*/

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import * as Firebase from 'firebase';

export const UserLogged = () => {
    return(
        <View>
            <Text>
                Usuario Logeado!
            </Text>
            <Button 
                title="Logout"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnstyle}
                onPress={() => { Firebase.auth().signOut() }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    btnContainer:{
        width: "90%"
    },
    btnstyle:{
        backgroundColor: "#00a680"
    }
});