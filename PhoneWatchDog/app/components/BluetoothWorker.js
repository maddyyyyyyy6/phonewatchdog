import React, { useEffect, useState } from 'react';
import { Alert, Button, View } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import Constants from 'expo-constants';

const BluetoothApp = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [manager, setManager] = useState(null);

  useEffect(() => {
    const initializeBluetooth = async () => {
      const bleManager = new BleManager();
      console.log('BleManager:', bleManager);
      setManager(bleManager);

      // Request Bluetooth permissions if needed
      if (Constants.platform.android) {
        await bleManager.enableBluetooth();
      }

      // Add listener for Bluetooth state change
      bleManager.onStateChange((state) => {
        if (state === 'PoweredOn') {
          startScan();
        } else if (state === 'PoweredOff') {
          setIsConnected(false);
          showAlert('Bluetooth is turned off');
        }
      }, true);
    };

    initializeBluetooth();

    return () => {
      if (manager) {
        manager.destroy();
      }
    };
  }, []);

  const startScan = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log('Error:', error);
        return;
      }

      if (device.name === 'YourDeviceName') {
        connectToDevice(device);
      }
    });
  };

  const connectToDevice = async (device) => {
    if (!isConnected) {
      await device.connect();
      setIsConnected(true);
      showAlert('Connected to the Bluetooth device');
    }
  };

  const showAlert = (message) => {
    Alert.alert('Bluetooth Alert', message, [{ text: 'OK' }]);
  };

  return (
    <View>
      <Button
        title={isConnected ? 'Connected' : 'Connect'}
        onPress={startScan}
        disabled={isConnected}
      />
    </View>
  );
};

export default BluetoothApp;
