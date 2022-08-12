import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  BackHandler,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
} from "react-native";
import { WebView } from "react-native-webview";
import createInvoke from "react-native-webview-invoke/native";
const splash = require("./assets/splash.png");
const ScreenHeight = Dimensions.get("screen").height;
const ScreenWidth = Dimensions.get("screen").width;

// useEffect(() => {
//   BackHandler.addEventListener('hardwareBackPress',()=>BackHandler.exitApp());
//   // return () => {
//   //   BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
//   // };

// }, []);

class App extends React.Component {
  state = {
    canGoBack: false,
    canGoForward: false,
    currentUrl: "https://k5fitnessgears.com/",
    webview: null,
    jscode: ``,
  };
  webview = React.createRef();
  invoke = createInvoke(() => this.webview);

  whatIsTheNameOfA = this.invoke.bind("whatIsTheNameOfA");
  tellAYouArea = this.invoke.bind("tellAYouArea");
  connectPrinter = this.invoke.bind("connectPrinter");
  printFromWeb = async () => {
    let response = await this.whatIsTheNameOfA();
  };

  handleConnectPrinter = async () => {
    let host = "192.168.178.22";
    let port = 9100;
    let response = await this.connectPrinter(host, port);
    console.log(response);
  };

  render() {
    return (
      <React.Fragment>
        <StatusBar barStyle="auto" />
        <SafeAreaView style={styles.container}>
          <WebView
            useWebKit
            ref={(webview) => (this.webview = webview)}
            // originWhitelist={['*']}
            // originWhitelist={['file://']}
            onMessage={this.invoke.listener}
            source={{ uri: "https://k5fitnessgears.com/" }}
            style={{ flex: 1, width: "100%", height: 500 }}
            javaScriptEnabled={true}
            onError={(error) => {
              // console.log(error.type);
            }}
            scalesPageToFit
          />
        </SafeAreaView>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
