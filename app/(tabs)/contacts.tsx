import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Phone, Mail, Globe, Linkedin, Instagram } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const CONTACTS = [
  {
    id: '1',
    name: 'Emma Thompson',
    title: 'UX Designer',
    company: 'DesignCo',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&q=80',
    type: 'phone',
    value: '+1234567892',
  },
  {
    id: '2',
    name: 'James Rodriguez',
    title: 'Sales Director',
    company: 'SalesPro',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&q=80',
    type: 'phone',
    value: '+1234567893',
  },
];

const CATEGORIES = [
  { id: 'all', icon: null, label: 'All' },
  { id: 'phone', icon: Phone, label: 'Phone' },
  { id: 'email', icon: Mail, label: 'Email' },
  { id: 'website', icon: Globe, label: 'Website' },
  { id: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
  { id: 'instagram', icon: Instagram, label: 'Instagram' },
];

export default function ContactsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.id && styles.categoryButtonActive,
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      {item.icon && <item.icon size={20} color={selectedCategory === item.id ? '#fff' : '#999'} />}
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.categoryTextActive,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderContact = ({ item, index }) => (
    <Animated.View
      entering={FadeInUp.delay(index * 100)}
      style={styles.contactCard}
    >
      <Image source={{ uri: item.image }} style={styles.contactImage} />
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactTitle}>{item.title}</Text>
        <Text style={styles.contactCompany}>{item.company}</Text>
      </View>
      <TouchableOpacity 
        style={styles.contactButton}
        onPress={() => handleCall(item.value)}
      >
        <Phone size={20} color="#007AFF" />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#2a2a2a']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Contacts</Text>
        <Text style={styles.headerSubtitle}>Your business network</Text>

        <FlatList
          data={CATEGORIES}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        />
      </LinearGradient>

      <FlatList
        data={CONTACTS}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contactsList}
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
  categories: {
    gap: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    color: '#999',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  categoryTextActive: {
    color: '#fff',
  },
  contactsList: {
    padding: 24,
    gap: 16,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
  },
  contactImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contactName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
    marginBottom: 2,
  },
  contactTitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 2,
  },
  contactCompany: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  contactButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});