import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, MoveVertical as MoreVertical, Share2, QrCode, LogOut } from 'lucide-react-native';
import Animated from 'react-native-reanimated';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const PROFILE_IMAGE = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&q=80';

export default function HomeScreen() {
  const [fullName, setFullName] = useState('John Doe');

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:5000/auth/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();

          if (response.ok) {
            setFullName(data.fullName);
          } else {
            console.error('Failed to fetch user details:', data.message);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      } else {
        router.replace('/(auth)/login');
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    // Clear the authentication state
    await AsyncStorage.removeItem('token');
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#2a2a2a']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>My Card</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
              <LogOut size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <Animated.View style={styles.card}>
          <LinearGradient
            colors={['#007AFF', '#00C6FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardContent}
          >
            <View style={styles.cardHeader}>
              <Image
                source={{ uri: PROFILE_IMAGE }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.menuButton}>
                <MoreVertical size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.name}>{fullName}</Text>
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Share2 size={20} color="#fff" />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <QrCode size={20} color="#fff" />
                <Text style={styles.actionText}>QR Code</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Recent Connections</Text>
        {CARDS.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={styles.cardButton}
            onPress={() => router.push(`/wallet/${card.id}`)}
          >
            <Text style={styles.cardName}>{card.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

import { CARDS } from './wallet/[id]';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardContent: {
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  menuButton: {
    padding: 8,
  },
  cardInfo: {
    marginTop: 24,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 2,
  },
  company: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  cardActions: {
    flexDirection: 'row',
    marginTop: 32,
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
    marginBottom: 16,
  },
  cardButton: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardName: {
    color: '#fff',
    fontSize: 16,
  },
});