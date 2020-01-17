/**
*   User Logged 
*/

import React,{ useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { UserInfo } from './../../components/AccountForms/InfoUser';
import { Loading } from './../../components/Loading';
import * as Firebase from 'firebase';
import Toast from 'react-native-easy-toast';

export const UserLogged = () => {
    
    //States
    const [userInfo, setUserInfo] = useState({})
    const [reloadData, setReloadData] = useState(false);
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);
    const [textInfo, setTextInfo] = useState('');
    const toastRef = useRef();

    useEffect(() => {
        (async() => {
            const user = await Firebase.auth().currentUser;
            setUserInfo(user.providerData[0]);
        })();
        setReloadData(false);
    },[reloadData]);

    return(
        <View>
            <UserInfo 
                userInfo={userInfo} 
                setReloadData={setReloadData} 
                toastRef={toastRef}
                setIsVisibleLoading={setIsVisibleLoading}
                setTextInfo={setTextInfo}
            />
            <Button 
                title="Logout"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnstyle}
                onPress={() => { Firebase.auth().signOut() }}
            />
            <Toast 
                position="center"
                opacity={0.5}
                ref={toastRef}
            />
            <Loading 
                isVisible={isVisibleLoading}
                text={textInfo}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    btnContainer:{
        width: "100%"
    },
    btnstyle:{
        backgroundColor: "#00a680"
    }
});