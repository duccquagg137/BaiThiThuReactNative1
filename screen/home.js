import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [logs, setLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [content, setContent] = useState('');
  const [time, setTime] = useState('');
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = () => {
    fetch('http://192.168.98.108:3000/logs')
      .then(response => response.json())
      .then(data => setLogs(data));
  };

  const handleAddLog = () => {
    if (!content || !time) {
      Alert.alert('Lỗi', 'Nội dung và thời gian không được để trống');
      return;
    }
    const newLog = { content, time };
    fetch('http://192.168.98.108:3000/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLog),
    }).then(() => {
      fetchLogs();
      setContent('');
      setTime('');
      setAddModalVisible(false);
    });
  };

  const handleEditLog = () => {
    if (!content || !time) {
      Alert.alert('Lỗi', 'Nội dung và thời gian không được để trống');
      return;
    }
    console.log('Editing Log:', selectedLog.id, content, time);
    fetch(`http://192.168.98.108:3000/logs/${selectedLog.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, time }),
    }).then(() => {
      fetchLogs();
      setSelectedLog(null);
      setContent('');
      setTime('');
      setEditModalVisible(false);
    });
  };
  
  const handleDeleteLog = (id) => {
    fetch(`http://192.168.98.108:3000/logs/${id}`, {
      method: 'DELETE',
    }).then(() => {
      fetchLogs();
    });
  };

  const renderLogItem = ({ item }) => (
    <View style={styles.logItem}>
      <TouchableOpacity onPress={() => {
        console.log('Selected Log:', item); 
        setSelectedLog(item);
        setContent(item.content);
        setTime(item.time);
        setEditModalVisible(true);
      }}>
        <Text style={styles.logText}>Nội dung: {item.content}</Text>
        <Text style={styles.logText}>Thời gian: {item.time}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteLog(item.id)}>
        <Text style={styles.deleteButton}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Danh sách nhật ký</Text>
        <FlatList
          data={logs}
          renderItem={renderLogItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <Button title="Thêm nhật ký" onPress={() => setAddModalVisible(true)} />
      </View>

      <Modal
        visible={isAddModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thêm nhật ký</Text>
            <TextInput
              style={styles.input}
              placeholder="Nội dung"
              value={content}
              onChangeText={setContent}
            />
            <TextInput
              style={styles.input}
              placeholder="Thời gian"
              value={time}
              onChangeText={setTime}
            />
            <Button title="Thêm" onPress={handleAddLog} />
            <Button title="Hủy" onPress={() => setAddModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {selectedLog && (
        <Modal
          visible={isEditModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sửa nhật ký</Text>
              <TextInput
                style={styles.input}
                placeholder="Nội dung"
                value={content}
                onChangeText={setContent}
              />
              <TextInput
                style={styles.input}
                placeholder="Thời gian"
                value={time}
                onChangeText={setTime}
              />
              <Button title="Cập nhật" onPress={handleEditLog} />
              <Button title="Hủy" onPress={() => setEditModalVisible(false)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  section: {
    flex: 1,
    marginHorizontal: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  logItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logText: {
    fontSize: 16,
  },
  deleteButton: {
    color: 'red',
    fontSize: 20,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
});
