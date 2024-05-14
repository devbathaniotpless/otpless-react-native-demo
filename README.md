# React Native

Integrating One Tap OTPLESS Sign In into your React Native Application using our SDK is a streamlined process. This guide offers a comprehensive walkthrough, detailing the steps to install the SDK and seamlessly retrieve user information.

1. Install **OTPless SDK** Dependency

```
npm i otpless-react-native
```

2. Configure **AndroidManifest.xml**

`Android`

- Add an intent filter inside your Main Activity code block.

```xml
<intent-filter>
<action android:name="android.intent.action.VIEW" />
<category android:name="android.intent.category.DEFAULT" />
<category android:name="android.intent.category.BROWSABLE" />
<data
	android:host="otpless"
	android:scheme= "otpless.YOUR_APP_ID"/>
</intent-filter>
```

- Change your activity launchMode to singleTop and exported true for your Main Activity.

```xml
android:launchMode="singleTop"
android:exported="true"
```

- 1.**Handle Callback**

- Import the following classes.

```xml
import com.otplessreactnative.OtplessReactNativeManager;
import android.content.Intent;
```

- Add this code to your onNewIntent() method in your main activity.

```java
@Override
public void onNewIntent(Intent intent) {
	super.onNewIntent(intent);
	OtplessReactNativeManager.INSTANCE.onNewIntent(intent);
}
```

- 2.**Handle Backpress**

- Add this code to your onBackPressed() method in your main activity.

```java
@Override
public void onBackPressed() {
	if (OtplessReactNativeManager.INSTANCE.onBackPressed()) return;
	super.onBackPressed();
}
```

`iOS`

- Go to your project's root folder in the terminal and run.

```json
pod install
```

- Copy-paste the following code into your info.plist file.

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
    <key>CFBundleURLSchemes</key>
    <array>
    <string>otpless.YOUR_APP_ID</string>
    </array>
    <key>CFBundleTypeRole</key>
    <string>Editor</string>
    <key>CFBundleURLName</key>
    <string>otpless</string>
    </dict>
</array>
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>whatsapp</string>
    <string>otpless</string>
    <string>gootpless</string>
    <string>com.otpless.ios.app.otpless</string>
    <string>googlegmail</string>
</array>
```

Go to build settings. Search for defines module, this option will appear in packaging change it to yes.

Create connector.swift file and it will ask to create bridging header, Click yes.

- Copy-paste the following code into your connector.swift file.

```swift
import OtplessSDK
import Foundation
class Connector: NSObject {
 @objc public static func loadUrl(_ url: NSURL) {
  Otpless.sharedInstance.processOtplessDeeplink(url: url as URL)
 }
    @objc public static func isOtplessDeeplink(_ url: NSURL) -> Bool {
     return Otpless.sharedInstance.isOtplessDeeplink(url: url as URL)
    }
}
```

- Add the following code into your respective AppDelegate files.

```swift
#import "{{your_project_name}}-Swift.h"

//add this inside of class
- (BOOL) application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    if([Connector isOtplessDeeplink:url]){
            [Connector loadUrl:url];
            return true;
        }
     [super application:app openURL:url options:options];
 return true;
}
```

3. **Configure Sign up/Sign in**

- Import the OTPLESS package on your page.

```tsx
import {OtplessModule} from 'otpless-react-native';
```

- Add this code to handle callback from OTPLESS SDK.

```tsx
const module = new OtplessModule();
let request = {
  appId: 'YOUR_APP_ID',
};

// This code will be used to detect the whatsapp installed status in users device
// If you are using WHATSAPP login then its reqiured to add this code to hide the OTPless functionality
const isWhatsappInstalled = () => {
  module.isWhatsappInstalled(hasWhatsapp => {
    console.log(hasWhatsapp);
  });
};

//This function is used to trigger OTPless login page
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

//Login Methods
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
      module.startHeadless(headlessRequest);
    } else {
      const headlessRequest = {email: email};
      module.startHeadless(headlessRequest);
    }
  } else {
    if (email === '') {
      const headlessRequest = {
        phone: phoneNumber,
        countryCode: '91',
        otp: otp,
      };
      module.startHeadless(headlessRequest);
    } else {
      const headlessRequest = {
        email: email,
        otp: otp,
      };
      module.startHeadless(headlessRequest);
    }
  }
};
```

[Check out function](https://github.com/devbathaniotpless/otpless-react-native-demo/blob/main/App.tsx#L27)

**Demo**
[Demo Video](demo_video.mp4)

# Thank You

# [Visit OTPless](https://otpless.com/platforms/react-native)
