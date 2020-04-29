/**
 * Vídeo #1 ao #9: Câmera - Módulo 18 - Localização, Câmera, React Navite avançado - B7Web
 * Adiquirindo conhecimento em features avançadas: Lendo código de barras e tirando fotos.
 * Para instalar o react-native-camera, siga as instruções em: https://blog.jscrambler.com/how-to-use-react-native-camera/
 * Ou acesse a documentação do pacote, em: https://react-native-community.github.io/react-native-camera/docs/installation#mostly-automatic-install-with-autolinking-rn-060
 * by: Vagner Pinto
 */

import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

export default class Home extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Barcode')}>
                    <Text style={styles.textButton}>Ler código de barras</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('TakePicture')}>
                    <Text style={styles.textButton}>Tirar um foto</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    button: {
        width:200,
        height:50,
        alignItems:'center',
        backgroundColor: '#006400',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    textButton:{
        fontSize:14,
        color:'#ffffff',
        fontWeight:'bold'
    }
});
