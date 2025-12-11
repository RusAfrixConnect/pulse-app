// App.js - CODE DE TEST (sans react-native-screens)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar, View, Text } from 'react-native';

// Import SIMPLIFIÉ des écrans (assure-toi que ces chemins sont bons)
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import CreatePostScreen from './screens/screens/CreatePostScreen';
import ProfileScreen from './screens/screens/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

// Écrans factices pour tester (on utilisera les tiens après)
function TempHomeScreen() { return <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#000'}}><Text style={{color:'#FFF'}}>Feed Pulse (Test)</Text></View>;}
function TempMapScreen() { return <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#000'}}><Text style={{color:'#FFF'}}>Carte (Test)</Text></View>;}
function TempCreateScreen() { return <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#000'}}><Text style={{color:'#FFF'}}>Poster (Test)</Text></View>;}
function TempProfileScreen() { return <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#000'}}><Text style={{color:'#FFF'}}>Profil (Test)</Text></View>;}

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Feed') iconName = focused ? 'home' : 'home-outline';
              if (route.name === 'Carte') iconName = focused ? 'map' : 'map-outline';
              if (route.name === 'Poster') iconName = focused ? 'add-circle' : 'add-circle-outline';
              if (route.name === 'Profil') iconName = focused ? 'person' : 'person-outline';
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
          <Tab.Screen name="Feed" component={TempHomeScreen} options={{ title: 'Feed Pulse' }} />
          <Tab.Screen name="Carte" component={TempMapScreen} options={{ title: 'Carte Pulse' }} />
          <Tab.Screen name="Poster" component={TempCreateScreen} options={{ title: 'Créer une annonce' }} />
          <Tab.Screen name="Profil" component={TempProfileScreen} options={{ title: 'Mon Profil' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
