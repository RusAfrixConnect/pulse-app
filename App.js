// App.js - Le point d'entrée de Pulse
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Importe tes écrans (assure-toi qu'ils existent dans le dossier screens/)
import MapScreen from './screens/MapScreen';
import CreatePostScreen from './screens/screens/CreatePostScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Carte') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Poster') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === 'Profil') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF375F', // Rouge Pulse
          tabBarInactiveTintColor: 'gray',
          headerStyle: { backgroundColor: '#0A0A0A' },
          headerTintColor: '#FFF',
          tabBarStyle: { backgroundColor: '#0A0A0A', borderTopColor: '#222' },
        })}
      >
        <Tab.Screen name="Carte" component={MapScreen} />
        <Tab.Screen name="Poster" component={CreatePostScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
