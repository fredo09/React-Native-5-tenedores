/**
 * Page My Account
 */

import React,{ useEffect, useState } from 'react';
import * as Firebase from 'firebase';
import { Loading } from './../../components/Loading';
import UserGuest from './UserGuest';
import { UserLogged } from './UserLogged';

export const MyAccount = () => {
   const [ login, setLogin ] = useState(null);

   useEffect(() => {
    Firebase.auth().onAuthStateChanged( user => {
        !user ? setLogin(false) : setLogin(true);
    })
   },[]);

   if(login === null){
    return <Loading  isVisible={true} text={"Cargando!..."} />
   }

   return login ? <UserLogged /> : <UserGuest />
}