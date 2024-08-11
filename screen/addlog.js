import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

export default function AddLogScreen({ navigation }) {
  const [content, setContent] = useState('');
  const [time, setTime] = useState('');

  const handleAdd = () => {
    if (!content || !time) {
      Alert.alert('Error', 'Các ô nhập không được để trống.');
    } else {
      fetch('http://192.168.98.108:3000/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, time }),
      })
      .then(() => navigation.goBack());
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Nội dung"
        value={content}
        onChangeText={setContent}
      />
      <TextInput
        placeholder="Thời gian"
        value={time}
        onChangeText={setTime}
      />
      <Button title="Thêm" onPress={handleAdd} />
    </View>
  );
}
