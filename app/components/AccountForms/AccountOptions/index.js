/**
*   Compoenents Opcion Account 
*/

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

export const AccountOptions = () => {

    //Lista de opciones
    const ListOptions = [
        {
            title:'Cambiar Nombre y Apellido',
            iconType:'material-community',
            iconNameLeft:'account-circle',
            iconColorLeft:'#ccc',
            iconNameRight:'chevron-right' ,
            iconColorRight:'#ccc',
            onPress : () => { console.log('Nombre') }
        },
        {
            title:'Cambiar Email',
            iconType:'material-community',
            iconNameLeft:'email-outline',
            iconColorLeft:'#ccc',
            iconNameRight:'chevron-right',
            iconColorRight:'#ccc',
            onPress : () => { console.log('email') }
        },
        {
            title:'Cambiar Password',
            iconType:'material-community',
            iconNameLeft:'lock-reset',
            iconColorLeft:'#ccc',
            iconNameRight:'chevron-right',
            iconColorRight:'#ccc',
            onPress : () => { console.log('password') }
        }
    ];
  
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
      </View>
      );
}

const styles = StyleSheet.create({
    stylesItemOptions:{
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3'
    }
});