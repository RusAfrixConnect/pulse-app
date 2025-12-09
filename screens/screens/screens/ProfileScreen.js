// screens/ProfileScreen.js - Écran du profil utilisateur
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  // Données fictives pour l'instant
  const user = {
    name: 'Frérot',
    bio: 'Prêt à connecter le monde avec Pulse ! 🚀',
    postsCount: 0, // S'incrémentera plus tard
  };

  return (
    <View style={styles.container}>
      {/* Bannière */}
      <View style={styles.banner} />

      {/* Section Profil */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=12' }} // Avatar aléatoire
          style={styles.avatar}
        />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userBio}>{user.bio}</Text>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{user.postsCount}</Text>
            <Text style={styles.statLabel}>Annonces</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Groupes</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Amis</Text>
          </View>
        </View>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings-outline" size={22} color="#CCC" />
          <Text style={styles.menuText}>Paramètres</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="help-circle-outline" size={22} color="#CCC" />
          <Text style={styles.menuText}>Aide & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="lock-closed-outline" size={22} color="#CCC" />
          <Text style={styles.menuText}>Confidentialité</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
          <Ionicons name="log-out-outline" size={22} color="#FF375F" />
          <Text style={[styles.menuText, styles.logoutText]}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.version}>Pulse v1.0 - Le réseau bat ici.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  banner: { height: 120, backgroundColor: '#222' },
  profileSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: '#111',
    marginHorizontal: 20,
    marginTop: -60,
    borderRadius: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#0A0A0A',
    marginTop: -70,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 15,
  },
  userBio: {
    fontSize: 16,
    color: '#AAA',
    textAlign: 'center',
    marginHorizontal: 30,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 25,
    paddingHorizontal: 20,
  },
  stat: { alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: '#FF375F' },
  statLabel: { fontSize: 14, color: '#888', marginTop: 2 },
  menu: { marginTop: 25, paddingHorizontal: 20 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
  },
  menuText: { color: '#CCC', fontSize: 16, marginLeft: 15 },
  logoutItem: { borderWidth: 1, borderColor: '#333' },
  logoutText: { color: '#FF375F' },
  version: {
    textAlign: 'center',
    color: '#555',
    fontSize: 12,
    marginTop: 30,
    marginBottom: 20,
  },
});
