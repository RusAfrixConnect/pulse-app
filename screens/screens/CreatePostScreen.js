// screens/CreatePostScreen.js - Écran pour créer une annonce
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../firebaseConfig'; // IMPORT FIREBASE
import { collection, addDoc, serverTimestamp, GeoPoint } from 'firebase/firestore'; // Ajout de GeoPoint ici
import * as Location from 'expo-location'; // IMPORT LOCATION

export default function CreatePostScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('sortie');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Attention', 'Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);

    try {
      // 1. Demander la permission de localisation
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission requise',
          'La localisation est nécessaire pour publier sur la carte.'
        );
        setLoading(false);
        return;
      }

      // 2. Récupère la position actuelle
      let userLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      console.log('📍 Position obtenue:', {
        lat: userLocation.coords.latitude,
        lng: userLocation.coords.longitude,
      });

      // 3. Envoie les données à la collection "posts" dans Firestore
      const docRef = await addDoc(collection(db, 'posts'), {
        title: title.trim(),
        description: description.trim(),
        category: category,
        // CORRECTION : Utilisation de GeoPoint pour la localisation
        location: new GeoPoint(userLocation.coords.latitude, userLocation.coords.longitude),
        userId: 'user_anonyme', // TEMPORAIRE, on remplacera plus tard par le vrai user
        userName: 'Anonyme', // Nom temporaire
        createdAt: serverTimestamp(), // Horodatage automatique du serveur
        likes: 0,
        comments: 0,
        type: 'post', // Pour identifier le type de document
        status: 'active', // active, expired, deleted
      });

      console.log('✅ Annonce publiée ! ID : ', docRef.id);
      Alert.alert(
        'Super !',
        `Annonce "${title}" publiée sur la carte Pulse !`,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );

      // 4. Réinitialise le formulaire
      setTitle('');
      setDescription('');
      setCategory('sortie');

    } catch (error) {
      console.error('❌ Erreur Firestore : ', error);
      console.error('Détails de l\'erreur:', error.code, error.message);
      
      let errorMessage = 'Impossible de publier. ';
      
      if (error.code === 'permission-denied') {
        errorMessage += 'Permission refusée. Vérifiez les règles Firestore.';
      } else if (error.code === 'unavailable') {
        errorMessage += 'Pas de connexion internet.';
      } else {
        errorMessage += 'Erreur: ' + error.message;
      }
      
      Alert.alert('Erreur', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📢 Créer une annonce Pulse</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Titre *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Recherche joueur de foot"
          placeholderTextColor="#666"
          value={title}
          onChangeText={setTitle}
          maxLength={80}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Catégorie</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
            dropdownIconColor="#FFF"
          >
            <Picker.Item label="🎉 Sortie / Activité" value="sortie" />
            <Picker.Item label="💼 Travail / Job" value="travail" />
            <Picker.Item label="❤️ Rencontre" value="rencontre" />
            <Picker.Item label="🛠️ Service / Entraide" value="service" />
            <Picker.Item label="📣 Autre" value="autre" />
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Décris en détails, donne le lieu, l'horaire..."
          placeholderTextColor="#666"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={6}
          maxLength={500}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Publier sur la Carte Pulse</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.note}>
        * Votre position actuelle sera automatiquement ajoutée à l'annonce.
      </Text>
      
      <Text style={styles.info}>
        🔍 Vérifiez que votre console Firebase a les bonnes règles :
        {'\n'}allow read, write: if true;
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  header: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 30,
    marginTop: 10,
    textAlign: 'center',
  },
  formGroup: { marginBottom: 20 },
  label: { color: '#CCC', marginBottom: 8, fontSize: 16, fontWeight: '600' },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    padding: 15,
    color: '#FFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  textArea: { minHeight: 120, textAlignVertical: 'top' },
  pickerContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  picker: { color: '#FFF', height: 50 },
  button: {
    backgroundColor: '#FF375F',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#FF6B8F',
    opacity: 0.7,
  },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  note: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
  info: {
    color: '#4A90E2',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
});
