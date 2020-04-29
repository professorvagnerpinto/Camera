/**
 * Vídeo #1 ao #9: Câmera - Módulo 18 - Localização, Câmera, React Navite avançado - B7Web
 * Adiquirindo conhecimento em features avançadas: Lendo código de barras.
 * Para instalar o react-native-camera, siga as instruções em: https://blog.jscrambler.com/how-to-use-react-native-camera/
 * Ou acesse a documentação do pacote, em: https://react-native-community.github.io/react-native-camera/docs/installation#mostly-automatic-install-with-autolinking-rn-060
 * by: Vagner Pinto
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class Barcode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            code:'',
            type:''
        };

        this.barcodeRecognized = this.barcodeRecognized.bind(this);
    }

    barcodeRecognized = ({barcodes}) => {
        if(this.camera){
            console.log(barcodes);
            console.log(barcodes[0].data);
            console.log(barcodes[0].type);
            let s = this.state;
            s.code = barcodes[0].data
            s.type = barcodes[0].type;
            this.setState(s);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    androidCameraPermissionOptions={{
                        title: 'Permissão para o uso da Câmera',
                        message: 'Nós precisamos de sua permissão para utilizar a sua câmera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancelar',
                    }}
                    onGoogleVisionBarcodesDetected={this.barcodeRecognized} >
                </RNCamera>
                {this.state.code !== '' && <View style={styles.textDiv} >
                    <Text style={styles.text} onPress={()=>this.setState({code:'', type:''})} >{this.state.code} </Text>
                    <Text style={styles.text} onPress={()=>this.setState({code:'', type:''})} >{this.state.type}</Text>
                </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#000000'
    },
    preview: {
        flex: 1
    },
    textDiv:{
        width: '100%',
        height:80,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        position:'absolute',
        alignSelf:'center'
    },
    text:{
        width: '50%',
        height: 80,
        fontSize:14,
        fontWeight:'bold',
        color:'#ffffff',
        textAlign:'center',
        textAlignVertical:'center',
        borderWidth:1,
        borderColor:'red',
        marginBottom:10
    }
});
