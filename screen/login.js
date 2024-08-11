import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.length !== 10 || password.length < 6) {
      Alert.alert('Error', 'Username phải là số điện thoại và Password từ 6 ký tự trở lên.');
      return;
    }

    fetch(`http://192.168.98.108:3000/users?username=${username}&password=${password}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          navigation.navigate('Home');
        } else {
          Alert.alert('Error', 'Sai username hoặc password');
        }
      })
      .catch(error => {
        Alert.alert('Error', 'Không thể kết nối đến server');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Username (Số điện thoại)"
        value={username}
        onChangeText={setUsername}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});
