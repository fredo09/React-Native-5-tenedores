/**
*  Page Login
*/

import React from 'react';
import { Image, View, Text, ScrollView, StyleSheet } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import { LoginForm } from './../../components/LoginForm';

export const Login = (props) => {
    const { navigation } = props;
    return(
        <ScrollView>
            <Image 
                source={require('./../../../assets/img/5-tenedores-letras-icono-logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.viewContainer}>
                <LoginForm/>
                <CreateAccount 
                    navigation={navigation}
                />
            </View>
            <Divider style={styles.divider} />
            <View style={styles.viewContainer}>
                <Text>Login con Facebook</Text>
            </View>
        </ScrollView>
    );
}

//Componente interno 
const CreateAccount = (props) => {
    const { navigation } = props;
    
    return(
        <Text style={styles.textRegistrer}>
            ¿Aún no tienes una Cuenta? {" "}
            <Text 
                style={styles.btnRegister}
                onPress={() => { navigation.navigate("Register") }}
            >
                ¡Registrate aqui!
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    logo:{
        width:"100%",
        height: 150,
        marginTop: 20
    },
    viewContainer:{
        marginRight: 40,
        marginLeft: 40
    },
    textRegistrer:{
        marginTop: 15,
        marginLeft: 10,
        marginLeft: 15
    },
    btnRegister:{
      color: "#00a680",
      fontWeight: "bold"  
    },
    divider: {
        backgroundColor: "#00a680",
        margin: 40
    }
});