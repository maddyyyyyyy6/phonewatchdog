import React from 'react';
import {Button, Text, View} from 'react-native';
import BluetoothApp from './components/BluetoothWorker';
export default Home = () => {
    return (
        <View>
            <Text style={{fontSize:30}}>
                Phone Watch Dog
            </Text>

            <BluetoothApp />

        </View>
    )

}