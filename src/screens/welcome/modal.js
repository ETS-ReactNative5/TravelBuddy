import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Button,
} from 'react-native';

import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';

const App = () => {
  const [ slideAnimationDialog, setSlideAnimationDialog] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>
          React Native Toast – Toast Alert for Android
        </Text>
        {/* For Default Animation Dialog */}

        {/* For Slide Animation Dialog */}
        <TouchableHighlight
          style={styles.buttonStyle}
          onPress={() => setSlideAnimationDialog(true)}>
          <Text style={styles.buttonTextStyle}>
            Slide Animation Dialog
          </Text>
        </TouchableHighlight>


        <Dialog
          onDismiss={() => {
            setSlideAnimationDialog(false);
          }}
          onTouchOutside={() => {
            setSlideAnimationDialog(false);
          }}
          visible={slideAnimationDialog}
          dialogTitle={
            <DialogTitle
              title="Slide Animation Dialog Sample"
            />
          }
          dialogAnimation={
            new SlideAnimation({slideFrom: 'bottom'})
          }>
          <DialogContent>
            <Text>
              Here is an example of slide animation dialog.
              Please click outside to close the the dialog.
            </Text>
          </DialogContent>
        </Dialog>
      </View>
    </SafeAreaView>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  buttonStyle: {
    minWidth: '100%',
    padding: 10,
    backgroundColor: '#F08080',
    margin: 15,
  },
  buttonTextStyle: {
    color: 'black',
    textAlign: 'center',
  },
  titleStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
  },
});