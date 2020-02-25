/**
* Component Modal 
*/

import React from 'react';
import { StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';

export const ModalOptions = (props) => {

    const { isVisibleModal, setIsVisibleModal, children } = props;

    const closeModal = () => {
        setIsVisibleModal(false);
    }

    return(
        <Overlay
            isVisible={isVisibleModal}
            windowBackgroundColor="rgba(0,0,0,.5)"
            overlayBackgroundColor="transparent"
            overlayStyle={styles.OverlayStyle}
            onBackdropPress={closeModal}
        >
            {children}
        </Overlay>
    )
}

const styles = StyleSheet.create({
    OverlayStyle:{
        height:"auto",
        width:"90%",
        backgroundColor:"#fff"
    }
});