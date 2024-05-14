/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {View, StyleSheet, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {OtplessModule} from 'otpless-react-native';

function App(): React.JSX.Element {
  const module = new OtplessModule();
  const [token, setMyToken] = useState('');
  // Function to update the string value
  const updateString = (userToken: string) => {
    setMyToken(userToken);
  };
  let request = {
    appId: 'YOUR_APP_Id',
  };

  // This code will be used to detect the whatsapp installed status in users device
  // If you are using WHATSAPP login then its reqiured to add this code to hide the OTPless functionality
  const isWhatsappInstalled = () => {
    module.isWhatsappInstalled(hasWhatsapp => {
      console.log(hasWhatsapp);
    });
  };

  //This function is used to trigger OTPless login page
  const openLoginPage = () => {
    isWhatsappInstalled();
    module.showLoginPage(data => {
      let message: string = '';
      if (data.data === null || data.data === undefined) {
        message = data.errorMessage;
      } else {
        message = 'token: ${data.data.token}';
        // todo here
      }
    }, request);
  };

  useEffect(() => {
    openLoginPage();
    return () => {};
  }, []);
  return (
    <View style={styles.row}>
      <Text style={styles.tokentitleTextstyle}>Token : </Text>
      <Text style={styles.tokenTextStyle}>{token}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tokentitleTextstyle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  tokenTextStyle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', // Align items vertically at the center
    height: '100%',
  },
});

export default App;
