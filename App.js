// App.js - VERSION FINALE POUR PULSE
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar, LogBox, View } from 'react-native';

// Import de tes écrans (VERIFIE CES CHEMINS !)
import MapScreen from './screens/MapScreen';
import CreatePostScreen from './screens/screens/CreatePostScreen';
import ProfileScreen from './screens/screens/screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Feed"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              switch (route.name) {
                case 'Carte': iconName = focused ? 'map' : 'map-outline'; break;
                case 'Feed': iconName = focused ? 'home' : 'home-outline'; break;
                case 'Poster': iconName = focused ? 'add-circle' : 'add-circle-outline'; break;
                case 'Profil': iconName = focused ? 'person' : 'person-outline'; break;
                default: iconName = 'help-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#FF375F',
            tabBarInactiveTintColor: '#888',
            tabBarStyle: { 
              backgroundColor: '#0A0A0A', 
              borderTopColor: '#222',
              height: 60,
              paddingBottom: 8,
              paddingTop: 8,
            },
            tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
            headerStyle: { backgroundColor: '#0A0A0A' },
            headerTintColor: '#FFF',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
            headerTitleAlign: 'center',
          })}
        >
          <Tab.Screen name="Feed" component={HomeScreen} options={{ title: 'Feed Pulse' }} />
          <Tab.Screen name="Carte" component={MapScreen} options={{ title: 'Carte Pulse' }} />
          <Tab.Screen name="Poster" component={CreatePostScreen} options={{ title: 'Créer une annonce' }} />
          <Tab.Screen name="Profil" component={ProfileScreen} options={{ title: 'Mon Profil' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
