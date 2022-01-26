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
  componentDidMount = () => {
    // console.log("DidMount")
    this.webviewRef = React.createRef();
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );

    let jscode = ``;
    let OS = Platform.OS;
    if (OS == "android") {
      jscode = `(function(){
     
        document.querySelector("body").addEventListener('click', function(e) {
          var anchor = e.target.closest('a');
          if(anchor !== null) {
              e.preventDefault()
              window.location.href=anchor.href
          }
        }, false);
      })()`;
    } else {
      jscode = `(function(){
        const meta = document.createElement(\'meta\'); meta.setAttribute(\'content\', \'width=device-width, initial-scale=1, maximum-scale=0.99, user-scalable=0\'); meta.setAttribute(\'name\', \'viewport\'); document.getElementsByTagName(\'head\')[0].appendChild(meta);
      })()`;
    }

    this.setState({ webview: this.webviewRef, jscode: jscode });
  };

  handleNavigationState = (navState) => {
    let { canGoBack, canGoForward, url } = navState;

    this.setState({ canGoBack, canGoForward, currentUrl: url });
  };

  handleBackButtonClick = () => {
    // console.log("Back Button")
    this.state.webview.current.goBack();
    return true;
  };

  frontButtonHandler = () => {
    // console.log("Front Button");
    if (this.webviewRef.current) this.webviewRef.current.goForward();
  };
  render() {
    return (
      <React.Fragment>
        <StatusBar barStyle="auto" />
        <SafeAreaView style={styles.container}>
          <WebView
            allowsBackForwardNavigationGestures
            source={{ uri: this.state.currentUrl }}
            // source={require("./assets/test.html")}
            style={styles.webview}
            ignoreSslError={true}
            startInLoadingState={true}
            allowsFullscreenVideo
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction
            onError={console.error.bind(console, "error")}
            renderLoading={() => (
              <View
                style={{
                  width: ScreenWidth,
                  height: ScreenHeight,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image source={splash} resizeMode="center"></Image>
                {/* <ActivityIndicator
              color='#6592e6'
              size='large'
              style={{flex:1,alignItems:"center",justifyContent:"center",position:"relative"}}
            /> */}
              </View>
            )}
            ref={this.webviewRef}
            onNavigationStateChange={(navState) => {
              this.handleNavigationState(navState);
            }}
            originWhitelist={["https"]}
            scalesPageToFit={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            injectedJavaScript={this.state.jscode}
            onMessage={(event) => {}}
            onLoadProgress={(event) => {
              // console.log("current_path", event);
            }}
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
