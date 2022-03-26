import React, { useState, useEffect, useRef } from 'react';
import {
    View, StyleSheet, Text, Image, FlatList, Platform, KeyboardAvoidingView, SafeAreaView,
    TextInput, TouchableWithoutFeedback, Button, Keyboard
} from 'react-native';

import Header from './Appbar';
import { addComment, getCommentsFunction, updateCommentCount } from '../data/posts';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, Input } from 'react-native-elements';
import { getFormattedDateForPost } from '../UtilPackages/Date';
import { Icon } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import { JSHash, CONSTANTS } from 'react-native-hash';

const Chat = ({navigation,gTitle}) => {
  return (
    <View>
        <Header title={"chat"}></Header>
      <Text>Chat</Text>
    </View>
  )
}

export default Chat