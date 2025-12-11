// screens/MapScreen.js - Carte interactive des annonces Pulse
import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

export default function MapScreen() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'vente', 'services', etc.
  const [loading, setLoading] = useState(true);
  const [mapRegion, setMapRegion] = useState({
    latitude: 48.8566, // Paris par défaut
    longitude: 2.3522,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  // Récupérer toutes les annonces en temps réel
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
      const postsList = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.location && data.location.latitude) {
          postsList.push({
            id: doc.id,
            ...data,
            // Assurer que location est au bon format
            location: {
              latitude: data.location.latitude,
              longitude: data.location.longitude
            }
          });
        }
      });
      setPosts(postsList);
      setFilteredPosts(postsList); // Au début, tout est visible
      setLoading(false);
      
      // Centrer sur le premier post si disponible
      if (postsList.length > 0 && postsList[0].location) {
        setMapRegion({
          ...postsList[0].location,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      }
    }, (error) => {
      console.error("Erreur Firestore:", error);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  // Filtrer les posts selon la catégorie
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.category === activeFilter));
    }
  }, [activeFilter, posts]);

  // Configuration des catégories (couleurs et icônes)
  const categories = {
    'all': { label: 'Tout voir', color: '#FF375F', icon: 'eye' },
    'vente': { label: 'Vente', color: '#34C759', icon: 'cart' },
    'services': { label: 'Services', color: '#007AFF', icon: 'construct' },
    'rencontre': { label: 'Rencontre', color: '#FF2D55', icon: 'heart' },
    'travail': { label: 'Emploi', color: '#5856D6', icon: 'briefcase' },
    'activites': { label: 'Activités', color: '#FF9500', icon: 'people' },
  };

  // Icône et couleur pour un marqueur
  const getMarkerConfig = (category) => {
    const config = categories[category] || categories['all'];
    return {
      icon: config.icon,
      color: config.color,
      emoji: { // Pour garder tes émojis si tu veux
        'vente': '🛍️', 'services': '🔧', 'rencontre': '❤️',
        'travail': '💼', 'activites': '🎉'
      }[category] || '📍'
    };
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF375F" />
        <Text style={styles.loadingText}>Chargement de la carte...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Barre de filtres en haut */}
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {Object.entries(categories).map(([key, config]) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.filterButton,
                { backgroundColor: config.color },
                activeFilter === key && styles.filterButtonActive
              ]}
              onPress={() => setActiveFilter(key)}
            >
              <Ionicons 
                name={config.icon} 
                size={16} 
                color="#FFF" 
                style={styles.filterIcon}
              />
              <Text style={styles.filterText}>{config.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={styles.filterCounter}>
          {filteredPosts.length} annonce{filteredPosts.length > 1 ? 's' : ''}
        </Text>
      </View>

      {/* Carte principale */}
      <MapView 
        style={styles.map}
        region={mapRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {filteredPosts.map(post => {
          const markerConfig = getMarkerConfig(post.category);
          return (
            <Marker
              key={post.id}
              coordinate={post.location}
              pinColor={markerConfig.color}
            >
              <View style={[styles.markerContainer, { borderColor: markerConfig.color }]}>
                <Ionicons name={markerConfig.icon} size={20} color={markerConfig.color} />
              </View>
              
              {/* Bulle d'info au clic */}
              <Callout tooltip>
                <View style={styles.calloutContainer}>
                  <View style={[styles.calloutHeader, { backgroundColor: markerConfig.color }]}>
                    <Text style={styles.calloutTitle}>{post.title}</Text>
                  </View>
                  <View style={styles.calloutBody}>
                    <Text style={styles.calloutCategory}>
                      {categories[post.category]?.label || 'Autre'}
                    </Text>
                    <Text style={styles.calloutDescription} numberOfLines={3}>
                      {post.description}
                    </Text>
                    {post.price > 0 && (
                      <Text style={styles.calloutPrice}>💰 {post.price}€</Text>
                    )}
                    <Text style={styles.calloutUser}>👤 {post.userName || 'Anonyme'}</Text>
                  </View>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000' 
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  loadingText: {
    color: '#FFF',
    marginTop: 10,
    fontSize: 16
  },
  
  // Filtres
  filterContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingHorizontal: 10,
  },
  filterScroll: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    opacity: 0.9,
  },
  filterButtonActive: {
    opacity: 1,
    transform: [{ scale: 1.05 }],
  },
  filterIcon: {
    marginRight: 6,
  },
  filterText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  filterCounter: {
    color: '#CCC',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
  },
  
  // Carte
  map: {
    width: '100%',
    height: '100%',
  },
  
  // Marqueurs
  markerContainer: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  
  // Bulles d'info
  calloutContainer: {
    width: 250,
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    overflow: 'hidden',
  },
  calloutHeader: {
    padding: 12,
  },
  calloutTitle: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  calloutBody: {
    padding: 12,
  },
  calloutCategory: {
    color: '#FF375F',
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 5,
  },
  calloutDescription: {
    color: '#CCC',
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 8,
  },
  calloutPrice: {
    color: '#34C759',
    fontWeight: 'bold',
    fontSize: 16,
  },
  calloutUser: {
    color: '#888',
    fontSize: 12,
    marginTop: 8,
  },
});
