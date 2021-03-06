/**
 * Vídeo #1 ao #9: Câmera - Módulo 18 - Localização, Câmera, React Navite avançado - B7Web
 * Adiquirindo conhecimento em features avançadas: Tirando uma foto.
 * Para instalar o react-native-camera, siga as instruções em: https://blog.jscrambler.com/how-to-use-react-native-camera/
 * Ou acesse a documentação do pacote, em: https://react-native-community.github.io/react-native-camera/docs/installation#mostly-automatic-install-with-autolinking-rn-060
 * by: Vagner Pinto
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Modal } from 'react-native';
import Slider from '@react-native-community/slider';
import { RNCamera } from 'react-native-camera';

export default class TakePicture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uriImage:'',
            camera:RNCamera.Constants.Type.back,
            flash:RNCamera.Constants.FlashMode.auto,
            flashImage:require('../images/ic_flash_auto.png'),
            modalVisible:false,
            zoom:0
        }
        this.takePicture = this.takePicture.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.switchFlash = this.switchFlash.bind(this);
        this.changeZoom = this.changeZoom.bind(this);
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
        if(this.camera){
            let s = this.state;
            if(this.state.camera === RNCamera.Constants.Type.back){
                s.camera = RNCamera.Constants.Type.front;
            }else{
                s.camera = RNCamera.Constants.Type.back;
            }
            this.setState(s);
        }
    }

    switchFlash(){
        if(this.camera){
            let s = this.state;
            switch (s.flash) {
                case RNCamera.Constants.FlashMode.auto:
                    s.flash = RNCamera.Constants.FlashMode.off;
                    s.flashImage = require('../images/ic_flash_off.png');
                    break;
                case RNCamera.Constants.FlashMode.off:
                    s.flash = RNCamera.Constants.FlashMode.on;
                    s.flashImage = require('../images/ic_flash_on.png');
                    break;
                case RNCamera.Constants.FlashMode.on:
                    s.flash = RNCamera.Constants.FlashMode.auto;
                    s.flashImage = require('../images/ic_flash_auto.png');
                    break;
            }
            this.setState(s);
        }
    }

    setModalVisible(status){
        let s = this.state;
        s.modalVisible = status;
        if(!status){
            s.uriImage = '';
        }
        this.setState(s);
    }

    changeZoom(value){
        let s = this.state;
        s.zoom = value;
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
                    flashMode={this.state.flash}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    zoom={this.state.zoom}
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
                    {this.state.uriImage !== '' && <TouchableOpacity style={styles.buttonImageView} onPress={()=>this.setModalVisible(true)}>
                        <Image resizeMode="contain" style={styles.image} source={{uri:this.state.uriImage}} />
                    </TouchableOpacity>}
                </View>
                <View style={styles.sliderDiv} >
                    <Slider style={styles.sliderZoom} value={this.state.zoom} minimumValue={0} maximumValue={1} onValueChange={(v)=>this.changeZoom(v)}/>
                </View>
                <View style={styles.footerDiv}>
                    <TouchableOpacity onPress={this.switchFlash} >
                        <Image style={styles.button} source={this.state.flashImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.takePicture} style={styles.buttonSnap}>
                        <Image style={styles.buttonSnap} source={require('../images/ic_camera_snap.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.switchCamera} >
                        <Image style={styles.button} source={require('../images/ic_camera_switch.png')} />
                    </TouchableOpacity>
                </View>
                <Modal animationType="slide" transparent={false} visible={this.state.modalVisible} >
                    <View styles={styles.modalContainer}>
                        <TouchableOpacity onPress={()=>this.setModalVisible(false)} >
                            <Image resizeMode="center" style={styles.modalImage} source={{uri:this.state.uriImage}} />
                        </TouchableOpacity>
                    </View>
                </Modal>
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
    button:{
        width:50,
        height: 50
    },
    buttonSnap:{
        width:70,
        height: 70
    },
    modalContainer:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#000000'
    },
    modalImage:{
        width:'95%',
        height:'95%',
        margin:10
    },
    sliderDiv:{
        flexDirection:'row',
        width:'100%',
        height:170,
        alignSelf: 'flex-end',
        position:'absolute'
    },
    sliderZoom:{
        width:'100%'
    }
});
