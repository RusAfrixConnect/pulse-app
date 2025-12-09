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
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function CreatePostScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('sortie');

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Attention', 'Veuillez remplir tous les champs.');
      return;
    }
    Alert.alert('Super !', `Annonce "${title}" créée ! (Bientôt enregistrée)`);
    // ICI PLUS TARD : Envoyer les données à Firebase
    setTitle('');
    setDescription('');
    setCategory('sortie');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📢 Créer une annonce Pulse</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Titre *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Recherche joueur de foot"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Catégorie</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
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
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={6}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Publier sur la Carte Pulse</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        * Votre position actuelle sera automatiquement ajoutée à l'annonce.
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
  picker: { color: '#FFF' },
  button: {
    backgroundColor: '#FF375F',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  note: { color: '#888', fontSize: 12, textAlign: 'center', marginTop: 20 },
});
