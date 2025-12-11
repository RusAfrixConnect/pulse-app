import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { db } from '../config/firebaseConfig';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';

const TestFirebaseScreen = () => {
  const [status, setStatus] = useState('En attente...');

  const testWrite = async () => {
    setStatus('Écriture en cours...');
    try {
      const docRef = await addDoc(collection(db, 'test_posts'), {
        title: 'Test depuis l\'app Pulse',
        description: 'Ceci est un test de fonctionnement',
        type: 'test',
        createdAt: serverTimestamp()
      });
      
      setStatus(`✅ Écriture réussie! ID: ${docRef.id}`);
      Alert.alert('Succès', `Document créé avec ID: ${docRef.id}`);
      
    } catch (error) {
      setStatus(`❌ Erreur: ${error.code}`);
      Alert.alert('Erreur', error.message);
    }
  };

  const testRead = async () => {
    setStatus('Lecture en cours...');
    try {
      const querySnapshot = await getDocs(collection(db, 'test_posts'));
      const count = querySnapshot.size;
      const posts = [];
      
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      
      setStatus(`✅ ${count} documents lus`);
      Alert.alert('Lecture', `Trouvé ${count} documents`);
      console.log('Documents:', posts);
      
    } catch (error) {
      setStatus(`❌ Erreur lecture: ${error.code}`);
      Alert.alert('Erreur', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Firebase</Text>
      <Text style={styles.status}>{status}</Text>
      
      <View style={styles.buttonContainer}>
        <Button title="Test ÉCRITURE" onPress={testWrite} color="#007AFF" />
        <View style={styles.spacer} />
        <Button title="Test LECTURE" onPress={testRead} color="#34C759" />
      </View>
      
      <Text style={styles.note}>
        Vérifie la console Expo pour les logs détaillés
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  status: {
    textAlign: 'center',
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  spacer: {
    height: 15,
  },
  note: {
    textAlign: 'center',
    color: '#666',
    marginTop: 30,
    fontStyle: 'italic',
  },
});

export default TestFirebaseScreen;
