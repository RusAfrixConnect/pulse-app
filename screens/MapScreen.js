import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      // 1. Demande la permission d'accéder à la localisation
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission de localisation refusée. Pulse en a besoin pour fonctionner.');
        setIsLoading(false);
        return;
      }

      // 2. Obtient la position actuelle de l'utilisateur
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setIsLoading(false);
    })();
  }, []);

  // Écran de chargement
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF375F" />
        <Text style={styles.loadingText}>Pulse localise votre position...</Text>
      </View>
    );
  }

  // Message d'erreur si la permission est refusée
  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  // Affiche la carte UNIQUEMENT si la localisation est disponible
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,  // Niveau de zoom (petite valeur = zoomé)
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true} // Affiche le point bleu natif
      >
        {/* Marqueur personnalisé Pulse (optionnel) */}
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Vous êtes ici"
          description="Bienvenue sur Pulse"
          pinColor="#FF375F" // Rouge Pulse
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Prend tout l'écran
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#AAA',
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: '#FF375F',
    fontSize: 18,
    textAlign: 'center',
    padding: 20,
  },
});
