import React from 'react';
import Config from 'react-native-config';
import {
  View,
  Text,
} from 'react-native';

const App = () => {
    console.log(Config.API);
  return (
      <>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Daily Maps Mobile</Text>
        </View>
      </>
  );
};

export default App;
