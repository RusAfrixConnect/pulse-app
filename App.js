// App.js - Le point d'entrée de Pulse
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar, LogBox, View, ActivityIndicator } from 'react-native';

// Importe tes écrans
import MapScreen from './screens/MapScreen';
import CreatePostScreen from './screens/CreatePostScreen'; // Chemin corrigé
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen'; // Ajout pour voir les annonces en liste

// Firebase config (pour vérifier la connexion)
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

// Supprime certains warnings inutiles (optionnel)
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Tab = createBottomTabNavigator();

// Écran de chargement initial
function LoadingScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#FF375F" />
      <Ionicons name="pulse" size={50} color="#FF375F" style={{ marginBottom: 20 }} />
    </View>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [firebaseConnected, setFirebaseConnected] = useState(false);

  // Test de connexion Firebase au démarrage
  useEffect(() => {
    const testFirebaseConnection = async () => {
      try {
        console.log('🔍 Test de connexion Firebase...');
        
        // Test simple pour voir si on peut lire une collection
        const querySnapshot = await getDocs(collection(db, 'posts'));
        console.log(`✅ Firebase connecté ! ${querySnapshot.size} posts trouvés`);
        
        setFirebaseConnected(true);
      } catch (error) {
        console.error('❌ Erreur Firebase:', error.code, error.message);
        console.log('⚠️ Firebase non connecté, mais l\'app continue...');
      } finally {
        setIsLoading(false);
      }
    };

    testFirebaseConnection();
    
    // Simule un chargement minimum de 1.5 secondes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Carte"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              
              switch (route.name) {
                case 'Carte':
                  iconName = focused ? 'map' : 'map-outline';
                  break;
                case 'Feed':
                  iconName = focused ? 'home' : 'home-outline';
                  break;
                case 'Poster':
                  iconName = focused ? 'add-circle' : 'add-circle-outline';
                  break;
                case 'Profil':
                  iconName = focused ? 'person' : 'person-outline';
                  break;
                default:
                  iconName = 'help-outline';
              }
              
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#FF375F', // Rouge Pulse
            tabBarInactiveTintColor: '#888',
            tabBarStyle: { 
              backgroundColor: '#0A0A0A', 
              borderTopColor: '#222',
              height: 60,
              paddingBottom: 8,
              paddingTop: 8,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '500',
            },
            headerStyle: { 
              backgroundColor: '#0A0A0A',
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            headerTitleAlign: 'center',
          })}
        >
          <Tab.Screen 
            name="Feed" 
            component={HomeScreen}
            options={{ 
              title: 'Feed Pulse',
              headerRight: () => (
                <Ionicons 
                  name="pulse" 
                  size={24} 
                  color="#FF375F" 
                  style={{ marginRight: 15 }}
                />
              ),
            }}
          />
          
          <Tab.Screen 
            name="Carte" 
            component={MapScreen}
            options={{ 
              title: 'Carte Pulse',
              headerRight: () => (
                <Ionicons 
                  name="location" 
                  size={24} 
                  color="#FF375F" 
                  style={{ marginRight: 15 }}
                />
              ),
            }}
          />
          
          <Tab.Screen 
            name="Poster" 
            component={CreatePostScreen}
            options={{ 
              title: 'Créer une annonce',
              headerRight: () => (
                <View style={{ 
                  backgroundColor: firebaseConnected ? '#34C759' : '#FF3B30', 
                  width: 10, 
                  height: 10, 
                  borderRadius: 5,
                  marginRight: 20,
                }} />
              ),
            }}
          />
          
          <Tab.Screen 
            name="Profil" 
            component={ProfileScreen}
            options={{ 
              title: 'Mon Profil',
              headerRight: () => (
                <Ionicons 
                  name="settings-outline" 
                  size={24} 
                  color="#FFF" 
                  style={{ marginRight: 15 }}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
