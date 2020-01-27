/**
*   Compoenents Opcion Account 
*/

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { ModalOptions } from './../../Modal'

// Components
import { FormDisplayName } from './../ChangeDisplayName'
import { FormEmail } from './../ChangeEmail';
import { FormPassword } from './../ChangePassword';

export const AccountOptions = (props) => {

    const { userInfo, setReloadData, toastRef } = props;
 
    const [ isVisibleModal, setIsVisibleModal] = useState(false);
    const [ isRenderComponent, setIsRenderComponent ] = useState(null);

    //Lista de opciones
    const ListOptions = [
        {
            title:'Cambiar Nombre y Apellido',
            iconType:'material-community',
            iconNameLeft:'account-circle',
            iconColorLeft:'#ccc',
            iconNameRight:'chevron-right' ,
            iconColorRight:'#ccc',
            onPress : () => { 
                showModal('displayName')
            }
        },
        {
            title:'Cambiar Email',
            iconType:'material-community',
            iconNameLeft:'email-outline',
            iconColorLeft:'#ccc',
            iconNameRight:'chevron-right',
            iconColorRight:'#ccc',
            onPress : () => { 
                 showModal('email') 
            }
        },
        {
            title:'Cambiar Password',
            iconType:'material-community',
            iconNameLeft:'lock-reset',
            iconColorLeft:'#ccc',
            iconNameRight:'chevron-right',
            iconColorRight:'#ccc',
            onPress : () => { 
                 showModal('password')
            }
        }
    ];

    const showModal = key => {
        // Switch para ver que compoenente se va a renderizar
        switch (key) {
            case 'displayName':
                setIsRenderComponent(
                    <FormDisplayName 
                        displayName={userInfo.displayName} 
                        setIsVisibleModal={setIsVisibleModal}
                        setReloadData={setReloadData}
                        toastRef={toastRef}
                    />
                );
                setIsVisibleModal(true);
                break;
            case 'email':
                setIsRenderComponent(
                    <FormEmail 
                        email={userInfo.email}
                        setIsVisibleModal={setIsVisibleModal}
                        setReloadData={setReloadData}
                        toastRef={toastRef}
                    />
                );
                setIsVisibleModal(true);
                break;
            case 'password':
                setIsRenderComponent(
                    <FormPassword 
                        setIsVisibleModal={setIsVisibleModal}
                        toastRef={toastRef}
                    />
                );
                setIsVisibleModal(true);
                break;
            default:
                break;
        }
    }

    return(
      <View>
        {
          ListOptions.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={{
                  type: item.iconType, 
                  name: item.iconNameLeft,
                  color: item.iconColorLeft 
              }}
              rightIcon={{
                type:item.iconColorRight,
                name:item.iconNameRight,
                color:item.iconColorRight
              }}
              onPress={item.onPress}
              containerStyle={styles.stylesItemOptions}
              bottomDivider
            />
          ))
        }
        {isRenderComponent && (
            <ModalOptions  
                isVisibleModal={isVisibleModal} 
                setIsVisibleModal={setIsVisibleModal}
            >
                {isRenderComponent}
            </ModalOptions>
        )}
      </View>
      );
}

const styles = StyleSheet.create({
    stylesItemOptions:{
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3'
    }
});