/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {View, StyleSheet, Text, Alert, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {OtplessModule} from 'otpless-react-native';
import {TouchableOpacity} from 'react-native';

function App(): React.JSX.Element {
  const module = new OtplessModule();
  const [token, setMyToken] = useState('');
  // Function to update the string value
  const updateString = (userToken: string) => {
    setMyToken(userToken);
  };
  const extra = {
    method: 'get',
    params: {
      cid: 'HRIRBIIKXMKEOTDDA8VV4HP2V24454X8', // Add your CID value provided from the dashboard
      login_uri:
        Platform.OS === 'ios'
          ? 'com.reactnative.app.otpless://otpless'
          : 'com.reactnative.app', //Add this code when your package id contains, capital letter, numbers, underscore (_)
    },
  };

  const openLoginPage = () => {
    module.showLoginPage(data => {
      let message: string = '';
      if (data.data === null || data.data === undefined) {
        message = data.errorMessage;
      } else {
        message = data.data.token;
        console.log(message);
        updateString(message);
        // todo here
      }
    }, extra);
  };

  return (
    <View style={styles.column}>
      <View style={styles.row}>
        <Text style={styles.tokentitleTextstyle}>Token : </Text>
        <Text style={styles.tokenTextStyle}>{token}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={openLoginPage}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
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
  },
});

export default App;
