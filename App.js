import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  const [toggle, setToggle] = useState(false); //false

  const handleOnPress = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    //turn on cellphone flashlight
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    //when the cellphone shakes toggle will run
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });

    //this function will be called when the component be dismounted
    return () => subscription.remove();
  }, []);

  return (
    <View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity onPress={handleOnPress}>
        <Image
          style={toggle ? style.lightiningOn : style.lightiningOff}
          source={
            toggle
              ? require('./assets/icons/flashlight-on.png')
              : require('./assets/icons/flashlight-off.png')
          }
        />
        <Image
          style={style.dioLogo}
          source={
            toggle
              ? require('./assets/icons/button-on.png')
              : require('./assets/icons/button-off.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEBA29',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: '#FEBA29',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightiningOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: '150',
    height: '150',
  },
  lightiningOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: '#FEBA29',
    width: '150',
    height: '150',
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: '250',
    height: '250',
  },
});
