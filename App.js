import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screen/login';
import HomeScreen from './screen/home';
import AddLogScreen from './screen/addlog';
import EditLogScreen from './screen/editlog';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Đăng nhập' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Danh sách nhật ký' }}
        />
        <Stack.Screen
          name="AddLog"
          component={AddLogScreen}
          options={{ title: 'Thêm nhật ký' }}
        />
        <Stack.Screen
          name="EditLog"
          component={EditLogScreen}
          options={{ title: 'Sửa nhật ký' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
