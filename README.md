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
	android:scheme= "your_login_uri.otpless"/> <!-- Update the your_login_uri here-->
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
    <string>your_login_uri.otpless</string> /* Update the your_login_uri */
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
}
```

- Add the following code into your respective AppDelegate files.

```swift
#import "{{your_project_name}}-Swift.h"

//add this inside of class
- (BOOL) application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
 [super application:app openURL:url options:options];
 [Connector loadUrl:url];
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
const extra = {
  method: 'get',
  params: {
    cid: 'HRIRBIIKXMKEOTDDA8VV4HP2V24454X8', // Add your CID value provided from the dashboard
    login_uri:
      Platform.OS === 'ios'
        ? 'com.reactnative.app.otpless://otpless'
        : 'com.reactnative.app', //Add this code when your package id contains, capital letter, numbers, underscore (_) <Add you own login uri value>
  },
};

//call this to you onPress
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
```

[Check out function](https://github.com/devbathaniotpless/otpless-react-native-demo/blob/login-uri-override-demo/App.tsx#L31)

**Demo**
[Demo Video](demo_video.mp4)

# Thank You

# [Visit OTPless](https://otpless.com/platforms/react-native)
