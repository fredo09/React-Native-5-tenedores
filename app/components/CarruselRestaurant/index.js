/* 
* Component Carrusel
*/

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'react-native-elements'; 
import Carrusel from 'react-native-banner-carousel';

export const CarruselItem = (props) => {

    const { arrayImages, width, height } = props;

    return(
        <Carrusel
            autoplay
            autoplayTimeout={5000}
            loop
            index={0}
            pageSize={width}
            pageIndicatorStyle={styles.viewPageIndicatorStyle}
            activePageIndicatorStyle={styles.viewActivePageIndicatorStyle}
        >
            {
                arrayImages.map(urlImage =>(
                    <View key={urlImage}>
                        <Image
                            style={{ width , height}}
                            source={{ uri: urlImage }}
                        />
                    </View>
                ))
            }
        </Carrusel>
    );
}

const styles = StyleSheet.create({
    viewPageIndicatorStyle:{
        backgroundColor: "#00a680"
    },
    viewActivePageIndicatorStyle:{
        backgroundColor: "#00FFc5"
    }
});