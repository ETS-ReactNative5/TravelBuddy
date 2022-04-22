import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  Button,
} from 'react-native';

//external dependancies
import AppIntroSlider from 'react-native-app-intro-slider';

const AppIntro = ({ navigation }) => {
  /*
  //this screen is used as an App Intro Slider....
  //at the end of the file have the 3 slides which is an array
  //Display 3 slides one user first installed the app.
  */
  const [showRealApp, setShowRealApp] = useState(false);

  const onDone = () => {
    setShowRealApp(true);
  };
  const onSkip = () => {
    setShowRealApp(true);
  };

  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 50,
        }}>
        <Text style={styles.introTitleStyle}>
          {item.title}
        </Text>
        <Image
          style={styles.introImageStyle}
          source={require("../assets/2.png")} />
        <Text style={styles.introTextStyle}>
          {item.text}
        </Text>
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={{ color: '#e5e5e5' }}>Next</Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={{ color: '#e5e5e5' }}>Done</Text>
      </View>
    );
  };

  const renderSkipButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={{ color: '#e5e5e5' }}>Skip</Text>
      </View>
    );
  };

  return (
    <>
      {showRealApp ? (navigation.navigate('main'))
        : (
          <AppIntroSlider
            data={slides}
            renderItem={RenderItem}
            onDone={onDone}
            showSkipButton={true}
            onSkip={onSkip}
            renderNextButton={renderNextButton}
            renderDoneButton={renderDoneButton}
            renderSkipButton={renderSkipButton}
          />
        )
      }
    </>
  );
};

export default AppIntro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: 450,
    height: 300,
  },
  introTextStyle: {
    fontSize: 18,
    color: '#6c63ff',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    color: '#6c63ff',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  buttonCircle: {
    width: 60,
    height: 40,
    backgroundColor: '#6c63ff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const slides = [//the slides which are going to display in the app intro slider
  {
    key: 's1',
    text: 'Chalo Sath Chale!',
    title: 'Travel Buddy',
    image: {
      uri:
        '../assets/log4.png',
    },
  },
  {
    key: 's2',
    title: 'Travel Mate',
    text: 'Connect yourself with other Travelers..',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_flight_ticket_booking.png',
    },
  },
  {
    key: 's3',
    title: 'Travel Guide',
    text: 'Find Yourself a local Guide...',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png',
    },
  }
];