/**
 * Vídeo #1 ao #27: Câmera - Módulo 18 - Localização, Câmera, React Navite avançado - B7Web
 * Adiquirindo conhecimento em features avançadas: Tirando uma foto.
 * Para instalar o react-native-camera, siga as instruções em: https://blog.jscrambler.com/how-to-use-react-native-camera/
 * Ou acesse a documentação do pacote, em: https://react-native-community.github.io/react-native-camera/docs/installation#mostly-automatic-install-with-autolinking-rn-060
 * by: Vagner Pinto
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class TakePicture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uriImage:'',
            camera:RNCamera.Constants.Type.back
        }
        this.takePicture = this.takePicture.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
    }

    takePicture = async () => {
        if (this.camera) { //se a câmera está aberta
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
            let s = this.state;
            s.uriImage = data.uri;
            this.setState(s);
        }
    };

    switchCamera(){
        let s = this.state;
        if(this.state.camera === RNCamera.Constants.Type.back){
            s.camera = RNCamera.Constants.Type.front;
        }else{
            s.camera = RNCamera.Constants.Type.back;
        }
        this.setState(s);
    }

    render() {
        console.log('Uri= ' + this.state.uriImage);
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={this.state.camera}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(barcodes);
                        alert(barcodes[0].data);
                    }}
                />
                <View style={styles.snapshotDiv}>
                    {this.state.uriImage !== '' && <TouchableOpacity style={styles.buttonImageView} onPress={()=>this.setState({uriImage:''})}>
                        <Image resizeMode="contain" style={styles.image} source={{uri:this.state.uriImage}} />
                    </TouchableOpacity>}
                </View>
                <View style={styles.footerDiv}>
                    <TouchableOpacity onPress={this.switchCamera} >
                        <Image style={styles.buttonSwitch} source={require('../images/ic_camera_switch.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.takePicture} style={styles.buttonCapture}>
                        <Text style={styles.textSnap}> SNAP </Text>
                    </TouchableOpacity>
                </View>
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
    snapshotDiv:{
        width:'100%',
        height:200,
        justifyContent:'flex-end',
        alignItems:'flex-end',
        alignSelf: 'flex-end',
        position:'absolute',
    },
    footerDiv:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center',
        alignSelf: 'flex-end',
        position:'absolute'
    },
    buttonImageView:{
        flex:1,
    },
    image:{
        width:100,
        height:100,
        borderWidth:1,
        borderColor:'#ffffff'
    },
    buttonSwitch:{
        width:50,
        height: 50,
        marginLeft:10
    },
    buttonCapture:{
        width:70,
        height: 70,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#a50000',
        borderRadius: 40,
        alignSelf: 'center',
        margin: 20,
    },
    textSnap:{
        fontSize:14,
        color:'#ffffff',
        fontWeight:'bold'
    }
});
