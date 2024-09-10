import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Login from './login';
import Register from './register';

export default function Index() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <View style={styles.container}>
      {isRegistering ? (
        <Register setIsRegistering={setIsRegistering} />
      ) : (
        <Login setIsRegistering={setIsRegistering} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#404aa3',
  },
});
