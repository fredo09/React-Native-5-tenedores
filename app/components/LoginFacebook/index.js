/**
 * Component Social Button
 */

import React, { useState }from 'react';
import { SocialIcon } from 'react-native-elements';
import { FacebookApi } from './../../utils/Social';
import { Loading } from './../Loading';
import * as Facebook from 'expo-facebook';
import * as Firebase from 'firebase';

const SocialButtonFacebook = (props) => {
    const { toastRef, navigation } = props;
    const [ isLoadin, setLoading ] = useState(false);

    const login_facebook = async () => {
        setLoading(true);

        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            FacebookApi.application_id,
            { permissions: FacebookApi.permissions }
        );
        switch(type){
            case 'success':
                const credentials = Firebase.auth.FacebookAuthProvider(token);
                await Firebase
                    .auth()
                    .signInWithCredential(credentials)
                    .then(() => {
                        navigation.navigate('Account');
                    })
                    .catch(() => {
                        toastRef.current.show('Ocurrio un Error X(');
                    })
            case 'cancel':
                toastRef.current.show('No se pudo hacer login con Facebook');
        }
        setLoading(false);
    }

    return(
        <>
        <SocialIcon 
            title='Sign In With Facebook'
            button
            onPress={ login_facebook }
            type='facebook'
        />
        <Loading text="Espere un momento..." isVisible={isLoadin} />
        </>
    )
}

export default SocialButtonFacebook;