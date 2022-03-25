import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Linking,
    StyleProp,
    TextStyle,
    ViewStyle,
    TouchableOpacity
} from 'react-native';
import { Header as HeaderRNE, Icon, } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Header = ({title}) => {

    const docsNavigate = () => {
        Linking.openURL(`https://reactnativeelements.com/docs/`);
    };

    const playgroundNavigate = () => {
        Linking.openURL(`https://react-native-elements.js.org/`);
    };

    return (
            <HeaderRNE
                leftComponent={{
                    icon: 'menu',
                    color: '#fff',
                }}
                rightComponent={
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={docsNavigate}>
                            <Icon name="description" color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 10 }}
                            onPress={playgroundNavigate}
                        >
                            <Icon type="antdesign" name="rocket1" color="white" />
                        </TouchableOpacity>
                    </View>
                }
                centerComponent={{ text: title, style: styles.heading }}
            />
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#397af8',
        marginBottom: 20,
        width: '100%',
        paddingVertical: 15,
    },
    heading: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
    },
    subheaderText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Header;