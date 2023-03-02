import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View, Animated, Easing } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';

export default function App() {
  const doubleTapRef = useRef();
  const scale = useRef(new Animated.Value(0)).current;
  const doubleTapFunction = () => {
    Animated.timing(scale, {
      toValue: 50,
      duration: 1000,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();
  }
  return (
    <View style={styles.container}>
      <TapGestureHandler
        waitFor={doubleTapRef}
        onActivated={() => {
          console.log("Single tap");
        }}
      >
        <TapGestureHandler
          maxDelayMs={250}
          numberOfTaps={2}
          ref={doubleTapRef}
          onActivated={() => {
            // doubleTapFunction();
          }}
        >
          <Animated.View>
            <ImageBackground source={require("./assets/instagram.jpg")} style={styles.image}>
              <Animated.Image 
                source={require("./assets/heartwhite.png")} 
                style={[
                  styles.image, 
                  { 
                    shadowOffset: { width: 0, height: 20 }, 
                    shadowOpacity: 0.3, 
                    shadowRadius: 35 
                  },
                  {
                    transform: [{scale}]
                  }
                ]} 
                resizeMode={'center'} 
              />
            </ImageBackground>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
}

const { width: SIZE } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: SIZE,
    height: SIZE,
  }
});
