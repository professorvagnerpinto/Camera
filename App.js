/**
 * Vídeo #1 ao #27: Câmera - Módulo 18 - Localização, Câmera, React Navite avançado - B7Web
 * Adiquirindo conhecimento em features avançadas: Lendo código de barras e tirando fotos.
 * Para instalar o react-native-camera, siga as instruções em: https://blog.jscrambler.com/how-to-use-react-native-camera/
 * Ou acesse a documentação do pacote, em: https://react-native-community.github.io/react-native-camera/docs/installation#mostly-automatic-install-with-autolinking-rn-060
 * by: Vagner Pinto
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Barcode from './src/screens/Barcode';
import TakePicture from './src/screens/TakePicture';
import Home from './src/screens/Home';

const Stack = createStackNavigator();
function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home" >
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{headerLeft: null, title: 'Home', headerStyle: {backgroundColor: '#a50000'}, headerTintColor: '#fff'}} />
                <Stack.Screen
                    name="Barcode"
                    component={Barcode}
                    options={{headerLeft: null, title: 'Barcode', headerStyle: {backgroundColor: '#006400'}, headerTintColor: '#fff'}} />
                <Stack.Screen
                    name="TakePicture"
                    component={TakePicture}
                    options={{headerLeft: null, title: 'Take Picture', headerStyle: {backgroundColor: '#006400'}, headerTintColor: '#fff'}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;
