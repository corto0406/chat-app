import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
 
  const { name } = route.params || {};

  useEffect(() => {
    
    if (name) {
      navigation.setOptions({ title: name });
    }
  }, [name]);

 return (
   <View style={styles.container}>
     <Text>Hello {name || 'Chat'}!</Text>
   </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Chat;
