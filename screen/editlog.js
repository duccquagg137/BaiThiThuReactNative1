import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

export default function EditLogScreen({ route, navigation }) {
  const { id } = route.params;
  const [content, setContent] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    fetch(`http://192.168.98.108:3000/${id}`)
      .then(response => response.json())
      .then(data => {
        setContent(data.content);
        setTime(data.time);
      });
  }, [id]);

  const handleUpdate = () => {
    if (!content || !time) {
      Alert.alert('Error', 'Các ô nhập không được để trống.');
    } else {
      fetch(`http://192.168.98.108:3000/${id}`, {
        method: 'PUT',
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
      <Button title="Cập nhật" onPress={handleUpdate} />
    </View>
  );
}
