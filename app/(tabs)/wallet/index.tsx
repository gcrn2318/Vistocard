import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Phone, Mail, Globe, Linkedin, Instagram, MoveVertical as MoreVertical, Plus } from 'lucide-react-native';
import { router } from 'expo-router';
import Animated, { FadeInRight } from 'react-native-reanimated';

const CARDS = [
  {
    id: '1',
    name: 'Sarah Wilson',
    title: 'Marketing Director',
    company: 'TechCorp',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&q=80',
    tags: ['Marketing', 'Tech'],
    socials: {
      phone: '+1234567890',
      email: 'sarah@techcorp.com',
      website: 'techcorp.com',
      linkedin: 'sarahwilson',
      instagram: '@sarahw',
    },
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Software Engineer',
    company: 'DevLabs',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&q=80',
    tags: ['Engineering', 'Software'],
    socials: {
      phone: '+1234567891',
      email: 'michael@devlabs.com',
      website: 'devlabs.com',
      linkedin: 'michaelchen',
      instagram: '@mikechen',
    },
  },
];

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;

export default function WalletScreen() {
  const handleAddCard = () => {
    router.push('/add');
  };

  const handleCardPress = (card) => {
    router.push(`/wallet/${card.id}`);
  };

  const renderCard = ({ item, index }) => (
    <Animated.View
      entering={FadeInRight.delay(index * 100)}
      style={styles.cardContainer}
    >
      <TouchableOpacity onPress={() => handleCardPress(item)}>
        <LinearGradient
          colors={['#2E3192', '#1BFFFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.cardHeader}>
            <Image source={{ uri: item.image }} style={styles.profileImage} />
            <TouchableOpacity style={styles.menuButton}>
              <MoreVertical size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.company}>{item.company}</Text>

            <View style={styles.tags}>
              {item.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.socials}>
            <TouchableOpacity style={styles.socialButton}>
              <Phone size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Mail size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Globe size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Linkedin size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Instagram size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#2a2a2a']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>My Wallet</Text>
        <Text style={styles.headerSubtitle}>Manage your collected cards</Text>
        
        <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
          <Plus size={24} color="#fff" />
          <Text style={styles.addButtonText}>Add New Card</Text>
        </TouchableOpacity>
      </LinearGradient>

      <FlatList
        data={CARDS}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#999',
    marginBottom: 24,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  list: {
    padding: 24,
    gap: 24,
  },
  cardContainer: {
    width: CARD_WIDTH,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  card: {
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
    marginBottom: 16,
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  socials: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 16,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});