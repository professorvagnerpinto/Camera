/**
 * Vídeo #1 ao #27: Câmera - Módulo 18 - Localização, Câmera, React Navite avançado - B7Web
 * Adiquirindo conhecimento em features avançadas: Lendo código de barras.
 * Para instalar o react-native-camera, siga as instruções em: https://blog.jscrambler.com/how-to-use-react-native-camera/
 * Ou acesse a documentação do pacote, em: https://react-native-community.github.io/react-native-camera/docs/installation#mostly-automatic-install-with-autolinking-rn-060
 * by: Vagner Pinto
 */

import React, {Component} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            barcodes: [],
        };

        this.barcodeRecognized = this.barcodeRecognized.bind(this);
        this.renderBarcodes = this.renderBarcodes.bind(this);
        this.renderBarcode = this.renderBarcode.bind(this);
    }

    barcodeRecognized = ({barcodes}) => {
        barcodes.forEach(barcode => console.log(barcode.data));
        this.setState({barcodes});
    };

    renderBarcodes = () => (
        <View>{this.state.barcodes.map(this.renderBarcode)}</View>
    )

    renderBarcode = ({ data }) =>
        Alert.alert(
            'Scanned Data',
            data,
            [
                {
                    text: 'Okay',
                    onPress: () => console.log('Okay Pressed'),
                    style: 'cancel'
                }
            ],
            { cancelable: false }
        )


    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref
                    }}
                    style={styles.scanner}
                    onGoogleVisionBarcodesDetected={this.barcodeRecognized}>
                    {this.renderBarcodes}
                </RNCamera>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    scanner: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});
