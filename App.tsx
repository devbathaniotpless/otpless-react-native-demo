/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {OtplessHeadlessModule} from 'otpless-react-native';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';

function App(): React.JSX.Element {
  const module = new OtplessHeadlessModule();
  const [token, setMyToken] = useState('');
  // Function to update the string value
  const updateString = (userToken: string) => {
    setMyToken(userToken);
  };

  // This code will be used to detect the whatsapp installed status in users device
  // If you are using WHATSAPP login then its reqiured to add this code to hide the OTPless functionality
  const isWhatsappInstalled = () => {
    module.isWhatsappInstalled(hasWhatsapp => {
      console.log(hasWhatsapp);
    });
  };
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const updatePhoneNumber = (userPhoneNumber: string) => {
    setPhoneNumber(userPhoneNumber);
  };
  const updateEmail = (userEmail: string) => {
    setEmail(userEmail);
  };
  const updateOtp = (userOtp: string) => {
    setOtp(userOtp);
  };
  const whatsAppLogin = () => {
    const headlessRequest = {channelType: 'WHATSAPP'};
    module.startHeadless(headlessRequest);
  };

  const googleLogin = () => {
    const headlessRequest = {channelType: 'GMAIL'};
    module.startHeadless(headlessRequest);
  };

  const phoneEmailLogin = () => {
    if (otp === '') {
      if (email === '') {
        const headlessRequest = {
          phone: phoneNumber,
          countryCode: '91',
        };
        console.log('=====phoneEmailLogin======');
        console.log(headlessRequest);
        module.startHeadless(headlessRequest);
      } else {
        const headlessRequest = {email: email};
        console.log(headlessRequest);
        module.startHeadless(headlessRequest);
      }
    } else {
      if (email === '') {
        const headlessRequest = {
          phone: phoneNumber,
          countryCode: '91',
          otp: otp,
        };
        console.log(headlessRequest);
        module.startHeadless(headlessRequest);
      } else {
        const headlessRequest = {
          email: email,
          otp: otp,
        };
        console.log(headlessRequest);
        module.startHeadless(headlessRequest);
      }
    }
  };

  useEffect(() => {
    module.initHeadless('BXNT2846KMQM00BIJ0Y0');
    module.setHeadlessCallback(onHeadlessResult);
    return () => {
      module.clearListener();
    };
  }, []);
  const onHeadlessResult = (data: any) => {
    let dataStr = JSON.stringify(data);
  };
  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: 50,
      }}>
      <TextInput
        style={{
          width: '80%',
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 10,
        }}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={updatePhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={{
          width: '80%',
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 10,
        }}
        placeholder="Email"
        value={email}
        onChangeText={updateEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={{
          width: '80%',
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 10,
        }}
        placeholder="OTP"
        value={otp}
        onChangeText={updateOtp}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={phoneEmailLogin}>
        <Text
          style={{
            padding: 10,
            backgroundColor: 'blue',
            color: 'white',
            borderRadius: 4,
          }}>
          Sign with Phone/Email -&gt; OTP/MagicLink
        </Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', marginTop: 50}}>
        <TouchableOpacity onPress={whatsAppLogin} style={{marginRight: 10}}>
          <Text
            style={{
              padding: 10,
              backgroundColor: 'green',
              color: 'white',
              borderRadius: 4,
            }}>
            WhatsApp
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={googleLogin}>
          <Text
            style={{
              padding: 10,
              backgroundColor: 'blue',
              color: 'white',
              borderRadius: 4,
            }}>
            Gmail
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.tokentitleTextstyle}>Token : </Text>
        <Text style={styles.tokenTextStyle}>{token}</Text>
      </View>
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
