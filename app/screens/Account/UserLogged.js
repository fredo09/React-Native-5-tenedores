/**
*   User Logged 
*/

import React,{ useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { UserInfo } from './../../components/AccountForms/InfoUser';
import { Loading } from './../../components/Loading';
import { AccountOptions } from './../../components/AccountForms/AccountOptions';
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
        <View styles={styles.viewInfoUser}>
            <UserInfo 
                userInfo={userInfo} 
                setReloadData={setReloadData} 
                toastRef={toastRef}
                setIsVisibleLoading={setIsVisibleLoading}
                setTextInfo={setTextInfo}
            />
            <AccountOptions />
            <Button 
                title="Logout"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnstyle}
                titleStyle={styles.btnTitleStyles}
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
        backgroundColor: "#fff",// "#00a680",
        marginTop:30,
        borderRadius: 0,
        borderTopWidth:1,
        borderTopColor: "#e3e3e3",
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
        paddingTop: 10,
        paddingBottom: 10
    },
    viewInfoUser:{
        minHeight:"80%",
        backgroundColor:"#f2f2f2"
    },
    btnTitleStyles:{
        color:"#00a680"
    }
});