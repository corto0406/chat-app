import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const ChatScreen = ({ db, route, isConnected, storage }) => {
  const { name } = route.params;
  const { userID } = route.params;
  const { backgroundColor } = route.params;
  const [messages, setMessages] = useState([]);

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem('cached_messages') || '[]';
    setMessages(JSON.parse(cachedMessages));
  };

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('cached_messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  let unsubMessages;

  useEffect(() => {
    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach(doc => {
          newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()) });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
  };

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        },
      }}
    />;
  };

  const renderInputToolbar = (props) => {
    return isConnected ? <InputToolbar {...props} /> : null;
  };

  const renderCustomActions = (props) => {
    return <CustomActions userID={userID} storage={storage} {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  const sampleMessage = {
    _id: 1,
    text: 'My message',
    createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://facebook.github.io/react-native/img/header_logo.png',
    },
    image: 'https://facebook.github.io/react-native/img/header_logo.png',
  };

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID,
          name: name
        }}
        minComposerHeight={40}
        maxComposerHeight={100}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
